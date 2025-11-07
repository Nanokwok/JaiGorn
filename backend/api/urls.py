from django.urls import path
from .views import MerchantRequestTransactionView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path(
        'merchants/me/transactions/request/',
        MerchantRequestTransactionView.as_view(),
        name='merchant-request-transaction'
    ),
]