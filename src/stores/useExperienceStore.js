import { create } from "zustand";

export const PHASES = {
  MENU: "MENU",
  CONTEXT: "CONTEXT",
  GAME: "GAME",
  END: "END",
  TEST: "TEST"
};

export const GAME_SCENES = ["scene1", "scene2", "scene3", "scene4", "scene5"];

export const useExperienceStore = create((set, get) => ({
  // --- STATE ---
  phase: PHASES.MENU,
  currentScene: "sceneMenu",
  gameIndex: 0,
  direction: "FORWARD",

  // --- ACTIONS ---

  setMenu: () => set({ 
    phase: PHASES.MENU,
    currentScene: "sceneMenu",
    gameIndex: 0,
    direction: "FORWARD"
  }),

  setContext: () => set({ 
    phase: PHASES.CONTEXT,
  }),
  setTest: () => set({ 
    phase: PHASES.TEST,
  }),

  setGame: () => set({ 
    phase: PHASES.GAME, 
    currentScene: GAME_SCENES[0],
    gameIndex: 0,
    direction: "FORWARD"
  }),

  setEnd: () => set({ 
    phase: PHASES.END, 
    currentScene: "sceneEnd",
    direction: "FORWARD"
  }),

  // --- NAVIGATION GAME (only in GAME phase) ---
  nextScene: () => {
    const { phase, gameIndex } = get();
    
    if (phase !== PHASES.GAME) return;

    if (gameIndex < GAME_SCENES.length - 1) {
      const nextIdx = gameIndex + 1;
      set({ 
        gameIndex: nextIdx, 
        currentScene: GAME_SCENES[nextIdx],
        direction: "FORWARD"
      });
    } else {
      get().setEnd();
    }
  },

  prevScene: () => {
    const { phase, gameIndex } = get();
    
    if (phase !== PHASES.GAME || gameIndex === 0) return;

    const prevIdx = gameIndex - 1;
    set({ 
      gameIndex: prevIdx, 
      currentScene: GAME_SCENES[prevIdx],
      direction: "BACKWARD"
    });
  }
}));