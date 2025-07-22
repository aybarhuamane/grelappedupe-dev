from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from accounts.serializers import GroupSerializer, UserSerializer
from core.models import Person
from educativa.models import DetailInstitution
from educativa.serializers import DetailInstitutionListSerializer
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(
                Q(username=email) | Q(email=email),
                is_active=True
            )
        except:
            return Response(
                "El usuario   no existe",
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            groups = user.groups.all()
            try:
                person = Person.objects.get(user=user)
                return Response(
                    {
                        "user": UserSerializer(user).data,
                        "groups": GroupSerializer(groups, many=True).data,
                        "token": token.key,
                        "persona_id": person.id,
                        "persona_nombres": person.name,
                        "persona_apellidos": person.last_name,
                        "persona_numero_documento": person.num_document,
                    }
                )
            except Person.DoesNotExist:
                try:
                    detail_institution = DetailInstitution.objects.get(user=user)
                    return Response(
                        {
                            "user": UserSerializer(user).data,
                            "groups": GroupSerializer(groups, many=True).data,
                            "token": token.key,
                            "detail_institution_id": detail_institution.id,
                            "institution_name": detail_institution.institution.name,
                            "institution_id": detail_institution.institution.id,
                            "institution_modular_code": detail_institution.modular_code,
                            "institution_local_code": detail_institution.local_code,
                            "institution_level": detail_institution.level.name,
                            "institution_area": detail_institution.area.name
                        }
                    )
                except DetailInstitution.DoesNotExist:
                    return Response(
                        "El usuario no existe.",
                        status=status.HTTP_404_NOT_FOUND,
                    )
        else:
            return Response(
                "Wrong email or password",
                status=status.HTTP_401_UNAUTHORIZED,
            )

