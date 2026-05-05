import { create } from "zustand";
import { Howl, Howler } from "howler";

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
  volume: 0.1,
});

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
    if (!ambientSound.playing()) {
      ambientSound.play();
    }
      if (!ambientSound2.playing()) {
        ambientSound2.play();
      }
  },

  stopAmbience: () => {
    ambientSound.stop();
    ambientSound2.stop();
  },

  toggleMute: () => {
    const nextMute = !get().isMuted;
    set({ isMuted: nextMute });
    Howler.mute(nextMute);
  },
}));
