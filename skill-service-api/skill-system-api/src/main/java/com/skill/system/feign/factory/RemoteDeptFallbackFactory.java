package com.skill.system.feign.factory;

import com.skill.system.domain.SysDept;
import org.springframework.stereotype.Component;

import com.skill.system.feign.RemoteDeptService;

import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RemoteDeptFallbackFactory implements FallbackFactory<RemoteDeptService> {/* (non-Javadoc)
  * @see feign.hystrix.FallbackFactory#create(java.lang.Throwable)
  */
    @Override
    public RemoteDeptService create(Throwable throwable) {
        log.error(throwable.getMessage());
        return deptId -> null;
    }
}
