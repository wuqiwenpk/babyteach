from django.db import models

# Create your models here.

#分类表
class Tags(models.Model):
    name = models.CharField(max_length=100)#分类名



