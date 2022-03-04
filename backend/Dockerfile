FROM python:3.9
ENV PYTHONUNBUFFERED=1

# create the app user
RUN groupadd -g 1000 app && useradd -g app -s /bin/sh app

ENV HOME=/home/
ENV APP_HOME=/home/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME


# install packages

COPY ./requirements.txt $APP_HOME
RUN pip install -r requirements.txt


# copy project
COPY . $APP_HOME



# chown all the files to the app user
RUN chown -R app:app $APP_HOME/*

# change to the app user
USER app


