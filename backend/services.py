from backend.models import Group


def get_group_tuple():
    return tuple((g.id, g.name) for g in Group.objects.all())
