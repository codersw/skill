package com.skill.system.feign;

import com.skill.common.constant.ServiceNameConstants;
import com.skill.system.feign.factory.RemoteReciverFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * 通知消息 Feign服务层
 * @author swen
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteReciverService", fallbackFactory = RemoteReciverFallbackFactory.class)
public interface RemoteReciverService {

    @GetMapping("reciver/email/{reciverType}")
    void email(@PathVariable("reciverType") String reciverType);
}
