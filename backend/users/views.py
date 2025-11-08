import math
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from .serializers import (
    UserRegisterSerializer,
    MerchantSummarySerializer,
    MerchantCategorySerializer,
    MerchantDetailSerializer,
    MerchantProductSerializer
)
from .models import CustomUser
from merchants.models import Merchant, MerchantCategory


class UserRegisterView(generics.CreateAPIView):

    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer


def _to_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _haversine_distance_km(lat1, lon1, lat2, lon2):
    """
    Return approximate distance in kilometers using the haversine formula.
    """
    radius = 6371  # Earth radius in km
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return radius * c


class NearbyMerchantListView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        latitude = _to_float(request.query_params.get('lat'))
        longitude = _to_float(request.query_params.get('lng'))
        try:
            limit = int(request.query_params.get('limit', 20))
        except ValueError:
            limit = 20
        limit = max(1, min(limit, 50))

        queryset = Merchant.objects.filter(
            status__code='ACTIVE'
        ).prefetch_related('categories')

        merchants = []

        if latitude is not None and longitude is not None:
            geo_queryset = queryset.exclude(latitude__isnull=True).exclude(longitude__isnull=True)
            for merchant in geo_queryset:
                merchant.distance_km = _haversine_distance_km(
                    latitude,
                    longitude,
                    float(merchant.latitude),
                    float(merchant.longitude)
                )
                merchants.append(merchant)
            merchants.sort(key=lambda merchant: merchant.distance_km)
        else:
            merchants = list(queryset.order_by('-avg_rating', 'name')[:limit])
            for merchant in merchants:
                merchant.distance_km = None

        merchants = merchants[:limit]

        serializer = MerchantSummarySerializer(merchants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MerchantSearchView(generics.ListAPIView):

    serializer_class = MerchantSummarySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Merchant.objects.filter(
            status__code='ACTIVE'
        ).prefetch_related('categories')

        query = self.request.query_params.get('q')
        category_slug = self.request.query_params.get('category')
        min_rating = _to_float(self.request.query_params.get('min_rating'))

        if query:
            queryset = queryset.filter(
                Q(name__icontains=query)
                | Q(description__icontains=query)
                | Q(address__icontains=query)
            )

        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug)

        if min_rating is not None:
            queryset = queryset.filter(avg_rating__gte=min_rating)

        return queryset.order_by('-avg_rating', 'name').distinct()


class MerchantCategoryListView(generics.ListAPIView):

    serializer_class = MerchantCategorySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return MerchantCategory.objects.annotate(
            merchant_count=Count(
                'merchants',
                filter=Q(merchants__status__code='ACTIVE')
            )
        ).order_by('name')


class MerchantDetailView(generics.RetrieveAPIView):

    serializer_class = MerchantDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'
    lookup_url_kwarg = 'merchant_id'

    queryset = Merchant.objects.filter(
        status__code='ACTIVE'
    ).prefetch_related('categories')


class MerchantProductListView(generics.ListAPIView):

    serializer_class = MerchantProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        merchant = get_object_or_404(
            Merchant.objects.filter(status__code='ACTIVE'),
            pk=self.kwargs['merchant_id']
        )
        return merchant.products.filter(is_available=True).order_by('name')
