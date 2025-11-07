from django.db import models
import uuid
from django.conf import settings
from django.utils import timezone
# Create your models here.
class WalletAccount(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        SUSPENDED = 'SUSPENDED', 'Suspended'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='wallet_account'
    )

    credit_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text='วงเงินเต็ม')
    balance_due = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text='ยอดหนี้คงค้าง')
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Wallet for {self.user} - Due: {self.balance_due} / Limit: {self.credit_limit}"

class PaymentRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PAID = 'PAID', 'Paid'
        EXPIRED = 'EXPIRED', 'Expired'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    merchant = models.ForeignKey(
        'merchants.Merchant',
        on_delete=models.CASCADE,
        related_name='payment_requests'
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='paid_requests',
        help_text='ใครเป็นคนจ่าย'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Request {self.id} from {self.merchant} for {self.amount} ({self.get_status_display()})'

class WalletTransaction(models.Model):
    class TxnType(models.TextChoices):
        PAYMENT = 'PAYMENT', 'Payment'
        REPAYMENT = 'REPAYMENT', 'Repayment'
        FEE = 'FEE', 'Fee'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type_code = models.CharField(max_length=10, choices=TxnType.choices)
    signed_amount = models.DecimalField(max_digits=10, decimal_places=2, help_text='CR=+ (Repayment); DR=- (Payment)')
    balance_due_after = models.DecimalField(max_digits=10, decimal_places=2, help_text='ยอดหนี้ค้างหลังทำ txn')
    payment_request = models.OneToOneField(
        PaymentRequest,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    account = models.ForeignKey(
        WalletAccount,
        on_delete=models.CASCADE,
        related_name='transactions'
    )

    occurred_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.type_code} of {self.signed_amount} for {self.account.user}'

    class Meta:
        ordering = ['-created_at']

class InstallmentBill(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PAID = 'PAID', 'Paid'
        OVERDUE = 'OVERDUE', 'Overdue'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction = models.ForeignKey(
        WalletTransaction,
        on_delete=models.CASCADE,
    )

    account = models.ForeignKey(
        WalletAccount,
        on_delete=models.CASCADE,
        related_name='bills'
    )

    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    paid_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Bill {self.id} for {self.account.user} due on {self.due_date} ({self.get_status_display()})'

    class Meta:
        ordering = ['due_date']