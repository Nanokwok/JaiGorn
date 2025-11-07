from django.contrib import admin
from .models import WalletAccount, PaymentRequest, WalletTransaction, InstallmentBill
# Register your models here.
admin.site.register(WalletAccount)
admin.site.register(PaymentRequest)
admin.site.register(WalletTransaction)
admin.site.register(InstallmentBill)