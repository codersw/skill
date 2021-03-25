package com.skill;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * 启动程序
 * 
 * @author zy
 */
@EnableDiscoveryClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableSkillFeignClients
public class SkillAuthApp {
    public static void main(String[] args) {
        SpringApplication.run(SkillAuthApp.class, args);
    }
}