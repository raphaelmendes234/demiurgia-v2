import { create } from 'zustand';

const CHARACTER_DATA = {
  zeus: {
    name: "Zeus",
    text: "Nul ne sort des Enfers, mon fils. Pas même toi.",
    image: "/assets/images/character/1.webp",
  },
  
};

export const useGameStore = create((set) => ({
  activeDialogue: null, 
  
  openDialogue: (id) => {
    const character = CHARACTER_DATA[id];
    if (character) {
      set({ activeDialogue: character });
    }
  },

  closeDialogue: () => set({ activeDialogue: null }),
}));