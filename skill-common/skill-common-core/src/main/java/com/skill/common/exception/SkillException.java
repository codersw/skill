package com.skill.common.exception;

/**
 * skill异常类
 * @author swen
 */
public class SkillException extends RuntimeException {
    //
    private static final long serialVersionUID = 3640068073161175965L;

    private String            msg;

    private int               code             = 500;

    public SkillException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public SkillException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public SkillException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public SkillException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}