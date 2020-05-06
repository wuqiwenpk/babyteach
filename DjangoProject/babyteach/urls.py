from . import views
from django.urls import path
urlpatterns = [
    path('index', views.index),#首页
    path('detail/<id>', views.detail),#详情页
    path('search', views.search),#搜索页
              ]