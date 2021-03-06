package com.skill.system.util;

import com.skill.common.utils.security.Md5Utils;
import com.skill.system.domain.SysUser;

public class PasswordUtil {

    public static boolean matches(SysUser user, String newPassword) {
        return user.getPassword().equals(encryptPassword(user.getLoginName(), newPassword, user.getSalt()));
    }

    public static String encryptPassword(String username, String password, String salt) {
        return Md5Utils.hash(username + password + salt);
    }
}