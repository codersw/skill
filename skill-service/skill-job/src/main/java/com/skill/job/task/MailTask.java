package com.skill.job.task;

import com.skill.system.feign.RemoteReciverService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 发送邮件定时任务调度
 * @author swen
 */
@Component("mailTask")
public class MailTask {

    @Resource
    private RemoteReciverService remoteReciverService;

    /**
     * 执行定时任务方法
     * @param reciverType
     */
    public void run(String reciverType) {
        System.out.println("接收到参参数：" + reciverType);
        remoteReciverService.email(reciverType);
    }
}
