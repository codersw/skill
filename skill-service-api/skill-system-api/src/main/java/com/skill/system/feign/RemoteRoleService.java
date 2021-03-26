package com.skill.system.feign;

import com.skill.system.feign.factory.RemoteRoleFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.skill.common.constant.ServiceNameConstants;
import com.skill.system.domain.SysRole;

/**
 * 角色 Feign服务层
 * @author swen
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteRoleService", fallbackFactory = RemoteRoleFallbackFactory.class)
public interface RemoteRoleService {

    @GetMapping("role/get/{roleId}")
    SysRole selectSysRoleByRoleId(@PathVariable("roleId") long roleId);
}
