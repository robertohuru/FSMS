FROM nginx:1.21.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

ENV HOME=/var/
ENV APP_HOME=/var/www/html
WORKDIR $APP_HOME


# copy project
COPY . $APP_HOME