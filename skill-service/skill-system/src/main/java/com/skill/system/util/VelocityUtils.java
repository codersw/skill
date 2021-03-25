package com.skill.system.util;

import com.skill.common.constant.Constants;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.StringWriter;
import java.util.Map;
import java.util.Properties;

/**
 * Velocity模板引擎工具类
 * @author swen
 */
@Component
public class VelocityUtils {

    /**
     * 初始化Velocity方法
     */
    @PostConstruct
    public void initVelocity() {
        Properties p = new Properties();
        try {
            // 加载classpath目录下的vm文件
            p.setProperty("file.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
            // 定义字符集
            p.setProperty(Velocity.ENCODING_DEFAULT, Constants.UTF8);
            p.setProperty(Velocity.OUTPUT_ENCODING, Constants.UTF8);
            // 初始化Velocity引擎，指定配置Properties
            Velocity.init(p);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getTemplate(String template, Map<String, String> context) {
        StringWriter stringWriter = new StringWriter();
        Template tpl = Velocity.getTemplate(template, Constants.UTF8);
        tpl.merge(new VelocityContext(context), stringWriter);
        return stringWriter.toString();
    }
}
