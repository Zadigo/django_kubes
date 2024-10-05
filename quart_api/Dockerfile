FROM python:latest

LABEL "com.kubes.app"="quart"

ENV PYTHONPATH="/"

WORKDIR /quart_api

RUN pip install --upgrade pip
RUN pip3 install pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install --system --deploy

COPY . .

EXPOSE 5000

CMD [ "python", "-m", "app" ]
