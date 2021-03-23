package com.skill.common.log.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import com.skill.system.api.RemoteLogService;
import com.skill.system.api.domain.SysOperLog;

/**
 * 异步调用日志服务
 * 
 * @author swen
 */
@Service
public class AsyncLogService {

    @Autowired
    private RemoteLogService remoteLogService;

    /**
     * 保存系统日志记录
     */
    @Async
    public void saveSysLog(SysOperLog sysOperLog){
        remoteLogService.saveLog(sysOperLog);
    }
}
