export type Phase = {
  num: string;
  marker: string;
  title: string;
  eyebrow: string;
  body: [string, string];
  detail: string;
  image: string;
  caption: string;
};

export const PHASES: Phase[] = [
  {
    num: "01",
    marker: "Listen",
    title: "Before there is a building, there is a conversation.",
    eyebrow: "The brief beneath the brief",
    body: [
      "Every project begins with a conversation that has very little to do with architecture. I'm not asking what kind of house you want. I'm asking how you live, where you slow down, what time you wake up on a Saturday, who comes to dinner.",
      "Most clients arrive with a brief that sounds like a shopping list. Four bedrooms, two living rooms, double garage. That's the surface. Beneath it is the real brief, the one they haven't articulated yet, and that's the one I'm listening for.",
    ],
    detail:
      "I keep notebooks for every project. Not sketchbooks, notebooks. Pages of overheard sentences, throwaway comments, the offhand 'oh and we'd love a quiet corner somewhere.' These become the project's true north long before any line is drawn.",
    image: "/process/modern-dwelling/interior-living.jpg",
    caption: "Notes from a first meeting, Dunedin",
  },
  {
    num: "02",
    marker: "Read",
    title: "The site has already written half the project.",
    eyebrow: "Place as a co-author",
    body: [
      "I walk the site at different times of day. Morning light, afternoon shadow, the way wind moves through it in winter. The site is not a blank page; it's a manuscript, and my job is to read it before I add to it.",
      "Topography, climate, neighbours, sightlines, the angle of a deciduous tree that will lose its leaves in May. These are not constraints. They are the most generous starting points a project can have.",
    ],
    detail:
      "Often the first 'design' decision is just where the building wants to sit, and that decision is made by walking, not drawing. The pencil comes later.",
    image: "/process/modern-dwelling/exterior-front.jpg",
    caption: "Site investigation notes, Dunedin",
  },
  {
    num: "03",
    marker: "Discover",
    title: "Investigation is the design.",
    eyebrow: "Deep research as method",
    body: [
      "I spend longer than most architects in the discovery phase. I research precedents, materials, the local building economy, the client's daily rituals, sometimes the history of the street. I treat the project like a small piece of cultural anthropology.",
      "It feels slow. It is slow. But the project that emerges from this is impossible to dislodge, every decision has a reason, and the building knows why it exists.",
    ],
    detail:
      "Deep investigation collapses the design timeline overall. The hours spent here are repaid five-fold downstream, when there are no surprises and every detail has a parent.",
    image: "/process/modern-dwelling/elevation.svg",
    caption: "Elevation studies, found, not invented",
  },
  {
    num: "04",
    marker: "Choose the medium",
    title: "The brief decides the tool, not the other way around.",
    eyebrow: "Pen, model, or screen, let the project pick",
    body: [
      "Some projects want to be sketched. Others want to be modelled in foamcore at 1:50, held in the hand, walked around. Some need to be built first in software so we can stand inside them. Some require all three.",
      "I never start with the same medium twice. The brief tells me what it needs to become before it becomes a building, and the act of choosing the medium is itself a design decision.",
    ],
    detail:
      "A small extension wants pencil. A complex spatial puzzle wants a physical model. A material-led project wants samples laid on a table in real light. Pick the wrong tool and you're designing the tool's project, not yours.",
    image: "/process/modern-dwelling/floor-plan-1.svg",
    caption: "Plan study, drawn by hand, then digitised",
  },
  {
    num: "05",
    marker: "Test",
    title: "Concept is a question, not an answer.",
    eyebrow: "Iteration as honesty",
    body: [
      "I don't fall in love with a first idea. I make many, deliberately, and most of them fail. The point is not to find the right one early; it's to map the territory so thoroughly that when the right one appears, I'll recognise it.",
      "Every concept is a hypothesis: 'if we do this, the project becomes that.' Testing is just architecture's word for honesty, being willing to admit when the hypothesis was wrong.",
    ],
    detail:
      "I share work early and often, even when it's ugly. Bad early drafts protect good final buildings. The clients who get the best from me are the ones who let me be wrong out loud.",
    image: "/process/modern-dwelling/floor-plan-2.svg",
    caption: "Iteration 14 of the ground plan",
  },
  {
    num: "06",
    marker: "Resolve",
    title: "Architecture is decided in the details.",
    eyebrow: "Where the building meets the world",
    body: [
      "The big moves are easy. It's the junction between the timber and the concrete, the way light falls on a sill at 4pm, the height of a handrail relative to the view, that's where buildings are won or lost.",
      "I draw details that I know how to build, because I've been on enough sites to respect the gap between drawing and reality. Buildability is not the enemy of design; it's its discipline.",
    ],
    detail:
      "Documentation is design at high resolution. I treat construction drawings with the same care as concept sketches, because to a builder, they are the building.",
    image: "/process/modern-dwelling/interior-stair.svg",
    caption: "Stair detail, the long pause of the project",
  },
  {
    num: "07",
    marker: "Hand over",
    title: "The building belongs to the people who live in it.",
    eyebrow: "Letting go, with care",
    body: [
      "When I hand a building over, my job ends and the real life of the building begins. The project becomes a home, and homes change in ways an architect cannot foresee. That's not a loss; it's the point.",
      "The best buildings I've made are the ones I revisit a year later and find slightly altered, a chair in an unexpected place, a wall coloured a way I would never have chosen, and find that it's better for it.",
    ],
    detail:
      "I always tell clients: don't ask my permission. The building is yours now. The investigation that built it lives in the bones of the place, and the bones are good. The rest is yours to write.",
    image: "/process/modern-dwelling/exterior-rear.svg",
    caption: "Rear elevation, six months after handover",
  },
];
