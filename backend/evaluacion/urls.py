from django.urls import path, include
from .router import router, bulk_router
from evaluacion.apis import *
urlpatterns = [
    path("", include(router.urls)),
    path("", include(bulk_router.urls)),
    path("evaluationheader/", evaluationheader.as_view(), name="evaluationheader"),
    path("courseevaluations/", courseevaluations.as_view(), name="courseevaluations"),
    # path("detaildashboard/", detaildashboard.as_view(), name="detaildashboard"),
    #path("dashboard/", dashboard.as_view(), name="dashboard"),
    #path("listinstitutesevaluates/", ListInstitutesEvaluates.as_view(), name="listinstitutesevaluates"),
    #path("dashboardcollege/", dashboardcollege.as_view(), name="dashboardcollege"),
    # path("exportinstitutesevaluates/", exportinstitutesevaluates.as_view(), name="exportinstitutesevaluates"),
    # #powerbi
    # path("powerbiassessment/", powerbiassessment.as_view(), name="powerbiassessment"),
    # path("powerbiquestion/", powerbiquestion.as_view(), name="powerbquestion"),
    # path("powerbiachievement/", powerbiachievement.as_view(), name="powerbiachievement"),
]