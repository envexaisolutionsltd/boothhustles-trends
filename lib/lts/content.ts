/**
 * Lewis Transport Services — site content.
 *
 * Single source of truth for every piece of copy, contact detail and fleet
 * figure on the marketing site. Editing this file changes the whole site.
 *
 * Provenance:
 *   [live]    — taken from the existing lewistransport.co.uk site.
 *   [confirm] — plausible for the business but NOT stated on the old site.
 *               Verify with the client before go-live, or delete the entry.
 */

export const company = {
  /** [live] Trading name used on the existing site. */
  name: "Lewis Transport Services",
  shortName: "LTS",
  legalName: "Lewis Transport Services Ltd",
  /** [live] "established in 1988". */
  founded: 1988,
  tagline: "Heavy haulage, engineered around your load",
  strapline:
    "Specialist heavy haulage, abnormal load movement and international project management from a single Derbyshire base.",
  /** [live] "privately owned company". */
  ownership: "Privately owned",
} as const;

export const yearsTrading = new Date().getFullYear() - company.founded;

export const contact = {
  /** [live] */
  phone: "01889 502900",
  phoneHref: "tel:+441889502900",
  /** [live] Published contact addresses on the existing site. */
  emails: [
    {
      name: "Alan Lewis",
      role: "Managing Director",
      email: "alan@lewistransport.co.uk",
    },
    {
      name: "Sylvia Lewis",
      role: "Company Secretary",
      email: "sylvia@lewistransport.co.uk",
    },
  ],
  primaryEmail: "alan@lewistransport.co.uk",
  /** [live] "the Derbyshire village of Doveridge". Street/postcode [confirm]. */
  address: {
    locality: "Doveridge",
    region: "Derbyshire",
    country: "United Kingdom",
    /** [confirm] Add the full street address and postcode before go-live. */
    street: "",
    postcode: "",
  },
  /** [confirm] Office hours — 24/7 line is typical for the sector, verify. */
  hours: [
    { days: "Monday – Friday", time: "07:00 – 18:00" },
    { days: "Saturday", time: "By arrangement" },
    { days: "Out of hours", time: "Emergency movements by arrangement" },
  ],
} as const;

/** [live] Location advantages, quoted almost verbatim from the existing site. */
export const locationPoints = [
  "Depot and offices in the Derbyshire village of Doveridge",
  "Situated on the National High Load route",
  "Close to the A50 link road between the M6 and the M1",
  "On the Staffordshire / Derbyshire county border",
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
};

/** [live] The four service lines listed on the existing site, expanded. */
export const services: Service[] = [
  {
    slug: "heavy-haulage",
    title: "Heavy Haulage",
    summary:
      "A modern fleet of specialised vehicles moving heavy and abnormal loads throughout the UK and Europe.",
    points: [
      "Abnormal and indivisible loads by road",
      "Plant, machinery and fabricated structures",
      "UK-wide and cross-border European movements",
      "Modular combinations for loads over 150,000kg",
    ],
  },
  {
    slug: "consultancy",
    title: "International Heavy Haulage Consultancy",
    summary:
      "Route feasibility, permits and method engineering for movements that will not fit a standard trailer or a standard road.",
    points: [
      "Route surveys and feasibility studies",
      "Abnormal load notifications and permits",
      "Lift and load-securing method statements",
      "Equipment selection and combination planning",
    ],
  },
  {
    slug: "project-management",
    title: "International Project Management",
    summary:
      "Single-point management of multi-leg, multi-country moves — from factory gate to final position.",
    points: [
      "Multi-modal planning across road, sea and port",
      "Scheduling around site and crane availability",
      "Escort, police and authority liaison",
      "One point of contact for the whole project",
    ],
  },
  {
    slug: "warehousing",
    title: "Warehousing & Storage",
    summary:
      "Secure storage at our Doveridge base, holding plant and project cargo between production and installation.",
    points: [
      "Short and long-term storage",
      "Project cargo consolidation",
      "Loading and unloading on site",
      "Delivery released to your programme",
    ],
  },
];

export type FleetItem = {
  name: string;
  spec: string;
  detail: string;
  /** Simple silhouette key used by the trailer illustration component. */
  art: "tractor" | "lowloader" | "modular" | "stepframe";
};

/**
 * [live] The Scheuerle Euro-Combi entry (150,000kg+, 90+ combinations, low
 * loader beds / bolsters / spacer decks) is from the existing fleet pages.
 * Remaining entries describe the fleet in the terms the old site uses;
 * [confirm] exact axle counts and payloads with the client.
 */
export const fleet: FleetItem[] = [
  {
    name: "Scheuerle Euro-Combi modular equipment",
    spec: "150,000kg+ payload · 90+ combinations",
    detail:
      "Modular axle lines run with low loader beds, bolsters and spacer decks, giving over ninety different configurations and capacity for loads in excess of 150,000kg.",
    art: "modular",
  },
  {
    name: "Low loader beds",
    spec: "Deep-well and flat bed decks",
    detail:
      "Low-height decks for tall plant and machinery, keeping travelling height inside the limits that keep a load on the road rather than on a detour.",
    art: "lowloader",
  },
  {
    name: "Bolsters & spacer decks",
    spec: "Girder and beam carriage",
    detail:
      "Bolster and spacer configurations carry long structural sections, beams and vessels that no rigid deck length would take.",
    art: "stepframe",
  },
  {
    name: "Heavy haulage tractor units",
    spec: "High-power ballasted prime movers",
    detail:
      "Specialised tractor units matched to the trailer combination and gross weight, run and maintained from our own Doveridge workshop base.",
    art: "tractor",
  },
];

/** Headline figures used in the trust bar. All derived from [live] facts. */
export const stats = [
  { value: `${yearsTrading}+`, label: "Years moving abnormal loads" },
  { value: "150,000kg+", label: "Modular payload capability" },
  { value: "90+", label: "Trailer combinations available" },
  { value: "UK & EU", label: "Operating area" },
];

/**
 * Credentials and safety signals.
 *
 * [confirm] The existing site does not publish accreditation numbers. Each
 * entry below is written as a capability statement rather than a claimed
 * certification. Swap in real scheme names, numbers and expiry dates
 * (O-Licence, FORS, ISO 9001/14001/45001, CHAS) once the client supplies them.
 */
export const credentials = [
  {
    title: "Operator licensed",
    detail:
      "Movements run under the appropriate goods vehicle operator licence and STGO categories for the weight and dimensions carried.",
  },
  {
    title: "Abnormal load notifications",
    detail:
      "Police, highway authority and bridge notifications raised to the statutory notice periods for every notifiable movement.",
  },
  {
    title: "Route surveyed before the wheels turn",
    detail:
      "Height, width, weight and swept-path checked end to end, with structures assessed before a date is confirmed.",
  },
  {
    title: "Planned load securing",
    detail:
      "Lashing and securing arrangements engineered to the load, with method statements and risk assessments issued for the job.",
  },
  {
    title: "Maintained fleet",
    detail:
      "Vehicles and trailers inspected and maintained on a planned schedule from our own base, not squeezed in between jobs.",
  },
  {
    title: "Experienced crews",
    detail: `Drivers and load engineers who have worked abnormal loads since ${company.founded}, on the road and on site.`,
  },
];

/** The move, start to finish — used on the home page and the quote page. */
export const moveProcess = [
  {
    step: "01",
    title: "Tell us the load",
    detail:
      "Dimensions, weight, collection and delivery points. A photograph and a drawing tell us more than a paragraph.",
  },
  {
    step: "02",
    title: "We survey and price",
    detail:
      "Route feasibility, equipment selection and permits are worked out before you get a number, so the number holds.",
  },
  {
    step: "03",
    title: "Notifications and planning",
    detail:
      "Authorities notified, escorts arranged, site access and lifting confirmed against your programme.",
  },
  {
    step: "04",
    title: "The movement",
    detail:
      "Loaded, secured and moved by our own crews, with a single point of contact from departure to final position.",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Canonical origin for metadata, sitemap and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL in the hosting environment.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lewistransport.co.uk";
