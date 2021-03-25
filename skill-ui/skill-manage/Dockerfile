FROM nginx:1.17.6
VOLUME /tmp
ENV LANG en_US.UTF-8
COPY dist/ /usr/share/nginx/html/
# 用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown nginx:nginx -R /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
ENTRYPOINT [ "nginx", "-g", "daemon off;"]