from django.contrib import admin
from .models import (
    Merchant,
    MerchantStatus,
    MerchantUser,
    MerchantCategory,
    MerchantProduct
)
# Register your models here.
admin.site.register(Merchant)
admin.site.register(MerchantStatus)
admin.site.register(MerchantUser)
admin.site.register(MerchantCategory)
admin.site.register(MerchantProduct)
