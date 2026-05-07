import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

export const SpectralMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColorCenter: new THREE.Color("#00c684"), // Vert menthe clair
    uColorEdge: new THREE.Color("#00eeff"), // Cyan
    uAlpha: 0.7,
    uDistortion: 0.05,
    uGlowIntensity: 1.8, // Intensité de l'aura mystique
  },
  // Vertex Shader : Déformation fluide et stable
  `
  uniform float uTime;
  uniform float uDistortion;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  // Fonction de bruit Simplex
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    // Bruit plus lent pour éviter les tremblements
    float noise = snoise(vec3(position.xy * 1.5, uTime * 0.2));
    vNoise = noise;
    
    vec3 newPosition = position + normal * noise * uDistortion;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // Fragment Shader : Mystic Glow (Violet, Bleu, Vert)
  `
  uniform float uTime;
  uniform vec3 uColorCenter;
  uniform vec3 uColorEdge;
  uniform float uAlpha;
  uniform float uGlowIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vNoise;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel puissant pour le contour néon
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    
    // --- PALETTE MYSTIQUE ---
    vec3 colorViolet = vec3(0.6, 0.2, 1.0);
    vec3 colorBlue = vec3(0.1, 0.4, 1.0);
    vec3 colorGreen = vec3(0.2, 1.0, 0.6);

    // Animation fluide entre les couleurs de la palette
    float wave = sin(uTime * 0.4 + vNoise * 0.2) * 0.5 + 0.5;
    vec3 mysticMix = mix(colorViolet, colorGreen, wave);
    mysticMix = mix(mysticMix, colorBlue, cos(uTime * 0.3) * 0.5 + 0.5);

    // --- COULEUR FINALE ---
    // Mélange entre tes couleurs d'origine et l'aura mystique sur les bords
    vec3 baseColor = mix(uColorCenter, uColorEdge, fresnel);
    vec3 finalColor = baseColor + (mysticMix * fresnel * uGlowIntensity);

    // --- ALPHA STABILISÉ ---
    // On définit une opacité de base solide (0.6 à 1.0) pour éviter le clignotement
    float alphaBase = mix(0.6, 1.0, fresnel); 
    float alpha = alphaBase * uAlpha;
    
    // On ajoute un très léger battement éthéré qui ne descend jamais à 0
    alpha *= (0.85 + vNoise * 0.15); 

    gl_FragColor = vec4(finalColor, alpha);
  }
  `,
);

extend({ SpectralMaterialImpl });
