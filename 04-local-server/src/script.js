import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


// gui 
const gui = new dat.GUI()

const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)

})


// Scene
const scene = new THREE.Scene()


const geometry = new THREE.BoxGeometry(1, 1, 1)
const plane = new THREE.PlaneGeometry(5,5)
const material = new THREE.MeshStandardMaterial({
    wireframe: false
})
material.roughness = 0.3

// playing around with different lighting
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1)
const pointLight = new THREE.PointLight(0xff9000, 0.5)
const directionalLight = new THREE.AmbientLight(0x00fffc, 0.3)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// allowing directonal light to cast shadow
directionalLight.castShadow = true

directionalLight.position.set(1, 0.25, 0)
hemisphereLight.position.set(0,1,0)
pointLight.position.set(0,1,0)

scene.add(hemisphereLight)
scene.add(pointLight)
scene.add(directionalLight)
scene.add(ambientLight)

// adding 3d objects to scene
const mesh = new THREE.Mesh(geometry, material)
//allowing mesh to cast shadow
mesh.castShadow = true
const planeMesh = new THREE.Mesh(plane, material)
//rotating plane by 90 deg. or pi/2
planeMesh.rotateX(-(Math.PI/2))
// setting position of plane below cube
planeMesh.position.set(0, -1, 0)
//allowing plane to recieve shadow
planeMesh.receiveShadow = true

scene.add(mesh)
scene.add(planeMesh)

// Axis helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Rotation function
var rotation = false
const parameters = {
    rotate: () => {
        if (!rotation) {
            rotation = true
        } else {
            rotation = false
        }
    }

}

// adding gui properties
gui.add(mesh.position, 'x', -3, 3, 0.01).name('y-position')
gui.add(mesh.position, 'y', -3, 3, 0.01).name('x-position')
gui.add(mesh.position, 'z', -3, 3, 0.01).name('z-position')
gui.add(material, 'wireframe')
gui.add(parameters, 'rotate')
gui.add(directionalLight, 'intensity').min(0).max(1).step(.001).name('Light Intensity')
gui.add(directionalLight.position, 'y').min(0).max(5).step(.001).name('Light y-pos')



//code below handles window resizing 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera 
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// handle full screen with Chrome, Safari, Firefox, etc. 
// TODO: Cant exit out of full-screen via double clicking
window.addEventListener('dblclick', () => {
    
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement){
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else  if(canvas.webkitFullscreenElement){
            canvas.webkitRequestFullscreen
            
        }
        
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen
        } else if (document.webkitFullscreenElement) {
            document.webkitexitFullscreen
        }
    }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3

camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Animation

// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

const clock = new THREE.Clock()

const tick = () => {

    //update camera 
    
    // fixing frame rate issues
    const elapsedTime = clock.getElapsedTime

    //update controls
    controls.update()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)

    // update objects
    // mesh.rotation.y = elapsedTime

    // Renderer
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
    
    if (rotation){
        mesh.rotation.y += 0.001
        mesh.rotation.x += 0.001
    }

}
tick()