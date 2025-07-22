from rest_framework.routers import DefaultRouter, SimpleRouter
from core.viewsets import *

router = DefaultRouter()
routerulr = SimpleRouter()

router.register(r'person', PersonViewSet)
router.register(r'ubigeo', UbigeoViewSet)
router.register(r'period', PeriodViewSet)