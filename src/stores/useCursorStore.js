import { create } from 'zustand'

export const useCursorStore = create((set) => ({
  cursorType: 'default',
  isHovering: false, // Garde en mémoire si on survole un truc interactif
  
  setCursorType: (type) => set({ cursorType: type }),
  setIsHovering: (bool) => set((state) => {
    // Si on n'est pas en train de cliquer, on met à jour le type visuel immédiatement
    const newType = bool ? 'hover' : 'default'
    return { 
      isHovering: bool, 
      cursorType: state.cursorType === 'click' ? 'click' : newType 
    }
  }),
}))