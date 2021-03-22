FROM anapsix/alpine-java:8_server-jre_unlimited

VOLUME /tmp

MAINTAINER shaowen@znzlkj.com

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /ck-study

WORKDIR /ck-study

# 声明需要暴露的端口
EXPOSE 8030
# 配置参数
ENV JAVA_OPTS ""

ADD ./target/ck-study.jar ./

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar ck-study.jar"]
