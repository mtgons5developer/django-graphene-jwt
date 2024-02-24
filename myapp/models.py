from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Use direct reference to the User model
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.user.username  # Return username of the associated user

class Product(models.Model):    
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='products')
    
    class Meta:
        app_label = 'myapp'

    def __str__(self):
        return self.name
        
class MyModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='my_models')
    
    class Meta:
        app_label = 'myapp'

    def __str__(self):
        return self.name
