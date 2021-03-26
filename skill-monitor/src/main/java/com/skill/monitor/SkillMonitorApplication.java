package com.skill.monitor;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;

/**
 * 监控中心
 * @author swen
 */
@EnableAdminServer
@SpringCloudApplication
public class SkillMonitorApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillMonitorApplication.class, args);
    }
}
