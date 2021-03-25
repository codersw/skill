package com.skill.system.feign.factory;

import com.skill.system.feign.RemoteMenuService;
import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RemoteMenuFallbackFactory implements FallbackFactory<RemoteMenuService> {

    @Override
    public RemoteMenuService create(Throwable throwable) {
        log.error(throwable.getMessage());
        return userId -> null;
    }
}
