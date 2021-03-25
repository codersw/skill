<template>
  <div ref="container" style="margin:-15px"></div>
</template>

<script>
import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

const scene = new THREE.Scene()
// const labelRenderer = new CSS2DRenderer()
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true // - canvas是否包含alpha (透明度)。默认为 false
})
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  //  (document.documentElement.clientWidth - this.gutterGutter * 2) / (document.documentElement.clientHeight - 65 - 40 - this.gutterGutter * 2),
  2, 1000
)
const controls = new OrbitControls(camera, renderer.domElement)
const composer = new EffectComposer(renderer)
const mtlLoader = new MTLLoader()
export default {
  name: 'Scenetest',
  data () {
    return {
      skip: 0,
      // mouse: new THREE.Vector2(),
      // raycaster: new THREE.Raycaster(),
      mtlLoader,
      scene,
      renderer,
      // labelRenderer,
      controls,
      composer,
      camera
    }
  },
  created () {
    this.initLoader()
  },
  mounted () {
    this.initRenderer()
    this.initCamera()
    // this.initEffectComposer()
    this.loadModelOBJ('/three/obj/room7Bx2.obj', '/three/obj/room7Bx2.mtl') // 加载机柜通道
    this.loadModelOBJ('/three/obj/set8A_all.obj', '/three/obj/set8A_all.mtl') // 加载机柜
    this.animate()
  },
  methods: {
    initRenderer () {
      this.$refs.container.appendChild(this.renderer.domElement)
      this.renderer.setSize(
        window.innerWidth,
        window.innerHeight
      )
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xeeeeee, 1) // 设置背景色
    },
    initCamera () {
      this.camera.position.set(-30, 50, 50)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))

      // 光源
      const color = 0xffffff
      // 环境光
      const ambientLight = new THREE.AmbientLight(color)
      this.scene.add(ambientLight)
      // 平行光
      // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1)
      // this.scene.add(directionalLight)
    },
    initEffectComposer () {
      const renderPass = new RenderPass(this.scene, this.camera)
      this.composer.addPass(renderPass)
      const containerWidth = document.documentElement.clientWidth - this.gutterGutter * 2
      const containerHeight = document.documentElement.clientHeight - 65 - 40 - this.gutterGutter * 2
      this.outlinePass = new OutlinePass(new THREE.Vector2(
        // containerWidth,
        // containerHeight
        window.innerWidth,
        window.innerHeight
      ), this.scene, this.camera)
      this.composer.addPass(this.outlinePass)

      // const fXAAShaderPass = new ShaderPass(FXAAShader)
      // fXAAShaderPass.uniforms['resolution'].value.set(1 / containerWidth, 1 / containerHeight)
      // // fXAAShaderPass.uniforms['resolution'].value.set(
      // //   1 / containerWidth,
      // //   1 / containerHeight
      // // )
      // fXAAShaderPass.renderToScreen = true
      // this.composer.addPass(fXAAShaderPass)
    },
    // 初始化加载器
    initLoader () {
      // this.gltfLoader = new GLTFLoader()
      // this.fbxLoader = new FBXLoader()
      // this.mtlLoader = new MTLLoader()
    },
    loadModelOBJ (objUrl, mtlUrl) {
      this.xyz = 1
      this.mtlLoader.load(mtlUrl, materials => {
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(objUrl, object => {
          // console.log(object)
          this.scene.add(object)
          object.children[0].scale.set(1, 1, 1)
          // object.children[0].position.set(this.xyz, this.xyz, this.xyz)
          // object.children[0].material.transparent = true // 这句透明
          object.traverse(child => {
            if (child.isMesh) {
              if (Array.isArray(child.material)) {
                for (const i in child.material) {
                  const item = child.material[i]
                  item.emissive = item.color
                  item.emissiveMap = item.map
                }
              } else {
                child.material.emissive = child.material.color
                child.material.emissiveMap = child.material.map
                child.material.side = THREE.DoubleSide
                child.material.transparent = true
              }
              child.material.emissive = child.material.color
              child.material.emissiveMap = child.material.map
              child.material.side = THREE.DoubleSide
              child.material.transparent = true
            }
            console.log(child)
          })
          this.xyz += 2
        })
      })
    },
    // 动画
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    // 渲染
    render (message) {
      // 跳帧优化
      if (this.skip !== 0) {
        this.skip = ++this.skip % 2
        return
      }
      this.skip = ++this.skip % 2
      // console.log(this.skip)
      // this.isDevelopment && this.Stats.begin()
      // console.log(message + '', message)
      this.renderer.render(this.scene, this.camera)
      // this.composer.render()
      // this.isDevelopment && this.Stats.end()
      // this.isDevelopment && this.Stats.update()
    }
  }
}
</script>

<style lang="less" scoped>

</style>