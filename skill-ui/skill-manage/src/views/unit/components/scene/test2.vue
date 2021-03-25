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
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
export default {
  name: 'Scene',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      modelList: [] // 装模型的数组
    }
  },
  mounted () {
    this.init()
    // this.animate()
  },
  methods: {
    init () {
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.$refs.container.appendChild(this.renderer.domElement)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xeeeeee, 1) // 设置背景色

      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      // this.camera.position.z = 5
      this.camera.position.set(200, 200, 550)
      this.camera.lookAt(0, 0, 0)

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

      // this.geometry = new THREE.BoxGeometry(3, 3, 3)
      // this.material = new THREE.MeshNormalMaterial()

      // this.mesh = new THREE.Mesh(this.geometry, this.material)
      // this.mesh.rotation.x = 2.5
      // this.mesh.rotation.y = 2.5
      // this.scene.add(this.mesh)

      // const loader = new GLTFLoader()
      // loader.load('/three/obj/1.glb', (gltf) => {
      //   console.log(gltf)
      //   gltf.scene.position.x = 250
      //   this.modelList.push(gltf.scene)
      //   this.scene.add(gltf.scene)
      //   this.animate()
      //   // this.render()
      // }, undefined, function (error) {
      //   console.error(error)
      // })
      const mtlLoader = new MTLLoader()

      mtlLoader.load('/three/obj/ok.mtl', materials => {
        console.log(materials)
        materials.preload()

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('/three/obj/ok.obj', object => {
          // object.scene.position.x = 250
          object.position.y = 60
          // object.scale.set(0.05,0.05,0.05);
            this.scene.add(object)
        })
      })
      // const OJBLoader = new OBJLoader2()
      // OJBLoader.load('/three/obj/model.obj', (object) => {
      //   object.scale.set(20, 20, 20)
      //   object.position.x = 0
      //   object.position.y = 0
      //   object.rotateX = 30
      //   object.rotateY = 30
      //   this.scene.add(object)
      //   this.render()
      //   console.log('this.scene', this.scene)
      // })
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    // create a blue LineBasicMaterial
    LineBasicMaterial () {
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      const points = []
      points.push(new THREE.Vector3(-10, 0, 0))
      points.push(new THREE.Vector3(0, 10, 0))
      points.push(new THREE.Vector3(10, 0, 0))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, material)
      this.scene.add(line)
      this.render()
    },
    animate () {
      requestAnimationFrame(this.animate)

      this.modelList[0].rotation.x += 0.01
      this.modelList[0].position.x += 0.1

      this.render()
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
