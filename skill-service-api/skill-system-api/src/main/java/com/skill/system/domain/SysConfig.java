package com.skill.system.domain;

import com.skill.common.annotation.Excel;
import com.skill.common.core.domain.BaseEntity;
import lombok.*;

/**
 * 参数配置表 sys_config
 * 
 * @author swen
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SysConfig extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /** 参数主键 */
    @Excel(name = "参数主键")
    private Long configId;

    /** 参数名称 */
    @Excel(name = "参数名称")
    private String configName;

    /** 参数键名 */
    @Excel(name = "参数键名")
    private String configKey;

    /** 参数键值 */
    @Excel(name = "参数键值")
    private String configValue;

    /** 系统内置（Y是 N否） */
    @Excel(name = "系统内置", readConverterExp = "Y=是,N=否")
    private String configType;
}
