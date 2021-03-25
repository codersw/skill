package com.skill.system.feign.factory;

import com.skill.system.feign.RemoteReciverService;
import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RemoteReciverFallbackFactory implements FallbackFactory<RemoteReciverService> {

    @Override
    public RemoteReciverService create(Throwable throwable) {
        log.error(throwable.getMessage());
        return reciverType -> {
        };
    }
}
