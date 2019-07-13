from django.urls import path, include
from backend import views

app_name = 'api'

urlpatterns = [
    path('auth/', include('rest_auth.urls')),
    path('users/', views.UsersListCreateView.as_view(), name='users-list'),
    path('users/<pk>', views.UsersRetrieveUpdateDestroyView.as_view(), name='user-detail'),

    path('groups/', views.GroupsListCreateView.as_view(), name='groups-list'),
    path('groups/<pk>', views.GroupsRetrieveUpdateDestroyView.as_view(), name='group-detail')
]
