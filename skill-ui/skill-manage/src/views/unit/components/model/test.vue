<template>
  <div class="bo">
    <div ref="container" class="container"></div>
    <div class="card"></div>
    <div class="test">test</div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
export default {
  name: 'SceneAnimation',
  props: {
    back: Boolean
  },
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      renderPass: null,
      controls: null, // 控制器
      mouse: null,
      raycaster: null,
      composer: null, // 后期处理
      outlinePass: null,
      floorMesh: null,
      labelRenderer: null,
      earth: null,
      moon: null,
      clock: null
    }
  },
  watch: {
    back () {
      this.sceneType = 1
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      let camera, scene, renderer, labelRenderer

      this.clock = new THREE.Clock()
      const textureLoader = new THREE.TextureLoader()

      let moon
      const EARTH_RADIUS = 1
      const MOON_RADIUS = 0.27

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
      this.camera.position.set(10, 5, 20)

      this.scene = new THREE.Scene()

      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(0, 0, 1)
      this.scene.add(dirLight)

      const axesHelper = new THREE.AxesHelper(5)
      this.scene.add(axesHelper)

      //

      const earthGeometry = new THREE.SphereBufferGeometry(EARTH_RADIUS, 16, 16)
      const earthMaterial = new THREE.MeshPhongMaterial({
        // specular: 0x333333,
        // shininess: 5,
        // normalScale: new THREE.Vector2(0.85, 0.85)
      })
      this.earth = new THREE.Mesh(new THREE.BoxGeometry(6, 10, 6), new THREE.MeshBasicMaterial({

        color: 0xf9f89f
      }))
      // this.earth = new THREE.Mesh(earthGeometry, earthMaterial)

      this.scene.add(this.earth)

      // const moonGeometry = new THREE.SphereBufferGeometry(MOON_RADIUS, 16, 16)
      // const moonMaterial = new THREE.MeshPhongMaterial({
      //   // shininess: 5
      // })
      // this.moon = new THREE.Mesh(moonGeometry, moonMaterial)
      // this.scene.add(this.moon)

      //

      const earthDiv = document.createElement('div')
      // document.querySelector('.card').appendChild(earthDiv)
      earthDiv.className = 'label'
      earthDiv.textContent = 'Earth'
      earthDiv.style.fontSize = '2rem'
      // earthDiv.style.marginTop = '-1em'
      const earthLabel = new CSS2DObject(earthDiv)
      earthLabel.position.set(0, EARTH_RADIUS, 0)
      this.earth.add(earthLabel)

      // const moonDiv = document.createElement('div')
      // moonDiv.className = 'label'
      // moonDiv.textContent = 'Moon'
      // moonDiv.style.marginTop = '-1em'
      // const moonLabel = new CSS2DObject(moonDiv)
      // moonLabel.position.set(0, MOON_RADIUS, 0)
      // this.moon.add(moonLabel)

      //

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(this.renderer.domElement)

      this.labelRenderer = new CSS2DRenderer()
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      this.labelRenderer.domElement.style.position = 'absolute'
      this.labelRenderer.domElement.style.top = '0px'
      document.body.appendChild(this.labelRenderer.domElement)

      const controls = new OrbitControls(this.camera, this.labelRenderer.domElement)
      // controls.minDistance = 5
      // controls.maxDistance = 100

      //

      window.addEventListener('resize', this.onWindowResize, false)
    },

    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight

      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    },


    animate () {
      requestAnimationFrame(this.animate)

      // const elapsed = this.clock.getElapsedTime()

      // this.moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)

      this.renderer.render(this.scene, this.camera)
      this.labelRenderer.render(this.scene, this.camera)
    }
//     init () {
//       const width = window.innerWidth
//       const height = window.innerHeight


//       this.scene = new THREE.Scene()
//       this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
//       this.camera.position.set(-30, 50, 50)
// // model

//       this.floorMesh = new THREE.Mesh(new THREE.BoxGeometry(6, 10, 6), new THREE.MeshBasicMaterial({

//         color: 0x000000
//       }))

//       const earthDiv = document.createElement('div')
//       // const earthDiv = document.querySelector('.label')
//       earthDiv.className = 'label'
//       earthDiv.textContent = 'Earth'
//       // earthDiv.style.marginTop = '-1em'
//       const earthLabel = new CSS2DObject(earthDiv)
//       console.log('earthLabel', earthLabel)
//       earthLabel.position.set(0, 1, 0)
//       this.floorMesh.add(earthLabel)


//       this.renderer = new THREE.WebGLRenderer({
//         antialias: true,
//         alpha: true // - canvas是否包含alpha (透明度)。默认为 false
//       })

//       this.renderer.setSize(
//         document.documentElement.clientWidth,
//         document.documentElement.clientHeight
//       )
//       this.renderer.setClearColor(0xeeeeee, 1) // 设置背景色
//       this.renderer.setClearColor(0x232323, 1) // 设置背景色
//       this.$refs.container.appendChild(this.renderer.domElement)


//       // this.controls = new OrbitControls(this.camera, this.renderer.domElement)


//       this.labelRenderer = new CSS2DRenderer()
//       this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
//       this.labelRenderer.domElement.style.position = 'absolute'
//       this.labelRenderer.domElement.style.top = '0px'
//       this.$refs.container.appendChild(this.labelRenderer.domElement)

//       this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement)

//       // this.camera.position.set(0, 0, 8)

//       // postprocessing

//       // this.composer = new EffectComposer(this.renderer)

//       // this.renderPass = new RenderPass(this.scene, this.camera)
//       // this.composer.addPass(this.renderPass)

//       // this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this.scene, this.camera)
//       // this.composer.addPass(this.outlinePass)

//       this.raycaster = new THREE.Raycaster()
//       this.mouse = new THREE.Vector2()
//       this.selectedObjects = []


//       this.scene.add(this.floorMesh)


//       // this.renderer.domElement.addEventListener('click', this.onTouchMove)
//       // this.labelRenderer.domElement.addEventListener('click', this.onTouchMove)
//     },
//     onTouchMove (event) {
//       let x, y

//       if (event.changedTouches) {
//         x = event.changedTouches[0].pageX
//         y = event.changedTouches[0].pageY
//       } else {
//         x = event.clientX
//         y = event.clientY
//       }

//       this.mouse.x = (x / window.innerWidth) * 2 - 1
//       this.mouse.y = -(y / window.innerHeight) * 2 + 1

//       this.raycaster.setFromCamera(this.mouse, this.camera)

//       const intersects = this.raycaster.intersectObjects(this.scene.children, true)

//       if (intersects.length > 0) {
//         this.outlinePass.selectedObjects = [intersects[0].object]
//       } else {
//         this.outlinePass.selectedObjects = []
//       }
//     },
//     animate () {
//       requestAnimationFrame(this.animate)
//       this.renderer.render(this.scene, this.camera)
//       this.labelRenderer.render(this.scene, this.camera)

//       // this.composer.render()
//     }
  }
}
</script>

<style lang="less" scoped>
.radio {
  position: fixed;
  top: @layout-header-height;
  left: 0;
}
.card {
  position: fixed;
  top: calc(@layout-header-height + 2rem);
  right: 2rem;
  // color: #000000d9;
}
.bo {
  background-color: #000;
}
canvas {
    display: block;
}
/deep/ .label {
  color: #FFF;
  font-family: sans-serif;
  padding: 2px;
  background: rgba( 0, 0, 0, .6 );
  font-size: 10rem;
}
.test {
  position: absolute;
  top: 0;
  left: 0;
  color: #FFF;
  font-family: sans-serif;
  padding: 2px;
  background: rgba( 0, 0, 0, .6 );
  font-size: 10rem;
}
</style>
