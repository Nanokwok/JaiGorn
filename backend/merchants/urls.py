from django.urls import path
from merchants.views import MerchantRequestTransactionView

urlpatterns = [

    path(
        'me/transactions/request/',
        MerchantRequestTransactionView.as_view(),
        name='merchant-request-transaction'
    ),

]
