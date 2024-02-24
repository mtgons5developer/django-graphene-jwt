from django.urls import path
from myapp.schema import schema
from myapp.views import MyGraphQLView, home, delete_product, my_view, UserProfileView
from django.contrib import admin
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    
    # HOME controlled by my_view in views.py
    path('', my_view, name='home'),  # Map my_view to the root URL

    #LOGIN Page
    path('accounts/', admin.site.urls),
    
    # Redirects to after logout
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),

    # URL pattern for the delete_product view
    # path('delete_product/', delete_product, name='delete_product'),
    path('delete_product/<int:product_id>/', delete_product, name='delete_product'),

    # URL pattern for the GraphQL endpoint
    path('graphql/', MyGraphQLView.as_view(graphiql=True, schema=schema)),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profile/', UserProfileView.as_view(), name='user_profile'),

]
