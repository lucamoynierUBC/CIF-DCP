import Experience from '../Experience.js'
import * as THREE from 'three'
export default class Campus{

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Set up
        this.resource = this.resources.items.testBuilding
        console.log(this.resource)

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        console.log(this.model)
        this.model.scale.set(0.02, 0.02, 0.02)
        this.model.position.set(0, -0.5, 0)
        this.scene.add(this.model)


        // Similar to the scene in the environment class
        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
        
    }
}