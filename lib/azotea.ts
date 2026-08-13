/**
 * Single source of truth for AZOTEA's business information.
 *
 * Every value here is taken from the existing azotea.co.uk website (or, where
 * noted, from the venue's own listing on hyatt.com — AZOTEA sits inside Hyatt
 * Place / Hyatt House Leeds). Nothing here is invented: if a detail could not
 * be verified it is left out rather than guessed at.
 */

export const business = {
  name: "AZOTEA",
  legalDescriptor: "Rooftop Restaurant & Bar",
  tagline: "A rooftop hacienda above Leeds",
  city: "Leeds",
  cuisine: "Latin American",
  address: {
    line1: "Twelfth Floor, Hyatt Place",
    line2: "Sovereign Square",
    city: "Leeds",
    postcode: "LS1 4DA",
    country: "United Kingdom",
  },
  phone: "0113 529 7800",
  phoneHref: "tel:+441135297800",
  email: "hola@azotea.co.uk",
  groupsEmail: "groups@azotea.co.uk",
  /** The site states "12pm until late" seven days a week. */
  hoursSummary: "Open daily from 12pm until late",
  hoursDetail: [
    { days: "Monday – Thursday", time: "12pm until late" },
    { days: "Friday – Saturday", time: "12pm until late" },
    { days: "Sunday", time: "12pm until late" },
  ],
  floor: "12th floor",
  hotel: "Hyatt Place & Hyatt House Leeds",
  operator: "Aimbridge Hospitality EMEA",
} as const;

export const addressOneLine = `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.postcode}`;

export const nav = [
  { href: "/azotea/menus", label: "Menus" },
  { href: "/azotea/story", label: "Our Story" },
  { href: "/azotea/group-bookings", label: "Groups & Events" },
  { href: "/azotea/find", label: "Find Us" },
  { href: "/azotea/faqs", label: "FAQs" },
  { href: "/azotea/contact", label: "Contact" },
] as const;

/** Headline reasons to visit — all drawn from existing site copy. */
export const pillars = [
  {
    title: "Twelve floors up",
    body:
      "A rooftop hacienda on the 12th floor of Sovereign Square, with two outdoor terraces and floor-to-ceiling views across the Leeds skyline.",
  },
  {
    title: "Latin America, plated",
    body:
      "Authentic dishes, bold flavours and traditional cooking styles that underpin the culture of the Latin American region — from the coasts of Brazil to the markets of Mexico.",
  },
  {
    title: "Agave-led bar",
    body:
      "A cocktail list built on tequila, mezcal and rum, where every drink is inspired by a country, its landscapes, its stories or its native ingredients.",
  },
  {
    title: "Music and movement",
    body:
      "The room shifts through the day with live music, dance and cultural performances — Latin rhythms from salsa to reggaeton as the sun goes down.",
  },
] as const;

export const menus = [
  {
    id: "para-picar",
    name: "Para Picar",
    blurb:
      "Bar nibbles to start: tortilla chips with house-made salsas — salsa verde, mojo rojo and spiced roast pineapple — alongside guacamole prepared at your table.",
    dishes: [
      {
        name: "Tortilla chips & salsas",
        detail: "Salsa verde, mojo rojo, spiced roast pineapple",
      },
      { name: "Guacamole", detail: "Prepared tableside" },
      { name: "Padrón peppers", detail: "Seasoned with spiced salt" },
    ],
  },
  {
    id: "small-plates",
    name: "Small Plates",
    blurb:
      "Built for sharing, and the heart of the weekday lunch offer. Bright, citrus-led ceviches sit next to the fried, the smoky and the spiced.",
    dishes: [
      {
        name: "Empanadas",
        detail: "Beef, olives and peppers, served with chimichurri",
      },
      { name: "Salmón curado con tequila", detail: "Ponzu, radish, nori crisp" },
      { name: "Salmon ceviche", detail: "Citrus-cured, served cold" },
      { name: "Bajan-style fish tacos", detail: "A Caribbean turn on the taco" },
      { name: "Gamba roja", detail: "Smoky, shell-on red prawns" },
    ],
  },
  {
    id: "large-plates",
    name: "Large Plates & Sharing",
    blurb:
      "The centre of the table. Fire, charcoal and cuts meant to be carved and passed around.",
    dishes: [
      {
        name: "Brazilian picanha",
        detail: "28-day aged, finished with chimichurri — portions for one to six",
      },
      { name: "Whole grilled sea bream", detail: "Served whole, off the grill" },
    ],
  },
  {
    id: "brunch",
    name: "Brunch",
    blurb:
      "Latin American breakfast classics, served with the terrace doors open.",
    dishes: [
      {
        name: "Huevos rancheros",
        detail: "Tortillas, salsa rojo, spicy black beans, avocado, queso fresco",
      },
    ],
  },
  {
    id: "cocktails",
    name: "Cocktails",
    blurb:
      "An agave-and-rum led list drawing on tequilas, mezcals and rums from across Latin America and the Caribbean. Each drink is inspired by a country — its landscapes, its cultural stories or its native ingredients.",
    dishes: [
      { name: "Tequila & mezcal", detail: "The backbone of the list" },
      { name: "Caribbean rums", detail: "Sourced from across the region" },
      { name: "Wine & low/no", detail: "Served through the bar and terraces" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    blurb: "Short, classic, and exactly what you want at the end.",
    dishes: [
      { name: "Tres leches", detail: "Sponge soaked in condensed milk" },
      { name: "Churros", detail: "The obligatory finish" },
    ],
  },
] as const;

export const lunchOffer = {
  title: "Weekday lunch, £25 per person",
  body:
    "Two small plates and a side, or one large plate and a side — served on weekdays, twelve floors above the city.",
  price: "£25pp",
} as const;

export const faqs = [
  {
    q: "What is the dress code?",
    a: "Smart-casual and fairly relaxed. We only ask that the general look isn't too sporty — no tracksuits, football shirts or baseball caps. Smart trainers are absolutely fine; flip flops are not.",
  },
  {
    q: "Can I book a table on the terrace?",
    a: "We have two outdoor terraces and you're welcome to request one. All terrace bookings are subject to weather conditions, and in the event of poor weather we can't guarantee an alternative table indoors.",
  },
  {
    q: "Can I change my booking?",
    a: "Yes. You can alter the date, time or number of guests through the link in your booking confirmation email.",
  },
  {
    q: "Do you take group bookings?",
    a: "We do — group events are for parties of 8 or more. For groups over eight we request a deposit and a minimum spend. Email groups@azotea.co.uk or send an enquiry and the team will take it from there.",
  },
  {
    q: "Can I hire AZOTEA exclusively?",
    a: "Yes. Exclusive venue hire gives you the whole rooftop as a private space, paired with the spirit of Latin America. Get in touch with the events team to talk it through.",
  },
  {
    q: "Where exactly are you, and how do I get in?",
    a: "We're on the 12th floor of Hyatt Place, Sovereign Square, LS1 4DA. AZOTEA has its own entrance with a lift that takes you directly to the 12th floor — you don't go through the hotel.",
  },
  {
    q: "Is there parking?",
    a: "There's parking at Q-Park Sovereign Square, directly behind the hotel. We're also a three-minute walk from Leeds Railway Station.",
  },
  {
    q: "Are you accessible?",
    a: "Yes. The venue is accessible for wheelchair users and there are accessible toilets.",
  },
] as const;

export const findSteps = [
  {
    title: "Three minutes from the station",
    body: "AZOTEA is a three-minute walk from Leeds Railway Station, on Sovereign Square.",
  },
  {
    title: "Our own entrance",
    body: "You don't need to go through the hotel — AZOTEA has its own entrance with a lift that runs straight to the 12th floor.",
  },
  {
    title: "Park behind us",
    body: "Q-Park Sovereign Square sits directly behind the hotel.",
  },
  {
    title: "Step-free throughout",
    body: "The venue is accessible for wheelchair users, with accessible toilets on site.",
  },
] as const;

export const careerBenefits = [
  "A share of the service charge and tips received from guests",
  "Colleague, friends and family rates across the Aimbridge Hotel and Hyatt Hotel portfolio",
  "A kitchen and bar team that celebrates Latin American cuisine and culture every service",
] as const;

/** Press coverage of the opening — used as trust signals, quoted, with sources. */
export const press = [
  {
    quote:
      "A stunning urban rooftop oasis that brings the vibrant spirit of Latin America to life.",
    source: "Crave Magazine",
  },
  {
    quote:
      "The ceviche dishes were favourites, their freshness singing through with every bite.",
    source: "Yorkshire Evening Post",
  },
  {
    quote:
      "Leeds' newest Latin American rooftop bar and restaurant.",
    source: "The Hoot",
  },
] as const;

export const chef = {
  name: "Jared Webb",
  role: "Head Chef",
  bio: [
    "At fifteen, Jared Webb knew he wanted to cook and to travel the world. He joined the merchant navy straight out of school, and later cooked his way through restaurants in Andorra, Crete and Spain, sharpening his skills in classic French cuisine.",
    "He moved to Leeds in 2012. After leaving Jamie's, he took a role at the well-respected Italian eatery Stuzzi on Merrion Street, before working on the Morrisons Market Street Kitchen concept and at the renowned Asian restaurant Tattu.",
    "At AZOTEA he leads a menu built around the authentic dishes, bold flavours and traditional cooking styles that underpin the culture of the Latin American region.",
  ],
} as const;

/**
 * Canonical origin. Override with NEXT_PUBLIC_SITE_URL when the site is
 * deployed somewhere other than the live domain (previews, staging).
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://azotea.co.uk";
