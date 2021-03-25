<template>
  <div>
    <div ref="container" class="container"></div>
    <div class="console">
      <div class="help">
        帮助：<br />
        快捷键：<br />
        <ul>
          <li>A\&larr;，逆时针转</li>
          <li>D\&rarr;，顺时针转</li>
          <li>W\&uarr;，放大</li>
          <li>S\&darr;，缩小</li>
          <li>Q，左平移</li>
          <li>E，右平移</li>
          <li>R，上旋</li>
          <li>F，下旋</li>
        </ul>
      </div>
      <div class="info">
        log info: <br />
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
// ES modules
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { MTLLoader } from 'three/examples/jsm/controls/MTLLoader.js'
// import { OBJLoader } from 'three/examples/jsm/controls/OBJLoader.js'
// import { FBXLoader } from 'three/examples/jsm/controls/FBXLoader.js'

export default {
  name: 'SceneAnimation',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      mouse: null,
      raycaster: null,
      group: null,
      modelList: []
    }
  },
  mounted () {
    // this.init()
    // this.animate()
    // this.initAnimate()
    // this.initEventListener()
    // this.animate()
  },
  methods: {
    initEventListener () {
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()
      window.addEventListener('click', (event) => {
        const list = this.utils.model(event, this.scene, this.camera)
        console.log('list', list)
        // for (let i = 0; i < list.length; i++) {
        //   list[i].object.material.color.set(0xff0000)
        // }
        // if (list[0].object.material.color = ) {

        // }
        // console.log('list[0].object.material.color.get()', list[0].object.material.color.b)

        list[0].object.material.color.set(0xff0000)
        this.render()
      }, false)
    },
    // init
    initAnimate () {
      // this.group = new THREE.Group()
      // this.scene.add(this.group)
      this.geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
      this.material = new THREE.MeshNormalMaterial()
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)
    },
    animate () {
      requestAnimationFrame(this.animate)

      this.modelList[0].rotation.x += 0.01
      this.modelList[0].rotation.y += 0.02

      this.renderer.render(this.scene, this.camera)
    },
    init () {
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.$refs.container.appendChild(this.renderer.domElement)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xeeeeee, 1) // 设置背景色

      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      // this.camera.position.z = 5
      // this.camera.position.set(200, 200, 550)
      this.camera.position.set(0, 0, 500)
      // this.camera.lookAt(0, 0, 0)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))


      // 控制器
      const controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 监听鼠标、键盘事件
      controls.addEventListener('change', (render) => {
        this.render()
      })

      // 初始化场景
      this.scene = new THREE.Scene()
      // this.LineBasicMaterial()


      const Light = new THREE.Light()
      this.scene.add(Light)
      // 点光源
      const light = new THREE.PointLight(0xf1f1f1)
      const light2 = new THREE.PointLight(0xf1f1f1)
      const light3 = new THREE.PointLight(0xf1f1f1)
      const light4 = new THREE.PointLight(0xf1f1f1)
      light.position.set(600, 200, 600)
      light2.position.set(600, 200, -600)
      light3.position.set(-600, 200, 600)
      light4.position.set(-600, 200, -600)
      this.scene.add(light)
      this.scene.add(light4)

      // this.group = new THREE.Group()
      // console.log('THIS.GROUP', this.group)

      const loader = new GLTFLoader()
      loader.load('/three/glb/1.glb', (gltf) => {
        console.log('gltf1', gltf)
        gltf.scene.position.x = 125
        gltf.scene.position.y = 0
        gltf.scene.position.z = 0
        this.modelList.push(gltf.scene)
        this.scene.add(gltf.scene)
        // const object1 = gltf.scene.clone()
        // object1.position.x = 50
        // object1.position.y = 100
        // // meshObject1.rotateX = 30
        // // meshObject1.rotateY = 30
        // this.scene.add(object1)
        // this.group.add(gltf.scene)
        this.render()

        // const mixer = new THREE.AnimationMixer(gltf)
        // console.log('gltf', gltf)
        // console.log(gltf.animations.length)
        // // gltf.animations[1].setEnabled()
        // console.log('mixer.clipAction(gltf.animations[0], gltf)', mixer.clipAction(gltf.animations[0], gltf))
        // mixer.clipAction(gltf.animations[0], gltf).play()
      }, undefined, function (error) {
        console.error(error)
      })
      // const loader2 = new GLTFLoader()
      loader.load('/three/glb/1.glb', (gltf) => {
        console.log('gltf1', gltf)
        gltf.scene.position.x = 150
        gltf.scene.position.y = 100
        this.scene.add(gltf.scene)
        // this.modelList.push(gltf.scene)
        // this.group.add(gltf.scene)

        this.render()
      }, undefined, function (error) {
        console.error(error)
      })
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="less" scoped>
.container { width: 100%; height: 500px; display: inline-block; float: left;}
.console {width: 100%; height: 20%; display: inline-block; float: right;}
.help { width: 49%; height: 100%; display: inline-block; float: left; overflow:hide; margin: 0; padding: 0; border-right: 1px solid #000;}
.info { width: 49%; height: 100%; display: inline-block; float: right; overflow-y:scroll;}
.help ul { list-style: none; margin: 0; padding: 0;}
.help ul li { list-style: none; width: 45%; display: inline-block;}
</style>
