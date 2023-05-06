# sports-betting_course-project
This is project I make on basis of subject web programming in vstu.

Запуск планировщиков на бэке:
сначала запускается сервер планировщика на linux
Планировщик redis: redis-server команда
python -m celery -A apps.games worker --loglevel=info -P eventlet
python -m celery -A apps.games beat -l info -P eventlet

Запуск бэка в my_work
python manage.py runserver
Если нет бд
python manage.py makemigrations
python manage.py migrate

Запуск фронта в src_front
npm start