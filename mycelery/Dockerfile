FROM python:3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

LABEL "django_kubes"="site_2"

RUN pip install --upgrade pip
RUN pip3 install pipenv

WORKDIR /code

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install --system --deploy

COPY . .

EXPOSE 8000
