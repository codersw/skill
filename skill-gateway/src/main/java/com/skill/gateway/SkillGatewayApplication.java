package com.skill.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;

/**
 * 网关启动程序
 * 
 * @author swen
 */
@SpringCloudApplication
public class SkillGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillGatewayApplication.class, args);
    }
}
