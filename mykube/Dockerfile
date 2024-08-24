FROM python:3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Build the container with another user
# in order to prevent permission errors since
# everytime a file is created by containers,
# it creates them as 'root'
ENV USER=ubuntu

LABEL "com.django.myprosite"="johnpm"

# Create group
RUN groupadd --gid 1000 ${USER}
# Create user (based on the current gid
# of the user on the server ex. id ubuntu)
RUN useradd --uid 1000 --gid 1000 --base-dir /code --home-dir /code ${USER}

# Install/Update Pip
RUN pip install --upgrade pip
RUN pip3 install pipenv

# Execute these commands as root
RUN mkdir /code

WORKDIR /code

# Install dependencies
COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

RUN pipenv install --system --deploy

COPY . /code/

EXPOSE 8000

# Change the ownership to the other user
RUN chown -R ${USER}:${USER} /code

USER ${USER}

# Run with runserver
ENTRYPOINT [ "python", "/code/manage.py", "runserver", "0.0.0.0:8000" ]
# Or with Gunicorn
# CMD gunicorn myprosite.wsgi -w 4 -b 0.0.0.0:8000 --chdir=/code/myprosite --log-level=debug --log-file -
# CMD gunicorn myprosite.wsgi -w 4 -b 0.0.0.0:8000 --chdir=/code/myprosite --log-level=debug --log-file=/code/myprosite/gunicorn.log
