import { create } from "zustand";

export const PHASES = {
  MENU: "MENU",
  CONTEXT: "CONTEXT",
  GAME: "GAME",
  END: "END",
};

export const GAME_SCENES = [
  "scene1", 
  "scene2", 
  "scene3", 
  "scene4", 
  "scene5"
];

export const useExperienceStore = create((set, get) => ({
  // --- STATE ---
  phase: PHASES.MENU,
  currentScene: "sceneMenu",
  gameIndex: 0,
  direction: "FORWARD",
  isTransitioning: false,
  activeCharacter: null, 

  // --- PHASES NAVIGATION ---
  setMenu: () => {
    if (get().isTransitioning) return

    set({
      phase: PHASES.MENU,
      currentScene: "sceneMenu",
      gameIndex: 0,
      direction: "FORWARD",
      isTransitioning: true
    })
  },

  setContext: () => {
    if (get().isTransitioning) return

    set({ 
      phase: PHASES.CONTEXT,
    });
  },

  setGame: () => {
    if (get().isTransitioning) return

    set({
      phase: PHASES.GAME, 
      currentScene: GAME_SCENES[0],
      gameIndex: 0,
      direction: "FORWARD",
      isTransitioning: true
    })
  },

  setEnd: () => {
    if (get().isTransitioning) return

    set({
      phase: PHASES.END, 
      currentScene: "sceneEnd",
      direction: "FORWARD",
      isTransitioning: true
    })
  },

  setIsTransitioning: (val) => set({
    isTransitioning: val
  }),

  // --- GAME NAVIGATION (game scenes) ---
  nextScene: () => {
    const { phase, gameIndex, isTransitioning } = get();
    
    if (phase !== PHASES.GAME || isTransitioning) return;

    if (gameIndex < GAME_SCENES.length - 1) {
      const nextIdx = gameIndex + 1;
      set({ 
        gameIndex: nextIdx, 
        currentScene: GAME_SCENES[nextIdx],
        direction: "FORWARD",
        isTransitioning: true
      });
    } else {
      get().setEnd();
    }
  },

  prevScene: () => {
    const { phase, gameIndex, isTransitioning } = get();
    
    if (phase !== PHASES.GAME || gameIndex === 0 || isTransitioning) return;

    const prevIdx = gameIndex - 1;
    set({ 
      gameIndex: prevIdx, 
      currentScene: GAME_SCENES[prevIdx],
      direction: "BACKWARD",
      isTransitioning: true
    });
  },

  // --- INTERACTION PANEL
  openDialogue: (id) => set({
    activeCharacter: id 
  }),

  closeDialogue: () => set({
    activeCharacter: null 
  }),

}));