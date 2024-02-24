from django.contrib import admin
from .models import Product, MyModel
from .models import UserProfile

admin.site.register(Product)
admin.site.register(MyModel)
admin.site.register(UserProfile)