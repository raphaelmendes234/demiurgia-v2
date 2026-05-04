import * as THREE from 'three';

export const CharacterMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime; 
    void main() {
      vUv = uv;
      vec3 pos = position;
      // 1. LE FLOTTEMENT (Mouvement de vague du mesh)
      pos.y += sin(uv.x * 3.0 + uTime * 0.4) * 0.015; 
      pos.x += cos(uv.y * 2.0 + uTime * 0.3) * 0.01;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                 mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    void main() {
      vec4 color = texture2D(uTexture, vUv);
      
      // 2. LE BRUIT VIVANT (Mouvement interne de fumée)
      // On fait défiler le bruit en fonction de uTime
      float n = noise(vUv * 3.5 + uTime * 0.2);
      n += noise(vUv * 7.0 - uTime * 0.15) * 0.5;
      n /= 1.5;

      // On utilise le bruit pour faire varier l'opacité très légèrement
      // Ça donne l'aspect "vapeur" constant sans faire disparaître le perso
      float smokeEffect = smoothstep(0.2, 1.0, n);
      
      // 3. L'OMBRAGE DU BAS
      float bottomFade = smoothstep(0.0, 0.4, vUv.y);
      
      // Application
      color.a *= bottomFade;
      color.a *= (0.8 + smokeEffect * 0.2); // Le perso vibre entre 80% et 100% d'opacité
      
      color.rgb *= bottomFade;
      
      // Petit reflet éthéré qui bouge sur le perso
      color.rgb += n * vec3(0.1, 0.08, 0.05); 

      gl_FragColor = color;
    }
  `
};