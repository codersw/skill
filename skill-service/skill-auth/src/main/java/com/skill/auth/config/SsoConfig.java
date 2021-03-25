package com.skill.auth.config;

import cn.hutool.core.codec.Base64;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


@Data
@Configuration
public class SsoConfig {

    // AM OAuth Authorization URL
    public static String AUTHORIZATION_URL;

    // OAM OAuth Server Token Endpoint
    public static String ACCESS_TOKEN_URL;

    // OAM OAuth Server User Profile endpoint
    public static String USER_PROFILE_URL;

    // 填写本机的ip+端口,并更改oamconsole中oauth中的客户端地址配置
    public static String REDIRECT_URI;

    // Client ID
    public static String CLIENT_ID;

    // Client Secret
    public static String CLIENT_SECRET;

    // Authorization and Token properties
    public static String RESPONSE_TYPE = "code";

    // scope
    public static String SCOPE = "UserProfile.me";

    // grant_type
    public static String GRANT_TYPE = "authorization_code";

    // state
    public static String STATE = "xyz";

//    @Value("${sso.auth_url:https://iam-saml-uat.bba-app.com/ms_oauth/oauth2/endpoints/oauthservice/authorize}")
//    public void setAuthorizationUrl(String authorizationUrl) {
//        AUTHORIZATION_URL = authorizationUrl;
//    }
//
//    @Value("${sso.token_url:https://iam-saml-uat.bba-app.com/ms_oauth/oauth2/endpoints/oauthservice/tokens}")
//    public void setAccessTokenUrl(String accessTokenUrl) {
//        ACCESS_TOKEN_URL = accessTokenUrl;
//    }
//
//    @Value("${sso.user_profile_url:https://iam-saml-uat.bba-app.com/ms_oauth/resources/userprofile/me}")
//    public void setUserProfileUrl(String userProfileUrl) {
//        USER_PROFILE_URL = userProfileUrl;
//    }
//
//    @Value("${sso.redirect_url:http://121.36.43.209:81/ssoLogin}")
//    public void setRedirectUri(String redirectUri) {
//        REDIRECT_URI = redirectUri;
//    }
//
//    @Value("${sso.client_id:0362308fe3124800badd2430720286ba}")
//    public void setClientId(String clientId) {
//        CLIENT_ID = clientId;
//    }
//
//    @Value("${sso.client_secret:ymhL1QHcKcsuR}")
//    public void setClientSecret(String clientSecret) {
//        CLIENT_SECRET = clientSecret;
//    }


    @Value("${sso.auth_url:https://did-sso.bba-app.biz/ms_oauth/oauth2/endpoints/oauthservice/authorize}")
    public void setAuthorizationUrl(String authorizationUrl) {
        AUTHORIZATION_URL = authorizationUrl;
    }

    @Value("${sso.token_url:https://did-sso.bba-app.biz/ms_oauth/oauth2/endpoints/oauthservice/tokens}")
    public void setAccessTokenUrl(String accessTokenUrl) {
        ACCESS_TOKEN_URL = accessTokenUrl;
    }

    @Value("${sso.user_profile_url:https://did-sso.bba-app.biz/ms_oauth/resources/userprofile/me}")
    public void setUserProfileUrl(String userProfileUrl) {
        USER_PROFILE_URL = userProfileUrl;
    }

    @Value("${sso.redirect_url:http://10.76.193.44/ssoLogin}")
    public void setRedirectUri(String redirectUri) {
        REDIRECT_URI = redirectUri;
    }

    @Value("${sso.client_id:7e0def8e9ab1474a93e3fd273ba09bce}")
    public void setClientId(String clientId) {
        CLIENT_ID = clientId;
    }

    @Value("${sso.client_secret:d8gPOPQe03mWV1W3p}")
    public void setClientSecret(String clientSecret) {
        CLIENT_SECRET = clientSecret;
    }



}