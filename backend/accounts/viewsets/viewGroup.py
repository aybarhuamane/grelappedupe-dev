from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Group
from accounts.serializers import GroupSerializer

class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer