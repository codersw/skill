FROM anapsix/alpine-java:8_server-jre_unlimited

VOLUME /tmp

MAINTAINER shaowen@znzlkj.com

USER root

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /skill-dfs

RUN chmod -R 777 /skill-dfs

WORKDIR /skill-dfs

# 声明需要暴露的端口
EXPOSE 8006
# 配置参数
ENV JAVA_OPTS ""

ADD ./target/skill-dfs.jar ./

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar skill-dfs.jar"]
