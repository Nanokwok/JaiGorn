from django.db import models
import uuid
# Create your models here.
class MerchantStatus(models.Model):
    code = models.CharField(primary_key=True, max_length=20)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Merchant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    tax_id = models.CharField(max_length=20, unique=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)

    status = models.ForeignKey(
        MerchantStatus,
        on_delete=models.RESTRICT,
        default='ACTIVE'
    )

    receivable_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00,
        help_text="ยอดจำลอง T+1 Settlement ที่ต้องโอนให้ร้าน"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name