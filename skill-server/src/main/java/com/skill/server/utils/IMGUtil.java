package com.skill.server.utils;

import org.apache.commons.codec.binary.Base64;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * 图片的工具类
 * @author swen
 *
 */
public class IMGUtil {


	/**
	 * 获取网络图片
	 *
	 * @param url
	 * @throws Exception
	 */
	public static InputStream getImgStream(String url) throws Exception {
		URL httpurl = new URL(url);
		URLConnection con = httpurl.openConnection();
		//不超时
		con.setConnectTimeout(0);
		//不允许缓存
		con.setUseCaches(false);
		con.setDefaultUseCaches(false);
		InputStream is = con.getInputStream();
		//先读入内存
		ByteArrayOutputStream buf = new ByteArrayOutputStream(8192);
		byte[] b = new byte[1024];
		int len;
		while ((len = is.read(b)) != -1) {
			buf.write(b, 0, len);
		}
		//读图像
		is = new ByteArrayInputStream(buf.toByteArray());
		return is;
	}


	/**
	 * 获取网络图片
	 *
	 * @param url
	 * @throws Exception
	 */
	public static BufferedImage getImg(String url) throws Exception {
		URL httpurl = new URL(url);
		URLConnection con = httpurl.openConnection();
		//不超时
		con.setConnectTimeout(0);
		//不允许缓存
		con.setUseCaches(false);
		con.setDefaultUseCaches(false);
		InputStream is = con.getInputStream();
		//先读入内存
		ByteArrayOutputStream buf = new ByteArrayOutputStream(8192);
		byte[] b = new byte[1024];
		int len;
		while ((len = is.read(b)) != -1) {
			buf.write(b, 0, len);
		}
		//读图像
		is = new ByteArrayInputStream(buf.toByteArray());
		return ImageIO.read(is);
	}

	/**
	 * 保存图片到指定目录下
	 *
	 * @param savePath
	 * @param imgName
	 * @param image
	 * @throws Exception
	 */
	public static void saveImg(String savePath, String imgName, BufferedImage image) throws Exception {
		//创建图片文件
		File uploadedImg = new File(savePath, imgName);
		//检查目录是否存在
		File dir = uploadedImg.getParentFile();
		if (!dir.exists()) {
			dir.mkdirs();
		}
		uploadedImg.createNewFile();
		//写入图片
		ImageIO.write(image, getFileType(imgName), uploadedImg);
	}

	/**
	 * 获取文件后缀
	 *
	 * @param fileName
	 * @return
	 */
	public static String getFileType(String fileName) {
		if (fileName != null && fileName.contains(".")) {
			return fileName.substring(fileName.lastIndexOf("."));
		}
		return "";
	}

	/**
	 * base码转流
	 * @param base64String
	 * @return
	 */
	public static InputStream getStringImage(String base64String) {
		return new ByteArrayInputStream(Base64.decodeBase64(base64String));
	}

}