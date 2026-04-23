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
    id: "project-02",
    number: "02",
    title: "Project Two",
    year: "2025",
    location: "Wellington, NZ",
    status: "Under construction",
    type: "New dwelling",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-03",
    number: "03",
    title: "Project Three",
    year: "2024",
    location: "Christchurch, NZ",
    status: "Consented",
    type: "Multi-unit residential",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-04",
    number: "04",
    title: "Project Four",
    year: "2024",
    location: "Queenstown, NZ",
    status: "Built",
    type: "Hospitality",
    role: "Project architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-05",
    number: "05",
    title: "Project Five",
    year: "2024",
    location: "Auckland, NZ",
    status: "Design",
    type: "Commercial fit-out",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-06",
    number: "06",
    title: "Project Six",
    year: "2023",
    location: "Hawke's Bay, NZ",
    status: "Built",
    type: "Rural residential",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-07",
    number: "07",
    title: "Project Seven",
    year: "2023",
    location: "Auckland, NZ",
    status: "Built",
    type: "Public",
    role: "Design architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-08",
    number: "08",
    title: "Project Eight",
    year: "2023",
    location: "Dunedin, NZ",
    status: "Concept",
    type: "Mixed use",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-09",
    number: "09",
    title: "Project Nine",
    year: "2022",
    location: "Auckland, NZ",
    status: "Built",
    type: "Residential alteration",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-10",
    number: "10",
    title: "Project Ten",
    year: "2022",
    location: "Wellington, NZ",
    status: "Built",
    type: "New dwelling",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-11",
    number: "11",
    title: "Project Eleven",
    year: "2022",
    location: "Tauranga, NZ",
    status: "Unbuilt",
    type: "Competition",
    role: "Lead designer",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
  {
    id: "project-12",
    number: "12",
    title: "Project Twelve",
    year: "2021",
    location: "Auckland, NZ",
    status: "Built",
    type: "Interior",
    role: "Architect",
    description:
      "Short paragraph describing the project. Brief, materiality, the move that defines it.",
    hero: "/projects/placeholder/hero.svg",
    gallery: ["/projects/placeholder/01.svg", "/projects/placeholder/02.svg"],
  },
];
