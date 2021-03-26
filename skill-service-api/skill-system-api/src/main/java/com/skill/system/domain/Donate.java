package com.skill.system.domain;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import tk.mybatis.mapper.annotation.KeySql;

/**
 *
 * @author 捐赠
 */
@Data
@Accessors(chain = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Donate {

    @Id
    @KeySql(useGeneratedKeys = true)
    private Integer id;

    private String  nick;

    private Double  amount;

    private Integer canal;

    private String  remark;

    /** 创建时间 */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date createTime;

    @Transient
    private String beginTime;

    @Transient
    private String endTime;
}
