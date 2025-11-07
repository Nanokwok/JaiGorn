from django.contrib import admin
from .models import Merchant, MerchantStatus
# Register your models here.
admin.site.register(Merchant)
admin.site.register(MerchantStatus)