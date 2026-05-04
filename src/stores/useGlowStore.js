import { create } from 'zustand'

export const useGlowStore = create((set) => ({
  inventory: [
    { 
      id: 'women', 
      model: '/models/INT_Women.glb', 
      mask: '/assets/images/emission/women_emissive2.png',
    },
  ],
}))