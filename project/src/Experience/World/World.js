import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Resources from '../Utils/Resources.js'
// import Environment from './Environment.js'
//import Floor from './Floor.js'
//import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshStandardMaterial()
        )
        this.scene.add(testMesh)


        const testFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(5,5),
            new THREE.MeshStandardMaterial()
        )
        testFloor.rotation.x += -(Math.PI/2)
        testFloor.position.set(0, -0.5, 0)
        

        this.scene.add(testFloor)

        // retrieve the resources instanmce and listen to the ready event before instantiating the Environment class
        this.resources.on('ready', () => {
            console.log('resouces are rady')
            this.environment = new Environment()
        })



    }

    
}