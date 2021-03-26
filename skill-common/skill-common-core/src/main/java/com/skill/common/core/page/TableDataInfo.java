package com.skill.common.core.page;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * 表格分页数据对象
 * 
 * @author swen
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TableDataInfo implements Serializable {

    private static final long serialVersionUID = 1L;
    /** 总记录数 */
    private long total;
    /** 列表数据 */
    private List<?> rows;
    /** 消息状态码 */
    private int code;


}
