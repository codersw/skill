FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER shaowen@znzlkj.com

ENV TZ=Asia/Shanghai

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /skill-job

WORKDIR /skill-job

# 声明需要暴露的端口
EXPOSE 8007
# 配置参数
ENV JAVA_OPTS ""

ADD ./target/skill-job.jar ./

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar skill-job.jar"]
