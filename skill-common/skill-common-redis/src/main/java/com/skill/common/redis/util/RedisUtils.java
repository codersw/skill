package com.skill.common.redis.util;

import java.util.concurrent.Timeskill;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;

/**
 * Redis工具类
 */
@Component
public class RedisUtils
{
    @Autowired
    private RedisTemplate<String, Object>   redisTemplate;

    @Resource(name = "stringRedisTemplate")
    private ValueOperations<String, String> valueOperations;

    /**  默认过期时长，单位：秒 */
    public final static long                DEFAULT_EXPIRE = 60 * 60 * 24;

    /**  不设置过期时长 */
    public final static long                NOT_EXPIRE     = -1;

    /**
     * 插入缓存默认时间
     * @param key 键
     * @param value 值
     * @author zy
     */
    public void set(String key, Object value)
    {
        set(key, value, DEFAULT_EXPIRE);
    }

    /**
     * 插入缓存
     * @param key 键
     * @param value 值
     * @param expire 过期时间(s)
     * @author zy
     */
    public void set(String key, Object value, long expire)
    {
        valueOperations.set(key, toJson(value));
        redisTemplate.expire(key, expire, Timeskill.SECONDS);
    }

    /**
     * 返回字符串结果
     * @param key 键
     * @return
     * @author zy
     */
    public String get(String key)
    {
        return valueOperations.get(key);
    }

    /**
     * 返回指定类型结果
     * @param key 键
     * @param clazz 类型class
     * @return
     * @author zy
     */
    public <T> T get(String key, Class<T> clazz)
    {
        String value = valueOperations.get(key);
        return value == null ? null : fromJson(value, clazz);
    }

    /**
     * 删除缓存
     * @param key 键
     * @author zy
     */
    public void delete(String key)
    {
        redisTemplate.delete(key);
    }

    /**
     * Object转成JSON数据
     */
    private String toJson(Object object)
    {
        if (object instanceof Integer || object instanceof Long || object instanceof Float || object instanceof Double
                || object instanceof Boolean || object instanceof String)
        {
            return String.valueOf(object);
        }
        return JSON.toJSONString(object);
    }

    /**
     * JSON数据，转成Object
     */
    private <T> T fromJson(String json, Class<T> clazz)
    {
        return JSON.parseObject(json, clazz);
    }
}