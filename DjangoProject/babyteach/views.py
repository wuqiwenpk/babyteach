from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from .models import Tags, Detail
#首页视图
def index(request):
    tagslist = Tags.objects.all()
    return render(request, 'babyteach/index.html', {'tagslist':tagslist})

#详情页视图
def detail(request,id):
    d = Detail.objects.get(id=id)
    print(d)
    return render(request, 'babyteach/detail.html', {'detail': d})




#搜索页视图
def search(request):
    qry = Detail.objects
    keyword = request.GET.get('keyword')#接收url搜索词关键字
    pageindex = request.GET.get('p')#接收url页码
    pagesize = 2 #自定义页容量
    if keyword!='' and keyword is not None:
        print(keyword)
        list = qry.filter(title__contains=keyword)
    else:
        list = qry
    #分页
    paginator = Paginator(list, pagesize)#使用Django的分页器 Paginator
    page = paginator.page(pageindex)
    print(page)
    return render(request, 'babyteach/search.html', {'list': page, 'keyword': keyword})



#获取顶部分类
def gettoptagslist(request):
    tagslist = Tags.objects.all().values()
    return JsonResponse({'tagslist': list(tagslist)})
