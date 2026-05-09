import { create } from "zustand";
import { Howl, Howler } from "howler";
import { gsap } from "gsap";
import { sin } from "three/tsl";
import MainButton from "../components/ui/MainButtonStyle";

// --- SONS GLOBAUX ---

const uiClick = new Howl({
  src: ["/sounds/ui/UI_Click.webm"],
  volume: 0.5,
});

const uiMainButton = new Howl({
  src: ["/sounds/ui/ButtonMain.webm"],
  volume: 0.3,
});


//MENU

const buttonEnter = new Howl({
  src: ["/sounds/ui/boutonEnterMenu.webm"],
  volume: 1,
});

const menuAmbience = new Howl({
  src: ["/sounds/ambiant/AmbiantMenu.webm"],
  loop: true,
  volume: 0,
});

//CONTEXT
const contextAmbience = new Howl({
  src: ["/sounds/ambiant/AmbiantContext.webm"],
  loop: true,
  volume: 0.4,
});

const slideSoft = new Howl({
  src: ["/sounds/ui/SlideSoft.webm"],
  volume: 0.4,
});

//AMBIANCE TAH SCREAM
const ambientSound = new Howl({
  src: ["/sounds/ambiant/3_WindAmbiant2.webm"],
  loop: true,
  volume: 0.4,
});

const ambientSound2 = new Howl({
  src: ["/sounds/ambiant/4_AnimalsAmbiant.webm"],
  loop: true,
  volume: 1,
});

//AMBIANCE END

const ambiantEnd = new Howl({
  src: ["/sounds/ambiant/AmbiantEnd.webm"],
  loop: true,
  volume: 0.4,
});

///////////////
const uiClose = new Howl({
  src: ["/sounds/ui/UI_ClickWood.webm"],
  volume: 2,
});

const uiHover = new Howl({
  src: ["/sounds/ui/UI_Hover.webm"],
  volume: 0.3,
});

const uiSwooshScene = new Howl({
  src: ["/sounds/ui/UI_Swoosh_SF_SpeedUp2.webm"],
  volume: 0.5,
});

const commonDeepChoir = new Howl({
  src: ["/sounds/scene3/ambiant/DeepChoir.webm"],
  loop: true,
  volume: 0,
});

const commonFireWood = new Howl({
  src: ["/sounds/scene3/ambiant/FireWood.webm"],
  loop: true,
  volume: 0,
});

// --- SONS SPÉCIFIQUES AUX SCÈNES POUR L'AMBIANCE TAH RONALDO PRIME ---
const SCENE_LAYERS = {
  scene1: [],
  scene2: [
    { sound: commonDeepChoir, maxVolume: 0.07 },
    { sound: commonFireWood, maxVolume: 0.09 },
  ],
  scene3: [
    { sound: commonDeepChoir, maxVolume: 0.5 },
    { sound: commonFireWood, maxVolume: 0.9 },
  ],
  scene4: [
    { sound: commonDeepChoir, maxVolume: 0.07 },
    { sound: commonFireWood, maxVolume: 0.3 },
  ],
};

// --- SONS D'ACTION SPÉCIFIQUES MESSI PRIME ---

//SCENE1

const itemPickup = new Howl({
  src: ["/sounds/scene1/target/1_OpenBag.webm"],
  volume: 0.5,
});

const itemDog = new Howl({
  src: ["/sounds/scene1/target/2_Wouaf.webm"],
  volume: 0.5,
});

const itemRope = new Howl({
  src: ["/sounds/scene1/target/3_Rope.webm"],
  volume: 0.5,
});

const itemWomen = new Howl({
  src: ["/sounds/scene1/target/4_Women.webm"],
  volume: 0.5,
});

const itemElders = new Howl({
  src: ["/sounds/scene1/target/5_Elders_Hmm.webm"],
  volume: 0.5,
});

//SCENE2

const itemChild = new Howl({
  src: ["/sounds/scene2/target/childGiggle.webm"],
  volume: 0.7,
});

const itemTalismanTree = new Howl({
  src: ["/sounds/scene2/target/TalismanTree.webm"],
  volume: 0.7,
});

const itemDeer = new Howl({
  src: ["/sounds/scene2/target/DeerGrunt.webm"],
  volume: 0.7,
});

//SCENE3

const itemLeader = new Howl({
  src: ["/sounds/scene3/target/Sound_Hmmm_Male.webm"],
  volume: 0.7,
});

const itemSled = new Howl({
  src: ["/sounds/scene3/target/Sled_Pickup.webm"],
  volume: 0.7,
});

const itemFire = new Howl({
  src: ["/sounds/scene3/target/Swoosh_Fire_Cut.webm"],
  volume: 0.9,
});

const itemSinging = new Howl({
  src: ["/sounds/scene3/target/SingingMen.webm"],
  volume: 0.7,
});

// SCENE 4

const itemAutel = new Howl({
  src: ["/sounds/scene4/target/Autel.webm"],
  volume: 0.7,
});

const itemGift = new Howl({
  src: ["/sounds/scene4/target/Gifts.webm"],
  volume: 0.7,
});

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
    const { masterVolume } = get();
    const targetVolume = active ? masterVolume * 0.2 : masterVolume;

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
      if (name === sceneName) {
        layers.forEach(({ sound, maxVolume }) => {
          if (!sound.playing()) {
            sound.play();
            sound.fade(0, maxVolume || 0.4, 2000);
          } else {
            sound.fade(sound.volume(), maxVolume || 0.4, 2000);
          }
        });
      } else {
        layers.forEach(({ sound }) => {
          if (sound.playing()) {
            const isStillNeeded = SCENE_LAYERS[sceneName]?.some(
              (layer) => layer.sound === sound,
            );

            if (!isStillNeeded) {
              sound.fade(sound.volume(), 0, 1500);
              setTimeout(() => {
                if (
                  get().currentActiveLayer !== name &&
                  !get().currentActiveLayer?.includes(name)
                ) {
                  const currentNeeded = SCENE_LAYERS[
                    get().currentActiveLayer
                  ]?.some((l) => l.sound === sound);
                  if (!currentNeeded) sound.stop();
                }
              }, 1600);
            }
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
      //MENU
      buttonEnter: buttonEnter,
      click: uiClick,
      uiMainButton: uiMainButton,
      close: uiClose,
      hover: uiHover,
      swoosh: uiSwooshScene,
      //CONTEXT
      contextAmbience: contextAmbience,
      slideSoft: slideSoft,
      //END
      ambiantEnd: ambiantEnd,
      //SCENE1
      pickup: itemPickup,
      dog: itemDog,
      rope: itemRope,
      women: itemWomen,
      elders: itemElders,
      //SCENE2
      child: itemChild,
      talismanTree: itemTalismanTree,
      deer: itemDeer,
      //SCENE3
      leader: itemLeader,
      sled: itemSled,
      fire: itemFire,
      singing: itemSinging,
      //SCENE4
      autel: itemAutel,
      gift: itemGift,
    };

    const selectedSound = sounds[soundName] || uiClick;

    set({ _isSpecificPlaying: true });
    selectedSound.play();

    setTimeout(() => set({ _isSpecificPlaying: false }), 200);
  },

  startAmbience: () => {
    Howler.volume(get().isDucked ? 0.15 : 1.0);
    const FADE_DURATION = 5000;

    ambientSound.play();
    if (!ambientSound2.playing()) {
      ambientSound2.play();
      ambientSound2.fade(0, 1, FADE_DURATION);
    }
    if (!ambientSound.playing()) {
      ambientSound.play();
      ambientSound.fade(0, 0.4, FADE_DURATION);
    }
  },

  stopAmbience: () => {
    const FADE = 4000;
    [ambientSound, ambientSound2].forEach((s) => s.fade(s.volume(), 0, FADE));

    Object.values(SCENE_LAYERS)
      .flat()
      .forEach(({ sound }) => {
        if (sound.playing()) sound.fade(sound.volume(), 0, FADE);
      });

    setTimeout(() => {
      [ambientSound, ambientSound2].forEach((s) => s.stop());
      Object.values(SCENE_LAYERS)
        .flat()
        .forEach(({ sound }) => sound.stop());
    }, FADE + 100);
  },

  startAmbianceMenu: () => {
    const FADE_DURATION = 2000;
    if (!menuAmbience.playing()) {
      menuAmbience.fade(0, 1.5, FADE_DURATION);
      menuAmbience.play();
    }
  },

  stopAmbianceMenu: () => {
    const FADE_DURATION = 2000;
    if (menuAmbience.playing()) {
      menuAmbience.fade(menuAmbience.volume(), 0, FADE_DURATION);
      setTimeout(() => {
        menuAmbience.stop();
      }, FADE_DURATION);
    }
  },

  startAmbianceContext: () => {
    contextAmbience.volume(0.4);
    if (!contextAmbience.playing()) {
      contextAmbience.play();
    }
  },

  stopAmbianceContext: () => {
    const FADE_DURATION = 1000;
    if (contextAmbience.playing()) {
      contextAmbience.fade(contextAmbience.volume(), 0, FADE_DURATION);
      setTimeout(() => {
        contextAmbience.stop();
      }, FADE_DURATION);
    }
  },

  stopAmbianceEnd: () => {
    const FADE_DURATION = 2000;
    if (ambiantEnd.playing()) {
      ambiantEnd.fade(ambiantEnd.volume(), 0, FADE_DURATION);
      setTimeout(() => {
        ambiantEnd.stop();
      }, FADE_DURATION);
    }
  },

  toggleMute: () => {
    const nextMute = !get().isMuted;
    set({ isMuted: nextMute });
    Howler.mute(nextMute);
  },
}));
