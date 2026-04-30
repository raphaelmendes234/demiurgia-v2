import { create } from 'zustand';

const CHARACTER_DATA = {
  hades: {
    name: "Hadès",
    text: "Nul ne sort des Enfers, mon fils. Pas même toi.",
    image: "/assets/images/character/1.webp",
    color: "#008b58"
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