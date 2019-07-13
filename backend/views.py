from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics, status
from rest_framework.response import Response

from backend.models import User, Group
from backend.serializers import UserSerializer, GroupSerializer


class UsersRetrieveUpdateDestroyView(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'


class UsersListCreateView(LoginRequiredMixin, generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class GroupsRetrieveUpdateDestroyView(LoginRequiredMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.get_users_count() > 0:
            return Response(
                {'detail': 'Unable to delete a group in which users exist'},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            self.perform_destroy(instance)
            return Response({
                'detail': 'The group has been successfully deleted'},
                status=status.HTTP_204_NO_CONTENT
            )


class GroupsListCreateView(LoginRequiredMixin, generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
