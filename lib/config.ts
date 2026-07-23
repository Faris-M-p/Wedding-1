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
    bride: "Anna",
    groom: "Thomas",
    brideFull: "Anna Elizabeth",
    groomFull: "Thomas Mathew",
    together: "Anna & Thomas",
  },

  date: {
    iso: "2026-12-19T10:00:00+05:30",
    display: "December 19, 2026",
    dayName: "Saturday",
    short: "19 . 12 . 2026",
  },

  verse: {
    text: "I have found the one whom my soul loves.",
    ref: "Song of Solomon 3:4",
  },

  invitation: {
    lead: "We request the honour of your presence",
    body: "as we exchange our vows and are united in the covenant of holy matrimony before God and in the company of our beloved family and friends.",
  },

  church: {
    name: "St. Mary's Cathedral",
    shortName: "St. Mary's Cathedral",
    tagline: "A century of prayer beneath these arches",
    address: "Cathedral Road, Kochi, Kerala 682011",
    architecture: [
      { label: "Style", value: "Neo-Gothic Revival" },
      { label: "Consecrated", value: "Anno Domini 1902" },
      { label: "Spire", value: "48 metres to the cross" },
    ],
    description:
      "Built at the turn of the last century, the cathedral's soaring vaults and stained-glass windows have witnessed generations of covenants. It is here, beneath the great cross, that our own begins.",
    mapsQuery: "St+Mary's+Cathedral+Kochi",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=St+Mary's+Cathedral+Kochi",
    navigateUrl: "https://www.google.com/maps/dir/?api=1&destination=St+Mary's+Cathedral+Kochi",
  },

  reception: {
    name: "The Grand Pavilion",
    tagline: "An evening of gratitude & celebration",
    address: "Marine Drive, Kochi, Kerala 682031",
    time: "7:00 PM onwards",
    date: "December 19, 2026",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Marine+Drive+Kochi",
  },

  parents: {
    bride: {
      side: "Parents of the Bride",
      names: "Mr. George & Mrs. Mary Elizabeth",
      line: "who present their daughter with love and blessing",
    },
    groom: {
      side: "Parents of the Groom",
      names: "Mr. Joseph & Mrs. Rachel Mathew",
      line: "who present their son with love and blessing",
    },
  },

  timeline: [
    {
      key: "betrothal",
      title: "Betrothal",
      date: "December 18, 2026",
      time: "5:00 PM",
      location: "St. Mary's Cathedral, Kochi",
      description:
        "The reading of the banns and the blessing of the rings, as two families become one in promise.",
      icon: "ring",
    },
    {
      key: "wedding",
      title: "Holy Matrimony",
      date: "December 19, 2026",
      time: "10:00 AM",
      location: "St. Mary's Cathedral, Kochi",
      description:
        "The nuptial mass and exchange of vows before God, sealing the covenant of marriage.",
      icon: "church",
    },
    {
      key: "reception",
      title: "Reception",
      date: "December 19, 2026",
      time: "7:00 PM",
      location: "The Grand Pavilion, Marine Drive",
      description:
        "An evening of feasting, music and gratitude in the warm company of all we hold dear.",
      icon: "reception",
    },
  ] as TimelineEvent[],

  gallery: [
    { src: "/images/gallery-church-arch.png", alt: "Cathedral arches at golden hour", span: "tall" },
    { src: "/images/gallery-rings.png", alt: "Two wedding rings resting on linen", span: "short" },
    { src: "/images/gallery-bible.png", alt: "An open Bible with a ribbon marker", span: "short" },
    { src: "/images/gallery-candles.png", alt: "Candles glowing in the sanctuary", span: "tall" },
    { src: "/images/gallery-flowers.png", alt: "White lilies and eucalyptus", span: "short" },
    { src: "/images/gallery-cross.png", alt: "A golden cross catching the light", span: "tall" },
    { src: "/images/gallery-decor.png", alt: "Aisle decorated with soft florals", span: "short" },
    { src: "/images/gallery-invite.png", alt: "The wedding invitation and wax seal", span: "short" },
  ] as GalleryItem[],

  contact: {
    rsvpPhone: "+91 98470 00000",
    rsvpBy: "December 1, 2026",
  },

  site: {
    url: "https://anna-and-thomas.example.com",
    title: "Anna & Thomas — Together Before God",
    description:
      "A Christian wedding celebration at St. Mary's Cathedral, Kochi. Join Anna & Thomas as they enter the covenant of marriage before God on December 19, 2026.",
    ogImage: "/images/hero-church.png",
  },
} as const;

export type Wedding = typeof wedding;
