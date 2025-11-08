from django.urls import path
from .views import CustomerPayView, UnpaidBillListView

app_name = 'wallets'

urlpatterns = [

    path(
        'payment-requests/<uuid:pk>/pay/',
        CustomerPayView.as_view(),
        name='customer-pay-request'
    ),

    path(
        'bills/',
        UnpaidBillListView.as_view(),
        name='customer-unpaid-bills'
    ),

]