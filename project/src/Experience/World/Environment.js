import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Environment {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.setSunLight()
        this.setEnvironmentMap()
    }


    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)

    }

    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 2
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

        //add environment map to scene
        this.scene.environment = this.environmentMap.texture
        

        // traverses the scene and update materials if needed
        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.setEnvironmentMap.updateMaterial()
    }

}