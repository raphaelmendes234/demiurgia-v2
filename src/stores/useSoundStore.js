import { create } from "zustand";
import { Howl, Howler } from "howler";
import { gsap } from "gsap";

const uiClick = new Howl({
  src: ["/sounds/ui/UI_Click.webm"],
  volume: 0.5,
});

 const magicClick = new Howl({
   src: ["/sounds/ui/UI_MagicClick.webm"],
   volume: 0.4,
 });

const ambientSound = new Howl({
  src: ["/sounds/ambiant/2_WindAmbiant.webm"],
  loop: true,
  volume: 0.3,
});

const ambientSound2 = new Howl({
  src: ["/sounds/ambiant/3_caelid.webm"],
  loop: true,
  volume: 0.2,
});

// --- SONS SPÉCIFIQUES AUX SCÈNES (Layers) ---
const SCENE_LAYERS = {
  scene1: [
    new Howl({
      src: ["/sounds/ambiant/layer_forest.webm"],
      loop: true,
      volume: 0,
    }),
    new Howl({ src: ["/sounds/ambiant/birds.webm"], loop: true, volume: 0 }),
    new Howl({ src: ["/sounds/ambiant/river.webm"], loop: true, volume: 0 }),
  ],
  scene2: [
    new Howl({
      src: ["/sounds/ambiant/layer_caelid_dark.webm"],
      loop: true,
      volume: 0,
    }),
  ],
  // ...
};
const itemPickup = new Howl({
  src: ["/sounds/itemTarget/1_OpenBag.webm"],
  volume: 0.5,
});

const itemDog = new Howl({
  src: ["/sounds/itemTarget/2_Wouaf.webm"],
  volume: 0.5,
});

const uiClose = new Howl({
  src: ["/sounds/ui/UI_ClickWood.webm"],
  volume: 0.3,
});

const uiHover = new Howl({
  src: ["/sounds/ui/UI_Hover.webm"],
  volume: 0.2,
});

export const useSoundStore = create((set, get) => ({
  isMuted: false,
  _isSpecificPlaying: false,
  isDucked: false,
  currentActiveLayer: null,

  // Gère l'atténuation globale (Master Volume)
  setDucking: (active) => {
    const targetVolume = active ? 0.15 : 1.0;
    set({ isDucked: active });

    gsap.to(Howler, {
      duration: 1.5,
      volume: targetVolume,
      ease: "power1.inOut",
    });
  },

  updateSceneSounds: (sceneName) => {
    const { isMuted } = get();

    Object.entries(SCENE_LAYERS).forEach(([name, sounds]) => {
      const soundArray = Array.isArray(sounds) ? sounds : [sounds];

      if (name === sceneName) {
        soundArray.forEach((sound) => {
          if (!sound.playing()) {
            sound.play();
            sound.fade(0, 0.4, 2000);
          }
        });
        set({ currentActiveLayer: name });
      } else {    
        soundArray.forEach((sound) => {
          if (sound.playing()) {
            sound.fade(sound.volume(), 0, 1500);
            setTimeout(() => {
              if (get().currentActiveLayer !== name) sound.stop();
            }, 1550);
          }
        });
      }
    });
  },

  playClick: (isGlobal = false) => {
    const { isMuted } = get();
    if (isMuted) return;

    if (isGlobal) {
      setTimeout(() => {
        if (!get()._isSpecificPlaying) {
          uiClick.play();
        }
      }, 150);
    } else {
      uiClick.play();
    }
  },

  playSound: (soundName) => {
    const { isMuted } = get();
    if (isMuted) return;

    const sounds = {
      magic: magicClick,
      pickup: itemPickup,
      click: uiClick,
      close: uiClose,
      dog: itemDog,
      hover: uiHover,
    };

    const selectedSound = sounds[soundName] || uiClick;

    set({ _isSpecificPlaying: true });
    selectedSound.play();

    setTimeout(() => set({ _isSpecificPlaying: false }), 100);
  },

  playSuccess: () => {
    const { isMuted } = get();
    if (isMuted) return;

    set({ _isSpecificPlaying: true });
    magicClick.play();
    setTimeout(() => set({ _isSpecificPlaying: false }), 100);
  },

  startAmbience: () => {
    // Les ambiances globales démarrent au volume Master actuel
    Howler.volume(get().isDucked ? 0.15 : 1.0);

    if (!ambientSound.playing()) {
      ambientSound.play();
    }
    if (!ambientSound2.playing()) {
      ambientSound2.play();
    }
  },

  stopAmbience: () => {
    // Arrête tout, y compris les layers de scènes
    ambientSound.stop();
    ambientSound2.stop();
    Object.values(SCENE_LAYERS).forEach((s) => s.stop());
  },

  toggleMute: () => {
    const nextMute = !get().isMuted;
    set({ isMuted: nextMute });
    Howler.mute(nextMute);
  },
}));
