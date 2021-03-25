package com.skill.system.feign;

import java.util.Set;

import com.skill.system.feign.factory.RemoteMenuFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.skill.common.constant.ServiceNameConstants;

/**
 * 菜单 Feign服务层
 * 
 * @author zy
 * @date 2019-05-20
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteMenuService", fallbackFactory = RemoteMenuFallbackFactory.class)
public interface RemoteMenuService {

    @GetMapping("menu/perms/{userId}")
    Set<String> selectPermsByUserId(@PathVariable("userId") Long userId);
}
