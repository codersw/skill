const PREFIX = process.env.BASE_URL
const SIZE_MULTIPLE = 1

// 场地
const SPACE3_MTL = PREFIX + 'three/obj/Room9.mtl'
const SPACE3_OBJ = PREFIX + 'three/obj/Room9.obj'
const SPACE3_FBX = PREFIX + 'three/fbx/Room9D.FBX'
// const SPACE3_FBX = PREFIX + 'three/fbx/Room9C.FBX'
// 场景外墙
const SPACE_WALL_MTL = PREFIX + 'three/obj/Room9EWall.mtl'
const SPACE_WALL_OBJ = PREFIX + 'three/obj/Room9EWall.obj'
// 机柜通道 1200
const CAGE_CAGE1200_MTL = '/three/obj/set7G1200v3.mtl'
const CAGE_CAGE1200_OBJ = '/three/obj/set7G1200v3.obj'
const CAGE_CAGE1200_OBJ_AS = '/three/obj/set7G1200v3.obj'
// 机柜通道 地面 1200
const CAGE_CAGE1200_GROUND_MTL = '/three/obj/set71200_floor.mtl'
const CAGE_CAGE1200_GROUND_OBJ = '/three/obj/set71200_floor.obj'

// const CAGE_CAGE1200_MTL = '/three/obj/Set7G1200_1225.mtl'
// const CAGE_CAGE1200_OBJ = '/three/obj/Set7G1200_1225.obj'

// 机柜通道 1800
const CAGE_CAGE1800_MTL = '/three/obj/set7G1800v3.mtl'
const CAGE_CAGE1800_OBJ = '/three/obj/set7G1800v3.obj'
// 机柜通道 地面 1800
const CAGE_CAGE1800_GROUND_MTL = '/three/obj/set71800_floor.mtl'
const CAGE_CAGE1800_GROUND_OBJ = '/three/obj/set71800_floor.obj'
// const CAGE_CAGE1800_MTL = '/three/obj/Set7G1800_1225.mtl'
// const CAGE_CAGE1800_OBJ = '/three/obj/Set7G1800_1225.obj'
// 机柜 set8 机柜 OBJ
// const CABINET_BOX_MTL = PREFIX + 'three/obj/set8A_all_bluebox_1223.mtl'
// const CABINET_BOX_OBJ = PREFIX + 'three/obj/set8A_all_bluebox_1223.obj'
const CABINET_BOX_MTL = PREFIX + 'three/obj/SET8A1.mtl'
const CABINET_BOX_OBJ = PREFIX + 'three/obj/SET8A1.obj'
// 机柜 门把手
const CABINET_BOX_DOOR_HANDLE_MTL = PREFIX + 'three/obj/set8_PullF.mtl'
const CABINET_BOX_DOOR_HANDLE_OBJ = PREFIX + 'three/obj/set8_PullF.obj'
// 机柜 set8 机柜 无挡板 OBJ
const CABINET_BOXB_MTL = PREFIX + 'three/obj/SET8A2.mtl'
const CABINET_BOXB_OBJ = PREFIX + 'three/obj/SET8A2.obj'
// 机柜 门把手 set8 OBJ
const CABINET_DOORHANDLE_MTL = PREFIX + 'three/obj/set8_PullF.mtl'
const CABINET_DOORHANDLE_OBJ = PREFIX + 'three/obj/set8_PullF.obj'
// 机器 set1 FD机器 OBJ （完成）
const CABINET_FD_MTL = PREFIX + 'three/obj/set1aobj.mtl'
const CABINET_FD_OBJ = PREFIX + 'three/obj/set1aobj.obj'
// 机器 set2 UPS OBJ
const CABINET_UPS_MTL = PREFIX + 'three/obj/set2_new.mtl'
const CABINET_UPS_OBJ = PREFIX + 'three/obj/set2_new.obj'
// 机器 set3 空调普通型 OBJ （完成）
const CABINET_AIRCONDITIONING_MTL = PREFIX + 'three/obj/set3obj.mtl'
const CABINET_AIRCONDITIONING_OBJ = PREFIX + 'three/obj/set3obj.obj'
// 机器 set5 BAT 电池组 OBJ
const CABINET_BAT_MTL = PREFIX + 'three/obj/set4_new.mtl'
const CABINET_BAT_OBJ = PREFIX + 'three/obj/set4_new.obj'
// 机器  BAS配电柜 2.4尺寸 OBJ
const CABINET_BASBIG_MTL = PREFIX + 'three/obj/set6oldv4.mtl'
const CABINET_BASBIG_OBJ = PREFIX + 'three/obj/set6oldv4.obj'
// 机器 set6 BAS配电柜 OBJ
const CABINET_BAS_MTL = PREFIX + 'three/obj/set6aobj.mtl'
const CABINET_BAS_OBJ = PREFIX + 'three/obj/set6aobj.obj'
// 机器 set6 BAS配电柜02 OBJ
const CABINET_BAS02_MTL = PREFIX + 'three/obj/set6oldv3.mtl'
const CABINET_BAS02_OBJ = PREFIX + 'three/obj/set6oldv3.obj'

const CABINET_BAS_GLB = PREFIX + 'three/glb/set6aobj.glb'
const CABINET_BAS_GLTF = PREFIX + 'three/gltf/set1.gltf'
const CABINET_BAS_BIN = PREFIX + 'three/gltf/set1.bin'

// 机器 set7 空调U形1.7 OBJ （完成）
const CABINET_AIRCONDITIONING7_MTL = PREFIX + 'three/obj/set_7_170Awindow.mtl'
const CABINET_AIRCONDITIONING7_OBJ = PREFIX + 'three/obj/set_7_170Awindow.obj'
// 机器 set7_14 空调U形1.4 OBJ
const CABINET_AIRCONDITIONING4_MTL = PREFIX + 'three/obj/set7_1400_window.mtl'
const CABINET_AIRCONDITIONING4_OBJ = PREFIX + 'three/obj/set7_1400_window.obj'
// 机器 set14 存储设备 OBJ （完成）
const CABINET_STORAGE_MTL = PREFIX + 'three/obj/set14obj.mtl'
const CABINET_STORAGE_OBJ = PREFIX + 'three/obj/set14obj.obj'
// 机器 制冷设备 OBJ （完成）
const CABINET_REFRIGERATION_MTL = PREFIX + 'three/obj/Room9otherV3.mtl'
const CABINET_REFRIGERATION_OBJ = PREFIX + 'three/obj/Room9otherV3.obj'
// 机器 消防设备 OBJ （完成）
const CABINET_FIREFIGHTING_MTL = PREFIX + 'three/obj/setXfp.mtl'
const CABINET_FIREFIGHTING_OBJ = PREFIX + 'three/obj/setXfp.obj'


// 类型常量 房间
const TYPE_ROOM = 'room'
// 类型常量 机柜通道
const TYPE_CAGE = 'cage'
// 类型常量 机柜
const TYPE_CABINET = 'cabinet'
// 类型常量 机器（除机柜外）
const TYPE_EQUIPMENT = 'equipment'
// 类型常量 门把手
const TYPE_DOORHANDLE = 'doorHandle'

// 房间型号常量 房间一
const MODEL_ROOM1 = 'room1'
// 房间型号常量 房间二
const MODEL_ROOM2 = 'room2'
// 房间型号常量 房间三
const MODEL_ROOM3 = 'room3'
// 状态对象
const statusObjectByType = {
  // 模型
  [TYPE_ROOM]: {
    // 场景
    'space': {
      slidingDiscoloration: 1, // 滑动变色
      slidingShowLabel: 1, // 滑动显示标签
      slidingStroke: 0 // 滑动边框高亮
    },
    'room': {
      slidingDiscoloration: 1,
      slidingShowLabel: 1,
      slidingStroke: 0
    },
    'cage': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cabinet': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    }
  },
  [TYPE_CAGE]: {
    'space': {
      slidingDiscoloration: 1, // 滑动变色
      slidingShowLabel: 1, // 滑动显示标签
      slidingStroke: 1 // 滑动边框高亮
    },
    'room': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cage': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cabinet': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    }
  },
  [TYPE_CABINET]: {
    'space': {
      slidingDiscoloration: 0, // 滑动变色
      slidingShowLabel: 0, // 滑动显示标签
      slidingStroke: 0 // 滑动边框高亮
    },
    'room': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cage': {
      slidingDiscoloration: 1,
      slidingShowLabel: 1,
      slidingStroke: 1
    },
    'cabinet': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    }
  },
  [TYPE_EQUIPMENT]: {
    'space': {
      slidingDiscoloration: 1, // 滑动变色
      slidingShowLabel: 1, // 滑动显示标签
      slidingStroke: 0 // 滑动边框高亮
    },
    'room': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cage': {
      slidingDiscoloration: 1,
      slidingShowLabel: 1,
      slidingStroke: 1
    },
    'cabinet': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    }
  },
  [TYPE_DOORHANDLE]: {
    'space': {
      slidingDiscoloration: 0, // 滑动变色
      slidingShowLabel: 0, // 滑动显示标签
      slidingStroke: 0 // 滑动边框高亮
    },
    'room': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    },
    'cage': {
      slidingDiscoloration: 1,
      slidingShowLabel: 1,
      slidingStroke: 1
    },
    'cabinet': {
      slidingDiscoloration: 0,
      slidingShowLabel: 0,
      slidingStroke: 0
    }
  }
}
// 房间对象
const roomSizeObjectByModel = {
  [MODEL_ROOM1]: {
    x: 16,
    y: 0.1,
    z: 10
  },
  [MODEL_ROOM2]: {
    x: 11,
    y: 0.1,
    z: 10
  },
  [MODEL_ROOM3]: {
    x: 30,
    y: 0.1,
    z: 10
  }
}
// 颜色相关
const colorObj = {
  // slidingDiscolorationColor: 0x1c69d4, // 鼠标滑动变色的颜色值
  slidingDiscolorationColor: 0x4ed9ff, // 鼠标滑动变色的颜色值
  slidingDiscolorationTransparent: 0.8, // 鼠标滑动变色的透明度
  warningColor: 0xb93333, // 报警红色
  tipsColor: 0xef6b3b, // 警告橙色
  unavailableStatus: 0x636363, // 不可用状态
  selectedStatusStatus: 0x0077FF, // 选中状态
  doorHandleDefaultColor: 0x000000 // 门把手默认颜色
}
export default {
  // 获取常量（模型地址和尺寸系数）
  getConstant (constant = 'SIZE_MULTIPLE') {
    switch (constant) {
      // 换算系数
      case 'SIZE_MULTIPLE':
        return SIZE_MULTIPLE
      // 场地3 MTL
      // case 'SPACE3_MTL':
      //   return SPACE3_MTL
      // // 场地3 OBJ
      // case 'SPACE3_OBJ':
      //   return SPACE3_OBJ
      // 场地3 FBX
      case 'SPACE3_FBX':
        return SPACE3_FBX
      // 机柜通道 1200 MTL
      case 'CAGE_CAGE1200_MTL':
        return CAGE_CAGE1200_MTL
      // 机柜通道 1200 OBJ
      case 'CAGE_CAGE1200_OBJ':
        return CAGE_CAGE1200_OBJ
      // 场景外墙 MTL
      case 'SPACE_WALL_MTL':
        return SPACE_WALL_MTL
      // 场景外墙 OBJ
      case 'SPACE_WALL_OBJ':
        return SPACE_WALL_OBJ
      // 机柜通道 地面 1200 MTL
      case 'CAGE_CAGE1200_GROUND_MTL':
        return CAGE_CAGE1200_GROUND_MTL
      // 机柜通道 地面 1200 OBJ
      case 'CAGE_CAGE1200_GROUND_OBJ':
        return CAGE_CAGE1200_GROUND_OBJ

      // 机柜通道 1800 MTL
      case 'CAGE_CAGE1800_MTL':
        return CAGE_CAGE1800_MTL
      // 机柜通道 1800 OBJ
      case 'CAGE_CAGE1800_OBJ':
        return CAGE_CAGE1800_OBJ
      // 机柜通道 地面 1800 MTL
      case 'CAGE_CAGE1800_GROUND_MTL':
        return CAGE_CAGE1800_GROUND_MTL
      // 机柜通道 地面 1800 OBJ
      case 'CAGE_CAGE1800_GROUND_OBJ':
        return CAGE_CAGE1800_GROUND_OBJ
      // 机柜 门把手 MTL
      case 'CABINET_DOORHANDLE_MTL':
        return CABINET_DOORHANDLE_MTL
      // 机柜 门把手 OBJ
      case 'CABINET_DOORHANDLE_OBJ':
        return CABINET_DOORHANDLE_OBJ
      // 机器 set1 FD机柜 MTL
      case 'CABINET_FD_MTL':
        return CABINET_FD_MTL
      // 机器 set1 FD机柜 obj
      case 'CABINET_FD_OBJ':
        return CABINET_FD_OBJ
      // 机器 set2 UPS mtl
      case 'CABINET_UPS_MTL':
        return CABINET_UPS_MTL
      // 机器 set2 UPS obj
      case 'CABINET_UPS_OBJ':
        return CABINET_UPS_OBJ
      // 机器 set3 空调 mtl
      case 'CABINET_AIRCONDITIONING_MTL':
        return CABINET_AIRCONDITIONING_MTL
      // 机器 set3 空调 obj
      case 'CABINET_AIRCONDITIONING_OBJ':
        return CABINET_AIRCONDITIONING_OBJ
      // 机器 set5 BAT mtl
      case 'CABINET_BAT_MTL':
        return CABINET_BAT_MTL
      // 机器 set5 BAT obj
      case 'CABINET_BAT_OBJ':
        return CABINET_BAT_OBJ
      // 机器 set6 BAS01配电柜 mtl
      case 'CABINET_BAS_MTL':
        return CABINET_BAS_MTL
      // 机器 set6 BAS配电柜 obj
      case 'CABINET_BAS_OBJ':
        return CABINET_BAS_OBJ
      // 机器 set6 BAS02配电柜 mtl
      case 'CABINET_BAS02_MTL':
        return CABINET_BAS02_MTL
      // 机器 set6 BAS02配电柜 obj
      case 'CABINET_BAS02_OBJ':
        return CABINET_BAS02_OBJ
      // 机器 set6 BAS 配电柜2.4尺寸 mtl
      case 'CABINET_BASBIG_MTL':
        return CABINET_BASBIG_MTL
      // 机器 set6 BAS 配电柜2.4尺寸 obj
      case 'CABINET_BASBIG_OBJ':
        return CABINET_BASBIG_OBJ

      // 机器 set6 BAS配电柜 GLB
      case 'CABINET_BAS_GLB':
        return CABINET_BAS_GLB
      // 机器 set6 BAS配电柜 GLTF
      case 'CABINET_BAS_GLTF':
        return CABINET_BAS_GLTF
      // 机器 set6 BAS配电柜 BIN
      case 'CABINET_BAS_BIN':
        return CABINET_BAS_BIN

      // 机器 set7 空调U形1.7 mtl
      case 'CABINET_AIRCONDITIONING7_MTL':
        return CABINET_AIRCONDITIONING7_MTL
      // 机器 set7 空调U形1.7 obj
      case 'CABINET_AIRCONDITIONING7_OBJ':
        return CABINET_AIRCONDITIONING7_OBJ
      // 机器 set7_14 空调U形1.4 mtl
      case 'CABINET_AIRCONDITIONING4_MTL':
        return CABINET_AIRCONDITIONING4_MTL
      // 机器 set7_14 空调U形1.4 obj
      case 'CABINET_AIRCONDITIONING4_OBJ':
        return CABINET_AIRCONDITIONING4_OBJ
      // 机器 set8 机柜 mtl
      case 'CABINET_BOX_MTL':
        return CABINET_BOX_MTL
      // 机器 set8 机柜 obj
      case 'CABINET_BOX_OBJ':
        return CABINET_BOX_OBJ
      // 机器 set8 机柜 门把手 mtl
      case 'CABINET_BOX_DOOR_HANDLE_MTL':
        return CABINET_BOX_DOOR_HANDLE_MTL
      // 机器 set8 机柜 门把手 obj
      case 'CABINET_BOX_DOOR_HANDLE_OBJ':
        return CABINET_BOX_DOOR_HANDLE_OBJ
      // 机器 set8 机柜B mtl
      case 'CABINET_BOXB_MTL':
        return CABINET_BOXB_MTL
      // 机器 set8 机柜B obj
      case 'CABINET_BOXB_OBJ':
        return CABINET_BOXB_OBJ
      // 机器 set14 存储设备 mtl
      case 'CABINET_STORAGE_MTL':
        return CABINET_STORAGE_MTL
      // 机器 set14 存储设备 obj
      case 'CABINET_STORAGE_OBJ':
        return CABINET_STORAGE_OBJ
      // 机器 制冷设备 mtl
      case 'CABINET_REFRIGERATION_MTL':
        return CABINET_REFRIGERATION_MTL
      // 机器 制冷设备 obj
      case 'CABINET_REFRIGERATION_OBJ':
        return CABINET_REFRIGERATION_OBJ
      // 机器 存储设备 mtl
      case 'CABINET_FIREFIGHTING_MTL':
        return CABINET_FIREFIGHTING_MTL
      // 机器 存储设备 obj
      case 'CABINET_FIREFIGHTING_OBJ':
        return CABINET_FIREFIGHTING_OBJ
    }
  },
  // 获取房间大小
  getRoomSize (constant = MODEL_ROOM1) {
    return roomSizeObjectByModel[constant] || {
      x: 3,
      y: 0.1,
      z: 3
    }
  },
  // 获取各种类型的功能配置
  getStatusObj (constant = TYPE_ROOM) {
    return statusObjectByType[constant] || {
      'space': {
        slidingDiscoloration: 0, // 滑动变色
        slidingShowLabel: 0, // 滑动显示标签
        slidingStroke: 0 // 滑动边框高亮
      },
      'room': {
        slidingDiscoloration: 0,
        slidingShowLabel: 0,
        slidingStroke: 0
      },
      'cage': {
        slidingDiscoloration: 0,
        slidingShowLabel: 0,
        slidingStroke: 0
      },
      'cabinet': {
        slidingDiscoloration: 0,
        slidingShowLabel: 0,
        slidingStroke: 0
      }
    }
  },
  // 获取颜色相关常量
  getColor (constant = 'slidingDiscolorationColor') {
    return colorObj[constant]
  }
}