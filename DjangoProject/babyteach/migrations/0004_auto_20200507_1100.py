# Generated by Django 3.0.2 on 2020-05-07 03:00

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('babyteach', '0003_auto_20200506_1357'),
    ]

    operations = [
        migrations.AddField(
            model_name='detail',
            name='clicks',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='detail',
            name='addtime',
            field=models.DateTimeField(default=datetime.datetime(2020, 5, 7, 3, 0, 48, 205161, tzinfo=utc)),
        ),
    ]
