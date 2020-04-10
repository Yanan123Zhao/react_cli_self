FROM nginx:1.15.9-alpine
MAINTAINER Yang Yang <yang.yang@healscitech.com>
COPY nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf
# RUN envsubst < /etc/nginx/conf.d/app.conf> /etc/nginx/conf.d/default.conf

COPY dist /www/anaesthesia/dist
COPY index.html /www
RUN cp /etc/apk/repositories /etc/apk/repositories.bak
RUN echo "http://mirrors.aliyun.com/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update
RUN apk add tzdata
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
LABEL version="0.1" \
      description="This image is used to set up nginx sever."