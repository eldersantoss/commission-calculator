FROM python:3.11

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /backend

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
