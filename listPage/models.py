from django.db import models




# Create your models here.
class Task(models.Model):
    priority = [
        (1, 'Low'),
        (2, 'Medium'),
        (3, 'High'),
    ]

    status = [
        (1, 'Pending'),
        (2, 'Doing'),
        (3, 'Done')
    ]

    title = models.CharField(max_length=200)
    priority = models.IntegerField(verbose_name="優先度", choices=priority, default=1)
    status = models.IntegerField(verbose_name="狀態", choices=status, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title