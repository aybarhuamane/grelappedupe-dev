from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=200)
    email = serializers.EmailField(max_length=200)
    is_active = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    last_login = serializers.DateTimeField()
    first_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200)
