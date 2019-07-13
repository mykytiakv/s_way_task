from django.db import models
from django.contrib.auth.models import AbstractUser, Group as AbstractGroup


class Group(AbstractGroup):
    description = models.CharField(max_length=512)

    def get_users_count(self):
        return User.objects.filter(group=self).count()


class User(AbstractUser):
    created = models.DateTimeField(auto_now_add=True, blank=True)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, related_name='group')

    @property
    def group_data(self):
        obj = Group.objects.filter(id=self.group_id).first()
        return {
            'id': obj.id,
            'name': obj.name,
            'description': obj.description
        } if obj else dict()
