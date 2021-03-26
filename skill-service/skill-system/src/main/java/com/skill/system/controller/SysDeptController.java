package com.skill.system.controller;

import java.util.Set;

import com.skill.common.constant.UserConstants;
import com.skill.common.log.annotation.OperLog;
import com.skill.common.log.enums.BusinessType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skill.common.core.controller.BaseController;
import com.skill.common.core.domain.R;
import com.skill.system.domain.SysDept;
import com.skill.system.service.ISysDeptService;

/**
 * 部门 提供者
 * 
 * @author swen
 * @date 2019-05-20
 */
@RestController
@RequestMapping("dept")
public class SysDeptController extends BaseController {
    @Autowired
    private ISysDeptService sysDeptService;

    /**
     * 查询部门
     */
    @GetMapping("get/{deptId}")
    public SysDept get(@PathVariable("deptId") Long deptId) {
        return sysDeptService.selectDeptById(deptId);
    }

    /**
     * 查询部门列表
     */
    @GetMapping("list")
    public R list(SysDept sysDept) {
        startPage();
        return result(sysDeptService.selectDeptList(sysDept));
    }

    /**
     * 查询所有可用部门
     */
    @GetMapping("list/enable")
    public R listEnable(SysDept sysDept) {
        sysDept.setStatus("0");
        return result(sysDeptService.selectDeptList(sysDept));
    }

    /**
     * 新增保存部门
     */
    @PostMapping("save")
    @OperLog(title = "部门管理", businessType = BusinessType.INSERT)
    public R addSave(@RequestBody SysDept sysDept) {
        if(UserConstants.DEPT_NAME_NOT_UNIQUE.equals(sysDeptService.checkDeptNameUnique(sysDept))){
            return R.error("新增部门"+sysDept.getDeptName()+"失败，部门已存在");
        }
        return toAjax(sysDeptService.insertDept(sysDept));
    }

    /**
     * 修改保存部门
     */
    @PostMapping("update")
    @OperLog(title = "部门管理", businessType = BusinessType.UPDATE)
    public R editSave(@RequestBody SysDept sysDept) {
        if(UserConstants.DEPT_NAME_NOT_UNIQUE.equals(sysDeptService.checkDeptNameUnique(sysDept))){
            return R.error("新增部门"+sysDept.getDeptName()+"失败，部门已存在");
        }
        return toAjax(sysDeptService.updateDept(sysDept));
    }

    /**
     * 删除部门
     */
    @PostMapping("remove/{deptId}")
    @OperLog(title = "部门管理", businessType = BusinessType.DELETE)
    public R remove(@PathVariable("deptId") Long deptId) {
        return toAjax(sysDeptService.deleteDeptById(deptId));
    }

    /**
     * 加载角色部门（数据权限）列表树
     */
    @GetMapping("/role/{roleId}")
    @OperLog(title = "部门管理", businessType = BusinessType.GRANT)
    public Set<String> deptTreeData(@PathVariable("roleId") Long roleId) {
        if (null == roleId || roleId <= 0) return null;
        return sysDeptService.roleDeptIds(roleId);
    }
}
