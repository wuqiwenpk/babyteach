from django.shortcuts import render

#首页视图
def index(request):
    return render(request, 'babyteach/index.html')

#详情页视图
def detail(request):
    return render(request, 'babyteach/detail.html')

#搜索页视图
def search(request):
    return render(request, 'babyteach/search.html')