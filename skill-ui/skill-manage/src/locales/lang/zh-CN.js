import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
import labelMap from '../managerLocales' // 具体业务的国际化
import Modal from './modal/zh-CN' // 3D模型模块
import System from './system/zh-CN' // 系统管理模块
// import { locales } from 'ant-design-vue'
// const zhCN = locales.zh_CN
const components = {
  antLocale: zhCN,
  momentName: 'zh-cn'
}

// import antd from 'ant-design-vue/es/locale-provider/zh_CN'
// import momentCN from 'moment/locale/zh-cn'
// const components = {
//   antLocale: antd,
//   momentName: 'zh-cn',
//   momentLocale: momentCN
// }

const locale = {
  'message': '-',
  'logout': '退出登录',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.weclome': '欢迎页',
  'menu.form': '表单页',
  'menu.form.basic': '基础表单',
  'menu.form.step': '分步表单',
  'menu.form.advanced': '高级表单',
  'menu.form.edit': '富文本',
  'menu.list': '列表页',
  'menu.list.table': '查询表格',
  'menu.list.standard': '标准列表',
  'menu.list.card': '卡片列表',
  'menu.list.search': '搜索列表',
  'menu.list.search.article': '搜索列表（文章）',
  'menu.list.search.project': '搜索列表（项目）',
  'menu.list.search.application': '搜索列表（应用）',
  'menu.profile': '详情页',
  'menu.profile.basic': '基础详情页',
  'menu.profile.advanced': '高级详情页',
  'menu.result': '结果页',
  'menu.result.succ': '成功',
  'menu.result.err': '失败',
  'menu.exception': '异常页',
  'menu.exception.403': '403',
  'menu.exception.404': '404',
  'menu.exception.500': '500',
  'menu.account': '个人页',
  'menu.account.center': '个人中心',
  'menu.account.settings': '个人设置',
  'menu.account.settings.base': '基本设置',
  'menu.account.settings.security': '安全设置',
  'menu.account.settings.custom': '个性化设置',
  'menu.account.settings.binding': '账户绑定',
  'menu.account.settings.notification': '新消息通知',

  'menu.welcome': '欢迎来到数据中心U位管理系统',
  'menu.search': '使用搜索栏查找您想要浏览的设备',
  'menu.search.hint': '你在查找什么?',
  'menu.search.result': '搜索结果',
  'menu.sever.slot': 'Sever Slot占用率',

  'menu.home': '首页',
  'menu.system': '系统管理',
  'menu.system.task': '任务管理',
  'menu.system.user': '用户管理',
  'menu.system.role': '角色管理',
  'menu.system.menu': '菜单管理',
  'menu.system.department': '部门管理',
  'menu.system.dictionary': '字典管理',
  'menu.system.parameter': '参数管理',
  'menu.system.area': '地区管理',
  'menu.system.alarm': '告警管理',
  'menu.system.deviceQuery': '设备查询',
  'menu.system.alarmReceivingSetting': '告警接收设置',
  'menu.business': '业务管理',
  'menu.business.factory': '工厂管理',
  'menu.business.dataCenter': '数据中心管理',
  'menu.business.room': '房间管理',
  'menu.business.rackAisle': '机柜通道管理',
  'menu.business.rackType': '机柜类型管理',
  'menu.business.rack': '机柜管理',
  'menu.business.project': '项目管理',
  'menu.business.device': '设备信息管理',
  'menu.business.sensor': '传感器管理',
  'menu.dataCenter': '数据中心',
  'menu.statistics': '查询统计',
  'menu.statistics.Alarm': '警告统计',
  'menu.monitor': '系统监控',
  'menu.monitor.operationLog': '操作日志',
  'menu.monitor.loginLog': '登录日志',

  'layouts.usermenu.dialog.title': '提示',
  'layouts.usermenu.dialog.content': '你真的要离开了嘛',
  'layouts.user.nopermission': '首次登陆暂无权限，请联系管理员',

  'app.setting.pagestyle': '整体风格设置',
  'app.setting.pagestyle.light': '亮色菜单风格',
  'app.setting.pagestyle.dark': '暗色菜单风格',
  'app.setting.pagestyle.realdark': '暗黑菜单风格',
  'app.setting.themecolor': '主题色',
  'app.setting.navigationmode': '导航模式',
  'app.setting.content-width': '内容区域宽度',
  'app.setting.fixedheader': '固定 Header',
  'app.setting.fixedsidebar': '固定侧边菜单',
  'app.setting.sidemenu': '侧边栏导航',
  'app.setting.topmenu': ' 顶部栏导航',
  'app.setting.content-width.fixed': '固定',
  'app.setting.content-width.fluid': '流式',
  'app.setting.othersettings': '其他设置',
  'app.setting.weakmode': '色弱模式',
  'app.setting.copy': '拷贝设置',
  'app.setting.loading': '主题加载中',
  'app.setting.copyinfo': '复制成功，替换src/config/defaultSettings.js文件中的配置',
  'app.setting.production.hint': '配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件。',
  'app.setting.title': '数据中心U位管理系统',

  'app.setting.themecolor.bmw': 'BMW蓝（默认）',
  'app.setting.themecolor.daybreak': '拂晓蓝',
  'app.setting.themecolor.dust': '薄暮',
  'app.setting.themecolor.volcano': '火山',
  'app.setting.themecolor.sunset': '日暮',
  'app.setting.themecolor.cyan': '明青',
  'app.setting.themecolor.green': '极光绿',
  'app.setting.themecolor.geekblue': '极客蓝',
  'app.setting.themecolor.purple': '酱紫',

  // global button
  'global.button.search': '查询',
  'global.button.reset': '重置',
  'global.button.resetpassword': '重置密码',
  'global.button.edit': '编辑',
  'global.button.delete': '删除',
  'global.button.off': '停用',
  'global.button.on': '启用',
  'global.button.new': '新建',
  'global.button.list': '列表',
  'global.button.copy': '复制',
  'global.button.save': '保存',
  'global.button.uploadfile': '文件上传',
  'global.button.open': '展开',
  'global.button.fold': '收起',
  'global.button.confirm': '确认',
  'global.button.cancel': '取消',
  'global.button.ossconfig': '云存储配置',
  'global.button.clear': '清空',
  'global.button.import': '导入',
  'global.button.export': '导出',
  'global.button.detail': '详细',
  'global.button.preview': '预览',
  'global.button.generatecode': '生成代码',
  'global.button.devices': '设备',
  'global.button.slot': 'U位信息',
  'global.button.close': '关闭',
  'global.button.previous': '上一步',
  'global.button.next': '下一步',
  'global.button.download': '下载模版',
  'global.button.permission.data': '数据权限',
  'global.button.sensor': '传感器',
  'global.button.relogin': '重新登录',


  'global.action': '操作',

  // global form
  'global.form.search': '查询',
  'global.form.status': '状态',
  'global.form.placeholder.input': '请输入',
  'global.form.placeholder.input.permissionName': '请输入权限名称',
  'global.form.placeholder.input.permissionIdentification': '请输入权限标识',
  'global.form.placeholder.input.path': '请输入路径',
  'global.form.placeholder.input.widget': '请输入组件',
  'global.form.placeholder.input.redirect': '请输入重定向地址',
  'global.form.placeholder.input.sortNumber': '请输入顺序数字',
  'global.form.placeholder.input.uniqueKey': '请输入动态菜单唯一键',
  'global.form.placeholder.input.uniqueKeyAs': '路由唯一键：如"user"',
  'global.form.placeholder.select': '请选择',
  'global.form.placeholder.select.none': '无',
  'global.form.placeholder.select.type': '请选择类型',
  'global.form.placeholder.select.parentPermission': '请选择上级权限',
  'global.form.placeholder.select.status': '请选择状态',
  'global.form.placeholder.select.icon': '请选择图标',
  'global.form.placeholder.select.openType': '请选择打开方式',

  // global message
  'global.message.success': '操作成功',
  'global.message.delete.success': '删除成功',
  'global.message.save.success': '保存成功',
  'global.message.fail': '操作失败',
  'global.message.error': '系统错误，请稍后再试',
  'global.message.notEnoughUBitSpace': '当前位置放不下这个设备',
  'global.message.delete.ask': '确认删除？',
  'global.message.select.file': '请选择文件',
  'global.message.equipment.notOnSale': '该设备未上架',
  'global.message.warning': '提示',
  'global.message.warning.user.disable.msg': '用户已被停用，请联系管理员！',
  'global.message.welcome': '欢迎',
  'global.message.error.title': '错误',
  'global.message.info.modal.enter': '第一次访问或刷新后请从首页进入',
  'global.import.update': '更新数据',

  ...Modal,
  ...System,
  ...labelMap.zh
}

export default {
  ...components,
  ...locale
}
