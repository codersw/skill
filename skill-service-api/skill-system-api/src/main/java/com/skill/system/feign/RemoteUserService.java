package com.skill.system.feign;

import java.util.Set;

import com.skill.system.feign.factory.RemoteUserFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.skill.common.constant.ServiceNameConstants;
import com.skill.common.core.domain.R;
import com.skill.system.domain.SysUser;

/**
 * 用户 Feign服务层
 * @author swen
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteUserService", fallbackFactory = RemoteUserFallbackFactory.class)
public interface RemoteUserService {

    @GetMapping("user/get/{userId}")
    SysUser selectSysUserByUserId(@PathVariable("userId") long userId);

    @GetMapping("user/find/{username}")
    SysUser selectSysUserByUsername(@PathVariable("username") String username);

    @PostMapping("user/update/login")
    R updateUserLoginRecord(@RequestBody SysUser user);


    @GetMapping("user/hasRoles")
    Set<Long> selectUserIdsHasRoles(@RequestParam("roleIds") String roleIds);

    @GetMapping("user/inDepts")
    Set<Long> selectUserIdsInDepts(@RequestParam("deptIds") String deptIds);

    @PostMapping("user/save")
     R addSysUser(@RequestBody SysUser sysUser);
}
