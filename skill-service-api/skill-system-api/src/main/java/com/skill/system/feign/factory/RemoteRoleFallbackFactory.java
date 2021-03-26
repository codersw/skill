package com.skill.system.feign.factory;

import org.springframework.stereotype.Component;

import com.skill.system.domain.SysRole;
import com.skill.system.feign.RemoteRoleService;

import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RemoteRoleFallbackFactory implements FallbackFactory<RemoteRoleService> {

    @Override
    public RemoteRoleService create(Throwable throwable) {
        log.error(throwable.getMessage());
        return roleId -> null;
    }
}
