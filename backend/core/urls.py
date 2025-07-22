from django.urls import path, include
from .router import router
from core.apis import *
urlpatterns = [
    path("", include(router.urls)),
    path("region/", region.as_view(), name="region"),
    path("province/", province.as_view(), name="province"),
    path("district/", district.as_view(), name="district"),
    # path("importubigeo/", importubigeo.as_view(), name="importubigeo"),
    # #Powered by:
    # path("powerbiperiod/", powerbiperiod.as_view(), name="powerbiperiod"),
    # path("powerbiubigeo/", powerbiubigeo.as_view(), name="powerbiubigeo")
]