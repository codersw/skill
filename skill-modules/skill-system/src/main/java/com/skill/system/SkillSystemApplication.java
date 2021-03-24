package com.skill.system;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import com.skill.common.security.annotation.EnableCustomConfig;
import com.skill.common.security.annotation.EnableSkillFeignClients;
import com.skill.common.swagger.annotation.EnableCustomSwagger2;

/**
 * 系统模块
 * 
 * @author swen
 */
@EnableCustomConfig
@EnableCustomSwagger2
@EnableSkillFeignClients
@SpringCloudApplication
public class SkillSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillSystemApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ  系统模块启动成功   ლ(´ڡ`ლ)ﾞ  \n" +
                " .-------.       ____     __        \n" +
                " |  _ _   \\      \\   \\   /  /    \n" +
                " | ( ' )  |       \\  _. /  '       \n" +
                " |(_ o _) /        _( )_ .'         \n" +
                " | (_,_).' __  ___(_ o _)'          \n" +
                " |  |\\ \\  |  ||   |(_,_)'         \n" +
                " |  | \\ `'   /|   `-'  /           \n" +
                " |  |  \\    /  \\      /           \n" +
                " ''-'   `'-'    `-..-'              ");
    }
}