from django.db import models
import django.utils.timezone as timezone
# Create your models here.

#分类表
class Tags(models.Model):
    name = models.CharField(max_length=100)#分类名

#内容表
class Detail(models.Model):
    title = models.CharField(max_length=100)# 标题
    summary = models.CharField(max_length=100, default="")# 简介
    words = models.TextField()# 正文
    author = models.CharField(max_length=30)#作者或者来源
    link = models.CharField(max_length=200)#来源链接
    addtime = models.DateTimeField(default=timezone.now())#文章添加时间
    tag = models.ForeignKey('Tags', on_delete=models.CASCADE)#关联外键(分类表Tags)
    clicks = models.IntegerField(default=0)#点击
    pic = models.CharField(max_length=200, default="")#封面图
    def __str__(self):
        return self.title


