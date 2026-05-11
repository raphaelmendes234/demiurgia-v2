import { create } from "zustand";
import { Howl, Howler } from "howler";
import { gsap } from "gsap";

// --- TOUS TES SONS AVEC TES NOMS EXACTS ---
const SOUNDS = {
  // UI & Menu
  click: new Howl({ src: ["/sounds/ui/UI_Click.webm"], volume: 0.5 }),
  uiMainButton: new Howl({ src: ["/sounds/ui/ButtonMain.webm"], volume: 0.3 }),
  buttonEnter: new Howl({
    src: ["/sounds/ui/boutonEnterMenu.webm"],
    volume: 1,
  }),
  close: new Howl({ src: ["/sounds/ui/UI_ClickWood.webm"], volume: 2 }),
  hover: new Howl({ src: ["/sounds/ui/UI_Hover.webm"], volume: 0.3 }),
  swoosh: new Howl({
    src: ["/sounds/ui/UI_Swoosh_SF_SpeedUp2.webm"],
    volume: 0.5,
  }),
  slideSoft: new Howl({ src: ["/sounds/ui/SlideSoft.webm"], volume: 0.4 }),

  // Ambiances 
  menuAmbience: new Howl({
    src: ["/sounds/ambiant/AmbiantMenu.webm"],
    loop: true,
    volume: 0,
  }),
  contextAmbience: new Howl({
    src: ["/sounds/ambiant/AmbiantContext.webm"],
    loop: true,
    volume: 0.4,
  }),
  ambientSound: new Howl({
    src: ["/sounds/ambiant/3_WindAmbiant2.webm"],
    loop: true,
    volume: 0.4,
  }),
  ambientSound2: new Howl({
    src: ["/sounds/ambiant/4_AnimalsAmbiant.webm"],
    loop: true,
    volume: 1,
  }),
  ambiantEnd: new Howl({
    src: ["/sounds/ambiant/AmbiantEnd.webm"],
    loop: true,
    volume: 0.4,
  }),

  // Sons communs à plusieurs scènes
  commonDeepChoir: new Howl({
    src: ["/sounds/scene3/ambiant/DeepChoir.webm"],
    loop: true,
    volume: 0,
  }),
  commonFireWood: new Howl({
    src: ["/sounds/scene3/ambiant/FireWood.webm"],
    loop: true,
    volume: 0,
  }),

  // SCENE 1
  pickup: new Howl({
    src: ["/sounds/scene1/target/1_OpenBag.webm"],
    volume: 0.5,
  }),
  dog: new Howl({ src: ["/sounds/scene1/target/2_Wouaf.webm"], volume: 0.5 }),
  rope: new Howl({ src: ["/sounds/scene1/target/3_Rope.webm"], volume: 0.5 }),
  women: new Howl({ src: ["/sounds/scene1/target/4_Women.webm"], volume: 0.5 }),
  elders: new Howl({
    src: ["/sounds/scene1/target/5_Elders_Hmm.webm"],
    volume: 0.5,
  }),

  // SCENE 2
  child: new Howl({
    src: ["/sounds/scene2/target/childGiggle.webm"],
    volume: 0.7,
  }),
  talismanTree: new Howl({
    src: ["/sounds/scene2/target/TalismanTree.webm"],
    volume: 0.7,
  }),
  deer: new Howl({
    src: ["/sounds/scene2/target/DeerGrunt.webm"],
    volume: 0.7,
  }),

  // SCENE 3
  leader: new Howl({
    src: ["/sounds/scene3/target/Sound_Hmmm_Male.webm"],
    volume: 0.7,
  }),
  sled: new Howl({
    src: ["/sounds/scene3/target/Sled_Pickup.webm"],
    volume: 0.7,
  }),
  fire: new Howl({
    src: ["/sounds/scene3/target/Swoosh_Fire_Cut.webm"],
    volume: 0.9,
  }),
  singing: new Howl({
    src: ["/sounds/scene3/target/SingingMen.webm"],
    volume: 0.7,
  }),

  // SCENE 4
  autel: new Howl({ src: ["/sounds/scene4/target/Autel.webm"], volume: 0.7 }),
  gift: new Howl({ src: ["/sounds/scene4/target/Gifts.webm"], volume: 0.7 }),
};

// --- CONFIGURATION DES LAYERS ---
const SCENE_LAYERS = {
  scene1: [],
  scene2: [
    { sound: SOUNDS.commonDeepChoir, maxVolume: 0.07 },
    { sound: SOUNDS.commonFireWood, maxVolume: 0.09 },
  ],
  scene3: [
    { sound: SOUNDS.commonDeepChoir, maxVolume: 0.5 },
    { sound: SOUNDS.commonFireWood, maxVolume: 0.9 },
  ],
  scene4: [
    { sound: SOUNDS.commonDeepChoir, maxVolume: 0.07 },
    { sound: SOUNDS.commonFireWood, maxVolume: 0.3 },
  ],
};

// Helper pour gérer les extinctions de sons proprement
const fadeAndStop = (sound, duration = 2000) => {
  if (!sound || !sound.playing()) return;
  sound.fade(sound.volume(), 0, duration);
  setTimeout(() => {
    if (sound.volume() === 0) sound.stop();
  }, duration + 50);
};

export const useSoundStore = create((set, get) => ({
  masterVolume: 1,
  isMuted: false,
  _isSpecificPlaying: false,
  isDucked: false,
  currentActiveLayer: null,

  setGlobalVolume: (value) => {
    set({ masterVolume: value });
    Howler.volume(value);
  },

  setDucking: (active) => {
    const targetVolume = active ? get().masterVolume * 0.2 : get().masterVolume;
    set({ isDucked: active });
    gsap.to(Howler, {
      duration: 2,
      volume: targetVolume,
      ease: "power1.inOut",
    });
  },

  updateSceneSounds: (sceneName) => {
    set({ currentActiveLayer: sceneName });
    Object.entries(SCENE_LAYERS).forEach(([name, layers]) => {
      const isCurrent = name === sceneName;
      layers.forEach(({ sound, maxVolume }) => {
        if (isCurrent) {
          if (!sound.playing()) sound.play();
          sound.fade(sound.volume(), maxVolume, 2000);
        } else {
          const isNeeded = SCENE_LAYERS[sceneName]?.some(
            (l) => l.sound === sound,
          );
          if (!isNeeded) fadeAndStop(sound, 1500);
        }
      });
    });
  },

  playClick: (isGlobal = false) => {
    if (get().isMuted) return;
    if (isGlobal) {
      setTimeout(() => {
        if (!get()._isSpecificPlaying) SOUNDS.click.play();
      }, 150);
    } else {
      SOUNDS.click.play();
    }
  },

  playSound: (soundName) => {
    if (get().isMuted) return;
    const selectedSound = SOUNDS[soundName] || SOUNDS.click;
    set({ _isSpecificPlaying: true });
    selectedSound.play();
    setTimeout(() => set({ _isSpecificPlaying: false }), 200);
  },

  startAmbience: () => {
    Howler.volume(get().isDucked ? 0.15 : 1.0);
    [
      { s: SOUNDS.ambientSound, v: 0.4 },
      { s: SOUNDS.ambientSound2, v: 1 },
    ].forEach(({ s, v }) => {
      if (!s.playing()) {
        s.play();
        s.fade(0, v, 5000);
      }
    });
  },

  stopAmbience: () => {
    [SOUNDS.ambientSound, SOUNDS.ambientSound2].forEach((s) =>
      fadeAndStop(s, 4000),
    );
    Object.values(SCENE_LAYERS)
      .flat()
      .forEach(({ sound }) => fadeAndStop(sound, 4000));
  },

  startAmbianceMenu: () => {
    if (!SOUNDS.menuAmbience.playing()) {
      SOUNDS.menuAmbience.play();
      SOUNDS.menuAmbience.fade(0, 1.5, 2000);
    }
  },
  stopAmbianceMenu: () => fadeAndStop(SOUNDS.menuAmbience),

  startAmbianceContext: () => {
    if (!SOUNDS.contextAmbience.playing()) {
      SOUNDS.contextAmbience.play();
      SOUNDS.contextAmbience.fade(0, 0.4, 1000);
    }
  },
  stopAmbianceContext: () => fadeAndStop(SOUNDS.contextAmbience, 1000),

  stopAmbianceEnd: () => fadeAndStop(SOUNDS.ambiantEnd),

  toggleMute: () => {
    const nextMute = !get().isMuted;
    set({ isMuted: nextMute });
    Howler.mute(nextMute);
  },
}));
