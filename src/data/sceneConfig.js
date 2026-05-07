export const SCENE_CONFIG = {
  /**
   * SCENE1
   */
  INT_Women: {
    // Content
    name: "Women",
    dialogue: "La place des femmes c'est à la couizine",
    image: "/assets/images/character/scene1/Woman.png",
    imageInfo: "/assets/images/character/scene1/1-5.png",
    info: "Voivizvizv",
    isObject: false,

    // Sound
    hoverSound: "",
    clickSound: "women",

    // Glow
    glow: {
      mask: "/assets/images/emission/women_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_Backpack: {
    name: "Backpack",
    dialogue: "Backpack",
    image: "/assets/images/character/scene1/Backpack.png",
    imageInfo: "/assets/images/character/scene1/1-2.png",
    isObject: true,

    hoverSound: "",
    clickSound: "pickup",
  },
  INT_Rope: {
    name: "Rope",
    dialogue: "Rope",
    image: "/assets/images/character/scene1/Rope.png",
    imageInfo: "/assets/images/character/scene1/1-3.png",
    isObject: true,

    hoverSound: "",
    clickSound: "rope",
  },
  INT_Dog: {
    name: "Dog",
    dialogue: "Dog",
    image: "/assets/images/character/scene1/Dog.png",
    imageInfo: "/assets/images/character/scene1/1-1.png",
    isObject: true,

    hoverSound: "",
    clickSound: "dog",
  },
  INT_Elders: {
    name: "Elders",
    dialogue: "Vieux",
    image: "/assets/images/character/scene1/Elders.png",
    imageInfo: "/assets/images/character/scene1/1-4.png",
    isObject: false,

    hoverSound: "",
    clickSound: "elders",

    glow: {
      mask: "/assets/images/emission/elders_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },

  /**
   * SCENE2
   */
  INT_Childrens: {
    name: "Childrens",
    dialogue: "Enfants",
    image: "/assets/images/character/scene2/Childrens.png",
    imageInfo: "/assets/images/character/scene2/2-2.png",

    isObject: false,

    hoverSound: "",
    clickSound: "child",

    glow: {
      mask: "/assets/images/emission/children_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_Reindeer: {
    name: "Reindeer",
    dialogue: "Reindeer",
    image: "/assets/images/character/scene2/Reindeer.png",
    imageInfo: "/assets/images/character/scene2/2-1.png",
    isObject: true,

    hoverSound: "",
    clickSound: "deer",
  },
  INT_TalismanTree: {
    name: "TalismanTree",
    dialogue: "TalismanTree",
    image: "/assets/images/character/scene2/TalismanTree.png",
    imageInfo: "/assets/images/character/scene2/2-3.png",
    isObject: true,

    hoverSound: "",
    clickSound: "talismanTree",

    glow: {
      mask: "/assets/images/emission/talismanTree_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },

  /**
   * SCENE3
   */
  INT_Sled: {
    name: "Sled",
    dialogue: "Sled",
    image: "/assets/images/character/scene3/Sled.png",
    imageInfo: "/assets/images/character/scene3/3-2.png",
    isObject: true,

    hoverSound: "",
    clickSound: "sled",
  },
  INT_Fire: {
    name: "Fire",
    dialogue: "Fire",
    image: "/assets/images/character/scene3/Fire.png",
    isObject: true,

    hoverSound: "",
    clickSound: "fire",
  },
  INT_Leader: {
    name: "Leader",
    dialogue: "Leader",
    image: "/assets/images/character/scene3/Leader.png",
    imageInfo: "/assets/images/character/scene3/3-3.png",
    isObject: false,

    hoverSound: "",
    clickSound: "leader",

    glow: {
      mask: "/assets/images/emission/leader_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Acting: {
    name: "SingingMen",
    dialogue: "SingingMen",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",
    isObject: false,

    hoverSound: "",
    clickSound: "singing",

    glow: {
      mask: "/assets/images/emission/acting_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Standing: {
    name: "SingingMen",
    dialogue: "SingingMen",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",

    isObject: false,

    hoverSound: "",
    clickSound: "singing",

    glow: {
      mask: "/assets/images/emission/standing_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Sitting: {
    name: "SingingMen",
    dialogue: "SingingMen",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",

    isObject: false,

    hoverSound: "",
    clickSound: "singing",

    glow: {
      mask: "/assets/images/emission/sitting_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },

  /**
   * SCENE4
   */
  INT_Autel: {
    name: "Autel",
    dialogue: "Autel",
    image: "/assets/images/character/scene4/Autel.png",
      imageInfo: "/assets/images/character/scene4/4-1.png",
    isObject: false,

    hoverSound: "",
    clickSound: "autel",

    glow: {
      mask: "/assets/images/emission/autel_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_Gifts: {
    name: "Gifts",
    dialogue: "Gifts",
    image: "/assets/images/character/scene4/Gifts.png",
    imageInfo: "/assets/images/character/scene4/4-2.png",
    isObject: true,

    hoverSound: "",
    clickSound: "gift",
  },
};
