import logging
from DjangoProject.celery import app

from celery import shared_task

import time

@app.task
def dosomething(a):
    print(a)
    return 0
    # try:
    #     s = a + b
    #     time.sleep(5)
    #     logging.info("%d + %d = %d" % (a,b, s))
    #     return s
    # except:
    #     logging.warning('has error')
    #     return 0

@shared_task
def mul(a,b):
    try:
        s = a * b
        time.sleep(5)
        logging.info("%d * %d = %d" % (a,b, s))
        return s
    except:
        logging.warning('has error')
        return 0


@shared_task
def add_user(name):
   print(name)
   return name

@shared_task
def writetxt(a):
    with open('babyteach/xxx.txt', 'w', encoding='utf-8') as file:
        file.write(a)

