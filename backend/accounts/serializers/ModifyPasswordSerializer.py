from rest_framework import serializers

class ModifyPasswordSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    

    def validate(self, data):
        return data
        