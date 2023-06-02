#!/bin/bash

set -e

PROCESS_TYPE=$1

if [ "$PROCESS_TYPE" = "backend" ]; then
  python manage.py makemigrations
  python manage.py migrate
  python manage.py createsuperuser_if_none_exists \
    --username=$ADMIN_USERNAME \
    --password=$ADMIN_PASSWORD \
    --email=$ADMIN_EMAIL

  if [ "$DEBUG" = "True" ]; then
    python manage.py runserver 0.0.0.0:8000

  else
    python manage.py collectstatic --noinput
    gunicorn \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --worker-class gevent \
    --log-level DEBUG \
    --access-logfile "-" \
    --error-logfile "-" \
    falatu.wsgi
  fi

fi
