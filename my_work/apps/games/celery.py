import logging
import os
from asyncio import sleep

from celery import Celery, shared_task

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_work.settings")
app = Celery("my_work")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

