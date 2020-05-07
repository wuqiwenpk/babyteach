from . import views
from django.urls import path
urlpatterns = [
    path('index', views.index),#首页
    path('', views.index),#首页
    path('detail/<id>', views.detail),#详情页
    path('search', views.search),#搜索页

    #.................................
    path('base/gettoptagslist', views.gettoptagslist),#获取顶部分类列表

              ]