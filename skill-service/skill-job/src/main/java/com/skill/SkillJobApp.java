package com.skill;

import com.skill.system.annotation.EnableSkillFeignClients;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * 定时任务项目
 * 
 * @author swen
 */
@EnableSkillFeignClients
@SpringBootApplication
@EnableDiscoveryClient
@MapperScan("com.skill.*.mapper")
public class SkillJobApp {
    public static void main(String[] args) {
        SpringApplication.run(SkillJobApp.class, args);
    }
}
