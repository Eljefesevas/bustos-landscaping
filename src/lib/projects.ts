// Real Bustos Landscaping project photographs, reused from the owner's original website
// (bustoslandscaping.net) with the owner's authorisation. Each project groups photos that
// share one source series and visibly show the same property. Titles and captions describe
// only what the photographs show: no locations, dates or client details are claimed.

export type Category = 'concrete' | 'lawn' | 'groundwork';
export type Photo = { src: string; alt: string; caption: string };
export type Project = {
  id: string;
  title: string;
  category: Category;
  summary: string;
  photos: Photo[];
  comparison?: { before: Photo; after: Photo; aligned: boolean };
};

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All projects' },
  { id: 'concrete', label: 'Concrete & hardscape' },
  { id: 'lawn', label: 'Lawn & landscape' },
  { id: 'groundwork', label: 'Trees & groundwork' },
];

const w = (name: string) => `/assets/work/${name}.jpg`;

const pool = {
  before: { src: w('pool-deck-before'), alt: 'A backyard pool surrounded by bare, freshly graded soil and broken concrete along the block wall', caption: 'Before: graded soil around the pool' },
  after: { src: w('pool-deck-after'), alt: 'The same backyard with a flagstone-pattern stamped concrete deck surrounding the pool', caption: 'After: stamped concrete deck' },
};
const lawn = {
  before: { src: w('front-lawn-before'), alt: 'A patchy, dry front lawn beside a low block wall and the street', caption: 'Before: dry, patchy lawn' },
  after: { src: w('front-lawn-after'), alt: 'The same front yard covered in fresh green sod with a brick edge along the walkway', caption: 'After: new sod' },
};
const drought = {
  before: { src: w('drought-yard-before'), alt: 'A corner front yard with a worn lawn along the sidewalk and red curb', caption: 'Before: worn lawn' },
  after: { src: w('drought-yard-after'), alt: 'The same front yard converted to decomposed granite with young drought-tolerant plants', caption: 'After: drought-tolerant planting' },
};

export const projects: Project[] = [
  {
    id: 'pool-deck', title: 'Pool deck, from bare ground to stamped concrete', category: 'concrete',
    summary: 'A backyard regraded around the pool and finished with a flagstone-pattern stamped concrete deck.',
    comparison: { ...pool, aligned: true },
    photos: [pool.before,
      { src: w('pool-deck-grading'), alt: 'A compact loader grading soil along the block wall next to the pool', caption: 'Grading along the wall' },
      { src: w('pool-deck-prep'), alt: 'The pool edge and prepared ground before the concrete pour', caption: 'Ground prepared for concrete' },
      pool.after],
  },
  {
    id: 'front-lawn', title: 'Front lawn renewed with sod', category: 'lawn',
    summary: 'A tired front lawn replaced with fresh sod, edged by a brick border along the walkway.',
    comparison: { ...lawn, aligned: true },
    photos: [lawn.before,
      { src: w('front-lawn-equipment'), alt: 'A compact loader parked in a narrow side yard during the work', caption: 'Equipment in the side yard' },
      lawn.after],
  },
  {
    id: 'drought-yard', title: 'Lawn to drought-tolerant front yard', category: 'lawn',
    summary: 'A front lawn converted to decomposed granite, river rock and young drought-tolerant plants.',
    comparison: { ...drought, aligned: true },
    photos: [drought.before,
      { src: w('drought-yard-progress'), alt: 'The front yard cleared to bare ground with new plants set out', caption: 'Cleared and planted' },
      { src: w('drought-yard-planting'), alt: 'Young agaves and a small palm in decomposed granite beside a large shrub', caption: 'Young planting' },
      drought.after],
  },
  {
    id: 'walls-edging-sod', title: 'Walls, concrete edging and new sod', category: 'concrete',
    summary: 'Concrete walkways with brick borders, a low brick wall and a new front lawn.',
    photos: [
      { src: w('walls-edging-sod-1'), alt: 'A freshly poured concrete walkway framed by a brick edge beside new sod', caption: 'Walkway with brick edge' },
      { src: w('walls-edging-sod-2'), alt: 'A concrete pad bordered in brick in front of a new lawn and the street', caption: 'Bordered pad and lawn' },
      { src: w('walls-edging-sod-3'), alt: 'A curved concrete path with red brick inlay leading to a stone-faced entry', caption: 'Brick inlay at the entry' },
      { src: w('walls-edging-sod-4'), alt: 'A long concrete walkway running between a brick-capped wall and a new lawn', caption: 'Walkway and capped wall' },
      { src: w('walls-edging-sod-5'), alt: 'A sweeping concrete path with brick bands meeting a green lawn', caption: 'Brick bands in the path' },
    ],
  },
  {
    id: 'stamped-patio', title: 'Stamped concrete patio', category: 'concrete',
    summary: 'A bare corner beside the house turned into a stamped concrete patio, with a planted stepping-stone bed nearby.',
    photos: [
      { src: w('stamped-patio-before'), alt: 'A bare dirt corner beside a stone-veneer wall with a concrete bench', caption: 'Before: bare ground' },
      { src: w('stamped-patio-after'), alt: 'A stamped concrete patio along the stone-veneer wall of the house', caption: 'After: stamped patio' },
      { src: w('stamped-patio-texture'), alt: 'A close view of the stamped stone texture in the new concrete', caption: 'Stamped texture' },
      { src: w('stamped-patio-garden'), alt: 'Round stepping stones and potted succulents in a bed edged by concrete', caption: 'Stepping-stone bed' },
    ],
  },
  {
    id: 'front-walkway', title: 'Front walkway and steps', category: 'concrete',
    summary: 'New concrete steps and a front walkway, formed and poured from the porch to the yard.',
    photos: [
      { src: w('front-walkway-forms'), alt: 'Wooden forms set for a new walkway across a front yard', caption: 'Forms set' },
      { src: w('front-walkway-steps'), alt: 'Freshly poured concrete steps rising to a porch', caption: 'New steps' },
      { src: w('front-walkway-finished'), alt: 'Finished concrete steps and walkway leading to the front door of a stucco house', caption: 'Walkway and steps' },
    ],
  },
  {
    id: 'turf-patio', title: 'Concrete patio with artificial turf', category: 'concrete',
    summary: 'A scored concrete patio poured around an inset rectangle of artificial turf.',
    photos: [
      { src: w('turf-patio-pour'), alt: 'A crew finishing a large concrete pour beside a house', caption: 'The pour' },
      { src: w('turf-and-concrete-backyard'), alt: 'Artificial turf set into a scored concrete patio in a walled backyard', caption: 'Finished patio and turf' },
      { src: w('turf-patio-wide'), alt: 'A wider view of the turf and concrete patio with palms beyond the wall', caption: 'Wider view' },
    ],
  },
  {
    id: 'hillside-sod', title: 'New sod with large-format pavers', category: 'lawn',
    summary: 'A hillside yard laid with fresh sod beside a checkerboard path of grey and white pavers.',
    photos: [
      { src: w('sod-and-paver-yard'), alt: 'Newly laid sod beside a checkerboard paver path with hills in the distance', caption: 'Sod and paver path' },
      { src: w('hillside-sod-pavers'), alt: 'Fresh sod seams still visible next to grey and white pavers', caption: 'Fresh seams' },
      { src: w('hillside-sod-wide'), alt: 'A wide view of the new lawn and paver path toward a row of trees', caption: 'Wide view' },
    ],
  },
  {
    id: 'tree-trimming', title: 'Tree trimming', category: 'groundwork',
    summary: 'Large backyard trees cut back hard, photographed before and after the work.',
    photos: [
      { src: w('tree-trim-before'), alt: 'A large, leafless tree spreading over a backyard pergola', caption: 'Before trimming' },
      { src: w('tree-trim-after'), alt: 'The same tree cut back to its main limbs beside the pergola', caption: 'After trimming' },
      { src: w('tree-trim-oak-before'), alt: 'A tall bare tree towering over a single-story house', caption: 'Before trimming' },
      { src: w('tree-trim-oak-after'), alt: 'The tree cut back to its trunk and main limbs above the house', caption: 'After trimming' },
    ],
  },
  {
    id: 'grading', title: 'Backyard grading', category: 'groundwork',
    summary: 'A backyard cleared and graded with a compact loader, ready for what comes next.',
    photos: [
      { src: w('grading-before'), alt: 'A compact loader starting to clear an overgrown backyard beside a blue house', caption: 'Clearing begins' },
      { src: w('grading-after'), alt: 'The same backyard graded smooth to bare soil', caption: 'Graded and ready' },
      { src: w('grading-progress'), alt: 'Freshly graded soil across a wide backyard with trees beyond', caption: 'Grading in progress' },
    ],
  },
];
