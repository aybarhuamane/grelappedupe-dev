from django.urls import path, include
from accounts.apis import *
from .router import router

urlpatterns = [
    path("", include(router.urls)),
    path('login/', login.as_view(), name='login'),
    path('create_acounts_ie/', create_acounts_ie.as_view(), name='create_acounts_ie'),
]