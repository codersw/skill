package com.skill.dfs;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableSkillFeignClients
public class SkillDfsApp {
    public static void main(String[] args) {
        SpringApplication.run(SkillDfsApp.class, args);
    }
}
