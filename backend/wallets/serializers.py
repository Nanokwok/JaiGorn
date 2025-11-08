from rest_framework import serializers
from .models import InstallmentBill, WalletAccount
from decimal import Decimal
from django.utils import timezone

class CreditDataSerializer(serializers.ModelSerializer):

    available = serializers.SerializerMethodField()
    total = serializers.DecimalField(source='credit_limit', max_digits=10, decimal_places=2, read_only=True)
    currency = serializers.SerializerMethodField()

    class Meta:
        model = WalletAccount
        fields = ['available', 'total', 'currency']

    def get_available(self, obj: WalletAccount) -> Decimal:
        return obj.credit_limit - obj.balance_due

    def get_currency(self, obj: WalletAccount) -> str:
        return '฿'

class CustomerPaySerializer(serializers.Serializer):

    installment_months = serializers.IntegerField(
        min_value=1,
        max_value=12,
        default=1,
        help_text="จำนวนเดือนที่ต้องการผ่อน (1 คือจ่ายเต็มจำนวน)"
    )

class InstallmentBillSerializer(serializers.ModelSerializer):

    merchant_name = serializers.CharField(source='transaction.payment_request.merchant.name', read_only=True)

    class Meta:
        model = InstallmentBill
        fields = [
            'id',
            'amount_due',
            'due_date',
            'status',
            'merchant_name',
        ]


class HomeBillSerializer(serializers.ModelSerializer):

    title = serializers.SerializerMethodField()

    date = serializers.SerializerMethodField()

    amount = serializers.DecimalField(source='amount_due', max_digits=10, decimal_places=2)

    status = serializers.SerializerMethodField()

    class Meta:
        model = InstallmentBill
        fields = [
            'id',
            'title',
            'date',
            'amount',
            'status',
        ]

    def get_title(self, obj: InstallmentBill) -> str:
        if obj.status == 'PAID':
            return obj.due_date.strftime('%B %Y')
        else:
            try:
                merchant_name = obj.transaction.payment_request.merchant.name
                return f"Bill from {merchant_name}"
            except AttributeError:
                return "Next Coming Bill"

    def get_date(self, obj: InstallmentBill) -> str:
        if obj.status == 'PAID':
            return "Paid"

        today = timezone.localdate()
        days_left = (obj.due_date - today).days

        if days_left < 0:
            return f"Overdue {abs(days_left)} days"
        elif days_left == 0:
            return "Due Today"
        elif days_left == 1:
            return "1 day left"
        else:
            return f"{days_left} days left"

    def get_status(self, obj: InstallmentBill) -> str:
        if obj.status == 'PAID':
            return 'paid'
        elif obj.status == 'PENDING':
            return 'due'
        elif obj.status == 'OVERDUE':
            return 'overdue'
        return 'unknown'