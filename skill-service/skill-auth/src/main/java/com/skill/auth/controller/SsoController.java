package com.skill.auth.controller;

import com.skill.auth.service.SsoService;
import com.skill.common.core.domain.R;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * sso认证登陆
 * @author swen
 */
@RestController
@RequestMapping("/sso")
public class SsoController {

    @Resource
    private SsoService ssoService;

    @GetMapping("/config")
    public R config() {
        return R.data(ssoService.config());
    }

    @GetMapping("/token")
    public R token(@RequestParam String code) {
        return R.ok(ssoService.token(code));
    }

    @GetMapping("/user")
    public R user(@RequestParam String token) {
        return R.ok(ssoService.user(token));
    }

    @GetMapping("/login")
    public R login(@RequestParam String code, @RequestParam String state) {
        return R.ok(ssoService.login(code, state));
    }
}
