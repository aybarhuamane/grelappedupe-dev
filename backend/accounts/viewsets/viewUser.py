from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer
from rest_framework.decorators import action
from accounts.actions import reset_password, modify_password

class UserViewSet(ModelViewSet):
    queryset = User.objects.order_by('id')
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        response = reset_password(self, request)
        return response
    
    @action(detail=False, methods=['post'])
    def modify_password(self, request):
        response = modify_password(self, request)
        return response