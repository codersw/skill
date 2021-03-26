package com.skill.system.controller;

import java.util.List;

import com.skill.system.util.SqlInjectionUtil;
import com.skill.system.vo.DictModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skill.common.auth.annotation.HasPermissions;
import com.skill.common.core.controller.BaseController;
import com.skill.common.core.domain.R;
import com.skill.common.log.annotation.OperLog;
import com.skill.common.log.enums.BusinessType;
import com.skill.system.domain.SysDictData;
import com.skill.system.service.ISysDictDataService;

import javax.servlet.http.HttpServletRequest;

/**
 * 字典数据 提供者
 * 
 * @author swen
 * @date 2019-05-20
 */
@Slf4j
@RestController
@RequestMapping("dict/data")
public class SysDictDataController extends BaseController {
	
	@Autowired
	private ISysDictDataService sysDictDataService;
	
	/**
	 * 查询字典数据
	 */
	@GetMapping("get/{dictCode}")
	public SysDictData get(@PathVariable("dictCode") Long dictCode) {
		return sysDictDataService.selectDictDataById(dictCode);
		
	}
	
	/**
	 * 查询字典数据列表
	 */
	@GetMapping("list")
	@HasPermissions("system:dict:list")
	public R list(SysDictData sysDictData) {
		startPage();
        return result(sysDictDataService.selectDictDataList(sysDictData));
	}
	
	/**
     * 根据字典类型查询字典数据信息
     * 
     * @param dictType 字典类型
     * @return 参数键值
     */
	@GetMapping("type")
    public List<SysDictData> getType(String dictType) {
        return sysDictDataService.selectDictDataByType(dictType);
    }

    /**
     * 根据字典类型和字典键值查询字典数据信息
     * 
     * @param dictType 字典类型
     * @param dictValue 字典键值
     * @return 字典标签
     */
	@GetMapping("label")
    public String getLabel(String dictType, String dictValue) {
        return sysDictDataService.selectDictLabel(dictType, dictValue);
    }
	
	
	/**
	 * 新增保存字典数据
	 */
	@OperLog(title = "字典数据", businessType = BusinessType.INSERT)
    @HasPermissions("system:dict:add")
	@PostMapping("save")
	public R addSave(@RequestBody SysDictData sysDictData) {
		return toAjax(sysDictDataService.insertDictData(sysDictData));
	}

	/**
	 * 修改保存字典数据
	 */
	@OperLog(title = "字典数据", businessType = BusinessType.UPDATE)
    @HasPermissions("system:dict:edit")
	@PostMapping("update")
	public R editSave(@RequestBody SysDictData sysDictData) {
		return toAjax(sysDictDataService.updateDictData(sysDictData));
	}
	
	/**
	 * 删除字典数据
	 */
	@OperLog(title = "字典数据", businessType = BusinessType.DELETE)
    @HasPermissions("system:dict:remove")
	@PostMapping("remove")
	public R remove(String ids) {
		return toAjax(sysDictDataService.deleteDictDataByIds(ids));
	}


	/**
	 * 获取字典数据
	 * @param dictCode 字典code
	 * @param dictCode 表名,文本字段,code字段  | 举例：sys_user,realname,id
	 * @return
	 */
	@RequestMapping(value = "/getDictItems/{dictCode}", method = RequestMethod.GET)
	public R  getDictItems(@PathVariable String dictCode, @RequestParam(value = "sign",required = false) String sign, HttpServletRequest request) {
		log.info(" dictCode : "+ dictCode);
		List<DictModel> ls = null;
		try {
			if(dictCode.indexOf(",")!=-1) {
				//关联表字典（举例：sys_user,realname,id）
				String[] params = dictCode.split(",");

				if(params.length<3) {
					return  R.error("字典Code格式不正确！");
				}
				//SQL注入校验（只限制非法串改数据库）
				final String[] sqlInjCheck = {params[0],params[1],params[2]};
				SqlInjectionUtil.filterContent(sqlInjCheck);

				if(params.length==4) {
					//SQL注入校验（查询条件SQL 特殊check，此方法仅供此处使用）
					SqlInjectionUtil.specialFilterContent(params[3]);
					ls = sysDictDataService.queryTableDictItemsByCodeAndFilter(params[0],params[1],params[2],params[3]);
				}else if (params.length==3) {
					ls = sysDictDataService.queryTableDictItemsByCode(params[0],params[1],params[2]);
				}else{
					return R.error("字典Code格式不正确！");
				}
			}else {
				//字典表
				ls = sysDictDataService.queryDictItemsByCode(dictCode);
			}

		} catch (Exception e) {
			log.error(e.getMessage(),e);
			return R.error("操作失败");
		}

		return R.data(ls);
	}


}
