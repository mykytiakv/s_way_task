from rest_framework import serializers
from backend.models import User, Group
from backend.services import get_group_tuple


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    users_count = serializers.IntegerField(source='get_users_count', read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'description', 'users_count')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    group_id = serializers.ChoiceField(choices=get_group_tuple(), allow_null=True, required=False)
    is_superuser = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'created', 'group_id', 'group_data', 'is_superuser')
