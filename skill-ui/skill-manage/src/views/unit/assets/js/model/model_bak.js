import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const width = window.innerWidth
// const width = document.documentElement.clientWidth - 15 * 2

const height = window.innerHeight
// const height = document.documentElement.clientHeight - 65 - 40 - 15 * 2
// const scene = new THREE.Scene()
export let scene = new THREE.Scene()
export let renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true // - canvas是否包含alpha (透明度)。默认为 false
})
export let labelRenderer = new CSS2DRenderer()
// 相机
export let camera = new THREE.PerspectiveCamera(45,
  width / height,
  //  (document.documentElement.clientWidth - this.gutterGutter * 2) / (document.documentElement.clientHeight - 65 - 40 - this.gutterGutter * 2),
  1, 1000)
//  控制器
export let controls = new OrbitControls(camera, labelRenderer.domElement)
export const init = (dom) => {
  if (!scene) scene = new THREE.Scene()

  if (!renderer) {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // - canvas是否包含alpha (透明度)。默认为 false
    })
  }
  if (!labelRenderer) labelRenderer = new CSS2DRenderer()
  // 相机
  if (!camera) {
    camera = new THREE.PerspectiveCamera(45,
      width / height,
      //  (document.documentElement.clientWidth - this.gutterGutter * 2) / (document.documentElement.clientHeight - 65 - 40 - this.gutterGutter * 2),
      1, 1000)
  }
  //  控制器
  if (!controls) controls = new OrbitControls(camera, labelRenderer.domElement)


  // 加载器
  dom.appendChild(renderer.domElement)
  renderer.setSize(
    width,
    height
  )

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0xeeeeee, 1) // 设置背景色

  labelRenderer.setSize(width, height)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  dom.appendChild(labelRenderer.domElement)

  // 相机
  camera.position.set(-30, 50, 50)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 控制器
  // 上下翻转的最大角度
  controls.maxPolarAngle = Math.PI / 2
  // 上下翻转的最小角度
  // controls.minPolarAngle = 1.5
  // 最大拉远距离
  controls.maxDistance = 125
  controls.minDistance = 1

  // 光源
  const color = 0xf1f1f1
  const color2 = 0xffffff
  const color3 = 0x000000
  // 环境光
  const ambientLight = new THREE.AmbientLight(color, 1)
  scene.add(ambientLight)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(color2, 0.1)
  scene.add(directionalLight)
  // 点光源
  // openAGroupPointLight(-100, 50, 100, 1)


  // 辅助坐标线
  if (process.env.NODE_ENV === 'development') {
    scene.add(new THREE.AxisHelper(1000))
  }
  // scene.add(new THREE.AxisHelper(1000))
}
export const destroy = (dom) => {
  scene = null
  renderer = null
  labelRenderer = null
  camera = null
  controls = null
  dom.innerHTML = ''
}

export const modelUtils = {
  // 射线检测
  radiographicTesting: (event, currentScene, currentCamera) => {
    // console.log('event.clientX', event.clientX)
    // console.log('event.clientY', event.clientY)
    const scene = currentScene
    const camera = currentCamera
    let intersects = []
    // 将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
    // event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, camera)
    intersects = raycaster.intersectObjects(scene.children, true)
    return intersects
  }
}
// 绘制射线(箭头射线)
function drawRay (scene, start, dir) {
  const prevRay = scene.getObjectByName('customRay')
  if (prevRay) {
    scene.remove(prevRay)
  }

  const arrow = new THREE.ArrowHelper(dir, start, 1000, 0x0000ff)
  arrow.name = 'customRay'
  scene.add(arrow)
}
// 初始化控制器
// const initControls = (controls) => {
//   controls = new OrbitControls(camera, renderer.domElement)
//   // 上下翻转的最大角度
//   this.controls.maxPolarAngle = Math.PI / 2
//   // 上下翻转的最小角度
//   // controls.minPolarAngle = 1.5
//   this.controls.maxDistance = 150
//   // 监听鼠标、键盘事件
//   this.controls.addEventListener('change', (render) => {
//     this.lastEvent = 'change'
//     this.render()
//   })
// }
// // 初始化光源
// const initLight = () => {
//   const color = 0xf1f1f1
//   // const color = 0xffffff
//   const Light = new THREE.Light()
//   // this.scene.add(Light)
//   // 环境光
//   const ambientLight = new THREE.AmbientLight(color, 1)
//   this.scene.add(ambientLight)
//   // 点光源
//   // this.openAGroupPointLight(-100, 50, 100, 1)
//   // this.openPointLight(-100, 10, 100, 1)
// }
// open a group point light
const openAGroupPointLight = (distanceX = 6000, distanceY = distanceX, distanceZ = distanceX, strength = 0.5, color = 0xf1f1f1) => {
  openPointLight(distanceX, distanceY, distanceZ)
  openPointLight(-distanceX, distanceY, distanceZ)
  openPointLight(distanceX, distanceY, -distanceZ)
  openPointLight(-distanceX, distanceY, -distanceZ)
}
// open point light
const openPointLight = (distanceX = 6000, distanceY = distanceX, distanceZ = distanceX, strength = 0.5, color = 0xf1f1f1) => {
  const light = new THREE.PointLight(color, strength)
  light.position.set(distanceX, distanceY, distanceZ)
  scene.add(light)
}
