from django.db import models
import uuid
from django.conf import settings
# Create your models here.
class Wallet(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='wallet'
    )
    balance = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}'s Wallet - Balance: {self.balance}"

class PaymentRequest(models.Model):
    RequestStatus = (
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('EXPIRE', 'Expired'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    merchant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='payment_requests'
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=RequestStatus, default='PENDING')

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='paid_invoices'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Request {self.id} from {self.merchant.email} for {self.amount} ({self.status})'

class Transaction(models.Model):
    TransactionStatus = (
        ('TOPUP', 'Top-up'),
        ('PAYMENT', 'Payment'),
        ('RECEIVE', 'Receive'),
    )

    payment_request = models.ForeignKey(
        PaymentRequest,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
        related_name='transactions'
    )

    transaction_type = models.CharField(max_length=10, choices=TransactionStatus)
    amount = models.DecimalField(max_digits=10,decimal_places=2)

    balance_after = models.DecimalField(max_digits=10,decimal_places=2)
    description = models.CharField(max_length=255,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.transaction_type} of {self.amount} for {self.wallet.user.email}'

    class Meta:
        ordering = ['-created_at']