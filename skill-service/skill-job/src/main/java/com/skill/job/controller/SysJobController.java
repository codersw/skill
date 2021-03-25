package com.skill.job.controller;


import com.skill.common.auth.annotation.HasPermissions;
import com.skill.common.core.controller.BaseController;
import com.skill.common.core.domain.R;
import com.skill.common.exception.job.TaskException;
import com.skill.common.log.annotation.OperLog;
import com.skill.common.log.enums.BusinessType;
import com.skill.job.domain.SysJob;
import com.skill.job.service.ISysJobService;
import com.skill.job.util.CronUtils;
import org.quartz.SchedulerException;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 调度任务信息操作处理
 * 
 * @author swen
 */
@RestController
@RequestMapping
public class SysJobController extends BaseController {

    @Resource
    private ISysJobService jobService;

    /**
     * 查询定时任务列表
     */
    @HasPermissions("system:job:list")
    @GetMapping("/list")
    public R list(SysJob sysJob) {
        startPage();
        return result(jobService.selectJobList(sysJob));
    }

    /**
     * 获取定时任务详细信息
     */
    @HasPermissions("system:job:view")
    @GetMapping(value = "/{jobId}")
    public SysJob getInfo(@PathVariable("jobId") Long jobId) {
        return jobService.selectJobById(jobId);
    }

    /**
     * 新增定时任务
     */
    @HasPermissions("system:job:add")
    @OperLog(title = "定时任务", businessType = BusinessType.INSERT)
    @PostMapping
    public R add(@RequestBody SysJob sysJob) throws SchedulerException, TaskException {
        if (!CronUtils.isValid(sysJob.getCronExpression())) {
            return R.error("cron表达式不正确");
        }
        sysJob.setCreateBy(getLoginName());
        return toAjax(jobService.insertJob(sysJob));
    }

    /**
     * 修改定时任务
     */
    @HasPermissions("system:job:edit")
    @OperLog(title = "定时任务", businessType = BusinessType.UPDATE)
    @PutMapping
    public R edit(@RequestBody SysJob sysJob) throws SchedulerException, TaskException {
        if (!CronUtils.isValid(sysJob.getCronExpression())) {
            return R.error("cron表达式不正确");
        }
        sysJob.setUpdateBy(getLoginName());
        return toAjax(jobService.updateJob(sysJob));
    }

    /**
     * 定时任务状态修改
     */
    @HasPermissions("system:job:handler")
    @OperLog(title = "定时任务", businessType = BusinessType.UPDATE)
    @PutMapping("/changeStatus")
    public R changeStatus(@RequestBody SysJob job) throws SchedulerException {
        SysJob newJob = jobService.selectJobById(job.getJobId());
        newJob.setStatus(job.getStatus());
        return toAjax(jobService.changeStatus(newJob));
    }

    /**
     * 定时任务立即执行一次
     */
    @HasPermissions("system:job:handler")
    @OperLog(title = "定时任务", businessType = BusinessType.UPDATE)
    @PutMapping("/run")
    public R run(@RequestBody SysJob job) throws SchedulerException {
        jobService.run(job);
        return  R.ok();
    }

    /**
     * 删除定时任务
     */
    @HasPermissions("system:job:delete")
    @OperLog(title = "定时任务", businessType = BusinessType.DELETE)
    @DeleteMapping("/{jobIds}")
    public R remove(@PathVariable Long[] jobIds) throws SchedulerException {
        jobService.deleteJobByIds(jobIds);
        return R.ok();
    }
}
