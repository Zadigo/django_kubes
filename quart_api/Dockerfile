FROM python:latest

LABEL "django_kubes"="quart"

ENV PYTHONPATH="/"

WORKDIR /quart_api

RUN pip install --upgrade pip
RUN pip3 install pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install --system --deploy

COPY . .

EXPOSE 5000

# Development
CMD [ "python", "-m", "app" ]
