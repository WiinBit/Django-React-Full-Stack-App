from django.urls import path
from . import views

from .views import CustomTokenObtainPairView

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]