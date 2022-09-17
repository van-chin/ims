# syntax=docker/dockerfile:labs
ARG PHP_VERSION=8.2.0beta3

ARG TARGETPLATFORM=linux/amd64

FROM --platform=$TARGETPLATFORM nginx:latest

LABEL maintainer="inlins/lnmp-nginx <van.chin@qq.com>"

RUN echo '<h1>Hello ,Docker v1 Dockerfile !</h1>' > /usr/share/nginx/html/index.html
