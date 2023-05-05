import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_work.settings")
app = Celery("my_work")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'deleter bets with a null gamer link': {
        'task': 'apps.games.task.null_wins',
        'schedule': crontab(),
    },
    'initialization game': {
        'task': 'apps.games.task.initg',
        'schedule': crontab(),
    },
}
