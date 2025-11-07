from rest_framework import serializers
from wallets.models import PaymentRequest
from merchants.models import Merchant

class MerchantNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Merchant
        fields = ['id', 'name']

class PaymentRequestCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentRequest
        fields = ['amount']

class PaymentRequestDisplaySerializer(serializers.ModelSerializer):

    merchant = MerchantNameSerializer(read_only=True)

    class Meta:
        model = PaymentRequest
        fields = ['id', 'amount', 'status', 'merchant', 'created_at']