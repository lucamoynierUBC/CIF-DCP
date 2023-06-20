import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)
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
    width: 800,
    height: 600
}
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

// Animation

// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

let time = Date.now()

const tick = () => {
    // fixing frame rate issues
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime


    // update objects
    // mesh.rotation.y += 0.001 * deltaTime

    // Renderer
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}
tick()