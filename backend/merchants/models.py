from django.db import models
import uuid
from django.conf import settings
# Create your models here.
class MerchantStatus(models.Model):
    code = models.CharField(primary_key=True, max_length=20)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class MerchantCategory(models.Model):
    slug = models.SlugField(primary_key=True, max_length=50)
    name = models.CharField(max_length=120)
    icon = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional icon or emoji identifier used by the frontend"
    )

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Merchant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    tax_id = models.CharField(max_length=20, unique=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Latitude in WGS84 format"
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Longitude in WGS84 format"
    )
    avg_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
        help_text="Average rating shown to customers"
    )
    review_count = models.PositiveIntegerField(default=0)
    cover_image_url = models.URLField(blank=True)

    status = models.ForeignKey(
        MerchantStatus,
        on_delete=models.RESTRICT,
        default='ACTIVE'
    )
    categories = models.ManyToManyField(
        MerchantCategory,
        blank=True,
        related_name='merchants'
    )

    receivable_balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="ยอดจำลอง T+1 Settlement ที่ต้องโอนให้ร้าน"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class MerchantUser(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    merchant = models.ForeignKey(Merchant, on_delete=models.CASCADE)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('merchant', 'user')

    def __str__(self):
        return f"{self.user.email} @ {self.merchant.name}"


class MerchantProduct(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    merchant = models.ForeignKey(
        Merchant,
        on_delete=models.CASCADE,
        related_name='products'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.merchant.name})"
