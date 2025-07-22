from rest_framework.routers import DefaultRouter, SimpleRouter
from evaluacion.viewsets import *
from rest_framework_bulk.routes import BulkRouter

router = DefaultRouter()
routerulr = SimpleRouter()
bulk_router = BulkRouter()

router.register(r'achievements', AchievementViewSet)
router.register(r'questions', QuestionViewSet)
bulk_router.register(r'assessments', AssessmentBulkViewSet, basename='assessment')
router.register(r'answers', AnswerViewSet)