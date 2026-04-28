import { create } from 'zustand'
import { Howl, Howler } from 'howler'

/** * CONFIGURATION DES SONS
 * On charge les fichiers webm (optimisés)
 */
const uiClick = new Howl({
  src: ['/sounds/ui/UI_Click.webm'],
  volume: 0.5,
})

const magicClick = new Howl({
  src: ['/sounds/ui/UI_MagicClick.webm'],
  volume: 0.4,
})

const ambientSound = new Howl({
  src: ['/sounds/ambiant/2_WindAmbiant.webm'],
  loop: true,
  volume: 0.3,
})

export const useSoundStore = create((set, get) => ({
  isMuted: false,
  _isSpecificPlaying: false, // Flag pour empêcher le doublon avec le clic global

  /**
   * JOUE LE SON DE CLIC GLOBAL
   * Utilise un micro-délai pour laisser la priorité aux objets 3D
   */
  playClick: (isGlobal = false) => {
    const { isMuted, _isSpecificPlaying } = get()
    if (isMuted) return

    if (isGlobal) {
      // On attend 10ms pour voir si un composant 3D a pris la main
      setTimeout(() => {
        if (!get()._isSpecificPlaying) {
          uiClick.play()
        }
      }, 10)
    } else {
      uiClick.play()
    }
  },

  /**
   * JOUE LE SON SUCCESS
   * Bloque temporairement le son global
   */
  playSuccess: () => {
    const { isMuted } = get()
    if (isMuted) return

    // On lève le verrou immédiatement
    set({ _isSpecificPlaying: true })
    
    magicClick.play()

    // On libère le verrou après l'interaction (150ms)
    setTimeout(() => set({ _isSpecificPlaying: false }), 150)
  },

  /**
   * GESTION DE L'AMBIANCE
   */
  startAmbience: () => {
    if (!ambientSound.playing()) {
      ambientSound.play()
    }
  },

  stopAmbience: () => {
    ambientSound.stop()
  },

  /**
   * MASTER MUTE
   */
  toggleMute: () => {
    const nextMute = !get().isMuted
    set({ isMuted: nextMute })
    Howler.mute(nextMute)
  },
}))