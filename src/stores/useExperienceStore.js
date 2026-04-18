import { create } from 'zustand';

// Experience phases
export const PHASES = {
  MENU: 'MENU',
  CONTEXT: 'CONTEXT',
  GAME: 'GAME',
  END: 'END'
};

// 3D scenes
export const SCENES = ['sceneMenu', 'scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'sceneEnd'];

export const useExperienceStore = create((set, get) => ({
  phase: 'MENU',
  currentScene: SCENES[0],
  sceneIndex: 0,
  direction: 'FORWARD',

  setMenu: () => set({ 
    phase: PHASES.MENU,
    currentScene: SCENES[0],
    sceneIndex: 0,
    direction: 'FORWARD',
  }),

  setContext: () => set({ 
    phase: PHASES.CONTEXT
  }),

  setGame: () => set({ 
    phase: PHASES.GAME, 
    currentScene: SCENES[1],
    sceneIndex: 1,
    direction: 'FORWARD'
  }),

  nextScene: () => {
    const { sceneIndex } = get();

    if (sceneIndex < SCENES.length - 1) {
      const nextIndex = sceneIndex + 1;
      set({ 
        sceneIndex: nextIndex, 
        currentScene: SCENES[nextIndex],
        direction: 'FORWARD'
      });
    }
  },

  prevScene: () => {
    const { sceneIndex } = get();
    if (sceneIndex === 0) return;

    const prevIndex = sceneIndex - 1;
    set({ 
      sceneIndex: prevIndex, 
      currentScene: SCENES[prevIndex],
      direction: 'BACKWARD'
    });
  },

  setEnd: () => set({ 
    phase: PHASES.END, 
    currentScene: SCENES[SCENES.length - 1], 
    gameSceneIndex: SCENES.length - 1,
    direction: 'FORWARD'
  })
}));