from rest_framework.routers import DefaultRouter, SimpleRouter
from accounts.viewsets import *

router = DefaultRouter()
routerulr = SimpleRouter()

router.register(r'groups', GroupViewSet)
router.register(r'users', UserViewSet)
