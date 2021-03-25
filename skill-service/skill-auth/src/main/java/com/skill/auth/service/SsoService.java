package com.skill.auth.service;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.ObjectUtil;
import com.alibaba.fastjson.JSONObject;
import com.skill.auth.config.SsoConfig;
import com.skill.common.enums.UserStatus;
import com.skill.system.domain.SysUser;
import com.skill.system.feign.RemoteUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author
 */
@Slf4j
@Service("ssoService")
public class SsoService {

    @Resource
    private AccessTokenService tokenService;

    @Resource
    private SysLoginService sysLoginService;

    @Resource
    private RemoteUserService userService;

    /**
     * 获取sso的配置
     * @return
     */
    public Map<String, Object> config() {
        return new HashMap<String, Object>(12){{
            put("authorizationUrl", SsoConfig.AUTHORIZATION_URL);
            put("accessTokenUri", SsoConfig.ACCESS_TOKEN_URL);
            put("userInfoUri", SsoConfig.USER_PROFILE_URL);
            put("redirectUri", SsoConfig.REDIRECT_URI);
            put("clientId", SsoConfig.CLIENT_ID);
            put("clientSecret", SsoConfig.CLIENT_SECRET);
            put("base64Credentials", "Basic " + Base64.encode(SsoConfig.CLIENT_ID + ":" + SsoConfig.CLIENT_SECRET));
            put("responseType", SsoConfig.RESPONSE_TYPE);
            put("scope", SsoConfig.SCOPE);
            put("grantType", SsoConfig.GRANT_TYPE);
            put("state", SsoConfig.STATE);
        }};
    }

    /**
     * 获取sso的token
     * @param code
     * @return
     */
    public Map<String, Object> token(String code) {
        return new HashMap<String, Object>(1){{
            put("token", getAccessToken(code));
        }};
    }

    /**
     * 获取sso的用户信息
     * @param token
     * @return
     */
    public Map<String, Object> user(String token) {
        return getUserInfo(token);
    }

    /**
     * 通过sso登陆
     * @param code
     * @param state
     * @return
     */
    public Map<String, Object> login(String code, String state) {
        String token = (String) token(code).get("token");
        Map<String, Object> user = user(token);
        //获取用户信息
        SysUser sysUser = userService.selectSysUserByUsername((String) user.get("uid"));
        //没有用户
        if (ObjectUtil.isEmpty(sysUser)) {
            //新建用户
            String  uid = (String) user.get("uid");
            String  commonName = "";
            String  lastName = "";
            String  firstName = "";
            String  mail = "";
            try {
                commonName = (String) user.get("commonname");
                lastName = (String) user.get("lastname");
                firstName = (String) user.get("firstname");
                mail = (String) user.get("mail");
            } catch (Exception e) {
                e.printStackTrace();
            }
            String userName = lastName+" "+firstName;
            SysUser addUser = new SysUser();
            addUser.setLoginName(uid);
            addUser.setUserName(userName);
            addUser.setEmail(mail);
            addUser.setStatus("0");
            userService.addSysUser(addUser);
            return  getMap();
        }

        //没有角色
        List<Long> roleIds =sysUser.getRoleIds();
        if(null==roleIds || roleIds.size()==0){
            return  getMap();
        }

        if (UserStatus.DISABLE.getCode().equals(sysUser.getStatus())) {
            Map<String, Object> map = getMap();
            map.put("msg","用户已被停用，请联系管理员！");
            map.put("msgCode","disable");
            return  map;
        }

        sysLoginService.login(sysUser);
        return tokenService.createToken(sysUser);
    }

    /**
     * 获取个空token
     * @return
     */
    public Map<String, Object> getMap(){
        return new HashMap<String, Object>(3){{
            put("token", "");
        }};
    }

    private JSONObject getUserInfo(String accessToken) {
        JSONObject user;
        HttpURLConnection connection = null;
        try {
            // Constructs URL and Connection objects, and sets headers
            URL url = new URL(SsoConfig.USER_PROFILE_URL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("contentType", "UTF-8");
            connection.setRequestProperty("Accept-Charset", "UTF-8");
            connection.setRequestProperty("Authorization", accessToken);
            // Gets response and reads it
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder resp = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                resp.append(inputLine);
            }
            in.close();
            log.info("获取user结果为：{}", resp.toString());
            // Gets the user uid from JSON object
            user = JSONObject.parseObject(resp.toString());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        return user;
    }

    private String getAccessToken(String code) {
        String accessToken;
        // Builds POST data
        String params = "redirect_uri=" +  SsoConfig.REDIRECT_URI + "&grant_type=" + SsoConfig.GRANT_TYPE + "&code=" + code;
        byte[] postData = params.getBytes(Charset.forName("UTF-8"));
        HttpURLConnection connection = null;
        try {
            // Builds URL, Connection object and sets headers
            URL url = new URL(SsoConfig.ACCESS_TOKEN_URL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", "Basic " + Base64.encode(SsoConfig.CLIENT_ID + ":" + SsoConfig.CLIENT_SECRET));
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            connection.setRequestProperty("Accept-Charset", "UTF-8");
            connection.setRequestProperty("Connection", "Keep-Alive");
            connection.setRequestProperty("Content-Length", Integer.toString(params.getBytes().length));
            connection.setDoOutput(true);
            // Posts data
            OutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.write(postData);
            wr.flush();
            wr.close();
            // Reads response
            BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream(), Charset.forName("UTF-8")));
            String line;
            StringBuilder resp = new StringBuilder();
            while ((line = rd.readLine()) != null) {
                resp.append(line);
            }
            rd.close();
            log.info("获取token结果为：{}", resp.toString());
            // Get Access Token from JSON Object
            JSONObject obj = JSONObject.parseObject(resp.toString());
            accessToken = obj.getString("access_token");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
        return accessToken;
    }
}
