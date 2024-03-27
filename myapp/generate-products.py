import random
from faker import Faker
from myapp.models import Product, UserProfile  # Import UserProfile here

fake = Faker()

def generate_products(num_products):
    for _ in range(num_products):
        name = fake.company()
        description = fake.text()
        price = round(random.uniform(10, 1000), 2)  # Random price between 10 and 1000
        # Now, UserProfile is recognized and can be used to get a random user profile
        user_profile = UserProfile.objects.order_by('?').first()
        
        product = Product.objects.create(
            name=name,
            description=description,
            price=price,
            user_profile=user_profile
        )
        print(f"Created product: {product}")

# Change the number of products you want to generate here
num_products_to_generate = 10
generate_products(num_products_to_generate)
