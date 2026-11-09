import type { ImageAsset } from "@/config/images";
import type { Stat } from "@/config/site";

export type Locale = "en" | "am";

export type LocalizedText = {
  readonly en: string;
  readonly am: string;
};

export type LocalizedList = {
  readonly en: readonly string[];
  readonly am: readonly string[];
};

export type DivisionSlug =
  | "furniture"
  | "parquet"
  | "construction"
  | "machinery"
  | "electrical"
  | "poultry"
  | "soap"
  | "bakery"
  | "textile";

export type Division = {
  readonly slug: DivisionSlug;
  readonly name: LocalizedText;
  readonly shortDescription: LocalizedText;
  readonly fullDescription: LocalizedText;
  readonly products: LocalizedList;
  readonly hero: ImageAsset;
  readonly gallery: readonly ImageAsset[];
};

export type MetaContent = {
  readonly title: string;
  readonly description: string;
};

export type Feature = {
  readonly title: string;
  readonly description: string;
};

/** One rotating message in the home hero, paired with a division image. */
export type HeroSlide = {
  readonly division: DivisionSlug;
  readonly title: string;
  readonly description: string;
};

export type ValueItem = {
  readonly title: string;
  readonly description: string;
};

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export type Content = {
  readonly meta: {
    readonly home: MetaContent;
    readonly about: MetaContent;
    readonly services: MetaContent;
    readonly divisions: MetaContent;
    readonly training: MetaContent;
    readonly gallery: MetaContent;
    readonly contact: MetaContent;
    readonly notFound: MetaContent;
  };
  readonly nav: {
    readonly home: string;
    readonly about: string;
    readonly services: string;
    readonly divisions: string;
    readonly training: string;
    readonly gallery: string;
    readonly contact: string;
    readonly cta: string;
    readonly menu: string;
    readonly close: string;
    readonly openMenu: string;
    readonly closeMenu: string;
    readonly language: string;
    readonly switchToAmharic: string;
    readonly switchToEnglish: string;
    readonly allDivisions: string;
  };
  readonly common: {
    readonly learnMore: string;
    readonly viewAllDivisions: string;
    readonly requestService: string;
    readonly contactUs: string;
    readonly backToTop: string;
    readonly backToDivisions: string;
    readonly all: string;
    readonly home: string;
    readonly skipToContent: string;
    readonly breadcrumb: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
    readonly workingHours: string;
    readonly followUs: string;
    readonly otherDivisions: string;
    readonly productsServices: string;
    readonly gallery: string;
    readonly previous: string;
    readonly next: string;
    readonly close: string;
    readonly viewImage: string;
    readonly imageCounter: string;
    readonly optional: string;
    readonly requiredFields: string;
    readonly draftFigures: string;
  };
  readonly home: {
    readonly hero: {
      readonly eyebrow: string;
      readonly headline: string;
      readonly subheadline: string;
      readonly primaryCta: string;
      readonly secondaryCta: string;
      readonly scrollCue: string;
      readonly slides: readonly HeroSlide[];
    };
    readonly overview: {
      readonly eyebrow: string;
      readonly title: string;
      readonly items: readonly Feature[];
    };
    readonly divisions: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly cta: string;
    };
    readonly visionMission: {
      readonly eyebrow: string;
      readonly title: string;
      readonly promise: string;
      readonly visionTitle: string;
      readonly visionText: string;
      readonly missionTitle: string;
      readonly missionText: string;
      readonly cta: string;
    };
    readonly stats: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly note: string;
      readonly items: Record<Stat["labelKey"], string>;
    };
    readonly audience: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly items: readonly Feature[];
    };
    readonly why: {
      readonly eyebrow: string;
      readonly title: string;
      readonly items: readonly Feature[];
    };
    readonly partners: {
      readonly title: string;
      readonly description: string;
    };
    readonly cta: {
      readonly title: string;
      readonly primary: string;
      readonly secondary: string;
    };
  };
  readonly about: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly subtitle: string;
    };
    readonly intro: string;
    readonly storyTitle: string;
    readonly story: readonly string[];
    readonly collegeTitle: string;
    readonly collegeText: string;
    readonly visionTitle: string;
    readonly visionText: string;
    readonly missionTitle: string;
    readonly missionText: string;
    readonly focusTitle: string;
    readonly focus: readonly Feature[];
    readonly valuesTitle: string;
    readonly valuesIntro: string;
    readonly values: readonly ValueItem[];
    readonly teamTitle: string;
    readonly teamEmpty: string;
  };
  readonly divisions: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
    };
    readonly intro: string;
    readonly cardCta: string;
  };
  readonly services: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly subtitle: string;
    };
    readonly intro: string;
    readonly divisionsTitle: string;
    readonly divisionsDescription: string;
    readonly programsTitle: string;
    readonly programsDescription: string;
    readonly programsCta: string;
  };
  readonly divisionPage: {
    readonly overviewTitle: string;
    readonly productsTitle: string;
    readonly galleryTitle: string;
    readonly requestTitle: string;
    readonly requestText: string;
    readonly otherTitle: string;
    readonly metaSuffix: string;
  };
  readonly training: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly subtitle: string;
    };
    readonly intro: string;
    readonly servicesTitle: string;
    readonly services: readonly Feature[];
    readonly ctaTitle: string;
    readonly ctaText: string;
  };
  readonly gallery: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly subtitle: string;
    };
    readonly filterLabel: string;
    readonly empty: string;
  };
  readonly contact: {
    readonly hero: {
      readonly eyebrow: string;
      readonly title: string;
      readonly subtitle: string;
    };
    readonly intro: string;
    readonly detailsTitle: string;
    readonly addressPending: string;
    readonly hoursPending: string;
    readonly mapTitle: string;
    readonly mapPending: string;
    readonly formTitle: string;
    readonly formSubtitle: string;
    readonly faqTitle: string;
    readonly privacyNote: string;
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly items: readonly FaqItem[];
  };
  readonly form: {
    readonly labels: {
      readonly fullName: string;
      readonly organization: string;
      readonly email: string;
      readonly phone: string;
      readonly division: string;
      readonly message: string;
      readonly submit: string;
      readonly submitting: string;
      readonly divisionGeneral: string;
      readonly divisionPlaceholder: string;
    };
    readonly placeholders: {
      readonly fullName: string;
      readonly organization: string;
      readonly email: string;
      readonly phone: string;
      readonly message: string;
    };
    readonly errors: {
      readonly fullNameRequired: string;
      readonly fullNameShort: string;
      readonly emailRequired: string;
      readonly emailInvalid: string;
      readonly phoneRequired: string;
      readonly phoneInvalid: string;
      readonly divisionRequired: string;
      readonly messageRequired: string;
      readonly messageShort: string;
      readonly generic: string;
    };
    readonly status: {
      readonly success: string;
      readonly mailtoSuccess: string;
      readonly error: string;
      readonly honeypot: string;
    };
  };
  readonly footer: {
    readonly blurb: string;
    readonly quickLinks: string;
    readonly divisionsTitle: string;
    readonly contactTitle: string;
    readonly rights: string;
  };
  readonly notFound: {
    readonly title: string;
    readonly description: string;
    readonly primary: string;
    readonly secondary: string;
  };
};
