package com.skill.auth.controller;

import com.anji.captcha.model.common.ResponseModel;
import com.anji.captcha.service.CaptchaService;
import com.skill.auth.form.LoginForm;
import com.skill.auth.service.AccessTokenService;
import com.skill.auth.service.SysLoginService;
import com.skill.common.core.domain.R;
import com.skill.system.domain.SysUser;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class TokenController {

    @Resource
    private AccessTokenService tokenService;

    @Resource
    private SysLoginService sysLoginService;

    @Resource
    private CaptchaService captchaService;

    @PostMapping("login")
    public R login(@RequestBody LoginForm form) {
        // 用户登录
        SysUser user = sysLoginService.login(form.getUsername(), form.getPassword());
        // 获取登录token
        return R.ok(tokenService.createToken(user));
    }

    @PostMapping("login/slide")
    public R loginSilde(@RequestBody LoginForm form) {
        ResponseModel response = captchaService.verification(form.getCaptchaVO());
        if (response.isSuccess()) {
            // 用户登录
            SysUser user = sysLoginService.login(form.getUsername(), form.getPassword());
            // 获取登录token
            return R.ok(tokenService.createToken(user));
        }
        return R.error().put("repCode", response.getRepCode());
    }

    @PostMapping("logout")
    public R logout(HttpServletRequest request) {
        String token = request.getHeader("token");
        SysUser user = tokenService.queryByToken(token);
        if (null != user) {
            sysLoginService.logout(user.getLoginName());
            tokenService.expireToken(user.getUserId());
        }
        return R.ok();
    }
}
