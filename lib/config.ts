/**
 * Single source of truth for the invitation.
 * Edit this file to personalise the entire website.
 */

export type TimelineEvent = {
  key: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  icon: "ring" | "church" | "reception";
};

export type GalleryItem = {
  src: string;
  alt: string;
  /** relative height weight for the masonry rhythm */
  span: "short" | "tall";
};

export const wedding = {
  couple: {
    bride: "Melvina",
    groom: "Royal",
    brideFull: "Melvina Varghese",
    groomFull: "Royal Wilson",
    together: "Melvina & Royal",
  },

  date: {
    // Holy Matrimony — the main celebration
    iso: "2026-08-23T12:05:00+05:30",
    display: "August 23, 2026",
    dayName: "Sunday",
    short: "23 . 08 . 2026",
  },

  verse: {
    text: "I have found the one whom my soul loves.",
    ref: "Song of Solomon 3:4",
  },

  invitation: {
    lead: "We request the honour of your presence",
    body: "as Melvina & Royal are united in the covenant of holy matrimony before God, and in the loving company of family, relatives and friends.",
  },

  church: {
    name: "St. Thomas Church",
    shortName: "St. Thomas Church",
    tagline: "Where two become one before God",
    address: "St. Thomas Church, Thiroor, Thrissur, Kerala",
    architecture: [
      { label: "Silhouette", value: "Twin-Spired Basilica" },
      { label: "Crowned by", value: "Golden Domes" },
      { label: "Setting", value: "Palm-lined Courtyard" },
    ],
    description:
      "Beneath twin golden domes and the great cross, this is the house of prayer where our covenant begins. Its arches, statues and sunlit courtyard have gathered the faithful for generations — and now they gather to bless ours.",
    mapsQuery: "St+Thomas+Church+Thiroor+Thrissur",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=St+Thomas+Church+Thiroor+Thrissur",
    navigateUrl:
      "https://www.google.com/maps/dir/?api=1&destination=St+Thomas+Church+Thiroor+Thrissur",
  },

  reception: {
    name: "St. Sebastian's Parish Hall",
    tagline: "Following the betrothal ceremony",
    address: "St. Sebastian's Parish Hall, Kuttikad, Chalakudy",
    time: "Following the betrothal",
    date: "August 17, 2026",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=St+Sebastian's+Forane+Church+Kuttikad",
  },

  parents: {
    bride: {
      side: "Parents of the Bride",
      names: "Mr. V. K. Varghese & Mrs. Mary Varghese",
      line: "Vaithalakkaran (H), Kuttikad (PO), Chalakudy",
    },
    groom: {
      side: "Parents of the Groom",
      names: "Mr. Wilson P. C. & Mrs. Rani Wilson",
      line: "Palayoor (H), Chottupara (PO), Killannur, Thrissur",
    },
  },

  timeline: [
    {
      key: "betrothal",
      title: "Betrothal",
      date: "Monday, 17 August 2026",
      time: "10:30 AM",
      location: "St. Sebastian's Forane Church, Kuttikad",
      description:
        "The blessing of the rings and the joining of two families in promise, before God.",
      icon: "ring",
    },
    {
      key: "reception",
      title: "Betrothal Reception",
      date: "Monday, 17 August 2026",
      time: "Following the ceremony",
      location: "St. Sebastian's Parish Hall, Kuttikad",
      description:
        "A warm gathering of family, relatives and friends to celebrate the betrothal.",
      icon: "reception",
    },
    {
      key: "wedding",
      title: "Holy Matrimony",
      date: "Sunday, 23 August 2026",
      time: "12:05 PM",
      location: "St. Thomas Church, Thiroor",
      description:
        "The nuptial mass and exchange of vows, sealing the sacred covenant of marriage.",
      icon: "church",
    },
  ] as TimelineEvent[],

  gallery: [
    { src: "/images/gallery-church-arch.png", alt: "St. Thomas Church at golden hour", span: "tall" },
    { src: "/images/gallery-rings.png", alt: "Two wedding rings resting on linen", span: "short" },
    { src: "/images/gallery-bible.png", alt: "An open Bible with a ribbon marker", span: "short" },
    { src: "/images/gallery-candles.png", alt: "Candles glowing in the sanctuary", span: "tall" },
    { src: "/images/gallery-flowers.png", alt: "White lilies and eucalyptus", span: "short" },
    { src: "/images/gallery-cross.png", alt: "A golden cross catching the light", span: "tall" },
    { src: "/images/gallery-decor.png", alt: "Aisle decorated with soft florals", span: "short" },
    { src: "/images/gallery-invite.png", alt: "The wedding invitation and wax seal", span: "short" },
  ] as GalleryItem[],

  contact: {
    rsvpPhone: "+91 00000 00000",
    rsvpBy: "August 10, 2026",
  },

  site: {
    url: "https://melvina-and-royal.example.com",
    title: "Melvina & Royal — Together Before God",
    description:
      "A Christian wedding celebration at St. Thomas Church, Thiroor. Join Melvina & Royal as they enter the covenant of marriage before God on August 23, 2026.",
    ogImage: "/images/hero-church.png",
  },
} as const;

export type Wedding = typeof wedding;
