import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

// Making a group
// const group = new THREE.Group()
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 'blue'})
// )

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 'green'})
// )

// cube2.position.x = -2
// group.add(cube1)
// group.add(cube2)

// group.position.y = 1

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'orange'})
const mesh = new THREE.Mesh(geometry, material)

// Cube transformations
// mesh.position.x = 1
// mesh.rotation.y = 2
// mesh.rotation.z = -3

// mesh.scale.y = .5

scene.add(mesh)

// Axis helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

//sizes
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

}
tick()