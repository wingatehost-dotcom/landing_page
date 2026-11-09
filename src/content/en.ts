import type { Content } from "./types";

/**
 * Approved English copy — taken from `Wingate_Website_Content.docx`.
 * `{{name}}`, `{{college}}`, `{{phone}}`, `{{email}}` and `{{year}}` are
 * replaced at render time so the company name lives in one constant.
 */
export const en: Content = {
  meta: {
    home: {
      title:
        "{{name}} | Manufacturing, Construction, Training and Consultancy",
      description:
        "{{name}} provides furniture, construction, machinery, electrical services, feed, soap, bakery and more, plus job-oriented training and consultancy. Quality at a fair price.",
    },
    about: {
      title: "About Us | {{name}}",
      description:
        "A multi-sector enterprise turning technical knowledge, trained people and workshop capacity into products and services that institutions, organizations and communities can depend on.",
    },
    services: {
      title: "Services and Programs | {{name}}",
      description:
        "Explore {{name}} products, technical services and training programs across manufacturing, construction, electrical work, food production, textiles, research and consultancy.",
    },
    divisions: {
      title: "Our Divisions | {{name}}",
      description:
        "Explore our divisions: furniture, parquet flooring, construction, machinery, electrical services, poultry and feed, soap and cosmetics, bakery, and textiles.",
    },
    training: {
      title:
        "Training, Research and Consultancy | {{name}}",
      description:
        "Job-oriented training, research and advisory services, and management and legal consultancy for people and organizations.",
    },
    gallery: {
      title: "Gallery | {{name}}",
      description:
        "A look at our products, our workshops and our people across {{name}}.",
    },
    contact: {
      title: "Contact Us | {{name}}",
      description:
        "Contact {{name}} to order products, request a service, discuss a construction project, or explore training and consultancy.",
    },
    notFound: {
      title: "Page Not Found | {{name}}",
      description: "The page you are looking for does not exist or has been moved.",
    },
  },

  nav: {
    home: "Home",
    about: "About Us",
    services: "Services / Programs",
    divisions: "Divisions",
    training: "Training and Consultancy",
    gallery: "Gallery",
    contact: "Contact",
    cta: "Contact us",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    switchToAmharic: "Switch to Amharic",
    switchToEnglish: "Switch to English",
    allDivisions: "All divisions",
  },

  common: {
    learnMore: "Learn more",
    viewAllDivisions: "View all divisions",
    requestService: "Request this service",
    contactUs: "Contact Us",
    backToTop: "Back to top",
    backToDivisions: "Back to divisions",
    all: "All",
    home: "Home",
    skipToContent: "Skip to content",
    breadcrumb: "Breadcrumb",
    phone: "Phone",
    email: "Email",
    address: "Address",
    workingHours: "Working hours",
    followUs: "Follow us",
    otherDivisions: "Other divisions",
    productsServices: "Products and services",
    gallery: "Gallery",
    previous: "Previous",
    next: "Next",
    close: "Close",
    viewImage: "View image",
    imageCounter: "Image {{current}} of {{total}}",
    optional: "optional",
    requiredFields: "Fields marked * are required.",
    draftFigures: "Placeholder figures — pending client confirmation.",
  },

  home: {
    hero: {
      eyebrow: "Manufacturing · Construction · Training",
      headline: "Quality Products and Services, Made in Ethiopia",
      subheadline:
        "{{name}} brings manufacturing, construction, technical services, training and consultancy together under one trusted name, delivering cost-effective, high-quality solutions for institutions, organizations and communities.",
      primaryCta: "Explore Our Divisions",
      secondaryCta: "Contact Us",
      scrollCue: "Scroll to explore",
      slides: [
        {
          division: "furniture",
          title: "Furniture, Doors and Windows",
          description:
            "Durable furniture and joinery in metal, wood and hybrid designs for homes, offices and institutions.",
        },
        {
          division: "parquet",
          title: "Wooden Parquet Flooring",
          description:
            "Beautiful, hard-wearing wooden floors, supplied and installed with care.",
        },
        {
          division: "construction",
          title: "Construction and Renovation",
          description:
            "New buildings and thoughtful renovation of existing homes and structures.",
        },
        {
          division: "machinery",
          title: "Machinery Manufacturing",
          description:
            "Locally built machinery that helps farms, workshops and businesses work faster.",
        },
        {
          division: "electrical",
          title: "Electrical and Electronic Technology",
          description:
            "Safe installation, maintenance and repair of electrical and electronic systems.",
        },
        {
          division: "poultry",
          title: "Poultry and Cattle Feed",
          description:
            "Quality feed and egg production for healthier livestock and stronger farms.",
        },
        {
          division: "soap",
          title: "Soap and Sanitary Products",
          description:
            "Everyday soap, sanitary and cleaning products made to reliable standards.",
        },
        {
          division: "bakery",
          title: "Bakery and Pastry",
          description:
            "Fresh bread, cakes and pastries prepared with skill and care.",
        },
        {
          division: "textile",
          title: "Textile and Garment",
          description:
            "Fabric, garments and textile work produced with local skill and modern standards.",
        },
      ],
    },
    overview: {
      eyebrow: "Our promise",
      title: "Quality and supply",
      items: [
        {
          title: "Cost-effective",
          description: "Fair prices without compromising on quality.",
        },
        {
          title: "High quality",
          description:
            "Careful workmanship and strong standards in every product and service.",
        },
        {
          title: "Sufficient supply",
          description: "The capacity to supply what you need, when you need it.",
        },
      ],
    },
    divisions: {
      eyebrow: "What we do",
      title: "Our Divisions",
      description:
        "From the workshop floor to the construction site, our divisions share one standard: quality work at a fair price. Explore what we make and the services we offer.",
      cta: "View all divisions",
    },
    visionMission: {
      eyebrow: "Our vision and mission",
      title: "Skills put to work",
      promise:
        "Our promise is simple: quality products and services at a fair price, supplied reliably.",
      visionTitle: "Vision",
      visionText:
        "To be the best technical skills provider in job-oriented training, while delivering export-standard products and import-substitute services.",
      missionTitle: "Mission",
      missionText:
        "To enhance technology transfer through innovation, enabling {{college}} to become financially self-supporting and to achieve its mission.",
      cta: "More about us",
    },
    stats: {
      eyebrow: "By the numbers",
      title: "Our work in numbers",
      description:
        "A growing enterprise serving institutions, organizations and communities.",
      note: "Placeholder figures — pending client confirmation.",
      items: {
        divisions: "Divisions",
        customers: "Customer groups",
        projects: "Projects completed",
        trained: "People trained",
      },
    },
    audience: {
      eyebrow: "Who we serve",
      title: "Who We Serve",
      description:
        "We work with the people and organizations that need dependable products and services.",
      items: [
        {
          title: "Government institutes",
          description:
            "Reliable supply, quality products and professional services for public institutions of every size.",
        },
        {
          title: "NGOs",
          description:
            "A trustworthy local partner for projects, supplies, construction and technical support.",
        },
        {
          title: "Communities",
          description:
            "Affordable, quality goods and services that meet everyday needs.",
        },
      ],
    },
    why: {
      eyebrow: "Why choose us",
      title: "Why Choose Us",
      items: [
        {
          title: "Cost-effective",
          description: "Fair prices without compromising on quality.",
        },
        {
          title: "High quality",
          description:
            "Careful workmanship and strong standards in every product and service.",
        },
        {
          title: "Sufficient supply",
          description: "The capacity to supply what you need, when you need it.",
        },
        {
          title: "Everything in one place",
          description:
            "A wide range of products and services from a single, trusted partner.",
        },
        {
          title: "Local production",
          description:
            "Import-substituting products and services that keep value in the country.",
        },
        {
          title: "Skills behind the work",
          description:
            "Our connection to a technical college means our work is supported by trained people and a culture of learning.",
        },
      ],
    },
    partners: {
      title: "Our partners",
      description: "Organizations we work with.",
    },
    cta: {
      title:
        "Ready to work with us? Tell us what you need, and let's build something good together.",
      primary: "Contact Us",
      secondary: "Call {{phone}}",
    },
  },

  about: {
    hero: {
      eyebrow: "About us",
      title: "Skills put to work",
      subtitle: "Skills are most valuable when they are put to work.",
    },
    intro:
      "{{name}} is the enterprise arm of {{college}}. We combine practical technical skills with productive enterprise, manufacturing furniture, machinery, feed, soap and bakery products, carrying out construction and renovation work, providing electrical and electronic services, and offering research, advisory and consultancy support. Our promise is simple: quality products and services at a fair price, supplied reliably.",
    storyTitle: "Our story",
    story: [
      "{{name}} is a multi-sector enterprise built on a simple idea: skills are most valuable when they are put to work. As the enterprise arm of {{college}}, we turn technical knowledge, trained people and workshop capacity into products and services that institutions, organizations and communities can depend on.",
      "Our work covers a wide range of fields. In manufacturing, we produce home and office furniture in metal, wood and hybrid designs, including doors and windows, as well as wooden parquet flooring, machinery, soap and sanitary materials, cosmetics, and bakery and pastry products. In agriculture-related production, we supply poultry and cattle feed and produce eggs. In construction, we carry out house and building construction, along with the renovation of old houses and buildings. We also provide electrical and electronic technology work, textile and garment production, and the maintenance of electrical and electronic equipment.",
      "Beyond production, we share what we know. Our research and advisory service and our management and legal consultancy help organizations plan better, operate more efficiently and make informed decisions. Because we are connected to a technical college, we are also committed to quality, job-oriented training that prepares people for real work.",
      "What sets us apart is the combination of cost and quality. We aim to offer products and services that are priced fairly and built to a high standard, and to supply them in sufficient quantity so that our customers are never left waiting. For government institutes, NGOs and communities that need dependable partners, these three things matter most: a reasonable price, consistent quality and a steady supply.",
      "We also believe in local production. By manufacturing goods and delivering services that would otherwise be imported, we aim to strengthen the national economy, keep value within the country and create opportunities for skilled workers. Every product we make and every project we complete is also a chance to apply, test and improve the skills our college teaches.",
    ],
    collegeTitle: "Part of a larger mission",
    collegeText:
      "Our enterprise supports the mission of {{college}} by generating income that helps the college become financially self-supporting. When you choose our products and services, you are not only getting good value; you are also helping to sustain quality technical education.",
    visionTitle: "Vision",
    visionText:
      "To be the best technical skills provider in job-oriented training, while delivering export-standard products and import-substitute services.",
    missionTitle: "Mission",
    missionText:
      "To enhance technology transfer through innovation, enabling {{college}} to become financially self-supporting and to achieve its mission.",
    focusTitle: "Our focus areas",
    focus: [
      {
        title: "Quality, job-oriented training",
        description:
          "Practical skills that prepare people for real jobs and real industry needs.",
      },
      {
        title: "Import-substituting production and services",
        description:
          "Making locally what would otherwise be imported, at a competitive price and quality.",
      },
      {
        title: "Appropriate technologies",
        description:
          "Innovating technologies suited to production, public services and the market.",
      },
    ],
    valuesTitle: "Our values",
    valuesIntro:
      "Values drawn from the strengths our clients rely on: cost, quality, reliable supply and innovation.",
    values: [
      {
        title: "Quality",
        description:
          "We build every product and deliver every service to a high standard.",
      },
      {
        title: "Affordability",
        description:
          "We keep our prices fair so that institutions and communities get real value.",
      },
      {
        title: "Reliability",
        description:
          "We plan our production to supply what our customers need, when they need it.",
      },
      {
        title: "Innovation",
        description:
          "We develop and adopt technologies that suit local needs and conditions.",
      },
      {
        title: "Skills and integrity",
        description:
          "We value trained hands, honest work and trustworthy partnerships.",
      },
      {
        title: "Community impact",
        description:
          "We aim to create jobs, share knowledge and support local growth.",
      },
    ],
    teamTitle: "Our team",
    teamEmpty: "Team profiles will be added once the client provides them.",
  },

  divisions: {
    hero: {
      eyebrow: "What we do",
      title: "Our Divisions",
      description:
        "From the workshop floor to the construction site, our divisions share one standard: quality work at a fair price. Explore what we make and the services we offer.",
    },
    intro:
      "Explore what we make and the services we offer across nine divisions.",
    cardCta: "Explore division",
  },

  services: {
    hero: {
      eyebrow: "What we offer",
      title: "Services and Programs",
      subtitle:
        "Practical products, technical services and job-oriented programs delivered by one multi-sector enterprise.",
    },
    intro:
      "{{name}} brings production, construction, technical services and training together under one roof. Explore our divisions below, or contact us to discuss a specific project.",
    divisionsTitle: "Products and services",
    divisionsDescription:
      "Nine divisions covering manufacturing, construction, electrical work, food production, textiles and more.",
    programsTitle: "Training, research and consultancy",
    programsDescription:
      "Job-oriented training, applied research and advisory support for individuals, institutions and enterprises.",
    programsCta: "Explore training and consultancy",
  },

  divisionPage: {
    overviewTitle: "About this division",
    productsTitle: "Products and services",
    galleryTitle: "Gallery",
    requestTitle: "Request this service",
    requestText:
      "Tell us what you need and a member of our team will respond to discuss details.",
    otherTitle: "Other divisions",
    metaSuffix: "{{name}}",
  },

  training: {
    hero: {
      eyebrow: "Training, Research and Consultancy",
      title:
        "Our strength is not only in what we produce, but also in what we know.",
      subtitle:
        "Through our connection to {{college}}, we offer training, research and advisory services that help people and organizations grow.",
    },
    intro:
      "Practical technical training, evidence-based research and professional consultancy for people and organizations.",
    servicesTitle: "What we offer",
    services: [
      {
        title: "Job-oriented training",
        description:
          "Practical technical training designed around the real needs of employers and industry, so that graduates are ready to work.",
      },
      {
        title: "Research and advisory service",
        description:
          "Evidence-based research and expert advice to support better planning, operations and innovation.",
      },
      {
        title: "Management and legal consultancy",
        description:
          "Professional guidance for organizations that need support with management, planning and legal matters.",
      },
    ],
    ctaTitle: "Interested in training or consultancy?",
    ctaText: "Contact us to discuss your needs.",
  },

  gallery: {
    hero: {
      eyebrow: "Gallery",
      title: "A look at our work",
      subtitle:
        "Products from our workshops, exhibitions and the people behind them.",
    },
    filterLabel: "Filter gallery by division",
    empty: "No images in this category yet.",
  },

  contact: {
    hero: {
      eyebrow: "Contact us",
      title: "Contact Us",
      subtitle:
        "Whether you want to order products, request a service, discuss a construction project, or explore training and consultancy, we would be glad to hear from you.",
    },
    intro:
      "Send us a message and we will get back to you as soon as possible.",
    detailsTitle: "Contact details",
    addressPending: "Address to be confirmed.",
    hoursPending: "Working hours to be confirmed.",
    mapTitle: "Find us",
    mapPending: "Our map location will be added once the address is confirmed.",
    formTitle: "Send us a message",
    formSubtitle: "Fields marked * are required.",
    faqTitle: "Frequently Asked Questions",
    privacyNote:
      "We only use your details to respond to your inquiry. Required fields are marked with an asterisk.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What kind of training do you provide?",
        answer:
          "We focus on quality, job-oriented training. Our aim is to give people practical technical skills that match what employers and industry actually need, so that they are ready for work.",
      },
      {
        question:
          "What do you mean by import-substituting production and services?",
        answer:
          "It means producing and providing locally what would otherwise have to be imported. By making goods and delivering services here in Ethiopia, we help customers get good quality at a fair price while keeping value within the country.",
      },
      {
        question: "What technologies do you innovate?",
        answer:
          "We work on appropriate technologies: practical solutions suited to production, public services and the market. Our aim is to adopt and develop technology that is useful, affordable and suited to local conditions.",
      },
      {
        question: "How can I order products or request a service?",
        answer:
          "Contact us through the form on our Contact page, by phone, or by email. Tell us what you need and a member of our team will respond to discuss details.",
      },
      {
        question: "Do you work with government institutes and NGOs?",
        answer:
          "Yes. Government institutes, NGOs and communities are our main customers, and we are glad to discuss large or recurring supply as well as one-time projects.",
      },
    ],
  },

  form: {
    labels: {
      fullName: "Full name",
      organization: "Organization",
      email: "Email",
      phone: "Phone",
      division: "Division of interest",
      message: "Message",
      submit: "Send message",
      submitting: "Sending…",
      divisionGeneral: "General inquiry",
      divisionPlaceholder: "Select a division",
    },
    placeholders: {
      fullName: "Your full name",
      organization: "Your organization",
      email: "you@example.com",
      phone: "Your phone number",
      message: "Tell us what you need",
    },
    errors: {
      fullNameRequired: "Please enter your full name.",
      fullNameShort: "Please enter at least 2 characters.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      phoneRequired: "Please enter your phone number.",
      phoneInvalid: "Please enter a valid phone number.",
      divisionRequired: "Please select a division.",
      messageRequired: "Please enter a message.",
      messageShort: "Please write at least 10 characters.",
      generic:
        "Sorry, something went wrong. Please try again or call us directly.",
    },
    status: {
      success:
        "Thank you. Your message has been sent and we will contact you soon.",
      mailtoSuccess:
        "Your email app should now open with your message. If it does not, please call us directly.",
      error:
        "Sorry, something went wrong. Please try again or call us directly.",
      honeypot: "Leave this field empty.",
    },
  },

  footer: {
    blurb:
      "{{name}}: manufacturing, construction, technical services, training and consultancy. Quality products and services at a fair price.",
    quickLinks: "Quick links",
    divisionsTitle: "Our divisions",
    contactTitle: "Contact",
    rights: "© {{year}} {{name}}. All rights reserved.",
  },

  notFound: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has been moved.",
    primary: "Back to home",
    secondary: "Contact us",
  },
};
