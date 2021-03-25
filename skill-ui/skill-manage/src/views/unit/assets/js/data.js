// 返回的场景数据示例
// this.setPositionAndRotation(room1, -21.5, -0.05, 0)
//       this.setPositionAndRotation(room2, -8.1, -0.05, 0)
//       this.setPositionAndRotation(room3, 12.5, -0.05, 0)
const BOX_WIDTH = 0.8
function addBox (pId = 'pId') {
  const list = []
  for (let i = 0; i < 9; i++) {
    list.push({
      id: pId + '_cabinet' + i, // id
      pId: pId,
      pModel: 'cageA', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetBOX', // 型号
      position: { // 坐标
        x: 3.2 - BOX_WIDTH * i,
        y: 0,
        z: 1.2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 3, // 温度 摄氏度
        available: i === 2 ? '2' : '1' // 可用状态
      },
      children: [
        {
          id: pId + '_cabinet' + i + 'unit', // id
          pId: pId + '_cabinet' + i,
          pModel: '', // 所属
          type: 'unit', // 类型 【机柜】
          model: '', // 型号
          position: { // 坐标
            x: 3.2 - BOX_WIDTH * i,
            y: 0,
            z: 1.2
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: 0,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3, // 温度 摄氏度
            available: i === 2 ? '2' : '1' // 可用状态
          }
        }
      ]
    })
    list.push({
      id: 'IDDMDMDAL-SKSAKD3-cabinetFD1', // id
      pId: pId,
      pModel: 'cageA', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetBOX', // 型号
      position: { // 坐标
        x: 3.2 - BOX_WIDTH * i,
        y: 0,
        z: -1.2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 3, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    })
  }
  return list
}
function addBox2 (pId = 'pId') {
  const list = []
  for (let i = 0; i < 9; i++) {
    list.push({
      id: 'IDDMDMDAL-SKSAKD3-cabinetFD1', // id
      pId: pId,
      pModel: 'cageB', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetBOX', // 型号
      position: { // 坐标
        x: 3.2 - BOX_WIDTH * i,
        y: 0,
        z: 1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 3, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    })
    list.push({
      id: 'IDDMDMDAL-SKSAKD3-cabinetFD1', // id
      pId: pId,
      pModel: 'cageB', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetBOX', // 型号
      position: { // 坐标
        x: 3.2 - BOX_WIDTH * i,
        y: 0,
        z: -1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 3, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    })
  }
  return list
}
// addBox2()

// 场景内模型数据wys
const SPACE2 = {
  id: 'dkdflal', // id
  pId: '',
  pModel: '',
  type: 'space',
  model: 'space',
  position: { // 坐标
    x: 0,
    y: 0,
    z: 0
  },
  rotation: { // 旋转角度 0 ~ 2Π
    x: 0,
    y: 0,
    z: 0
  },
  status: { // 状态
    temperature: 65, // 温度 摄氏度
    water: 3,
    available: '1' // 可用状态
  },
  children: [
    {
      id: 'idroom1', // id
      pId: 'idroom1', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room1', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: -21.3,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [

        {
          id: 'idroom1cageA1', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: -0.2,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA1')
        },
        {
          id: 'idroom1cageA2', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: -5,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA2')
        },
        {
          id: 'idroom1cageA3', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 4.6,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA3')
        }

      ]
    },


    {
      id: 'idroom2', // id
      pId: 'dkdflal', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room2', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: -8,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [
        {
          id: 'idroom2cageA1', // id
          pId: 'idroom2',
          pModel: 'room2',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: -2.4,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom2cageA1')
        },
        {
          id: 'idroocm2ageA2', // id
          pId: 'idroom2',
          pModel: 'room2',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 2.4,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroocm2ageA2')
        }
      ]
    },

    {
      id: 'idroom3', // id
      pId: 'dkdflal', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room3', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: 12.5,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [
        {
          id: 'idroom3cageA1', // id
          pId: 'idroom3',
          pModel: 'room3',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageB', // 型号
          position: { // 坐标
            x: -3.875,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox2('idroom3cageA1')
        },
        {
          id: 'idroom3cageA2', // id
          pId: 'idroom3',
          pModel: 'room3',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 1.225,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom3cageA2')
        },
        {
          id: 'idroom3cageA3', // id
          pId: 'idroom3',
          pModel: 'room3',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 6,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom3cageA3')
        },
        {
          id: 'idroom3cageA4', // id
          pId: 'idroom3',
          pModel: 'room3',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageB', // 型号
          position: { // 坐标
            x: 11.7,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox2('idroom3cageA4')
        }
      ]
    },
    // 存储设备
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'other', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: -1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: -1
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: 1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: 2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 3,
        y: 0,
        z: -1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 3,
        y: 0,
        z: -1
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 3,
        y: 0,
        z: 1.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetSTORAGE', // 型号
      position: { // 坐标
        x: 3,
        y: 0,
        z: 2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 配电柜
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -5.5
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -4.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -4.1
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -3.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -2.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: -2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -31,
        y: 0,
        z: -2
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // FD机柜
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetFD', // 型号
      position: { // 坐标
        x: -25,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
        id: 'IDDMDMDAL-SKSAKD3', // id
        pId: 'dkdflal',
        fModel: 'space', // 所属
        type: 'cabinet', // 类型 【机柜通道】
        model: 'cabinetAIRCONDITIONING', // 型号
        position: { // 坐标
          x: -21,
          y: 0,
          z: -8.95
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 2, // 温度 摄氏度
          available: '1' // 可用状态
        },
        children: []
    },
    // UPS
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetUPS', // 型号
      position: { // 坐标
        x: -17,
        y: 0,
        z: -10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: -12.1,
        y: 0,
        z: -9.45
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -9.8,
        y: 0,
        z: -10.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -9.2,
        y: 0,
        z: -10.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8.6,
        y: 0,
        z: -10.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8,
        y: 0,
        z: -10.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -7.4,
        y: 0,
        z: -10.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -9.8,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -9.2,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8.6,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -7.4,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: -5.85,
        y: 0,
        z: -9.45
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -3.6,
        y: 0,
        z: -10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -3,
        y: 0,
        z: -10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -2.4,
        y: 0,
        z: -10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.8,
        y: 0,
        z: -10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.2,
        y: 0,
        z: -10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
     // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -3.6,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -3,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -2.4,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.8,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.2,
        y: 0,
        z: -8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 0.8,
        y: 0,
        z: -8.95
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // UPS
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetUPS', // 型号
      position: { // 坐标
        x: 4,
        y: 0,
        z: -10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 11.9,
        y: 0,
        z: -10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 11.9,
        y: 0,
        z: -8.95
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 机柜单独
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 15.3,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 16.1,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 16.9,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 17.7,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 18.5,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 19.3,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 20.1,
        y: 0,
        z: -9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.7 右到左
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 24.1,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 16.3,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 10.7,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 1.9,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.4
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING4', // 型号
      position: { // 坐标
        x: -5.8,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING4', // 型号
      position: { // 坐标
        x: -10.25,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING4', // 型号
      position: { // 坐标
        x: -14.75,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.7
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: -20.2,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: -25.6,
        y: 0,
        z: -5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.7 下 右向左
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 24.1,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 16.3,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 10.7,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: 1.9,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.4
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING4', // 型号
      position: { // 坐标
        x: -5.8,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING4', // 型号
      position: { // 坐标
        x: -14.75,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调U形（走廊）1.7
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: -20.2,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetAIRCONDITIONING7', // 型号
      position: { // 坐标
        x: -25.6,
        y: 0,
        z: 5.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 配电柜
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 2.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 3.3
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 4.7
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 5.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -34.2,
        y: 0,
        z: 6.1
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAS', // 型号
      position: { // 坐标
        x: -31,
        y: 0,
        z: 2.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // // BAS
    // {
    //   id: 'CAGE0', // id
    //   pId: 'dkdflal',
    //   fModel: 'space', // 所属
    //   type: 'cabinet', // 类型 【机柜】
    //   model: 'cabinetBAS', // 型号
    //   position: { // 坐标
    //     x: -22,
    //     y: 0,
    //     z: 9.4
    //   },
    //   rotation: { // 旋转角度 0 ~ 2Π
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   status: { // 状态
    //     temperature: 65, // 温度 摄氏度
    //     water: 6, // 温度 摄氏度
    //     available: '1' // 可用状态
    //   },
    //   children: []
    // },
    // FD
    {
      id: 'CAGE0', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜】
      model: 'cabinetFD', // 型号
      position: { // 坐标
        x: -18.6,
        y: 0,
        z: 9.8
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 6, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // UPS
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetUPS', // 型号
      position: { // 坐标
        x: -13.6,
        y: 0,
        z: 10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: -9.65,
        y: 0,
        z: 8.925
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8.1,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -7.5,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -6.9,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -6.3,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -5.7,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -8.1,
        y: 0,
        z: 11
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -7.5,
        y: 0,
        z: 11
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -6.9,
        y: 0,
        z: 11
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -6.3,
        y: 0,
        z: 11
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -5.7,
        y: 0,
        z: 11
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: -3.5,
        y: 0,
        z: 9.45
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.9,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.3,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -0.7,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -0.1,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: 8.4
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: -Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // BAT
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.9,
        y: 0,
        z: 10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -1.3,
        y: 0,
        z: 10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -0.7,
        y: 0,
        z: 10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: -0.1,
        y: 0,
        z: 10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBAT', // 型号
      position: { // 坐标
        x: 0.5,
        y: 0,
        z: 10.6
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 2.7,
        y: 0,
        z: 9.45
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // UPS
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetUPS', // 型号
      position: { // 坐标
        x: 8,
        y: 0,
        z: 10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI / 2,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 11.55,
        y: 0,
        z: 8.95
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 机柜单独
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 13.7,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 14.5,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 15.3,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 16.1,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 16.9,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 17.7,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetBOXB', // 型号
      position: { // 坐标
        x: 18.5,
        y: 0,
        z: 9.9
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    // 空调
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 24.1,
        y: 0,
        z: 8.95
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    },
    {
      id: 'IDDMDMDAL-SKSAKD3', // id
      pId: 'dkdflal',
      fModel: 'space', // 所属
      type: 'cabinet', // 类型 【机柜通道】
      model: 'cabinetAIRCONDITIONING', // 型号
      position: { // 坐标
        x: 24.1,
        y: 0,
        z: 10
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: Math.PI,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 2, // 温度 摄氏度
        available: '1' // 可用状态
      },
      children: []
    }
    // 机柜通道 数据中心部分
    // 场地结束

  ]
}

// md
const SPACE = {
  id: 'dkdflal', // id
  pId: '',
  pModel: '',
  type: 'space',
  model: 'space',
  position: { // 坐标
    x: 0,
    y: 0,
    z: 0
  },
  rotation: { // 旋转角度 0 ~ 2Π
    x: 0,
    y: 0,
    z: 0
  },
  status: { // 状态
    temperature: 65, // 温度 摄氏度
    water: 3,
    available: '1' // 可用状态
  },
  children: [
    {
      id: 'idroom1', // id
      pId: 'dkdflal', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room1', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: -21.5,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [

        {
          id: 'idroom1cageA1', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 0,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA1')
        },
        {
          id: 'idroom1cageA2', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: -5,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA2')
        },
        {
          id: 'idroom1cageA3', // id
          pId: 'idroom1',
          pModel: 'room1',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 5,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom1cageA3')
        }

      ]
    },


    {
      id: 'idroom2', // id
      pId: 'dkdflal', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room2', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: -8.1,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [
        {
          id: 'idroom2cage1', // id
          pId: 'idroom2',
          pModel: 'room2',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageB', // 型号
          position: { // 坐标
            x: -2.5,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom2cage1')
        },
        {
          id: 'idroom2cage2', // id
          pId: 'idroom2',
          pModel: 'room2',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 2.5,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom2cage2')
        }
      ]
    },

    {
      id: 'idroom3', // id
      pId: 'dkdflal', // 父级的id
      pModel: 'space', // 父级的型号
      type: 'room', // 类型 房间
      model: 'room3', // 型号 房间一
      position: { // 坐标 房间的坐标可以没有
        x: 12.5,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 1, // 水位
        available: '1' // 可用状态
      },
      children: [
        {
          id: 'idroom3cage1', // id
          pId: 'idroom3',
          pModel: 'room3',
          type: 'cage', // 类型 【机柜通道】
          model: 'cageA', // 型号
          position: { // 坐标
            x: 0,
            y: 0,
            z: 0
          },
          rotation: { // 旋转角度 0 ~ 2Π
            x: 0,
            y: Math.PI / 2,
            z: 0
          },
          status: { // 状态
            temperature: 65, // 温度 摄氏度
            water: 3,
            available: '1' // 可用状态
          },
          children: addBox('idroom3cage1')
        }
      ]
    }

    // 机柜通道 数据中心部分
    // 场地结束

  ]
}
// 返回的模型数据示例
const MODEL_DEMO = {
  id: 'CAGE0', // id
  pId: 'dkdflal',
  type: 'cabinet', // 类型 【机柜】
  model: 'cabinetAas', // 型号
  status: { // 状态
    temperature: 65, // 温度 摄氏度
    water: 3,
    available: '1' // 可用状态
  },
  position: { // 坐标
    x: 0,
    y: 0,
    z: 0.7
  },
  rotation: { // 旋转角度 0 ~ 2Π
    x: 0,
    y: 0,
    z: 0
  },
  children: []
}


// （这个不是示例）
const MODEL = {
  'TEST':
  {
    id: 'idcageA1', // id
    pId: '',
    pModel: '',
    type: 'TEST', // 类型 【机柜通道】
    model: 'TEST', // 型号
    position: { // 坐标
      x: 0,
      y: 0,
      z: -5
    },
    rotation: { // 旋转角度 0 ~ 2Π
      x: 0,
      y: 0,
      z: 0
    },
    status: { // 状态
      temperature: 65, // 温度 摄氏度
      water: 3,
      available: '1' // 可用状态
    },
    children: [
      {
        id: 'idroom1', // id
        pId: 'dkdflal', // 父级的id
        pModel: 'space', // 父级的型号
        type: 'room', // 类型 房间
        model: 'room1', // 型号 房间一
        position: { // 坐标 房间的坐标可以没有
          x: -21.5,
          y: 0,
          z: 0
        },
        rotation: { // 旋转角度 0 ~ 2Π 房间的角度可以没有
          x: 0,
          y: 0,
          z: 0
        },
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 1, // 水位
          available: '1' // 可用状态
        },
        children: [
          {
            id: 'idcageA1', // id
            pId: 'idroom1',
            pModel: 'room1',
            type: 'cage', // 类型 【机柜通道】
            model: 'cageA', // 型号
            position: { // 坐标
              x: 0,
              y: 0,
              z: -4.2
            },
            rotation: { // 旋转角度 0 ~ 2Π
              x: 0,
              y: Math.PI / 2,
              z: 0
            },
            status: { // 状态
              temperature: 65, // 温度 摄氏度
              water: 3,
              available: '1' // 可用状态
            },
            children: [
              {
                id: 'IDDMDMDAL-SKSAKD3-cabinetFD1', // id
                pId: 'dkdflal',
                pModel: 'cageA', // 所属
                type: 'cabinet', // 类型 【机柜】
                model: 'cabinetBOX', // 型号
                position: { // 坐标
                  x: -0.5,
                  y: 0,
                  z: -2.9
                },
                rotation: { // 旋转角度 0 ~ 2Π
                  x: 0,
                  y: Math.PI / 2,
                  z: 0
                },
                status: { // 状态
                  temperature: 65, // 温度 摄氏度
                  water: 3, // 温度 摄氏度
                  available: '1' // 可用状态
                },
                children: []
              }

            ]
          }

        ]
      }

    ]
  },
  'TEST2':
    {
      id: 'idcageA1', // id
      pId: 'idroom1',
      pModel: 'room1',
      type: 'cage', // 类型 【机柜通道】
      model: 'cageA', // 型号
      position: { // 坐标
        x: 0,
        y: 0,
        z: 0
      },
      rotation: { // 旋转角度 0 ~ 2Π
        x: 0,
        y: 0,
        z: 0
      },
      status: { // 状态
        temperature: 65, // 温度 摄氏度
        water: 3,
        available: '1' // 可用状态
      },
      children: addBox('idroom1cageA1')

  },
  'IDDMDMDAL-SKSAKD1': {
    id: 'IDDMDMDAL-SKSAKD1', // id
    pId: 'dkdflal',
    type: 'cage', // 类型 【机柜通道】
    model: 'cageA', // 型号
    position: { // 坐标
      x: 2,
      y: 0,
      z: 0
    },
    rotation: { // 旋转角度 0 ~ 2Π
      x: 0,
      y: 0,
      z: 0
    },
    status: { // 状态
      temperature: 65, // 温度 摄氏度
      water: 3,
      available: '1' // 可用状态
    },
    children: [
      {
        id: 'CAGE1', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: 1,
          y: 0,
          z: 1
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        children: []
      },
      {
        id: 'CAGE2', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: 1,
          y: 0,
          z: 2
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        }
      },
      {
        id: 'CAGE3', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: -1,
          y: 0,
          z: 1
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        }
      },
      {
        id: 'CAGE4', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: -1,
          y: 0,
          z: 2
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        }
      }
    ]
  },
  'IDDMDMDAL-SKSAKD2': {
    id: 'IDDMDMDAL-SKSAKD2', // id
    pId: 'dkdflal',
    type: 'cage', // 类型 【机柜通道】
    model: 'cageA', // 型号
    position: { // 坐标
      x: 6,
      y: 0,
      z: 0
    },
    rotation: { // 旋转角度 0 ~ 2Π
      x: 0,
      y: 0,
      z: 0
    },
    status: { // 状态
      temperature: 65, // 温度 摄氏度
      water: 3,
      available: '1' // 可用状态
    },
    children: [
      {
        id: 'CAGE1', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: 1,
          y: 0,
          z: 1
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        children: []
      },
      {
        id: 'CAGE2', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: 1,
          y: 0,
          z: 2
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        children: []
      },
      {
        id: 'CAGE3', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: -1,
          y: 0,
          z: 1
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        children: []
      },
      {
        id: 'CAGE4', // id
        type: 'cabinet', // 类型 【机柜】
        model: 'aas', // 型号
        status: { // 状态
          temperature: 65, // 温度 摄氏度
          water: 3,
          available: '1' // 可用状态
        },
        position: { // 坐标
          x: -1,
          y: 0,
          z: 2
        },
        rotation: { // 旋转角度 0 ~ 2Π
          x: 0,
          y: 0,
          z: 0
        },
        children: []
      }
    ]
  },
  'IDDMDMDAL-SKSAKD3': {
    id: 'IDDMDMDAL-SKSAKD3', // id
    pId: 'dkdflal',
    type: 'cage', // 类型 【机柜通道】
    model: 'cageA', // 型号
    position: { // 坐标
      x: 0,
      y: 0,
      z: 0
    },
    rotation: { // 旋转角度 0 ~ 2Π
      x: 0,
      y: 0,
      z: 0
    },
    status: { // 状态
      temperature: 65, // 温度 摄氏度
      water: 3,
      available: '1' // 可用状态
    },
    children: [
      // {
      //   id: 'CAGE1', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetFD', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: -28,
      //     y: 0,
      //     z: -10
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: 0,
      //     z: 0
      //   },
      //   children: []
      // },
      // {
      //   id: 'CAGE2', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetFD', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: -7,
      //     y: 0,
      //     z: 2
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: 0,
      //     z: 0
      //   },
      //   children: []
      // },
      // {
      //   id: 'CAGE3', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetFD', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: -5,
      //     y: 0,
      //     z: 0
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: Math.PI / -2,
      //     z: 0
      //   },
      //   children: []
      // },
      // {
      //   id: 'CAGE4', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetAas', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: 1,
      //     y: 0,
      //     z: 0
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: Math.PI / -2,
      //     z: 0
      //   },
      //   children: []
      // },
      // {
      //   id: 'CAGE5', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetAas', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: 2,
      //     y: 0,
      //     z: 0
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: Math.PI / -2,
      //     z: 0
      //   },
      //   children: []
      // },
      // {
      //   id: 'CAGE5', // id
      //   type: 'cabinet', // 类型 【机柜】
      //   model: 'cabinetAas', // 型号
      //   status: { // 状态
      //     temperature: 65, // 温度 摄氏度
      //     water: 3,
      //     available: '1' // 可用状态
      //   },
      //   position: { // 坐标
      //     x: 3,
      //     y: 0,
      //     z: 0
      //   },
      //   rotation: { // 旋转角度 0 ~ 2Π
      //     x: 0,
      //     y: Math.PI / -2,
      //     z: 0
      //   },
      //   children: []
      // }
    ]
  },
  'CAGE0': {
    id: 'CAGE0', // id
    pId: 'dkdflal',
    type: 'cabinet', // 类型 【机柜】
    model: 'cabinetFD', // 型号
    status: { // 状态
      temperature: 65, // 温度 摄氏度
      water: 3,
      available: '1' // 可用状态
    },
    position: { // 坐标
      x: 20,
      y: 0,
      z: 0
    },
    rotation: { // 旋转角度 0 ~ 2Π
      x: 0,
      y: 0,
      z: 0
    },
    children: []
  }
}
export default {
  // 查询场地
  querySpace () {
    // 需要的数据
    // return SPACE // 不全的模型
    return SPACE2 // 全的模型
  },
  // 查询模型
  queryModel (id) {
    // 需要的数据  queryModel('IDDMDMDAL-SKSAKD1') => MODEL.IDDMDMDAL-SKSAKD1
    return MODEL[id] || null
  }
}

