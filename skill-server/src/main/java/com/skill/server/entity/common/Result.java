package com.skill.server.entity.common;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 统一返回类
 * @author swen
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ApiModel
public class Result<T> implements Serializable {

    @ApiModelProperty(value = "状态")
    private Integer code;

    @ApiModelProperty(value = "消息")
    private String message;

    @ApiModelProperty(value = "内容")
    private T data;

    @ApiModelProperty(value = "请求唯一id")
    private String requestId;
}
