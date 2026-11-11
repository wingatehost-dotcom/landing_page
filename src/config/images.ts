/**
 * Every image used on the site lives here.
 *
 * To swap an image, either replace the file at the same path or change the
 * single line below. Photos are served locally from /public — never hotlink.
 */
export type ImageAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
};

/** Landscape photo, 3:2 (1600 × 1067 after optimisation). */
const photo = (src: string, alt: string): ImageAsset => ({
  src,
  width: 1600,
  height: 1067,
  alt,
});

/** Wide hero photo, 16:9. */
const hero = (src: string, alt: string): ImageAsset => ({
  src,
  width: 1920,
  height: 1080,
  alt,
});

/** Card / gallery photo, 4:3. */
const card = (src: string, alt: string): ImageAsset => ({
  src,
  width: 1200,
  height: 900,
  alt,
});

export const images = {
  logo: "/logo/wingate-crest.png",
  ogImage: {
    src: "/og/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "{{name}} crest",
  } satisfies ImageAsset,

  homeHero: photo(
    "/images/bakery/exhibition-students-1.jpg",
    "Students presenting bakery products at the college exhibition",
  ),
  aboutHero: photo(
    "/images/soap/soap-presenter-1.jpg",
    "A staff member presenting soap and sanitary products at the college exhibition",
  ),
  aboutStory: photo(
    "/images/bakery/chocolate-fountain.jpg",
    "A chef preparing a chocolate fountain at a college event",
  ),
  trainingHero: photo(
    "/images/bakery/exhibition-students-2.jpg",
    "Students standing behind a display of products at the college exhibition",
  ),
  divisionsHero: photo(
    "/images/metalwork/poultry-cages.jpg",
    "Metal poultry cages on display at the college",
  ),
  galleryHero: photo(
    "/images/soap/soap-presenter-2.jpg",
    "A staff member presenting soap and sanitary products at the college exhibition",
  ),

  /**
   * Division imagery. Keys match `divisionImages` in `src/content/divisions.ts`.
   * Every slot uses a real client photograph.
   */
  divisions: {
    furniture: {
      hero: {
        src: "/images/divisions/furniture-hero.jpg",
        width: 1600,
        height: 900,
        alt: "Wooden double doors with decorative carved panels",
      },
      gallery: [
        card(
          "/images/divisions/furniture-gallery-1.jpg",
          "Wooden dining chair with a slatted back",
        ),
        card(
          "/images/divisions/furniture-gallery-2.jpg",
          "Wooden office desk with a matching side cabinet",
        ),
        card(
          "/images/divisions/furniture-gallery-3.jpg",
          "White and wood office cabinet with drawers",
        ),
        card(
          "/images/divisions/furniture-gallery-4.jpg",
          "White office desk with a metal frame",
        ),
        card(
          "/images/divisions/furniture-gallery-5.jpg",
          "Black mesh office chair with a chrome base",
        ),
        card(
          "/images/divisions/furniture-gallery-6.jpg",
          "White L-shaped office desk",
        ),
        card(
          "/images/divisions/furniture-gallery-7.jpg",
          "White office desk with an open shelf and drawer",
        ),
        card(
          "/images/divisions/furniture-gallery-8.jpg",
          "Worker assembling a wooden bed frame in the furniture workshop",
        ),
      ],
    },
    parquet: {
      hero: hero(
        "/images/divisions/parquet-hero.jpg",
        "Wooden parquet flooring laid in a herringbone pattern",
      ),
      gallery: [
        card(
          "/images/divisions/parquet-1.jpg",
          "Wooden parquet flooring in a herringbone pattern",
        ),
      ],
    },
    construction: {
      hero: hero(
        "/images/divisions/construction-hero.jpg",
        "A multi-storey building under construction with scaffolding",
      ),
      gallery: [
        card(
          "/images/divisions/construction-cages.jpg",
          "Metal poultry cages manufactured for the construction and renovation division",
        ),
      ],
    },
    machinery: {
      hero: hero(
        "/images/divisions/machinery-hero.jpg",
        "A technician operating machinery in the workshop",
      ),
      gallery: [
        card(
          "/images/divisions/machinery-1.jpg",
          "Technician working on machinery in the workshop",
        ),
      ],
    },
    electrical: {
      hero: hero(
        "/images/divisions/electrical-hero.jpg",
        "A technician working on an electrical panel",
      ),
      gallery: [
        card(
          "/images/divisions/electrical-1.jpg",
          "Electrical wiring and panel installation",
        ),
      ],
    },
    poultry: {
      hero: photo(
        "/images/divisions/poultry-hero.jpg",
        "Laying hens in cages inside the college poultry house",
      ),
      gallery: [
        photo(
          "/images/divisions/poultry-hero.jpg",
          "Laying hens in cages inside the college poultry house",
        ),
      ],
    },
    soap: {
      hero: photo(
        "/images/soap/soap-presenter-2.jpg",
        "A staff member presenting soap and sanitary products at the college exhibition",
      ),
      gallery: [
        photo(
          "/images/soap/soap-display-1.jpg",
          "Soap, sanitary and cleaning products on display at the college exhibition",
        ),
      ],
    },
    bakery: {
      hero: photo(
        "/images/bakery/chocolate-fountain.jpg",
        "A chef preparing a chocolate fountain at a college event",
      ),
      gallery: [
        photo(
          "/images/bakery/bakery-display-1.jpg",
          "Bakery and pastry products on display at the college exhibition",
        ),
        photo(
          "/images/bakery/exhibition-students-1.jpg",
          "Students presenting bakery products at the college exhibition",
        ),
      ],
    },
    textile: {
      hero: {
        src: "/images/divisions/textile-hero.jpg",
        width: 1600,
        height: 900,
        alt: "Stacks of colourful woven fabric swatches in pink, orange, yellow, blue and grey",
      },
      gallery: [
        card(
          "/images/divisions/textile-1.jpg",
          "Rows of colourful fabric swatches arranged for a textile display",
        ),
      ],
    },
  },
} as const;

export type DivisionImageKey = keyof typeof images.divisions;
