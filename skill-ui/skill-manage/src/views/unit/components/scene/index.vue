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
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { MTLLoader } from 'three/examples/jsm/controls/MTLLoader.js'
// import { OBJLoader } from 'three/examples/jsm/controls/OBJLoader.js'
// import { FBXLoader } from 'three/examples/jsm/controls/FBXLoader.js'

export default {
  name: 'Scene',
  data () {
    return {
      camera: null,
      scene: new THREE.Scene(), // 初始化场景
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      modelList: [], // 装模型的数组
      mouse: new THREE.Vector2(), // 二维向量
      raycaster: new THREE.Raycaster(), // 光线投射器
      projectiveObj: null, // 定义上次投射到的对象
      loader: {
        gltf: new GLTFLoader(),
        mtl: new MTLLoader(),
        obj: new OBJLoader()
      }
    }
  },
  mounted () {
    this.init()
    // this.animate()
    // this.handleOnClick()
  },
  methods: {
    init () {
      console.log('three', THREE)
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.$refs.container.appendChild(this.renderer.domElement)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0xeeeeee, 1) // 设置背景色

      // 初始化相机
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      // this.camera.position.z = 5
      this.camera.position.set(200, 200, 550)
      this.camera.lookAt(0, 300, -300)

      // 控制器
      const controls = new OrbitControls(this.camera, this.renderer.domElement)

      // 监听鼠标、键盘事件
      controls.addEventListener('change', (render) => {
        this.render()
      })

      // this.LineBasicMaterial()

      /*
        7、添加光投射器 及 鼠标二维向量 用于捕获鼠标移入物体
        下次渲染时，通过mouse对于的二维向量判断是否经过指定物体
      */
      document.addEventListener('mousemove', () => {
        event.preventDefault()
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      }, false)
      // 辅助轴
      // const axisHelper = new THREE.AxisHelper(500)
      // this.scene.add(axisHelper)

      // 辅助网格
      // const size = 100
      // const step = 10

      // const gridHelper = new THREE.GridHelper(size, step)
      // this.scene.add(gridHelper)
      // const gridHelper1 = new THREE.GridHelper(size, step)
      // gridHelper1.rotation.z = Math.PI * 0.5
      // this.scene.add(gridHelper1)


      const ambient = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(ambient)
      // const directionalLight = new THREE.DirectionalLight(0xffeedd, 1)
      // directionalLight.position.set(0, 10, 10)
      // this.scene.add(directionalLight)
      // 点光源
      const light = new THREE.PointLight(0xffffff)
      const light2 = new THREE.PointLight(0xffffff)
      const light3 = new THREE.PointLight(0xffffff)
      const light4 = new THREE.PointLight(0xffffff)
      light.position.set(600, 200, 600)
      light2.position.set(600, 200, -600)
      light3.position.set(-600, 200, 600)
      light4.position.set(-600, 200, -600)
      this.scene.add(light)
      this.scene.add(light2)
      this.scene.add(light3)
      this.scene.add(light4)

      // this.geometry = new THREE.BoxGeometry(3, 3, 3)
      // this.material = new THREE.MeshNormalMaterial()

      // this.mesh = new THREE.Mesh(this.geometry, this.material)
      // this.mesh.rotation.x = 2.5
      // this.mesh.rotation.y = 2.5
      // this.scene.add(this.mesh)

      const loader = new GLTFLoader()
      loader.load('/three/obj/1.glb', (gltf) => {
        console.log(gltf)
        gltf.scene.position.x = 250
        this.modelList.push(gltf.scene)
        this.scene.add(gltf.scene)
        this.animate()
        // this.render()
      }, undefined, function (error) {
        console.error(error)
      })
      // const OJBLoader = new OBJLoader2()
      // OJBLoader.load('/three/obj/model.obj', (object) => {
      //   object.scale.set(20, 20, 20)
      //   object.position.x = 0
      //   object.position.y = 0
      //   object.rotateX = 30
      //   object.rotateY = 30
      //   this.scene.add(object)
      // gltf加载器
      // this.gltfLoader('/three/obj/1.glb').then(gltf => {
      //   console.log(gltf)
      //   gltf.scene.position.x = 250
      //   this.scene.add(gltf.scene)
      //   this.render()
      // })
      const group = []
      // mtl加载器
      this.mtlLoader('/three/obj/1.mtl').then(materials => {
        materials.preload()
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('/three/obj/1.obj', object => {
          console.log(object)
          // object.scale.set(20, 20, 20)
          // object.position.x = 0
          // object.position.y = 0
          // object.rotateX = 30
          // object.rotateY = 30
          // const object = new THREE.Mesh(object)
          this.scene.add(object)
          const object1 = object.clone()
          object1.position.x = 50
          object1.position.y = 100
          // meshObject1.rotateX = 30
          // meshObject1.rotateY = 30
          object.add(object1)
          // this.scene.add(meshObject1)
          this.render()
          console.log('this.scene', this.scene)
          group.push(object)
          group.push(object1)

          const clickApp = (intersects) => {
            const selectedObjects = null
            if (intersects[0].object !== undefined) {
              console.log(intersects[0].object, '这就是成功点击到的对象了~')
            }
          }
          const filtersVisibleFalse = (arr) => {
            let arrList = arr
            if (arr && arr.length > 0) {
              arrList = []
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].object.visible) {
                  arrList.push(arr[i])
                }
              }
            }
            return arrList
          }
          const raycastMeshes = (callback, raycaster) => {
            let intersects = []
            // 获取鼠标点击点的射线
            const theRaycaster = raycaster
            // 对场景及其子节点遍历
            for (const i in this.scene.children) {
              // 如果场景的子节点是Group或者this.scene对象
              if (this.scene.children[i] instanceof THREE.Group || this.scene.children[i] instanceof THREE.Scene) {
                // 场景子节点及其后代，被射线穿过的模型的数组集合
                // intersects = theRaycaster.intersectObjects(Scene.children[i].children, true)
                const rayArr = theRaycaster.intersectObjects(this.scene.children[i].children, true)
                intersects.push(...rayArr)
              } else if (this.scene.children[i] instanceof THREE.Mesh) {
                // 如果场景的子节点是Mesh网格对象，场景子节点被射线穿过的模型的数组集合
                intersects.push(theRaycaster.intersectObject(this.scene.children[i]))
              }
            }
            intersects = filtersVisibleFalse(intersects) // 过滤掉不可见的
            // 被射线穿过的模型的数组集合
            if (intersects && intersects.length > 0) {
              return callback(intersects)
            }
              // this.hiddenDetailDiv()
              return null
          }
          const onMouseClick = (event) => {
            console.log(event)
            // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
            // const div3DLeft = div3D.getBoundingClientRect().left
            // const div3DTop = div3D.getBoundingClientRect().top
            // mouse.x = ((event.clientX - div3DLeft) / div3D.clientWidth) * 2 - 1
            // mouse.y = -((event.clientY - div3DTop) / div3D.clientHeight) * 2 + 1
            this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1
            this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
            // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
            this.raycaster.setFromCamera(this.mouse, this.camera)
            // 获取raycaster直线和所有模型相交的数组集合
            raycastMeshes(clickApp, this.raycaster)
          }
          this.$refs.container.addEventListener('click', onMouseClick, false)
        })
      })
    },
    gltfLoader (url) {
      return new Promise((resolve, reject) => {
        this.loader.gltf.load(url, (gltf) => {
          resolve(gltf)
        }, undefined, function (error) {
          reject(error)
        })
      })
    },
    mtlLoader (url) {
      return new Promise((resolve, reject) => {
        this.loader.mtl.load(url, (materials) => {
          resolve(materials)
        }, undefined, function (error) {
          reject(error)
        })
      })
    },
    objLoader (url) {
      return new Promise((resolve, reject) => {
        this.loader.obj.load(url, (object) => {
          resolve(object)
        }, undefined, function (error) {
          reject(error)
        })
      })
    },
    render () {
      this.renderer.render(this.scene, this.camera)
      this.renderRaycasterObj(this.raycaster, this.scene, this.camera, this.mouse)// 渲染光投射器投射到的对象
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
    handleOnClick () {
      /**
       * 添加鼠标点击事件，捕获点击时当前选中的物体
       */
      window.addEventListener('click', () => {
          console.log(this.projectiveObj)
        if (this.projectiveObj) {
          console.log(this.projectiveObj)
          if (this.projectiveObj.hasChecked) {
            this.projectiveObj.hasChecked = false
            this.projectiveObj.material.color.set('gray')
          } else {
            this.projectiveObj.hasChecked = true
            this.projectiveObj.material.color.set('#dd830d')
          }
        }
      }, false)
    },
    /**
     * 根据光投射器判断鼠标所在向量方向是否穿过物体，穿过则改变物体材质
     * @param {*} raycaster 光投射器
     * @param {*} scene     场景
     * @param {*} camera    相机
     * @param {*} mouse     鼠标位置对应的二维向量
     */
    renderRaycasterObj (raycaster, scene, camera, mouse) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      if (intersects.length > 0) {
        const currentProjectiveObjT = intersects[0].object
        if (this.projectiveObj !== currentProjectiveObjT) {
          if ((currentProjectiveObjT instanceof THREE.AxisHelper) || (currentProjectiveObjT instanceof THREE.GridHelper)) {
            // 穿过的是坐标轴线和网格线
            return
          }

          this.projectiveObj.material.color.setHex(this.projectiveObj.currentHex)
          this.projectiveObj = intersects[0].object
        }
      } else {
        this.projectiveObj = null
      }
    },
    // 调用requestAnimationFrame执行动画
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
.container { width: 100%; height: 500px; display: inline-block;}
.console {width: 100%; height: 20%; display: inline-block; float: right;}
.help { width: 49%; height: 100%; display: inline-block; float: left; overflow:hide; margin: 0; padding: 0; border-right: 1px solid #000;}
.info { width: 49%; height: 100%; display: inline-block; float: right; overflow-y:scroll;}
.help ul { list-style: none; margin: 0; padding: 0;}
.help ul li { list-style: none; width: 45%; display: inline-block;}
</style>
