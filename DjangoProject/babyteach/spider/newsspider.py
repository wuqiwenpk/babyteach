import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DjangoProject.settings")# project_name 项目名称
django.setup()
import re
import datetime
from babyteach.models import Detail, Tags
import requests
from lxml import etree
#目标列表页：http://www.yuerzaixian.com/a/1171.aspx?p-1
#目标详情页（例）：http://www.yuerzaixian.com/html/news/hangye/25320.html

#爬取详情页数据保存到表Detail中
def getdetailbyspider(url):
    response = requests.get(url).text
    response=response.encode("latin1").decode("UTF-8")#编码转码
    # print(response)
    x = etree.HTML(response)
    x = x.xpath('//div[(@class="content")]')
    for item in x:
        title = item.xpath('div[@class="title"]/text()')[0] #标题
        addtime = item.xpath('div[@class="info"]/span[@class="date"]/text()')[0] #时间
        orgwords = item.xpath('div[@class="intro"]') #正文
        words = etree.tostring(orgwords[0], encoding="utf-8", pretty_print=True).decode("utf-8")
        pic = "/static/babyteach/img/nophoto.gif" #默认封面图
        if len(item.xpath('div[@class="intro"]//img/@src'))!=0:
            orgpic = item.xpath('div[@class="intro"]//img/@src')[0]
            if "http" not in orgpic:
                pic = 'http://www.yuerzaixian.com/' + item.xpath('div[@class="intro"]//img/@src')[0]  # 正文存在图片时保持第一张图片作为封面图
            else:
                pic = item.xpath('div[@class="intro"]//img/@src')[0]


    words = words.replace('src="/UploadFiles','src="http://www.yuerzaixian.com/UploadFiles')#处理正文中未添加域名的图片url
    pattern = re.compile(r'<[^>]+>', re.S)
    summary = pattern.sub('', words).strip()[0:60]#截取正文前面文字作为简介
    # print('标题:', title)
    # print('时间:', addtime)
    # print('封面图', pic)
    # print('简介:', summary)
    # print('正文:', words)

    #插入到Detail数据库中
    detail = Detail()
    detail.title = title
    detail.summary = summary
    detail.addtime = datetime.datetime.strptime(addtime, "%Y年%m月%d日")
    detail.author = '育儿在线网'
    detail.words = words
    detail.clicks = 0
    detail.pic = pic
    detail.link = url
    detail.tag = Tags.objects.get(id=5) #育儿资讯
    detail.save()




#爬取列表页数据
def getnewslistbyspider(url):
    response = requests.get(url).text
    #print(response)
    x = etree.HTML(response)
    x = x.xpath('//div[(@class="news_list leftbox fl whitebg")]/ul/li')
    for item in x:
        url = item.xpath('a/@href')[0] #获取当前列表页模块中的所有文章链接
        url = "http://www.yuerzaixian.com"+url #拼接成完整url
        print(url)
        #调用方法爬详情页
        getdetailbyspider(url)





# #获取列表页数据
# getnewslistbyspider("http://www.yuerzaixian.com/a/1171.aspx?p-1")

#爬取前10个列表页
for i in range(1, 11):
    url = "http://www.yuerzaixian.com/a/1171.aspx?p-"+str(i)
    print(url)
    getnewslistbyspider(url)








# getnewslistbyspider("http://www.yuerzaixian.com/a/1171.aspx?p-1")




#运行函数获取详情页数据
# getdetailbyspider("http://www.yuerzaixian.com/html/news/hangye/25320.html")
