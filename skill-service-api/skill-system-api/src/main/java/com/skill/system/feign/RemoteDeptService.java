package com.skill.system.feign;

import com.skill.system.domain.SysDept;
import com.skill.system.feign.factory.RemoteDeptFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.skill.common.constant.ServiceNameConstants;

/**
 * 用户 Feign服务层
 * 
 * @author zy
 * @date 2019-05-20
 */
@FeignClient(value = ServiceNameConstants.SYSTEM_SERVICE, contextId = "remoteDeptService", fallbackFactory = RemoteDeptFallbackFactory.class)
public interface RemoteDeptService {

    @GetMapping("dept/get/{deptId}")
    SysDept selectSysDeptByDeptId(@PathVariable("deptId") long deptId);
}
