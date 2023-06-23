
import * as THREE from 'three'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter.js"



export default class Resources extends EventEmitter {

    constructor(sources) {
        super()

        this.sources = sources
        

        // set up
        //Loaded resources, once an asset is loaded we add it to the item object
        this.items = {}

        // number of sources to load
        this.toLoad = this.sources.length

        // the number of sources loaded, starts at 0

        this.loaded = 0

        this.setLoaders() 
        this.startLoading()
    }


    setLoaders() {
        this.loaders = {}
        this.loaders.Rhino3dmLoader = new Rhino3dmLoader()
        this.loaders.GLTFLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

    }

    startLoading() {
        for (const source of this.sources)
        {
            if (source.type == 'gltf') {
                this.loaders.GLTFLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )

            }

            else if (source.type == 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )

            }

            else if (source.type == 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        console.log(source, file)
                    }
                )

            }

        }
    }
}