package com.skill.server.utils;


import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;


/**
 * rest工具
 * @author swen
 */
@Configuration
@Slf4j
public class RestUtil {

    @Bean
    public RestTemplate restTemplate() {
        StringHttpMessageConverter m = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        return new RestTemplateBuilder().additionalMessageConverters(m).build();
    }

    public String post(String url, JSONObject jsonObject) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Accept", MediaType.APPLICATION_JSON_VALUE);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonObject.toString(), headers);
        ResponseEntity<String> responseEntity = this.restTemplate().postForEntity(url, httpEntity, String.class);
        log.info("RestUtil url:{},type:{},param:{},response:{}", url, "post", jsonObject.toJSONString(), JSONObject.parseObject(responseEntity.getBody()));
        return responseEntity.getBody();
    }

    public String get(String url) {
        ResponseEntity<String> responseEntity = this.restTemplate().getForEntity(url, String.class);
        log.info("RestUtil url:{},type:{},param:{},response:{}", url, "get", "", JSONObject.parseObject(responseEntity.getBody()));
        return responseEntity.getBody();
    }

}
