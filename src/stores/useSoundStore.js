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
  src: ["/sounds/ui/1.mp3"],
  volume: 0.1,
});

const magicClick = new Howl({
  src: ["/sounds/ui/UI_MagicClick.webm"],
  volume: 0.4,
});

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

// --- SONS SPÉCIFIQUES AUX SCÈNES POUR L'AMBIANCE TAH RONALDO PRIME ---
const SCENE_LAYERS = {
  scene1: [],
  scene2: [
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/DeepChoir.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.09,
    },
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/FireWood.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.09,
    },
  ],
  scene3: [
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/FireWood.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.9,
    },
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/DeepChoir.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.6,
    },
  ],
  scene4: [
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/DeepChoir.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.07,
    },
    {
      sound: new Howl({
        src: ["/sounds/scene3/ambiant/FireWood.webm"],
        loop: true,
        volume: 0,
      }),
      maxVolume: 0.3,
    },
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
            sound.fade(sound.volume(), maxVolume || 0.4, 1000);
          }
        });
      } else {
        layers.forEach(({ sound }) => {
          if (sound.playing()) {
            sound.fade(sound.volume(), 0, 1500);
            setTimeout(() => {
              if (get().currentActiveLayer !== name) {
                sound.stop();
              }
            }, 1600);
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
      uiMainButton: uiMainButton,
      close: uiClose,
      dog: itemDog,
      hover: uiHover,
      leader: itemLeader,
      sled: itemSled,
      swoosh: uiSwooshScene,
      fire: itemFire,
      rope: itemRope,
      child: itemChild,
      women: itemWomen,
      elders: itemElders,
      talismanTree: itemTalismanTree,
      deer: itemDeer,
      singing: itemSinging,
      autel: itemAutel,
      gift: itemGift,
    };

    const selectedSound = sounds[soundName] || uiClick;

    set({ _isSpecificPlaying: true });
    selectedSound.play();

    setTimeout(() => set({ _isSpecificPlaying: false }), 100);
  },

 
  startAmbience: () => {
    Howler.volume(get().isDucked ? 0.15 : 1.0);
    const FADE_DURATION = 1000;

    ambientSound.play();
    if (!ambientSound2.playing()) {
      ambientSound2.play();
      ambientSound2.fade(0, 1, FADE_DURATION);
    }
  },

  stopAmbience: () => {
    ambientSound.stop();
    ambientSound2.stop();

    Object.values(SCENE_LAYERS).forEach((layers) => {
      layers.forEach(({ sound }) => sound.stop());
    });
  },

  toggleMute: () => {
    const nextMute = !get().isMuted;
    set({ isMuted: nextMute });
    Howler.mute(nextMute);
  },
}));
