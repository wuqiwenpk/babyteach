from django.shortcuts import render
from .models import Tags
#首页视图
def index(request):
    tagslist = Tags.objects.all()
    return render(request, 'babyteach/index.html',{'tagslist':tagslist})

#详情页视图
def detail(request):
    return render(request, 'babyteach/detail.html')

#搜索页视图
def search(request):
    return render(request, 'babyteach/search.html')