package com.skill.common.exception.file;

/**
 * OSS信息异常类
 * 
 * @author swen
 */
public class OssException extends RuntimeException {
    //
    private static final long serialVersionUID = 2146840966262730160L;

    public OssException(String msg) {
        super(msg);
    }
}