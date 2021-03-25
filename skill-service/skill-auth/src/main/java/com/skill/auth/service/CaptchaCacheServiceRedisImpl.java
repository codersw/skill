package com.skill.auth.service;

import com.anji.captcha.service.CaptchaCacheService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.Timeskill;

/**
 * <p>File：CaptchaCacheServiceRedisImpl.java</p>
 * <p>Title: 使用redis缓存</p>
 * <p>Description:对于分布式部署的应用，我们建议应用自己实现CaptchaCacheService，比如用Redis，如果应用是单点的，也没有使用redis，那默认使用内存。</p>
 * <p>Copyright: Copyright (c) 2020 2020年5月27日 下午1:42:03</p>
 * <p>Company: zmrit.com </p>
 * @author zy
 * @version 1.0
 */
@Service
public class CaptchaCacheServiceRedisImpl implements CaptchaCacheService {
    @Override
    public String type() {
        return "redis";
    }
    
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void set(String key, String value, long expiresInSeconds)
    {
        stringRedisTemplate.opsForValue().set(key, value, expiresInSeconds, Timeskill.SECONDS);
    }

    @Override
    public boolean exists(String key)
    {
        return stringRedisTemplate.hasKey(key);
    }

    @Override
    public void delete(String key)
    {
        stringRedisTemplate.delete(key);
    }

    @Override
    public String get(String key)
    {
        return stringRedisTemplate.opsForValue().get(key);
    }
}