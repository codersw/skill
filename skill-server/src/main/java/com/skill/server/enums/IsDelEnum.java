package com.skill.server.enums;

import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 是否删除枚举
 * @author swen
 */
@Getter
public enum IsDelEnum {

    FALSE("0","未删除"),
    TRUE("1","已删除");

    private String value;
    private String name;

    IsDelEnum(String value, String name){
        this.value = value;
        this.name = name;
    }

    private static List<Map<String, String>> list;

    private static Map<String, String> map;

    public static List<Map<String, String>> toList() {
        if (list == null) {
            IsDelEnum[] ary = IsDelEnum.values();
            List<Map<String, String>> listTmp = new ArrayList<>();
            for (IsDelEnum isDelEnum : ary) {
                Map<String, String> map = new HashMap<>();
                map.put("value", isDelEnum.getValue());
                map.put("name", isDelEnum.getName());
                listTmp.add(map);
            }
            list = listTmp;
        }
        return list;
    }

    public static Map<String, String> toMap() {
        if (map == null) {
            IsDelEnum[] ary = IsDelEnum.values();
            Map<String, String> enumMap = new HashMap<>();
            for (IsDelEnum isDelEnum : ary) {
                enumMap.put(isDelEnum.getValue(), isDelEnum.getName());
            }
            map = enumMap;
        }
        return map;
    }

    public static String getNameByValue(String value) {
        return toMap().get(value);
    }
}
