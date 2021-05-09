from django.urls import path

from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', views.RegisterUserViewSet.as_view({'post': 'create'})),
    path('userinfo/', views.UserViewSet.as_view({'get': 'retrieve'})),
    path('changepassword/', views.UserViewSet.as_view({'put': 'update'})),
    path('userUpdate/', views.UserUpdateViewSet.as_view({'put': 'update'})),
]
