from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserRegisterView,
    NearbyMerchantListView,
    MerchantSearchView,
    MerchantCategoryListView,
    MerchantDetailView,
    MerchantProductListView
)

app_name = 'users'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path(
            'register/',
            UserRegisterView.as_view(),
            name='user-register'
        ),
    path(
        'near/',
        NearbyMerchantListView.as_view(),
        name='users-nearby-merchants'
    ),
    path(
        'search/',
        MerchantSearchView.as_view(),
        name='users-search-merchants'
    ),
    path(
        'categories/',
        MerchantCategoryListView.as_view(),
        name='users-merchant-categories'
    ),
    path(
        '<uuid:merchant_id>/products/',
        MerchantProductListView.as_view(),
        name='users-merchant-products'
    ),
    path(
        '<uuid:merchant_id>/',
        MerchantDetailView.as_view(),
        name='users-merchant-detail'
    ),
]
