from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from .models import Tags, Detail
#首页视图
def index(request):
    tagslist = Tags.objects.all()
    top20list = Detail.objects.order_by('-id').values('id', 'title', 'summary', 'tag__name')[0:15]#左边资讯
    hot2list = Detail.objects.order_by('-clicks').values('id', 'title', 'summary', 'pic')[0:2]#2条热点资讯

    #读取6个分类以及对应的9条资讯
    taglist01 = Detail.objects.order_by('-id').filter(tag=1).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]
    taglist02 = Detail.objects.order_by('-id').filter(tag=2).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]
    taglist03 = Detail.objects.order_by('-id').filter(tag=3).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]
    taglist04 = Detail.objects.order_by('-id').filter(tag=4).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]
    taglist05 = Detail.objects.order_by('-id').filter(tag=5).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]
    taglist06 = Detail.objects.order_by('-id').filter(tag=6).values('id', 'title', 'summary', 'tag__name', 'pic')[0:9]

    contents ={
        'tagslist': tagslist,
        'top20list': top20list,
        'hot2list': hot2list,
        'taglist01': taglist01,
        'taglist02': taglist02,
        'taglist03': taglist03,
        'taglist04': taglist04,
        'taglist05': taglist05,
        'taglist06': taglist06,
    }

    return render(request, 'babyteach/index.html', contents)

#详情页视图
def detail(request,id):
    d = Detail.objects.get(id=id)
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
        list =qry.all()
    #分页
    paginator = Paginator(list, pagesize)#使用Django的分页器 Paginator
    page = paginator.page(pageindex)

    return render(request, 'babyteach/search.html', {'list': page, 'keyword': keyword})



#获取顶部分类
def gettoptagslist(request):
    tagslist = Tags.objects.all().values()
    return JsonResponse({'tagslist': list(tagslist)})

#获取列表页和详情页热点资讯排名
def gethottagslist(request):
    hotlist = Detail.objects.order_by('-clicks')[0:10].values('id', 'title')
    print(hotlist)
    return JsonResponse({'hotlist': list(hotlist)})


