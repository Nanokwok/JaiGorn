from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from merchants.models import Merchant, MerchantCategory, MerchantProduct


class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        label="Confirm Password"
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'phone')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        user = CustomUser.objects.create_user(**validated_data)
        return user


class MerchantCategorySerializer(serializers.ModelSerializer):

    merchant_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = MerchantCategory
        fields = ['slug', 'name', 'icon', 'merchant_count']


class MerchantProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = MerchantProduct
        fields = ['id', 'name', 'description', 'price', 'image_url', 'is_available']


class MerchantSummarySerializer(serializers.ModelSerializer):

    categories = serializers.SerializerMethodField()
    distance_km = serializers.SerializerMethodField()

    class Meta:
        model = Merchant
        fields = [
            'id',
            'name',
            'description',
            'address',
            'avg_rating',
            'review_count',
            'cover_image_url',
            'distance_km',
            'categories',
        ]

    def get_categories(self, obj):
        return [category.name for category in obj.categories.all()]

    def get_distance_km(self, obj):
        distance = getattr(obj, 'distance_km', None)
        return round(distance, 2) if distance is not None else None


class MerchantDetailSerializer(MerchantSummarySerializer):

    class Meta(MerchantSummarySerializer.Meta):
        fields = MerchantSummarySerializer.Meta.fields + [
            'contact_email',
            'contact_phone',
            'latitude',
            'longitude',
        ]
