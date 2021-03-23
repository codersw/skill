package com.skill.system.api.factory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import com.skill.common.core.domain.R;
import com.skill.system.api.RemoteUserService;
import com.skill.system.api.model.LoginUser;
import feign.hystrix.FallbackFactory;

/**
 * 用户服务降级处理
 * 
 * @author swen
 */
@Component
public class RemoteUserFallbackFactory implements FallbackFactory<RemoteUserService>{
    private static final Logger log = LoggerFactory.getLogger(RemoteUserFallbackFactory.class);

    @Override
    public RemoteUserService create(Throwable throwable){
        log.error("用户服务调用失败:{}", throwable.getMessage());
        return new RemoteUserService(){
            @Override
            public R<LoginUser> getUserInfo(String username){
                return R.fail("获取用户失败:" + throwable.getMessage());
            }
        };
    }
}
