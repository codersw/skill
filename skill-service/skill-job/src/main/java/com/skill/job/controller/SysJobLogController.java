package com.skill.job.controller;

import com.skill.common.auth.annotation.HasPermissions;
import com.skill.common.core.controller.BaseController;
import com.skill.common.core.domain.R;
import com.skill.common.log.annotation.OperLog;
import com.skill.common.log.enums.BusinessType;
import com.skill.job.domain.SysJobLog;
import com.skill.job.service.ISysJobLogService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 调度日志操作处理
 * @author swen
 */
@RestController
@RequestMapping("/log")
public class SysJobLogController extends BaseController {

    @Resource
    private ISysJobLogService jobLogService;

    /**
     * 查询定时任务调度日志列表
     */
    @HasPermissions("system:job:log")
    @GetMapping("/list")
    public R list(SysJobLog sysJobLog) {
        startPage();
        return result(jobLogService.selectJobLogList(sysJobLog));
    }

    /**
     * 根据调度编号获取详细信息
     */
    @HasPermissions("system:job:log")
    @GetMapping(value = "/{configId}")
    public SysJobLog getInfo(@PathVariable Long jobLogId) {
        return jobLogService.selectJobLogById(jobLogId);
    }

    /**
     * 删除定时任务调度日志
     */
    @HasPermissions("system:job:delete")
    @OperLog(title = "调度日志", businessType = BusinessType.DELETE)
    @DeleteMapping("/{jobLogIds}")
    public R remove(@PathVariable Long[] jobLogIds) {
        return toAjax(jobLogService.deleteJobLogByIds(jobLogIds));
    }

    /**
     * 清空定时任务调度日志
     */
    @HasPermissions("system:job:delete")
    @OperLog(title = "调度日志", businessType = BusinessType.CLEAN)
    @DeleteMapping("/clean")
    public R clean() {
        jobLogService.cleanJobLog();
        return R.ok();
    }
}
