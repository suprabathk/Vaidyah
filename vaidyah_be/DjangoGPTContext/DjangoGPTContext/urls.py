from django.contrib import admin
from django.urls import path
from DjangoGPTContext import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/askQuery/', views.askQuery)
]
