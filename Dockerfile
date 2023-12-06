FROM nginx:stable-alpine

ENV S3_BUCKET=''
ENV S3_ACCESS_KEY=''
ENV S3_SECRET_ACCESS_KEY=''

RUN mkdir -p /etc/nginx/js

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/js /etc/nginx/js
COPY nginx/templates /etc/nginx/templates
