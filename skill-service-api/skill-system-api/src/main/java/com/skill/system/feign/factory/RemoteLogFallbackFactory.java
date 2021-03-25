package com.skill.system.feign.factory;

import com.skill.system.domain.SysLogininfor;
import com.skill.system.domain.SysOperLog;
import org.springframework.stereotype.Component;

import com.skill.system.feign.RemoteLogService;

import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RemoteLogFallbackFactory implements FallbackFactory<RemoteLogService> {
    @Override
    public RemoteLogService create(Throwable throwable) {
        log.error(throwable.getMessage());
        return new RemoteLogService() {
            @Override
            public void insertOperlog(SysOperLog operLog) {
            }
            @Override
            public void insertLoginlog(SysLogininfor logininfor) {
            }
        };
    }
}
