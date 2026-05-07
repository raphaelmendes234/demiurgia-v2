// AuroraMaterial.jsx
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

export const AuroraMaterialImpl = shaderMaterial(
	{
		uTime: 0,
		uProgress: 1, // On le met à 1 par défaut pour la visibilité
		uColorA: new THREE.Color("#00ff8c"),
		uColorB: new THREE.Color("#ad00ff"),
		uOpacity: 0.5,
	},
	// Vertex Shader
	`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // On peut ajouter une légère ondulation des sommets si on veut
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
	// Fragment Shader
	`
  uniform float uTime;
  uniform float uProgress;
  uniform float uOpacity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;

  // Fonction de bruit 2D pour plus de fluidité
  vec2 hash( vec2 p ) {
    p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }

  float noise( in vec2 p ) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2  i = floor( p + (p.x+p.y)*K1 );
    vec2  a = p - i + (i.x+i.y)*K2;
    float m = step(a.y,a.x); 
    vec2  o = vec2(m,1.0-m);
    vec2  b = a - o + K2;
    vec2  c = a - 1.0 + 2.0*K2;
    vec3  h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3  n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot( n, vec3(70.0) );
  }

  void main() {
    vec2 uv = vUv;
    
    // 1. Animation des coordonnées (Vitesse et direction)
    vec2 shiftUv = uv;
    shiftUv.y -= uTime * 0.1; // La brume "monte"
    shiftUv.x += sin(uTime * 0.2 + uv.y) * 0.2; // Oscillation latérale

    // 2. Création de couches de bruit (FBM simplifié)
    float n = noise(shiftUv * 3.0) * 0.5;
    n += noise(shiftUv * 6.0 + uTime * 0.5) * 0.25;
    
    // Normalisation entre 0 et 1
    n = n * 0.5 + 0.5;

    // 3. Masque vertical (pour que ça ne coupe pas net en haut et en bas)
    float maskY = smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.6, uv.y);

    // 3. Masque horizontal (pour que ça ne coupe pas net à droite et à gauche)
    float maskX = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);

    float globalMask = maskY * maskX;
    
    // 4. Couleur et intensité
    vec3 color = mix(uColorA, uColorB, n + uv.y);
    
    // On ajoute un effet de "traînées" verticales typiques des aurores
    float streaks = smoothstep(0.4, 0.8, noise(vec2(uv.x * 15.0 + sin(uTime), uv.y * 0.5)));
    color += streaks * 0.2; // INTENSIT2 DU TRAIT VERTICAL

    // Calcul de l'alpha final
    float alpha = n * globalMask * uProgress * uOpacity;

    // On booste un peu les couleurs pour l'aspect néon
    gl_FragColor = vec4(color * 1.5, alpha);
  }
  `,
);

extend({ AuroraMaterialImpl });
