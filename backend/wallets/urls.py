from django.urls import path
from .views import CustomerPayView, UnpaidBillListView, RepayBillAPIView, CreditSummaryView

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

    path(
            'bills/<uuid:pk>/pay/',
            RepayBillAPIView.as_view(),
            name='customer-pay-bill'
        ),

    path(
        'me/summary/',
        CreditSummaryView.as_view(),
        name='customer-credit-summary'
    ),
]