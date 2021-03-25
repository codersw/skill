import * as THREE from 'three'
// 有误差
const STEP_TIME = 16 // 两次方法执行的时间间隔（毫秒）   （多少毫秒一次）
const STEP_TIMES = 1000 / STEP_TIME // 一秒内执行的次数  （每秒次数）
const SLOWEST_TIME = 0.1 // 整个动画允许的最慢秒数         （最大时间）
const MIN_STEP = 1 // 每次位置移动的默认距离              （距离）
const MAX_DISTANCE = MIN_STEP * STEP_TIMES * SLOWEST_TIME // 以默认步进移动能达到的距离
let count = 0
let count2 = 0
const animation = {
  // 控制器位置动画
  controlPosition: (
    control,
    start = {x: 0, y: 0, z: 0},
    end = {x: 0, y: 0, z: 0},
    step = {
      // Math.abs(end.y - start.y) > MAX_DISTANCE 判断是否需要调整每一步的 长度
      // (end.x - start.x) / STEP_TIMES * SLOWEST_TIME 新的 每次移动距离
      // 计算的结果为绝对值
      x: Math.abs(end.x - start.x) > MAX_DISTANCE ? Math.abs(end.x - start.x) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP,
      y: Math.abs(end.y - start.y) > MAX_DISTANCE ? Math.abs(end.y - start.y) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP,
      z: Math.abs(end.z - start.z) > MAX_DISTANCE ? Math.abs(end.z - start.z) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP
    }
  ) => {
    return new Promise((resolve, reject) => {
      count++
      const currentControl = {
        x: control.target.x,
        y: control.target.y,
        z: control.target.z
      }
      currentControl.x = Math.abs(end.x - currentControl.x) < Math.abs(step.x * 2) ? end.x : end.x > currentControl.x ? currentControl.x + step.x : currentControl.x - step.x
      currentControl.y = Math.abs(end.y - currentControl.y) < Math.abs(step.y * 2) ? end.y : end.y > currentControl.y ? currentControl.y + step.y : currentControl.y - step.y
      currentControl.z = Math.abs(end.z - currentControl.z) < Math.abs(step.z * 2) ? end.z : end.z > currentControl.z ? currentControl.z + step.z : currentControl.z - step.z
      control.target = new THREE.Vector3(currentControl.x, currentControl.y, currentControl.z)
      if (
        end.x === currentControl.x &&
        end.y === currentControl.y &&
        end.z === currentControl.z ||
        count > Math.floor(SLOWEST_TIME * STEP_TIMES - 1) // 理论上这里的条件是 SLOWEST_TIME * STEP_TIMES - 1 向下取整
      ) {
        count = 0
        control.update()
        console.log('end')
        resolve()
        return
      }
      // control.update()
      // const xStep = (xEndControls - startX) / 10
      setTimeout(() => {
        resolve(animation.controlPosition(control, start, end, step))
      }, STEP_TIME)
    })
  },
  // 相机位置动画
  cameraPosition: (
    camera,
    control,
    start = {x: 0, y: 0, z: 0},
    end = {x: 0, y: 0, z: 0},
    step = {
      // Math.abs(end.y - start.y) > MAX_DISTANCE 判断是否需要调整每一步的 长度
      // (end.x - start.x) / STEP_TIMES * SLOWEST_TIME 新的 每次移动距离
      // 计算的结果为绝对值
      x: Math.abs(end.x - start.x) > MAX_DISTANCE ? Math.abs(end.x - start.x) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP,
      y: Math.abs(end.y - start.y) > MAX_DISTANCE ? Math.abs(end.y - start.y) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP,
      z: Math.abs(end.z - start.z) > MAX_DISTANCE ? Math.abs(end.z - start.z) / (STEP_TIMES * SLOWEST_TIME) : MIN_STEP
    }
  ) => {
    return new Promise((resolve, reject) => {
      count2++
      const currentCamera = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      }

      currentCamera.x = Math.abs(end.x - currentCamera.x) < Math.abs(step.x * 2) ? end.x : end.x > currentCamera.x ? currentCamera.x + step.x : currentCamera.x - step.x
      currentCamera.y = Math.abs(end.y - currentCamera.y) < Math.abs(step.y * 2) ? end.y : end.y > currentCamera.y ? currentCamera.y + step.y : currentCamera.y - step.y
      currentCamera.z = Math.abs(end.z - currentCamera.z) < Math.abs(step.z * 2) ? end.z : end.z > currentCamera.z ? currentCamera.z + step.z : currentCamera.z - step.z

      camera.position.set(currentCamera.x, currentCamera.y, currentCamera.z)
      control.update()
      if (
        end.x === currentCamera.x &&
        end.y === currentCamera.y &&
        end.z === currentCamera.z ||
        count2 > Math.floor(SLOWEST_TIME * STEP_TIMES - 1)
      ) {
        count2 = 0
        control.update()
        console.log('end2')
        resolve()
        return
      }
      // const xStep = (xEndControls - startX) / 10
      setTimeout(() => {
        resolve(animation.cameraPosition(camera, control, start, end, step))
      }, STEP_TIME)
    })
  },
  // 控制器和相机位置动画
  controlAndCameraPosition: (
    control,
    startControl,
    endControl,
    camera,
    startCamera,
    endCamera
  ) => {
    return Promise.all([
      animation.controlPosition(control, startControl, endControl),
      animation.cameraPosition(camera, control, startCamera, endCamera)
    ])
  }
}
export default animation