
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

    // TODO: make loading bar while assests load


    setLoaders() {
        this.loaders = {}
        this.loaders.Rhino3dmLoader = new Rhino3dmLoader()
        // Specify path to a folder containing WASM libraries or a CDN, need this for the rhino loader. 
        this.loaders.Rhino3dmLoader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/' )
        this.loaders.GLTFLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

    }

    startLoading() {
        for (const source of this.sources)
        {
            if (source.type == 'gltfModel') {
                this.loaders.GLTFLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )

            }

            else if (source.type == 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )

            }

            else if (source.type == 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )

            }

            else if (source.type == 'rhinoModel') {
                this.loaders.Rhino3dmLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            

        }
    }

    sourceLoaded(source, file) {
        //resource saved in item
        this.items[source.name] = file
        this.loaded++

        //check if assets are finished loading
        if(this.loaded == this.toLoad) {
            this.trigger('ready')

        }
    }
    
}