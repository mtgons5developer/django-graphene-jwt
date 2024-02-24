from django.core.management.base import BaseCommand
from faker import Faker
from myapp.models import Product  # Update import statement to correctly import Product model

class Command(BaseCommand):
    help = 'Populate the database with random data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        for _ in range(1000):  # Generate 10 random products
            product = Product.objects.create(
                name=fake.word(),
                description=fake.sentence(),
                price=fake.random_number(digits=4, fix_len=True) / 100  # Random price between 0.01 and 999.99
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created product: {product.name}'))
