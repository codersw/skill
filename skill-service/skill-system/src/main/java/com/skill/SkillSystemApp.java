package com.skill;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * 启动程序
 * @author zy
 */
@EnableDiscoveryClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableSkillFeignClients
@MapperScan("com.skill.*.mapper")
public class SkillSystemApp {
    public static void main(String[] args) {
        SpringApplication.run(SkillSystemApp.class, args);
    }
}