from rest_framework import serializers
from .models import InstallmentBill, WalletAccount
from decimal import Decimal

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