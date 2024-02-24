#views.py

import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.views import GraphQLView
from django.shortcuts import render
from myapp.models import Product, UserProfile  # Assuming Product is your model for products
import requests  # Import requests library to make HTTP requests
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required, permission_required
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError

class MyGraphQLView(GraphQLView):
    def get(self, request, *args, **kwargs):
        # Fetch products data from your database
        products = Product.objects.all()  # Assuming you have a Product model
        # Pass products data to the template context
        return render(request, 'graphql.html', {'products': products})

def home(request):
    csrf_token = get_token(request)

    # Make a request to your GraphQL API endpoint
    graphql_url = 'http://localhost:8000/graphql/'  # Replace with your GraphQL API endpoint
    graphql_query = '''
    query {
      allProducts {
        id
        name
        price
        description
      }
    }
    '''

    # Include CSRF token in headers
    headers = {
        'Cookie': f'csrftoken={csrf_token}',
        'X-CSRFToken': csrf_token,
    }    

    # Make POST request with CSRF token
    response = requests.post(graphql_url, json={'query': graphql_query}, headers=headers)
    
    # Check if the request was successful and extract product data
    if response.status_code == 200:
        data = response.json()
        products = data.get('data', {}).get('allProducts', [])
    else:
        products = []  # If request fails, set products to an empty list

    # Pass the products data to the template context
    return render(request, 'home.html', {'products': products})

@login_required
@permission_required('app.delete_product', raise_exception=True)
def delete_product(request, product_id):
    try:
        # Retrieve the product instance
        product = Product.objects.get(pk=product_id)
        # Delete the product
        product.delete()
        # Return a success response
        return JsonResponse({'success': True, 'message': 'Product deleted successfully'})
    except Product.DoesNotExist:
        # Handle the case where the product does not exist
        return JsonResponse({'success': False, 'message': 'Product does not exist'}, status=404)
    except Exception as e:
        # Handle other exceptions
        return JsonResponse({'success': False, 'message': str(e)}, status=500)

def index(request):
    pass

def my_view(request):
    products = Product.objects.order_by('id')  # Or any other queryset
    paginator = Paginator(products, 15)  # Paginate queryset with 20 items per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'home.html', {'page_obj': page_obj})

class MyAuthenticatedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Your view logic here
        return Response({"message": "You are authenticated!"})
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"username": user.username, "email": user.email})

class UserProfileType(DjangoObjectType):
    class Meta:
        model = UserProfile
        fields = ('id', 'bio')

class UpdateUserProfile(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        bio = graphene.String()

    user_profile = graphene.Field(UserProfileType)

    def mutate(self, info, username, email, bio=None):
        # Input validation to prevent injection attacks
        if not username.isalnum():
            raise ValidationError("Invalid username format")
        if not email:
            raise ValidationError("Email is required")
        # Additional input validation can be added here
        
        # Create or update the user profile
        user_profile, created = UserProfile.objects.update_or_create(
            username=username,
            defaults={'email': email, 'bio': bio}
        )
        return UpdateUserProfile(user_profile=user_profile)

class Mutation(graphene.ObjectType):
    update_user_profile = UpdateUserProfile.Field()

schema = graphene.Schema(mutation=Mutation)        