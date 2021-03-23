package com.skill.common.core.exception.file;

import com.skill.common.core.exception.BaseException;

/**
 * 文件信息异常类
 * 
 * @author swen
 */
public class FileException extends BaseException {

    private static final long serialVersionUID = 1L;

    public FileException(String code, Object[] args){
        super("file", code, args, null);
    }

}
