package com.skill.generator;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
@MapperScan("com.skill.*.mapper")
@EnableSkillFeignClients
public class SkillGenApp {

    public static void main(String[] args) {
        SpringApplication.run(SkillGenApp.class, args);
    }
}
