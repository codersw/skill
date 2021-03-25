const baseInput = ['请输入', 'Please Input']
const baseSelect = ['请选择', 'Please Select']
const labelMap = {
  'delete.cannot': ['不可删除', 'Cannot be deleted'],
  // 工厂
  'factory.factoryName': ['工厂名称', 'Factory Name'],
  'factory.factoryName.msg': [baseInput[0] + '工厂名称', baseInput[1] + ' Factory Name'],
  'factory.province': ['省份', 'Province'],
  'factory.province.msg': [baseSelect[0] + '省份', baseSelect[1] + ' Province'],
  'factory.city': ['城市', 'City'],
  'factory.city.msg': [baseSelect[0] + '城市', baseSelect[1] + ' City'],
  'factory.factoryAddress': ['工厂地址', 'Address'],
  'factory.imgUrl': ['厂区图', 'Photo'],

  // 中心
  'center.datacenterName': ['数据中心名称', ' Data Center Name'],
  'center.datacenterName.msg': [baseInput[0] + '数据中心名称', baseInput[1] + ' Data Center Name'],
  'center.factoryId': ['工厂', 'Factory'],
  'center.factoryId.msg': [baseSelect[0] + '工厂', baseSelect[1] + ' Factory'],
  'center.totalArea': ['面积', 'Area'],
  'center.states': ['启用状态', 'Status（Disable/Enable）'],
  'center.imgUrl': ['中心图', 'Photo'],

  // 房间
  'room.factoryId': ['工厂', 'Factory'],
  'room.factoryId.msg': [baseSelect[0] + '工厂', baseSelect[1] + ' Factory'],
  'room.datacenterId': ['数据中心', 'Data Center'],
  'room.datacenterId.msg': [baseSelect[0] + '数据中心', baseSelect[1] + ' Data Center'],
  'room.dcRoomName': ['房间名称', 'Room Name'],
  'room.dcRoomName.msg': [baseInput[0] + '房间名称', baseInput[1] + ' Room Name'],
  'room.area': ['房间面积', 'Area'],

  // 机笼
  'aisle.factoryId': ['工厂', 'Factory'],
  'aisle.factoryId.msg': [baseSelect[0] + '工厂', baseSelect[1] + ' Factory'],
  'aisle.datacenterId': ['数据中心', 'Data Center'],
  'aisle.datacenterId.msg': [baseSelect[0] + '数据中心', baseSelect[1] + ' Data Center'],
  'aisle.dcRoomId': ['房间', 'Room'],
  'aisle.dcRoomId.msg': [baseSelect[0] + '房间', baseSelect[1] + ' Room'],
  'aisle.rackAisleName': ['机柜通道名称', 'Rack Aisle Name'],
  'aisle.rackAisleName.msg': [baseInput[0] + '机柜通道名称', baseInput[1] + ' Rack Aisle Name'],
  'aisle.states': ['状态', 'Status（Disable/Enable）'],
  'aisle.serialNo': ['序号', 'Serial Number'],
  'aisle.assetNo': ['资产编号', 'Asset Number'],
  'aisle.installationDate': ['安装日期', 'Install Date'],
  'aisle.rduId': ['电子标签id', 'RFID ID'],
  'aisle.limitPower': ['电源额定功率', 'Rated Power'],
  'aisle.relativeX': ['相对x坐标', 'relativeX'],
  'aisle.relativeY': ['相对y坐标', 'relativeY'],
  'aisle.relativeZ': ['相对z坐标', 'relativeZ'],
  'aisle.relativerotX': ['相对x偏离角', 'relativerotX'],
  'aisle.relativerotY': ['相对y偏离角', 'relativerotY'],
  'aisle.relativerotZ': ['相对z偏离角', 'relativerotZ'],
  'aisle.tdModelId': ['3d模型', '3D Model'],

  // 机柜类型
  'rackType.rackTypeName': ['类型名称', 'Type Name'],
  'rackType.rackTypeName.msg': [baseInput[0] + '类型名称', baseInput[1] + 'Type Name'],
  'rackType.limitUnit': ['总U位', 'Total U Position'],
  'rackType.limitUnit.msg': [baseInput[0] + '总U位', baseInput[1] + ' Total U Position'],
  'rackType.startUnit': ['服务器插槽开始U位', 'Slot Start U Position'],
  'rackType.startUnit.msg': [baseInput[0] + '服务器插槽开始U位', baseInput[1] + ' Slot Start U Position'],
  'rackType.endUnit': ['服务器插槽结束U位', 'Slot End U Position'],
  'rackType.endUnit.msg': [baseInput[0] + '服务器插槽结束U位', baseInput[1] + ' Slot End U Position'],
  'rackType.slotUnit': ['U位数/插槽', 'U Bits/Slot'],
  'rackType.slotUnit.msg': [baseInput[0] + 'U位数/插槽', baseInput[1] + ' U Bits/Slot'],
  'rackType.startUnit.valide.msg': ['起始U位应小于总U位', 'Slot Start U Position must less than Total U'],
  'rackType.endUnit.valide1.msg': ['截止U位应小于总U位', 'Slot End U Position must less than Total U'],
  'rackType.endUnit.valide2.msg': ['截止U位应大于起始U位', 'Slot End U Position must greater than Slot Start U Position'],

  // 机柜
  'rack.rackName': ['机柜名称', 'Rack Name'],
  'rack.rackName.msg': [baseInput[0] + '机柜名称', baseInput[1] + ' Rack Name'],
  'rack.states': ['状态', 'Status（Disable/Enable）'],
  'rack.factoryId': ['工厂', 'Factory'],
  'rack.factoryId.msg': [baseInput[0] + '工厂', baseInput[1] + ' Factory'],
  'rack.datacenterId': ['数据中心', 'Data Center'],
  'rack.datacenterId.msg': [baseInput[0] + '数据中心', baseInput[1] + ' Data Center'],
  'rack.dcRoomId': ['房间', 'Room'],
  'rack.dcRoomId.msg': [baseInput[0] + '房间', baseInput[1] + ' Room'],
  'rack.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'rack.rackTypeName': ['机柜类型', 'Rack Type'],
  'rack.installationDate': ['安装日期', 'Install Date'],
  'rack.serialNo': ['序号', 'Serial Number'],
  'rack.manuFacturer': ['制造商', 'Manufacturer'],
  'rack.modelName': ['型号', 'Model Name'],
  'rack.partsNo': ['部件号', 'Unit Number'],
  'rack.pduId': ['机柜通道电子标签ID', 'Rack Aisle RFID'],
  'rack.rduId': ['机柜电子标签ID', 'Rack RFID'],
  'rack.width': ['宽度', 'Width'],
  'rack.height': ['高度', 'Height'],
  'rack.depth': ['深度', 'Depth'],
  'rack.limitUnit': ['总U位', 'Total U Position'],
  'rack.limitUnit.msg': [baseInput[0] + '总U位', baseInput[1] + ' Total U Position'],
  'rack.startUnit': ['服务器插槽开始U位', 'Slot Start U Position'],
  'rack.startUnit.msg': [baseInput[0] + '服务器插槽开始U位', baseInput[1] + ' Slot Start U Position'],
  'rack.endUnit': ['服务器插槽结束U位', 'Slot End U Position'],
  'rack.endUnit.msg': [baseInput[0] + '服务器插槽结束U位', baseInput[1] + ' Slot End U Position'],
  'rack.slotUnit': ['U位数/插槽', 'U Bits/Slot'],
  'rack.slotUnit.msg': [baseInput[0] + 'U位数/插槽', baseInput[1] + ' U Bits/Slot'],
  'rack.limitServer': ['可用服务器/台', 'Available Servers'],
  'rack.limitServer.msg': [baseInput[0] + '可用服务器/台', baseInput[1] + ' Available Servers'],
  'rack.limitWeight': ['设计载重', 'Limit Weight'],
  'rack.limitWeight.msg': [baseInput[0] + '设计载重', baseInput[1] + ' Limit Weight'],
  'rack.limitPower': ['额定功率', 'Rated Power'],
  'rack.relativeX': ['相对x坐标', 'relativeX'],
  'rack.relativeY': ['相对y坐标', 'relativeY'],
  'rack.relativeZ': ['相对z坐标', 'relativeZ'],
  'rack.relativerotX': ['相对x偏离角', 'relativerotX'],
  'rack.relativerotY': ['相对y偏离角', 'relativerotY'],
  'rack.relativerotZ': ['相对z偏离角', 'relativerotZ'],
  'rack.tdModelId': ['3d模型', '3D Model'],

   // 项目
  'project.projectName': ['项目名称', 'Project Name'],
  'project.projectName.msg': [baseInput[0] + '项目名称', baseInput[1] + ' Project Name'],
  'project.createTime': ['创建时间', 'Create Time'],
  'project.updateTime': ['更新时间', 'Update Time'],
  'project.baseInfo': ['基本信息', 'Base Info'],
  'project.equipment': ['设备信息', 'Equipment Info'],

  // 设备
  'device.equipmentName': ['设备名称', 'Device Name'],
  'device.equipmentName.msg': [baseInput[0] + '设备名称', baseInput[1] + ' Device Name'],
  'device.equipmentType': ['设备类型', 'Device Type'],
  'device.projectname': ['选择项目', 'Select Project'],
  'device.states': ['状态', 'Status'],
  'device.factoryId': ['工厂', 'Factory'],
  'device.datacenterId': ['数据中心', 'Data Center'],
  'device.dcRoomId': ['房间', 'Room'],
  'device.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'device.rackId': ['机柜', 'Rack'],
  'device.position': ['位置', 'Position'],
  'device.unit': ['U位数', 'U Bits'],
  'device.unit.msg': [baseInput[0] + 'U位数', baseInput[1] + ' U Bits'],
  'device.startUnit': ['开始U位', ' Start U Position'],
  'device.startUnit.msg': [baseSelect[1] + '开始U位', baseSelect[1] + ' Start U Position'],
  'device.endtUnit': ['结束U位', ' End U Position'],
  'device.isRackEquipment': ['是否机柜设备', 'Rack Device'],
  'device.manuFacturer': ['制造商', 'Manufacturer'],
  'device.modelName': ['型号', 'Model Name'],
  'device.partsNo': ['部件号', 'Unit Number'],
  'device.width': ['宽度', 'Width'],
  'device.height': ['高度', 'Height'],
  'device.depth': ['深度', 'Depth'],
  'device.weight': ['重量', 'Weight'],
  'device.limitPower': ['额定功率', 'Rated Power'],
  'device.installationDate': ['安装日期', 'Install Date'],
  'device.relativeX': ['相对x坐标', 'relativeX'],
  'device.relativeY': ['相对y坐标', 'relativeY'],
  'device.relativeZ': ['相对z坐标', 'relativeZ'],
  'device.relativerotX': ['相对x偏离角', 'relativerotX'],
  'device.relativerotY': ['相对y偏离角', 'relativerotY'],
  'device.relativerotZ': ['相对z偏离角', 'relativerotZ'],
  'device.tdModelId': ['3d模型', '3D Model'],
  'device.step.one': ['选择类型', ' Device Type'],
  'device.step.two': ['基本信息', ' Base Info'],
  'device.step.three': ['坐标信息', '3D Model'],
  'device.equipmentInfo': ['设备信息', 'Device Information'],
  'device.tree.search': ['搜索', 'Search'],
  'device.disable.msg': ['确认停用该设备吗？', 'Sure to disable the device?'],
  'device.enable.msg': ['确认启用该设备吗？', 'Sure to enable the device?'],

  // 穿梭框
  'transfer.left': ['未关联项目', 'No Select'],
  'transfer.right': ['想要关联的项目', 'Select'],
  // 场景
  'secne.center': ['数据中心', 'Data Center'],
  'secne.room': ['房间', 'Room'],
  'secne.aisle': ['机柜通道', 'Rack Aisle'],
  'secne.rack': ['机柜', 'Rack'],
  'secne.step.one': ['选择场景', 'Select Secne'],
  'secne.step.two': ['场景信息', 'Secne Info'],

  // U位
  'selectRack.msg': ['请先选择机柜', 'Please Select Rack'],
  'selectOne.msg': ['请选择一条记录', 'Please Select One'],
  'unit.unitNo': ['U位序号', 'Unit Number'],
  'unit.unitState': ['U位使用情况', 'Status'],
  'unit.slot': ['插槽', 'Slot'],
  'unit.slotState': ['插槽使用情况', ' Slot Status'],
  'unit.rackEquipmentName': ['设备', 'Device'],
  'unit.serverUnit': ['服务器可用U位', 'Server Unit'],

  // 设备位置
  'equipmentLocation.equipmentName': ['设备名称', 'Device Name'],
  'equipmentLocation.factoryId': ['工厂', 'Factory'],
  'equipmentLocation.datacenterId': ['数据中心', 'Data Center'],
  'equipmentLocation.dcRoomId': ['房间', 'Room'],
  'equipmentLocation.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'equipmentLocation.rackId': ['机柜', 'Rack'],
  'equipmentLocation.equipmentType': ['设备类型', 'Device Type'],
  'equipmentLocation.startUnit': ['起始U位', 'Start U Bits'],
  'equipmentLocation.endUnit': ['截至U位', 'End U Bits'],
  'equipmentLocation.createTime': ['安装时间', 'Install Time'],


  // 告警接收人信息
  'reciver.reciverName': ['接收人', 'Receiving User'],
  'reciver.reciverName.msg': [baseInput[0] + '接收人', baseInput[1] + ' Receiving User'],
  'reciver.email': ['邮件地址', 'Email'],
  'reciver.email.msg': [baseInput[0] + '邮件地址', baseInput[1] + ' Email'],
  'reciver.email.error.msg': ['邮件地址错误', ' Email error'],
  'reciver.reciverType': ['警告类型', 'Alarm Type'],
  'reciver.reciverType.msg': [baseSelect[0] + '警告类型', baseSelect[1] + ' Alarm Type'],
  'reciver.factoryId': ['工厂', 'Factory'],
  'reciver.factoryId.msg': [baseSelect[0] + '工厂', baseSelect[1] + ' Factory'],
  'reciver.datacenterId': ['数据中心', 'Data Center'],
  'reciver.datacenterId.msg': [baseSelect[0] + '数据中心', baseSelect[1] + ' Data Center'],

  // 告警信息
  'alarm.alarmType': ['警告类型', 'Alarm Type'],
  'alarm.solveState': ['确认', 'Confirmed'],
  'alarm.description': ['告警信息', 'Alarm Information'],
  'alarm.factoryId': ['工厂', 'Factory'],
  'alarm.datacenterId': ['数据中心', 'Data Center'],
  'alarm.dcRoomId': ['房间', 'Room'],
  'alarm.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'alarm.rackId': ['机柜', 'Rack'],
  'alarm.sensorId': ['告警监控器', 'Alarm Monitor'],
  'alarm.equipmentId': ['告警设备', 'Alarm Device'],
  'alarm.alarmValue': ['告警值', 'Alarm Value'],
  'alarm.solver': ['处理人', 'Confirmed User'],
  'alarm.createTime': ['告警时间', 'Alarm Time'],
  'alarm.solveTime': ['处理时间', 'Confirmed Time'],
  'alarm.remarks': ['处理备注', 'Remark'],
  'alarm.remarks.msg': [baseInput[0] + '处理备注', baseInput[0] + ' Remark'],
  'alarm.btn.confirm': ['告警确认', 'Alarm Confirm'],


  // 传感器信息管理
  'sensor.sensorType': ['传感器类型', 'Sensor Type'],
  'sensor.sensorType.msg': [baseSelect[0] + '传感器类型', baseSelect[1] + ' Sensor Type'],
  'sensor.sensorName': ['传感器名称', 'Sensor Name'],
  'sensor.sensorName.msg': [baseInput[0] + '传感器名称', baseInput[1] + ' Sensor Name'],
  'sensor.distState': ['分配状态', 'Assigned'],
  'sensor.distState.msg': [baseSelect[0] + '分配状态', baseSelect[1] + ' Assigned'],
  'sensor.brand': ['品牌', 'Brand'],
  'sensor.brand.msg': [baseSelect[0] + '品牌', baseSelect[1] + ' Brand'],
  'sensor.model': ['型号', 'Model Number'],
  'sensor.model.msg': [baseSelect[0] + '型号', baseSelect[1] + ' Model Number'],
  'sensor.description': ['描述', 'Describe'],
  'sensor.factoryId': ['工厂', 'Factory'],
  'sensor.factoryId.msg': [baseSelect[0] + '工厂', baseSelect[1] + ' Factory'],
  'sensor.datacenterId': ['数据中心', 'Data Center'],
  'sensor.datacenterId.msg': [baseSelect[0] + '数据中心', baseSelect[1] + ' Data Center'],
  'sensor.dcRoomId': ['房间', 'Room'],
  'sensor.dcRoomId.msg': [baseSelect[0] + '房间', baseSelect[1] + ' Room'],
  'sensor.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'sensor.rackId': ['机柜', 'Rack'],
  'sensor.equipmentId': ['分配设备', 'Assign Device'],
  'sensor.location': ['显示位置', 'Location'],
  'sensor.location.msg': [baseSelect[0] + '显示位置', baseSelect[1] + ' Location'],
  'sensor.dataState': ['主显数据', 'Display Data'],
  'sensor.dataState.msg': [baseSelect[0] + '主显数据', baseSelect[1] + ' Display Data'],
  'sensor.sensorLevel': ['数据采集级别', 'Sensor Level'],
  'sensor.decName': ['DCE设备', 'DCE Device'],

  // 操作日志
  'operLog.operId': ['日志编号', 'Log Code'],
  'operLog.title': ['系统模块', 'System Model'],
  'operLog.businessType': ['操作类型', 'Operation Type'],
  'operLog.operName': ['操作人员', 'Operator'],
  'operLog.operIp': ['主机', 'Host'],
  'operLog.operLocation': ['操作地点', 'Operation Location'],
  'operLog.status': ['状态', 'Status'],
  'operLog.operTime': ['操作时间', 'Operation Time'],

  // 登录日志
  'login.infoId': ['访问编号', 'Log Code'],
  'login.loginName': ['登录名称', 'Login User'],
  'login.ipaddr': ['登录地址', 'Host'],
  'login.loginLocation': ['登录地点', 'Login Location'],
  'login.browser': ['浏览器', 'Browser'],
  'login.os': ['操作系统', 'OS'],
  'login.status': ['状态', 'Status'],
  'login.msg': ['操作信息', 'Message'],
  'login.loginTime': ['操作时间', 'Login Time'],

  // 定时任务
  'job.jobId': ['任务编号', 'Task Code'],
  'job.jobName': ['任务名称', 'Task Name'],
  'job.jobName.msg': [baseInput[0] + '任务名称', baseInput[1] + ' Task Name'],
  'job.jobGroup': ['任务组名', 'Task Group'],
  'job.jobGroup.msg': [baseSelect[0] + '任务组名', baseSelect[1] + ' Task Group'],
  'job.invokeTarget': ['调用方法', 'Invoke'],
  'job.invokeTarget.msg': [baseSelect[0] + '调用方法', baseSelect[1] + ' Invoke'],
  'job.invokeTarget.intro': [
    "Bean调用示例：demoTask.params('unit') <br/>Class类调用示例：com.unit.job.task.DemoTask.params('unit') <br/>参数说明：支持字符串，布尔类型，长整型，浮点型，整型",
    '调用方法示例'
  ],
  'job.cronExpression': ['cron表达式', 'Cron Expression'],
  'job.cronExpression.msg': [baseSelect[0] + 'cron表达式', baseSelect[1] + ' Cron Expression'],
  'job.status': ['状态', 'Status（Disable/Enable）'],
  'job.form.status': ['状态', 'Status'],
  'job.concurrent': ['是否并发', 'Concurrent'],
  'job.misfirePolicy': ['错误策略', 'Misfire Policy'],
  'job.remark': ['备注', 'Remarks'],
  'job.button.execute': ['执行一次', 'Execute once'],
  'job.button.execute.msg': ['确认执行一次吗？', 'Sure to Execute once ?'],
  'job.button.log': ['日志', 'Log'],
  'job.corn.control': ['corn控件', ' Corn Control'],

  // 定时任务日志
  'job.log.jobName': ['任务名称', 'Task Name'],
  'job.log.jobGroup': ['任务组名', 'Task Group'],
  'job.log.invokeTarget': ['调用方法', 'Invoke'],
  'job.log.jobMessage': ['日志信息', 'Log Message'],
  'job.log.status': ['执行状态', 'Status'],
  'job.log.createTime': ['执行时间', 'Execute Time'],
  'job.log.title': ['任务日志', 'Task Log'],

  // 用户
  'user.loginName': ['账户（用户名）', 'Account'],
  'user.loginName.msg': [baseInput[0] + '账户（用户名）', baseInput[1] + ' Account'],
  'user.userName': ['姓名', 'Name'],
  'user.userName.msg': [baseInput[0] + '姓名', baseInput[1] + 'Name'],
  'user.deptId': ['部门', 'Department'],
  'user.deptId.msg': [baseSelect[0] + '部门', baseSelect[1] + ' Department'],
  'user.status': ['状态', 'Status'],
  'user.list.status': ['状态', 'Status（Disable/Enable）'],
  'user.status.msg': [baseSelect[0] + '状态', baseSelect[1] + ' Status（Disable/Enable）'],
  'user.remark': ['描述', 'Describe'],
  'user.remark.msg': [baseSelect[0] + '描述', baseSelect[1] + ' Describe'],
  'user.roleIds': ['角色', 'Roles'],
  'user.roleIds.msg': [baseSelect[0] + '角色', baseSelect[1] + ' Roles'],
  'user.createTime': ['创建时间', 'Create Time'],
  'user.dept.search': ['搜索部门', ' Department Search'],


  // 角色管理
  'role.roleId': ['角色编号', ''],
  'role.roleName': ['角色名称', 'Role Name'],
  'role.roleName.msg': [baseInput[0] + '角色名称', baseInput[1] + ' Role Name'],
  'role.roleKey': ['权限字符', 'Permissions Code'],
  'role.roleKey.msg': [baseInput[0] + '权限字符', baseInput[1] + ' Permissions Code'],
  'role.roleSort': ['顺序', 'Sort'],
  'role.roleSort.msg': [baseInput[0] + '顺序', baseInput[1] + ' Sort'],
  'role.status': ['状态', 'Status'],
  'role.status.msg': [baseSelect[0] + '状态', baseSelect[1] + ' Status'],
  'role.list.status': ['状态', 'Status（Disable/Enable）'],
  'role.createTime': ['创建时间', 'Create Time'],
  'role.permissions': ['权限', 'Permissions'],
  'role.permissions.msg': ['请至少选择一个权限', 'Please Select One Permissions'],

  // 部门管理
  'dept.parentId': ['上级部门', 'Parent Department'],
  'dept.deptName': ['部门名称', 'Department Name'],
  'dept.deptName.msg': [baseInput[0] + '部门名称', baseInput[1] + ' Department Name'],
  'dept.orderNum': ['顺序', 'Sort'],
  'dept.orderNum.msg': [baseInput[0] + '顺序', baseInput[1] + ' Sort'],
  'dept.status': ['状态', 'Show / Hide'],
  'dept.leader': ['负责人', 'Leader'],
  'dept.leader.msg': [baseInput[0] + '负责人', baseInput[1] + ' Leader'],
  'dept.phone': ['电话', 'Phone'],
  'dept.phone.msg': [baseInput[0] + '电话', baseInput[1] + ' Phone'],
  'dept.email': ['邮箱', 'Email'],
  'dept.email.msg': [baseInput[0] + '邮箱', baseInput[1] + ' Email'],

  // 字典管理
  'dict.dictName': ['字典名称', 'Dictionary Name'],
  'dict.dictName.msg': [baseInput[0] + '字典名称', baseInput[1] + ' Dictionary Name'],
  'dict.dictType': ['字典类型', 'Type'],
  'dict.dictType.msg': [baseInput[0] + '字典类型', baseInput[1] + ' Type'],
  'dict.status': ['状态', 'Status'],
  'dict.list.status': ['状态', 'Status（Disable/Enable）'],
  'dict.status.msg': [baseSelect[0] + '状态', baseSelect[1] + ' Status（Disable/Enable）'],
  'dict.remark': ['备注', 'Remark'],


  'dictData.title': ['字典数据', 'Dictionary Data'],
  'dictData.dictLabel': ['字典标签', 'Dictionary Label'],
  'dictData.dictLabel.msg': [baseInput[0] + '字典标签', baseInput[1] + ' Dictionary Label'],
  'dictData.dictValue': ['字典键值', 'Dictionary Value'],
  'dictData.dictValue.msg': [baseInput[0] + '字典键值', baseInput[1] + ' Dictionary Value'],
  'dictData.dictSort': ['字典排序', 'Sort'],
  'dictData.dictSort.msg': [baseInput[0] + '字典排序', baseInput[1] + ' Sort'],
  'dictData.status': ['字典标签', 'Status'],
  'dictData.status.msg': [baseSelect[0] + '状态', baseSelect[1] + ' Status'],
  'dictData.remark': ['备注', 'Remark'],

  // 文件管理

  // 地区管理
  'dist.factoryId': ['工厂', 'Factory'],

  // 统计
  'statistics.factoryId': ['工厂', 'Factory'],
  'statistics.datacenterId': ['数据中心', 'Data Center'],
  'statistics.dcRoomId': ['房间', 'Room'],
  'statistics.rackAisleId': ['机柜通道', 'Rack Aisle'],
  'statistics.rackId': ['机柜', 'Rack'],
  'statistics.alarmNumber': ['警告数', 'Alarm Number'],
  'statistics.alarmType': ['警告类型', 'Alarm Type'],
  'statistics.scene': ['场景', 'Scene'],
  'statistics.scene.scale': ['所处场景占比', 'Scene Alarm Scale'],
  'statistics.alarmType.scale': ['场景告警类型占比', 'Alarm Type Scale'],
  'statistics.scene.line': ['所处场景趋势', 'Scene Alarm Line'],
  'statistics.detail': ['详情', 'Scene Alarm Detail'],

  // 公共正则校验
  'isNumber.msg': ['请输入数字', 'Please Enter a Number'],
  'isInteger.msg': ['请输入正整数', 'Please Enter a Number']
}


const zh = {}
const us = {}
try {
  for (const key in labelMap) {
    const obj = {}
    obj[key] = labelMap[key][0]
    Object.assign(zh, obj)
    const obj2 = {}
    obj2[key] = labelMap[key][1]
    Object.assign(us, obj2)
  }
} catch (error) {
  console.log('===========国际化配置出现了问题=============')
}

export default {
  zh, us
}