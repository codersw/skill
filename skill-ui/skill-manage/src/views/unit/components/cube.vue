<template>
  <div ref="container"></div>
</template>

<script>
// import * as THREE from 'three/three.module.js'
import * as THREE from 'three'
export default {
  name: 'Cube',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null
    }
  },
  mounted () {
    // this.init()
    // this.animate()
    // this.initEventListener()
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
      this.camera.position.z = 1

      this.scene = new THREE.Scene()

      this.geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
      this.material = new THREE.MeshNormalMaterial()

      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.position.set(0, 0.5, 0)
      const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshNormalMaterial())
      mesh1.position.set(0.5, 0, 0)
      this.mesh.add(mesh1)

      this.scene.add(this.mesh)
      mesh1.position.set(0, -0.5, 0.2)
      // this.scene.add(mesh1)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.container.appendChild(this.renderer.domElement)
    },
    animate () {
      requestAnimationFrame(this.animate)

      this.mesh.rotation.x += 0.01
      this.mesh.position.y -= 0.001
      this.mesh.rotation.y += 0.02

      this.renderer.render(this.scene, this.camera)
    },
    initEventListener () {
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()
      // document.addEventListener('mousemove', (event) => {
      //   event.preventDefault()

      // 	this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      //   // console.log('this.mouse12', this.mouse)
      // }, false)
      window.addEventListener('click', (event) => {
        // 将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
        event.preventDefault()
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera)

        // console.log('this.group', this.group)

        // 获取raycaster直线和所有模型相交的数组集合
        // const intersects = this.raycaster.intersectObjects(this.group.children)
        const intersects = this.raycaster.intersectObjects([this.mesh])

        // 将所有的相交的模型的颜色设置为红色
        for (let i = 0; i < intersects.length; i++) {
          intersects[i].point.z = 0.2
          this.mesh.scale.z = 2
          //  console.log('intersects[i].point.z', intersects[i].point.z)
          // intersects[i].point.z.set(0.2)
        }
      }, false)
    }
  }
}
</script>

<style lang="less" scoped>
body { margin: 0; border: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;}
			canvas { width: 100%; height: 100%; }
          #container { width: 100%; height: 80%; display: inline-block; float: left;}
          #console {width: 100%; height: 20%; display: inline-block; float: right;}
          #help { width: 49%; height: 100%; display: inline-block; float: left; overflow:hide; margin: 0; padding: 0; border-right: 1px solid #000;}
          #info { width: 49%; height: 100%; display: inline-block; float: right; overflow-y:scroll;}
          #help ul { list-style: none; margin: 0; padding: 0;}
          #help ul li { list-style: none; width: 45%; display: inline-block;}
</style>
