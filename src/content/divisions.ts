import { images } from "@/config/images";
import type { Division } from "./types";

/**
 * The nine approved divisions, in the order used by the content document.
 * English text is taken word for word from `Wingate_Website_Content.docx`.
 * The Amharic wording is a working translation for client review.
 */
export const divisions: readonly Division[] = [
  {
    slug: "furniture",
    name: { en: "Furniture, Doors and Windows", am: "የቤት እቃ፣ በሮችና መስኮቶች" },
    shortDescription: {
      en: "Furniture for homes, offices and institutions in metal, wood and hybrid designs, plus doors and windows.",
      am: "ለቤት፣ ለቢሮና ለተቋማት ከብረት፣ ከእንጨትና ከተዳቀለ ንድፍ የተሰሩ የቤት እቃዎች፣ እንዲሁም በሮችና መስኮቶች።",
    },
    fullDescription: {
      en: "We design and manufacture furniture for homes, offices and institutions in metal, wood and hybrid combinations, together with doors and windows. Our products are built to be durable, practical and well finished, whether you need a single custom piece or a full supply for a new building.",
      am: "ለቤት፣ ለቢሮና ለተቋማት ከብረት፣ ከእንጨትና ከተዳቀለ ጥምረት የተሰሩ የቤት እቃዎችን እንነድፋለን እንዲሁም እናመርታለን፤ ከዚህ ጋር በሮችንና መስኮቶችንም እናቀርባለን። ምርቶቻችን ጠንካራ፣ ተግባራዊና በጥሩ ሁኔታ የተጠናቀቁ እንዲሆኑ ይሰራሉ፤ አንድ ብጁ ዕቃ ወይም ለአዲስ ህንፃ ሙሉ አቅርቦት ቢፈልጉም።",
    },
    products: {
      en: [
        "Home and office furniture",
        "Metal, wooden and hybrid designs",
        "Doors and windows",
        "Supply for institutions, schools and offices",
      ],
      am: [
        "የቤትና የቢሮ እቃዎች",
        "የብረት፣ የእንጨትና የተዳቀሉ ንድፎች",
        "በሮችና መስኮቶች",
        "ለተቋማት፣ ለትምህርት ቤቶችና ለቢሮዎች አቅርቦት",
      ],
    },
    hero: images.divisions.furniture.hero,
    gallery: images.divisions.furniture.gallery,
  },
  {
    slug: "parquet",
    name: { en: "Wooden Parquet Flooring", am: "የእንጨት ወለል" },
    shortDescription: {
      en: "Parquet flooring produced in our own workshop, bringing warmth and a refined finish to homes, offices and public spaces.",
      am: "በራሳችን ወርክሾፕ የሚመረት የእንጨት ወለል፣ ለቤቶች፣ ለቢሮዎችና ለህዝብ ቦታዎች ሞቅታና የተጣራ ገጽታ የሚሰጥ።",
    },
    fullDescription: {
      en: "Our wooden parquet flooring brings warmth and a refined finish to homes, offices and public spaces. Produced in our own workshop, it combines good craftsmanship with competitive pricing.",
      am: "የእንጨት ወለላችን ለቤቶች፣ ለቢሮዎችና ለህዝብ ቦታዎች ሞቅታና የተጣራ ገጽታ ያመጣል። በራሳችን ወርክሾፕ የሚመረት ስለሆነ ጥሩ የእጅ ስራን ከተመጣጣኝ ዋጋ ጋር ያጣምራል።",
    },
    products: {
      en: [
        "Parquet flooring supply",
        "Suitable for homes, offices and institutions",
        "Made to order",
      ],
      am: [
        "የእንጨት ወለል አቅርቦት",
        "ለቤቶች፣ ለቢሮዎችና ለተቋማት ተስማሚ",
        "በትዕዛዝ የሚሰራ",
      ],
    },
    hero: images.divisions.parquet.hero,
    gallery: images.divisions.parquet.gallery,
  },
  {
    slug: "construction",
    name: { en: "Construction and Renovation", am: "ግንባታና ማሻሻያ" },
    shortDescription: {
      en: "House and building construction, plus renovation that gives old houses and buildings new life.",
      am: "የቤትና የህንፃ ግንባታ፣ እንዲሁም ለአሮጌ ቤቶችና ህንፃዎች አዲስ ህይወት የሚሰጥ ማሻሻያ።",
    },
    fullDescription: {
      en: "We carry out house construction and building construction, and we renovate old houses and buildings to give them new life. From planning and materials to finishing, our teams focus on sound workmanship and dependable delivery.",
      am: "የቤት ግንባታና የህንፃ ግንባታ እንሰራለን፤ አሮጌ ቤቶችንና ህንፃዎችንም አዲስ ህይወት እንዲያገኙ እናሻሽላለን። ከእቅድና ከቁሳቁስ እስከ ማጠናቀቂያ ድረስ ቡድኖቻችን በጠንካራ የእጅ ስራና በአስተማማኝ አቅርቦት ላይ ያተኩራሉ።",
    },
    products: {
      en: [
        "House construction",
        "Building construction",
        "Renovation of old houses",
        "Building renovation work",
      ],
      am: [
        "የቤት ግንባታ",
        "የህንፃ ግንባታ",
        "የአሮጌ ቤቶች ማሻሻያ",
        "የህንፃ ማሻሻያ ስራ",
      ],
    },
    hero: images.divisions.construction.hero,
    gallery: images.divisions.construction.gallery,
  },
  {
    slug: "machinery",
    name: { en: "Machinery Manufacturing", am: "የማሽነሪ ማምረት" },
    shortDescription: {
      en: "Machinery that supports local production and industry, built locally to reduce dependence on imports.",
      am: "የአገር ውስጥ ምርትና ኢንዱስትሪን የሚደግፍ ማሽነሪ፣ ገቢን ለመቀነስ በአገር ውስጥ የሚመረት።",
    },
    fullDescription: {
      en: "We manufacture machinery that supports local production and industry. By building equipment locally, we help reduce dependence on imports and make it easier to find service and spare parts.",
      am: "የአገር ውስጥ ምርትና ኢንዱስትሪን የሚደግፍ ማሽነሪ እናመርታለን። መሳሪያዎችን በአገር ውስጥ በመስራት ገቢን ለመቀነስ እንዲሁም አገልግሎትና መለዋወጫ ክፍሎችን በቀላሉ ማግኘት እንዲቻል እናግዛለን።",
    },
    products: {
      en: ["Machinery fabrication", "Locally produced equipment", "Technical support"],
      am: ["የማሽነሪ ስራ", "በአገር ውስጥ የተመረተ መሳሪያ", "ቴክኒካዊ ድጋፍ"],
    },
    hero: images.divisions.machinery.hero,
    gallery: images.divisions.machinery.gallery,
  },
  {
    slug: "electrical",
    name: {
      en: "Electrical and Electronic Technology",
      am: "የኤሌክትሪክና ኤሌክትሮኒክስ ቴክኖሎጂ",
    },
    shortDescription: {
      en: "Installation, technology work and maintenance that keeps electrical and electronic equipment working safely.",
      am: "የኤሌክትሪክና ኤሌክትሮኒክስ መሳሪያዎች በደህንነት እንዲሰሩ የሚያደርግ ተከላ፣ የቴክኖሎጂ ስራና ጥገና።",
    },
    fullDescription: {
      en: "Our electrical and electronic technology team provides installation and technology work, along with the maintenance and repair of electrical and electronic materials, keeping your equipment working safely and efficiently.",
      am: "የኤሌክትሪክና ኤሌክትሮኒክስ ቴክኖሎጂ ቡድናችን ተከላና የቴክኖሎጂ ስራ ያቀርባል፤ ከዚህ ጋር የኤሌክትሪክና ኤሌክትሮኒክስ ቁሳቁሶችን በመጠገንና በማሻሻል መሳሪያዎችዎ በደህንነትና በብቃት እንዲሰሩ ያደርጋል።",
    },
    products: {
      en: [
        "Electrical and electronic technology work",
        "Maintenance of electrical and electronic materials",
        "Technical service for institutions and businesses",
      ],
      am: [
        "የኤሌክትሪክና ኤሌክትሮኒክስ ቴክኖሎጂ ስራ",
        "የኤሌክትሪክና ኤሌክትሮኒክስ ቁሳቁሶች ጥገና",
        "ለተቋማትና ለንግድ ድርጅቶች ቴክኒካዊ አገልግሎት",
      ],
    },
    hero: images.divisions.electrical.hero,
    gallery: images.divisions.electrical.gallery,
  },
  {
    slug: "poultry",
    name: {
      en: "Poultry, Egg Production and Cattle Feed",
      am: "የዶሮ እርባታ፣ የእንቁላል ምርትና የከብት መኖ",
    },
    shortDescription: {
      en: "Poultry and cattle feed and egg production, supplying dependable agricultural inputs and products.",
      am: "የዶሮና የከብት መኖ እንዲሁም የእንቁላል ምርት፣ አስተማማኝ የእርሻ ግብዓቶችንና ምርቶችን በማቅረብ።",
    },
    fullDescription: {
      en: "We produce poultry and cattle feed and supply eggs, helping farmers and institutions access dependable agricultural inputs and products in sufficient quantity.",
      am: "የዶሮና የከብት መኖ እናመርታለን እንዲሁም እንቁላል እናቀርባለን፤ ይህም አርሶ አደሮችና ተቋማት አስተማማኝ የእርሻ ግብዓቶችንና ምርቶችን በበቂ መጠን እንዲያገኙ ይረዳል።",
    },
    products: {
      en: ["Poultry feed", "Cattle feed", "Egg production"],
      am: ["የዶሮ መኖ", "የከብት መኖ", "የእንቁላል ምርት"],
    },
    hero: images.divisions.poultry.hero,
    gallery: images.divisions.poultry.gallery,
  },
  {
    slug: "soap",
    name: {
      en: "Soap, Sanitary Materials and Cosmetics",
      am: "ሳሙና፣ የግል ንጽህና ቁሳቁሶችና መዋቢያዎች",
    },
    shortDescription: {
      en: "Soap, sanitary materials and cosmetics that combine quality with affordable prices.",
      am: "ጥራትን ከተመጣጣኝ ዋጋ ጋር የሚያጣምሩ ሳሙና፣ የግል ንጽህና ቁሳቁሶችና መዋቢያዎች።",
    },
    fullDescription: {
      en: "We manufacture soap, sanitary materials and cosmetics, combining quality with affordable prices for households, institutions and organizations.",
      am: "ሳሙና፣ የግል ንጽህና ቁሳቁሶችና መዋቢያዎችን እናመርታለን፤ ለቤተሰቦች፣ ለተቋማትና ለድርጅቶች ጥራትን ከተመጣጣኝ ዋጋ ጋር በማጣመር።",
    },
    products: {
      en: ["Soap", "Sanitary materials", "Cosmetics"],
      am: ["ሳሙና", "የግል ንጽህና ቁሳቁሶች", "መዋቢያዎች"],
    },
    hero: images.divisions.soap.hero,
    gallery: images.divisions.soap.gallery,
  },
  {
    slug: "bakery",
    name: { en: "Bakery and Pastry", am: "ዳቦ ቤትና ኬክ" },
    shortDescription: {
      en: "Bread and pastry products made with care for everyday customers and institutional orders.",
      am: "ለዕለት ተዕለት ደንበኞችና ለተቋማዊ ትዕዛዞች በጥንቃቄ የሚሰሩ የዳቦና የኬክ ምርቶች።",
    },
    fullDescription: {
      en: "Our bakery produces bread and pastry products made with care for everyday customers and institutional orders.",
      am: "የዳቦ ቤታችን ለዕለት ተዕለት ደንበኞችና ለተቋማዊ ትዕዛዞች በጥንቃቄ የሚሰሩ የዳቦና የኬክ ምርቶችን ያመርታል።",
    },
    products: {
      en: ["Bakery products", "Pastry products", "Bulk and institutional supply"],
      am: ["የዳቦ ምርቶች", "የኬክ ምርቶች", "በጅምላና ለተቋማት አቅርቦት"],
    },
    hero: images.divisions.bakery.hero,
    gallery: images.divisions.bakery.gallery,
  },
  {
    slug: "textile",
    name: { en: "Textile and Garment", am: "ጨርቃጨርቅና ልብስ" },
    shortDescription: {
      en: "Textile and garment work producing clothing and fabric products for institutions and communities.",
      am: "ለተቋማትና ለማህበረሰቦች ልብስና የጨርቅ ምርቶችን የሚያመርት የጨርቃጨርቅና የልብስ ስራ።",
    },
    fullDescription: {
      en: "We provide textile and garment work, producing clothing and fabric products to meet the needs of institutions, organizations and communities.",
      am: "የጨርቃጨርቅና የልብስ ስራ እናቀርባለን፤ የተቋማትን፣ የድርጅቶችንና የማህበረሰቦችን ፍላጎት የሚያሟሉ ልብሶችንና የጨርቅ ምርቶችን በማምረት።",
    },
    products: {
      en: ["Garment production", "Textile work", "Uniforms and institutional orders"],
      am: ["የልብስ ስፌት ምርት", "የጨርቃጨርቅ ስራ", "የዩኒፎርምና የተቋማዊ ትዕዛዞች"],
    },
    hero: images.divisions.textile.hero,
    gallery: images.divisions.textile.gallery,
  },
];

export const divisionSlugs = divisions.map((division) => division.slug);
