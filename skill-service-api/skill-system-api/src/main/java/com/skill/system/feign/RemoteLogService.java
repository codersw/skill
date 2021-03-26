package com.skill.system.feign;

import com.skill.system.domain.SysLogininfor;
import com.skill.system.domain.SysOperLog;
import com.skill.system.feign.factory.RemoteLogFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.skill.common.constant.ServiceNameConstants;

/**
 * 日志Feign服务层
 * @author swen
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteLogService", fallbackFactory = RemoteLogFallbackFactory.class)
public interface RemoteLogService {

    @PostMapping("operLog/save")
    void insertOperlog(@RequestBody SysOperLog operLog);

    @PostMapping("logininfor/save")
    void insertLoginlog(@RequestBody SysLogininfor logininfor);
}
