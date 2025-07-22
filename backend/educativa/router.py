from rest_framework.routers import DefaultRouter, SimpleRouter
from educativa.viewsets import *

router = DefaultRouter()
routerulr = SimpleRouter()


router.register(r'directors', DirectorViewSet)
router.register(r'teachings', TeachingViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'areas', AreaViewSet)
router.register(r'modalitys', ModalityViewSet)
router.register(r'educationallevels', EducationalLevelViewSet)
router.register(r'institutions', InstitutionViewSet)
router.register(r'detailinstitutions', DetailInstitutionViewSet)
router.register(r'degrees', DegreeViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'competences', CompetenceViewSet)
router.register(r'capacitys', CapacityViewSet)
router.register(r'courseassignments', CourseAssignmentViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teacherinstitutionassignments', TeacherInstitutionAssignmentViewSet)