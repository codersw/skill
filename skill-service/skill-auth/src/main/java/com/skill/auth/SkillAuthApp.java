package com.skill.auth;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * 授权服务
 * @author swen
 */
@EnableDiscoveryClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableSkillFeignClients
public class SkillAuthApp {

    public static void main(String[] args) {
        SpringApplication.run(SkillAuthApp.class, args);
    }
}