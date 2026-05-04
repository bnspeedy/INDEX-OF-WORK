// ─────────────────────────────────────────────────────────────────────────
// PROJECT INDEX
//
// To add a new project: copy any block, change the values, save.
// To remove one: delete the block.
// To reorder: rearrange the blocks. The first project shows at the
// top of the helix.
//
// Image paths are relative to /public. So `/projects/foo/01.jpg`
// lives at /public/projects/foo/01.jpg in the repo.
//
// When you upload real images for a project, swap the PH_HERO/PH_GALLERY
// references for the real paths:
//   hero: "/projects/<slug>/hero.jpg",
//   gallery: [
//     "/projects/<slug>/01.jpg",
//     "/projects/<slug>/02.jpg",
//   ],
// ─────────────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  location: string;
  status: "Built" | "Under construction" | "Consented" | "Design" | "Concept" | "Unbuilt";
  type: string;
  role: string;
  description: string;
  hero: string;
  gallery: string[];
};

const PH_HERO = "/projects/placeholder/hero.svg";
const PH_GALLERY = [
  "/projects/placeholder/01.svg",
  "/projects/placeholder/02.svg",
  "/projects/placeholder/03.svg",
];

export const PROJECTS: Project[] = [
  {
    id: "repose-light-cadence",
    number: "01",
    title: "Repose — Light + Cadence",
    year: "2026",
    location: "Grey Lynn, Auckland",
    status: "Design",
    type: "Dual dwelling",
    role: "Architect / Developer — marketing, rendering, interior design",
    description:
      "Light + Cadence is a contemporary residential project grounded in the rhythm, proportion, and quiet order of Grey Lynn's timber villa fabric. The proposal explores how architectural repetition and daylight can work together to shape both the public face of the home and its internal domestic life. Rather than relying on stylistic reference, the project is driven by measured alignment, material restraint, and spatial sequencing. The result is an architecture that listens closely to its context while establishing a calm, enduring presence.",
    hero: "/projects/repose-light-cadence/hero.jpg",
    gallery: [
      "/projects/repose-light-cadence/01.jpg",
      "/projects/repose-light-cadence/02.jpg",
      "/projects/repose-light-cadence/04.jpg",
      "/projects/repose-light-cadence/05.jpg",
      "/projects/repose-light-cadence/03.jpg",
      "/projects/repose-light-cadence/06.jpg",
    ],
  },
  {
    id: "bach-in-time",
    number: "02",
    title: "Bach in Time",
    year: "2026",
    location: "Langs Beach, Northland",
    status: "Under construction",
    type: "New dwelling – holiday home",
    role: "Architect – sole designer, private commission",
    description:
      "Bach in Time balances raw materials and clean lines, framing a passage that leads from the grounded presence of the entryway to the boundless ocean view beyond. The design draws inspiration from its surroundings, with the presence of established pohutukawa trees shaping structural elements, and the rugged stone formations along the coastline echoed in the textured walls and features. Together, these elements create a seamless connection between the bach and its natural coastal environment, honoring both place and purpose.",
    hero: "/projects/bach-in-time/hero.jpg",
    gallery: [
      "/projects/bach-in-time/01.jpg",
      "/projects/bach-in-time/02.jpg",
      "/projects/bach-in-time/03.jpg",
      "/projects/bach-in-time/04.jpg",
      "/projects/bach-in-time/05.jpg",
      "/projects/bach-in-time/06.jpg",
    ],
  },
  {
    id: "repose-duo",
    number: "03",
    title: "Repose — Duo",
    year: "2023–2026",
    location: "Grey Lynn, Auckland",
    status: "Under construction",
    type: "Dual dwelling",
    role: "Architect / Developer — marketing, rendering, interior design",
    description:
      "Two dwellings arranged around a shared courtyard axis, each resolved as a pair of low brick forms with cedar-clad upper volumes and private garden rooms. The plan turns inward rather than outward, with living, kitchen, and bedroom spaces framing a central pool and deck to protect privacy on a dense inner-suburb site. Materials are consistent inside and out. Brick, timber, and stone carry through every room, letting the light and proportion do the work. Currently under construction.",
    hero: "/projects/repose-duo/hero.jpg",
    gallery: [
      "/projects/repose-duo/01.jpg",
      "/projects/repose-duo/02.jpg",
      "/projects/repose-duo/03.jpg",
      "/projects/repose-duo/04.jpg",
      "/projects/repose-duo/05.jpg",
      "/projects/repose-duo/06.jpg",
      "/projects/repose-duo/07.jpg",
      "/projects/repose-duo/08.jpg",
      "/projects/repose-duo/09.jpg",
      "/projects/repose-duo/10.jpg",
      "/projects/repose-duo/11.jpg",
      "/projects/repose-duo/12.jpg",
    ],
  },
  {
    id: "farm-house",
    number: "04",
    title: "Farm House",
    year: "2023",
    location: "New Zealand",
    status: "Concept",
    type: "New dwelling",
    role: "Sole designer",
    description:
      "A 200m² new-build residence composed as a glass pavilion set against solid brick forms. The house opens fully to the surrounding rural landscape, with a low dark roof and slender columns framing the garden as the defining interior view. Brick, timber, and glass are used with restraint, the composition drawing character from proportion and light rather than applied detail.",
    hero: PH_HERO,
    gallery: PH_GALLERY,
  },
  {
    id: "heritage-apartments",
    number: "05",
    title: "Heritage Apartments",
    year: "2022–current",
    location: "Dunedin",
    status: "Consented",
    type: "Multi-unit residential",
    role: "Design Director + Project Lead",
    description:
      "Set within a Dunedin heritage residential zone, this project gathers twenty-three homes into three discrete blocks held together by a continuous garden. The plan steps and offsets across the site, breaking what could read as a single monolithic mass into a composition of smaller volumes that defer to the scale and rhythm of the surrounding streetscape. Studios, one-bedroom and two-bedroom apartments share a common architectural language: pale rendered walls, restrained openings, dark joinery. Each block holds its own footprint and orientation, allowing every unit a distinct outlook. Movement between the blocks is through landscape rather than corridor, with planted courtyards and pathways doing the work of circulation. Density read as a neighbourhood, not a building.",
    hero: "/projects/heritage-apartments/hero.jpg",
    gallery: [
      "/projects/heritage-apartments/01.jpg",
      "/projects/heritage-apartments/02.jpg",
      "/projects/heritage-apartments/03.jpg",
      "/projects/heritage-apartments/04.jpg",
    ],
  },
  {
    id: "clarendon-duo",
    number: "06",
    title: "Twofold",
    year: "2022–current",
    location: "St Heliers, Auckland",
    status: "Consented",
    type: "Dual dwelling",
    role: "Design Director + Project Lead",
    description:
      "Set into the coastal landscape of St Heliers, Twofold is two residences shaped as one architectural gesture. The form steps with the site's natural fall, transitioning from a stone base to lighter timber and glazing above. Both dwellings share a common language of proportion, light, and material, but each holds its own outlook and orientation, individuality without rupture. The architecture takes its cues from the coast, grounded and refined, where restraint replaces ornament and shadow does the work of detail. Two homes conceived as a single idea, articulated twice.",
    hero: "/projects/clarendon-duo/hero.jpg",
    gallery: [
      "/projects/clarendon-duo/01.jpg",
      "/projects/clarendon-duo/02.jpg",
      "/projects/clarendon-duo/03.jpg",
      "/projects/clarendon-duo/04.jpg",
    ],
  },
  {
    id: "weiti-bay-house",
    number: "07",
    title: "Weiti Bay House",
    year: "2022",
    location: "Weiti Bay, Auckland",
    status: "Built",
    type: "New dwelling",
    role: "Architect",
    description:
      "A coastal holiday house defined by a dark standing-seam roof, cedar soffit, and stone base, positioned to capture the sea view while tucking into the surrounding pines. The form reads as a single resolved object from the approach, opening out to garden, pool, and ocean beyond through full-height glazing. Materiality is deliberately limited, letting the landscape and light carry the house.",
    hero: PH_HERO,
    gallery: PH_GALLERY,
  },
  {
    id: "uae-pavilion",
    number: "08",
    title: "UAE Pavilion — Dubai World Expo",
    year: "2021",
    location: "Dubai, UAE",
    status: "Built",
    type: "Exhibition / public",
    role: "Embedded with Kossmann.dejong (NL) – architecture + exhibition design",
    description:
      "A 14,500m² pavilion for the UAE at Expo 2020 Dubai, delivered at a US$500M construction value. Embedded with Kossmann.dejong in Amsterdam through developed and detailed design, the role spanned both the architectural resolution of Santiago Calatrava's base build and the experiential design of the visitor journey within it. Work involved reconciling structural, fire, and circulation constraints with narrative and spatial sequencing demands, then on-site in Dubai for construction administration alongside BIM contractors to protect intent on both fronts.",
    hero: "/projects/uae-pavilion/hero.jpg",
    gallery: [
      "/projects/uae-pavilion/01.jpg",
      "/projects/uae-pavilion/02.jpg",
      "/projects/uae-pavilion/03.jpg",
      "/projects/uae-pavilion/04.jpg",
      "/projects/uae-pavilion/05.jpg",
      "/projects/uae-pavilion/06.jpg",
      "/projects/uae-pavilion/07.jpg",
      "/projects/uae-pavilion/08.jpg",
    ],
  },
  {
    id: "ellerslie-villa",
    number: "09",
    title: "Ellerslie Villa",
    year: "2020",
    location: "Ellerslie, Auckland",
    status: "Built",
    type: "Heritage alteration + addition",
    role: "Lead designer — client facing",
    description:
      "A 200m² alteration and addition to a villa on a heritage-protected street frontage. A feature staircase and split-level living arrangement allow a recessive second-storey addition that sits below the ridge of the existing roof, maintaining the rhythm of the street while opening the rear of the home to the garden. The new work is sympathetic to the heritage values of the site without mimicking them. Designed to full Passive House principles, the project achieves airtightness, continuous insulation, and mechanical heat recovery ventilation, retrofitting heritage fabric to contemporary performance standards.",
    hero: "/projects/ellerslie-villa/hero.jpg",
    gallery: [
      "/projects/ellerslie-villa/01.jpg",
      "/projects/ellerslie-villa/02.jpg",
      "/projects/ellerslie-villa/03.jpg",
    ],
  },
  {
    id: "multi-residential",
    number: "10",
    title: "Residential Development",
    year: "2023",
    location: "New Zealand",
    status: "Consented",
    type: "Multi-unit residential",
    role: "Design director",
    description:
      "A 2300m² residential development navigating a low-density zone through a measured density response. The massing balances unit yield with the scale of the surrounding street, using a repeating gable-roofed form that breaks down the development into legible domestic volumes rather than a single mass. Moving into construction.",
    hero: PH_HERO,
    gallery: PH_GALLERY,
  },
  {
    id: "built-works",
    number: "11",
    title: "Built Works",
    year: "Various",
    location: "Various, NZ",
    status: "Built",
    type: "Residential",
    role: "Lead Designer",
    description:
      "A selection of completed residential projects across New Zealand. The work shown here spans different sites, briefs, and scales, but a consistent thread runs through it: a quiet attention to proportion, materiality, and the way a building meets its ground. Each home was shaped through close engagement with its clients and context, and the photographs gathered here mark the moments where the drawings finally became places to live in.",
    hero: "/projects/built-works/hero.jpg",
    gallery: [
      "/projects/built-works/01.jpg",
      "/projects/built-works/02.jpg",
      "/projects/built-works/03.jpg",
      "/projects/built-works/04.jpg",
      "/projects/built-works/05.jpg",
      "/projects/built-works/06.jpg",
      "/projects/built-works/07.jpg",
      "/projects/built-works/08.jpg",
      "/projects/built-works/09.jpg",
    ],
  },
];
