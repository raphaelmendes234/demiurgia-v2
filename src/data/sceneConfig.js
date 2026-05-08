export const SCENE_CONFIG = {
  /**
   * SCENE1
   */
  INT_Women: {
    // Content
    name: "Femme",
    dialogue: "Nanouk, tu n’es pas en train d’apporter ton offrande ?\n\nTu ne l’as pas encore perdu cette fois ?\n\nDépêche toi voyons !",
    image: "/assets/images/character/scene1/Woman.png",
    imageInfo: "/assets/images/character/scene1/1-5.png",
    infoName: "Femmes Lumaras",
    infoText: "Lors des haltes, les femmes Lumaras fabriquent et transportent les offrandes destinées aux autels. Ces objets sacrés ont pour but d'apaiser la colère de Démiurgia.",
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
    name: "Sac",
    dialogue: "Mon sac est troué… j’ai perdu mon offrande !",
    image: "/assets/images/character/scene1/Backpack.png",
    imageInfo: "/assets/images/character/scene1/1-2.png",
    isObject: true,
    infoName: "Sac en peau",
    infoText: "Sac artisanal fabriqué à partir de peaux cousues. Les membres de la tribu l’utilisent pour transporter nourriture, outils et offrandes durant leurs marches.",

    hoverSound: "",
    clickSound: "pickup",
  },
  INT_Rope: {
    name: "Fil d'âme",
    dialogue: "Maintenant que je suis détaché je peux aller chercher une offrande.",
    image: "/assets/images/character/scene1/Rope.png",
    imageInfo: "/assets/images/character/scene1/1-3.png",
    isObject: true,
    infoName: "Fil d'âme",
    infoText: "Corde sacrée reliant les membres de la tribu durant la marche. Elle permet de protéger les âmes Lumaras de la colère de Démiurgia",

    hoverSound: "",
    clickSound: "rope",
  },
  INT_Dog: {
    name: "Fido",
    dialogue: "C’est un gentil chien...",
    image: "/assets/images/character/scene1/Dog.png",
    imageInfo: "/assets/images/character/scene1/1-1.png",
    isObject: true,
    infoName: "Chien des neiges",
    infoText: "Compagnons de la tribu, les chiens assistent les Lumaras durant la chasse et servent de précieux éclaireurs pendant les déplacements de la tribu.",

    hoverSound: "",
    clickSound: "dog",
  },
  INT_Elders: {
    name: "Vieillards",
    dialogue: "J’ai mal aux jambes... la tribu se déplace de plus en plus souvent...\n\nJe suis épuisé aussi.\n\nC'est car Démiurgia se rapproche…",
    image: "/assets/images/character/scene1/Elders.png",
    imageInfo: "/assets/images/character/scene1/1-4.png",
    isObject: false,
    infoName: "Vieillards Lumaras",
    infoText: "Gardiens de la mémoire de la tribu, les anciens transmettent les récits des ancêtres et les légendes de Démiurgia. La poudre d’aurore présente sur leurs vêtements symbolise leur expérience et leur sagesse.",
    
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
    name: "Enfants",
    dialogue: "Nanouk a encore perdu son offrande !\n\nMoi, j’ai déjà donné la mienne.\n\nDémiurgia va venir te chercher !",
    image: "/assets/images/character/scene2/Childrens.png",
    imageInfo: "/assets/images/character/scene2/2-2.png",

    isObject: false,
    infoName: "Enfants de la tribu",
    infoText: "Les enfants Lumaras connaissent Démiurgia à travers les récits des anciens. Encore naïfs face au danger réel, ils répètent ces histoires pour se moquer de Nanouk et de son éternelle distraction.",
    
    hoverSound: "",
    clickSound: "child",

    glow: {
      mask: "/assets/images/emission/children_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_Reindeer: {
    name: "Renne",
    dialogue: "J’aime bien les rennes.\n\nJe pense qu’eux ne m’aiment pas beaucoup…",
    image: "/assets/images/character/scene2/Reindeer.png",
    imageInfo: "/assets/images/character/scene2/2-1.png",
    isObject: true,
    infoName: "Rennes",
    infoText: "Essentiels à la survie de la tribu, les rennes tirent les traîneaux chargés durant les longues marches. Endurants et robustes, ils permettent aux Lumaras de poursuivre leurs déplacements malgré le froid et la fatigue.",
    
    hoverSound: "",
    clickSound: "deer",
  },
  INT_TalismanTree: {
    name: "Talismans",
    dialogue: "Je ne devrais pas trop m'en éloigner...",
    image: "/assets/images/character/scene2/TalismanTree.png",
    imageInfo: "/assets/images/character/scene2/2-3.png",
    isObject: true,
    infoName: "Talismans protecteurs",
    infoText: "Orné sur les arbres de la forêt, ils repoussent la colère de Démiurgia et ralentissent son approche depuis la forêt.",
    
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
    name: "Traîneau",
    dialogue: "Je vais peut-être trouver une offrande là-dedans…",
    image: "/assets/images/character/scene3/Sled.png",
    imageInfo: "/assets/images/character/scene3/3-2.png",
    isObject: true,
    infoName: "Traîneau de voyage",
    infoText: "Les traîneaux permettent de transporter les ressources essentielles de la tribu facilement sur la neige de la contrée. Nourriture, outils, armes, peaux et morceaux de huttes démontées, sans eux les Lumaras ne pourraient survivre aux longues marches.",
    
    hoverSound: "",
    clickSound: "sled",
  },
  INT_Fire: {
    name: "Feu",
    dialogue: "J’aime rester près du feu quand il fait nuit.",
    image: "/assets/images/character/scene3/Fire.png",
    isObject: true,
    infoName: "Feu de camp",
    infoText: "Source de chaleur et de lumière, le feu permet à la tribu de survivre au froid. Les Lumaras s’y rassemblent également pour cuisiner, chanter les rites anciens et rester unis.",
    
    hoverSound: "",
    clickSound: "fire",
  },
  INT_Leader: {
    name: "Chef",
    dialogue: "J’aimerai être comme lui...",
    image: "/assets/images/character/scene3/Leader.png",
    imageInfo: "/assets/images/character/scene3/3-3.png",
    isObject: true,
    infoName: "Chef de la tribu",
    infoText: "Le chef dirige les rituels et la tribu des Lumara. Il arrive à lire dans les étoiles pour cheminer à travers la contrée en évitant toute rencontre avec Démiurgia.",
    
    hoverSound: "",
    clickSound: "leader",

    glow: {
      mask: "/assets/images/emission/leader_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Acting: {
    name: "Hommes",
    dialogue: "Ô Démiurgia…\n\nFasse que nos voix puissent t’atteindre…\n\nDétourne-toi de notre tribu…",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",
    isObject: false,
    infoName: "Hommes Lumaras",
    infoText: "Les hommes Lumaras chantent vers les cieux lors des traversées nocturnes. Leurs voix portent les excuses de la tribu pour la profanation ancienne ayant éveillé Démiurgia. Ces chants sacrés empêchent la créature de trop s’approcher de la tribu.",
    
    hoverSound: "",
    clickSound: "singing",

    glow: {
      mask: "/assets/images/emission/acting_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Standing: {
    name: "Hommes",
    dialogue: "Ô Démiurgia…\n\nFasse que nos voix puissent t’atteindre…\n\nDétourne-toi de notre tribu…",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",

    isObject: false,
    infoName: "Hommes Lumaras",
    infoText: "Les hommes Lumaras chantent vers les cieux lors des traversées nocturnes. Leurs voix portent les excuses de la tribu pour la profanation ancienne ayant éveillé Démiurgia. Ces chants sacrés empêchent la créature de trop s’approcher de la tribu.",
    
    hoverSound: "",
    clickSound: "singing",

    glow: {
      mask: "/assets/images/emission/standing_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_SingingMen_Sitting: {
    name: "Hommes",
    dialogue: "Ô Démiurgia…\n\nFasse que nos voix puissent t’atteindre…\n\nDétourne-toi de notre tribu…",
    image: "/assets/images/character/scene3/SingingMen.png",
    imageInfo: "/assets/images/character/scene3/3-1.png",

    isObject: false,
    infoName: "Hommes Lumaras",
    infoText: "Les hommes Lumaras chantent vers les cieux lors des traversées nocturnes. Leurs voix portent les excuses de la tribu pour la profanation ancienne ayant éveillé Démiurgia. Ces chants sacrés empêchent la créature de trop s’approcher de la tribu.",
    
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
    dialogue: "Tu l’as perdu ? C’est la troisième fois ce mois-ci, Nanouk !\n\nSi quelqu’un d’autre l’apprend… tu vas mettre en danger toute la tribu !\n\nVa vite voir plus loin si tu trouves quelque chose !",
    image: "/assets/images/character/scene4/Autel.png",
      imageInfo: "/assets/images/character/scene4/4-1.png",
    isObject: false,
    infoName: "Autel",
    infoText: "Non loin du feu est construit un autel où les membres de la tribu déposent des offrandes destinées à Démiurgia afin d’apaiser sa colère. Chaque objet abandonné représente une âme, un souvenir ou un pardon offert à la créature qui poursuit la tribu.",
    
    hoverSound: "",
    clickSound: "autel",

    glow: {
      mask: "/assets/images/emission/autel_emissive2.png",
      emissiveColor: "#0fd15d",
      emissiveIntensity: 4,
    },
  },
  INT_Gifts: {
    name: "Offrandes",
    dialogue: "Il y en a déjà tant...\n\nQue vais-je pouvoir apporter ?",
    image: "/assets/images/character/scene4/Gifts.png",
    imageInfo: "/assets/images/character/scene4/4-2.png",
    isObject: true,
    infoName: "Offrandes",
    infoText: "Les offrandes de la tribu sont diverses : statuettes de pierre sculptées, objets gravés de signes rituels, nourriture, viande séchée, fruits des bois et plantes rares. Chaque offrande doit être jugée digne des esprits, sous peine d’attiser davantage la colère de Démiurgia.",

    hoverSound: "",
    clickSound: "gift",
  },
};
