from django.urls import path, include
from .router import router
from educativa.apis import * 
urlpatterns = [
    path("", include(router.urls)),
    path("teachingslist/", teachingList.as_view(), name="teachingsList"),
    path("detailinstitutionlist/", detailinstitutionList.as_view(), name="detailinstitutionList"),
    path("teacherassignmentslist/", teacherassignmentsList.as_view(), name="teacherAsignatureList"),
    path("importteachers/", importteachers.as_view(), name="importTeachers"),
    path("importstudents/", importstudents.as_view(), name="importstudents"),
    path("importinstitution/", importinstitution.as_view(), name="importinstitution"),
    path("courseassignmentslist/", courseassignmentList.as_view(), name="courseassignmentsList"),
    path("agregatestudent/", agregatestudent.as_view(), name="agregatestudent"),
    path("directorlist/", directorList.as_view(), name="directorList"),
    path("teacherinstitutionassignmentlist/", teacherinstitutionassignmentList.as_view(), name="teacherinstitutionassignmentList"),
    # #power by
    # path("powerbicategory/", powerbicategory.as_view(), name="powerbicategory"),
    # path("powerbiarea/", powerbiarea.as_view(), name="powerbiarea"),
    # path("powerbimodality/", powerbimodality.as_view(), name="powerbimodality"),
    # path("powerbieducationallevel/", powerbieducationallevel.as_view(), name="powerbieducationallevel"),
    # path("powerbiinstitution/", powerbiinstitution.as_view(), name="powerbiinstitution"),
    # path("powerbidetailinstitution/", powerbidetailinstitution.as_view(), name="powerbidetailinstitution"),
    # path("powerbidegree/", powerbidegree.as_view(), name="powerbidegree"),
    # path("powerbicourse/", powerbicourse.as_view(), name="powerbicourse"),
    # path("powerbicompetence/", powerbicompetence.as_view(), name="powerbicompetence"),
    # path("powerbicapacity/", powerbicapacity.as_view(), name="powerbicapacity"),
    # path("powerbicourseassignment/", powerbicourseassignment.as_view(), name="powerbicourseassignment"),
    # path("powerbistudent/", powerbistudent.as_view(), name="powerbistudent")
]
