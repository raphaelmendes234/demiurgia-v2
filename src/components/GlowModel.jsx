export function GlowModel({ modelPath, name }) {
  const { scene } = useGLTF(modelPath)
  
  // On crée les contrôles Leva
  const debug = useControls(`Scene: ${name}`, {
    Modèle: folder({
      emissiveColor: "#0fd15d",
      emissiveIntensity: { value: 4, min: 0, max: 20 },
      opacity: { value: 1, min: 0, max: 1 },
    }),
  });

  const textures = {}
  Object.keys(SCENE_CONFIG).forEach(key => {
    if(SCENE_CONFIG[key].glow) {
      textures[key] = useTexture(SCENE_CONFIG[key].glow.mask)
      textures[key].flipY = false
      textures[key].colorSpace = THREE.SRGBColorSpace
    }
  })

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const config = SCENE_CONFIG[child.name]
        
        if (config && config.glow) {
          // On clone pour éviter de modifier les autres instances
          child.material = child.material.clone()
          const m = child.material

          m.emissiveMap = textures[child.name]
          
          // --- CONNEXION À LEVA ---
          // On ignore le JSON et on prend les valeurs de 'debug'
          m.emissive = new THREE.Color(debug.emissiveColor)
          m.emissiveIntensity = debug.emissiveIntensity
          m.opacity = debug.opacity
          
          m.transparent = true
          m.toneMapped = false 
          m.needsUpdate = true
        }
      }
    })
    // TRÈS IMPORTANT : On relance l'effet quand 'debug' change
  }, [scene, textures, debug]) 

  return <primitive object={scene} />
}