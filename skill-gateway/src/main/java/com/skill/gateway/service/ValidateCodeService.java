package com.skill.gateway.service;

import java.io.IOException;
import com.skill.common.core.exception.CaptchaException;
import com.skill.common.core.web.domain.AjaxResult;

/**
 * 验证码处理
 * 
 * @author swen
 */
public interface ValidateCodeService {
    
    /**
     * 生成验证码
     */
    AjaxResult createCapcha() throws IOException, CaptchaException;

    /**
     * 校验验证码
     */
    void checkCapcha(String key, String value) throws CaptchaException;
}
