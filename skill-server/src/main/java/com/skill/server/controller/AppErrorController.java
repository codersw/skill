package com.skill.server.controller;


import com.skill.server.entity.common.Result;
import com.skill.server.entity.common.ResultGenerator;
import com.skill.server.enums.ResultCodeEnum;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;

@RestController
@ApiIgnore
public class AppErrorController implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public Result error(HttpServletResponse response) {
        int status = response.getStatus();
        switch (status) {
            case 401:
                return ResultGenerator.genResult(ResultCodeEnum.UNAUTHORIZED);
            case 404:
                return ResultGenerator.genResult(ResultCodeEnum.NOT_FOUND);
        }
        return ResultGenerator.genFailResult();
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
