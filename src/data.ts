export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1595351298020-038700609878?w=1200&h=900&fit=crop&auto=format",

  intro:
    "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=700&fit=crop&auto=format",

  craftsmanWoman:
    "https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?w=800&h=900&fit=crop&auto=format",

  craftsman2:
    "https://images.unsplash.com/photo-1609881583302-61548332039c?w=800&h=700&fit=crop&auto=format",

  craftsman3:
    "https://images.unsplash.com/photo-1609881582722-4a8ab7cd54d8?w=800&h=700&fit=crop&auto=format",

  womanCeramic:
    "https://images.unsplash.com/photo-1598815272841-4e85a77e0a67?w=800&h=900&fit=crop&auto=format",

  export1:
    "https://images.unsplash.com/photo-1719173150322-e75de9901efb?w=900&h=700&fit=crop&auto=format",

  export2:
    "https://images.unsplash.com/photo-1697410154169-b2bbf83758e6?w=800&h=600&fit=crop&auto=format",

  potsDisplay:
    "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=800&h=600&fit=crop&auto=format",

  potsStack:
    "https://images.unsplash.com/photo-1468531390554-9f62f9767a87?w=800&h=600&fit=crop&auto=format",
}

export interface Product {
  id: number

  name: string

  category: string

  description: string

  fullDescription: string

  image: string

  material: string

  size: string

  weight: string

  finish: string

  moq: string
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,

    name: "Terracotta Planter",

    category: "Terracotta",

    description:
      "A classic terracotta planter handcrafted with care. Ideal for indoor and outdoor use.",

    fullDescription:
      "Our Terracotta Planter is handcrafted from natural clay sourced locally in Yogyakarta. Each piece is individually shaped, dried, and fired using traditional techniques passed down through generations. The natural terracotta finish allows plants to breathe naturally, promoting healthy root growth. Suitable for both indoor and outdoor use.",

    image:
      "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=600&h=600&fit=crop&auto=format",

    material: "Natural Terracotta Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural / Unglazed",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 2,

    name: "Classic Clay Pot",

    category: "Clay Pottery",

    description:
      "A timeless clay pot shaped by hand, finished naturally for everyday use.",

    fullDescription:
      "The Classic Clay Pot represents our core craftsmanship — a simple, functional form handcrafted with precision. Finished naturally without synthetic coatings, each pot carries the character of the earth it was shaped from. Versatile for decorative and functional purposes.",

    image:
      "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=600&h=600&fit=crop&auto=format",

    material: "Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 3,

    name: "Rustic Garden Pot",

    category: "Garden",

    description:
      "Sturdy and elegant garden pots crafted for outdoor beauty and durability.",

    fullDescription:
      "Designed for garden environments, our Rustic Garden Pot combines traditional craft with practical durability. Made from high-quality clay, these pots are shaped to withstand outdoor conditions while maintaining their natural beauty. Each pot is individually made, ensuring slight variations that reflect genuine handcraft.",

    image:
      "https://images.unsplash.com/photo-1468531390554-9f62f9767a87?w=600&h=600&fit=crop&auto=format",

    material: "Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural / Weathered",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 4,

    name: "Handcrafted Vase",

    category: "Home Decoration",

    description:
      "An elegant decorative vase, carefully thrown on the wheel and finished by hand.",

    fullDescription:
      "Our Handcrafted Vase is thrown on the pottery wheel and finished by skilled artisans in our Yogyakarta workshop. The graceful form is designed to complement modern and traditional interiors alike. Each vase is one of a kind, carrying the subtle marks of the hands that shaped it.",

    image:
      "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=600&h=600&fit=crop&auto=format",

    material: "Terracotta Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 5,

    name: "Terracotta Bowl",

    category: "Terracotta",

    description:
      "A wide, open bowl crafted from fine terracotta, perfect for decorative display.",

    fullDescription:
      "The Terracotta Bowl is shaped by hand using traditional clay-working methods. Its open form makes it perfect as a decorative centrepiece or for storing small items. The natural terracotta surface develops a beautiful patina over time.",

    image:
      "https://images.unsplash.com/photo-1699371830139-cb02e94878f1?w=600&h=600&fit=crop&auto=format",

    material: "Terracotta Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural / Unglazed",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 6,

    name: "Decorative Clay Pot",

    category: "Home Decoration",

    description:
      "A decorative clay pot with refined proportions, suitable for interiors and gifting.",

    fullDescription:
      "Our Decorative Clay Pot is crafted with attention to proportion and surface quality. Designed for display in interior spaces, this piece works as a standalone object or as part of a curated arrangement. Available in a range of forms and finishes.",

    image:
      "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=600&h=600&fit=crop&auto=format",

    material: "Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 7,

    name: "Traditional Clay Jar",

    category: "Clay Pottery",

    description:
      "A traditional Javanese clay jar made using ancient forming techniques.",

    fullDescription:
      "Inspired by the traditional pottery tradition of Java, our Traditional Clay Jar preserves ancient forming techniques in a contemporary context. Each jar is hand-formed, not moulded, giving it a unique character. Suitable for decorative use and as a cultural keepsake.",

    image:
      "https://images.unsplash.com/photo-1633010749341-aa78d0d9b2bb?w=600&h=600&fit=crop&auto=format",

    material: "Natural Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural",

    moq: "[Contact us for MOQ details]",
  },

  {
    id: 8,

    name: "Garden Ornament",

    category: "Garden",

    description:
      "Hand-shaped terracotta garden ornaments that add character to any outdoor space.",

    fullDescription:
      "Our Garden Ornaments are individually hand-shaped and fired to develop lasting character. Designed for outdoor use, they age gracefully in garden environments, developing a natural weathered patina. Available in various forms to complement any garden aesthetic.",

    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=600&fit=crop&auto=format",

    material: "Terracotta Clay",

    size: "[Available in multiple sizes]",

    weight: "[Varies by size]",

    finish: "Natural / Unglazed",

    moq: "[Contact us for MOQ details]",
  },
]

export const PRODUCTS = INITIAL_PRODUCTS

export interface NewsItem {
  id: number

  category: string

  date: string

  title: string

  excerpt: string

  image: string

  body: string
}

export const NEWS: NewsItem[] = [
  {
    id: 1,

    category: "Exhibition",

    date: "March 2024",

    title: "[Exhibition Participation]",

    excerpt:
      "PARJONO KERAMIK JAYA participated in a regional craft exhibition, showcasing our latest handcrafted terracotta products to domestic and international buyers.",

    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",

    body: "PARJONO KERAMIK JAYA was proud to participate in a regional craft exhibition held in Yogyakarta. Our booth featured a curated selection of handcrafted terracotta and clay products, attracting significant interest from both domestic visitors and international buyers.\n\nThe exhibition provided an excellent opportunity to demonstrate our craftsmanship firsthand and connect with potential business partners and distributors. Our team conducted live demonstrations of traditional clay-forming techniques, drawing large crowds throughout the event.\n\nThis participation reflects our ongoing commitment to sharing Indonesian craft traditions with the wider world and building meaningful connections with the global craft community.",
  },

  {
    id: 2,

    category: "Training",

    date: "January 2024",

    title: "[Training & Workshop Activity]",

    excerpt:
      "Our team participated in a craft development training program, enhancing our production techniques and quality standards.",

    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?w=600&h=400&fit=crop&auto=format",

    body: "In January 2024, members of the PARJONO KERAMIK JAYA team attended a professional development training program focused on advancing clay craft techniques and improving production quality standards.\n\nThe training covered topics including advanced forming techniques, quality control methods, and sustainable clay sourcing practices. Participants returned with new skills and perspectives that have been directly integrated into our workshop processes.\n\nThis commitment to continuous learning is part of our broader mission to maintain high-quality standards while honouring the traditional craft methods that define our work.",
  },

  {
    id: 3,

    category: "Company",

    date: "December 2023",

    title: "[Company Activity Title]",

    excerpt:
      "A reflection on PARJONO KERAMIK JAYA's activities over the past year, including production milestones and community engagement.",

    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=400&fit=crop&auto=format",

    body: "As the year draws to a close, PARJONO KERAMIK JAYA reflects on a year of meaningful progress. From expanding our product range to deepening connections with international partners, 2023 has been a year of steady growth rooted in our foundational values of craftsmanship and quality.\n\nWe have continued our tradition of engaging with the local community, supporting craft education and sharing our expertise with the next generation of artisans in Bantul, Yogyakarta.\n\nLooking ahead, we remain committed to producing handcrafted terracotta products that honour our heritage while meeting the evolving needs of our domestic and international customers.",
  },

  {
    id: 4,

    category: "Export",

    date: "October 2023",

    title: "[Export Activity Update]",

    excerpt:
      "PARJONO KERAMIK JAYA continues to strengthen its presence in international markets with new export activities and partnerships.",

    image:
      "https://images.unsplash.com/photo-1719173150322-e75de9901efb?w=600&h=400&fit=crop&auto=format",

    body: "PARJONO KERAMIK JAYA has been actively developing its international export capabilities throughout 2023. Our products have been prepared and shipped to markets abroad, where Indonesian terracotta craft continues to receive strong appreciation.\n\nOur export activities reflect years of preparation — building product quality, refining packaging for long-distance shipping, and developing relationships with international partners who value authentic handcrafted goods.\n\nWe continue to pursue opportunities to bring the craft traditions of Yogyakarta to homes and spaces around the world.",
  },

  {
    id: 5,

    category: "Product",

    date: "August 2023",

    title: "[New Product Development]",

    excerpt:
      "We are pleased to introduce new additions to our product range, developed through careful research and artisan expertise.",

    image:
      "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=600&h=400&fit=crop&auto=format",

    body: "PARJONO KERAMIK JAYA has developed several new product forms as part of our ongoing commitment to expanding our offering. Each new product has been developed through a careful process of research, prototyping, and refinement by our experienced artisans.\n\nThe new additions include decorative forms suited to contemporary interior aesthetics as well as traditional functional pieces that reflect our Javanese craft heritage. All products maintain our commitment to handcraft quality and natural materials.\n\nWe look forward to sharing these new products with our customers and partners.",
  },

  {
    id: 6,

    category: "Training",

    date: "June 2023",

    title: "[Government Program Participation]",

    excerpt:
      "PARJONO KERAMIK JAYA participated in a government-supported craft development program in Bantul, Yogyakarta.",

    image:
      "https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?w=600&h=400&fit=crop&auto=format",

    body: "PARJONO KERAMIK JAYA was selected to participate in a government-supported craft development program organised in Bantul, Yogyakarta. The program brought together clay craft producers from across the region to share knowledge and develop collective best practices.\n\nOur participation included presentations on our production methods and quality standards, as well as practical workshops demonstrating our craft techniques. The program provided valuable networking opportunities with fellow craft producers and government partners supporting the development of Indonesian creative industries.\n\nWe are grateful for the opportunity to contribute to and benefit from these important initiatives that strengthen our local craft community.",
  },
]

export interface Award {
  id: number

  title: string

  year: string

  organization: string

  description: string

  image: string
}

export const AWARDS: Award[] = [
  {
    id: 1,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for excellence in traditional clay craft production and contribution to Indonesian artisan heritage.",

    image:
      "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=400&h=300&fit=crop&auto=format",
  },

  {
    id: 2,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for quality standards in terracotta production and export-ready craft products.",

    image:
      "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=400&h=300&fit=crop&auto=format",
  },

  {
    id: 3,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for participation and achievement in regional and national craft exhibitions.",

    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=400&h=300&fit=crop&auto=format",
  },

  {
    id: 4,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for contribution to craft education and skills development in Bantul, Yogyakarta.",

    image:
      "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=400&h=300&fit=crop&auto=format",
  },

  {
    id: 5,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for export achievement and promotion of Indonesian handcraft in international markets.",

    image:
      "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=400&h=300&fit=crop&auto=format",
  },

  {
    id: 6,

    title: "[Award Name]",

    year: "[Year]",

    organization: "[Organization]",

    description:
      "Recognition for sustained quality and craftsmanship across product categories.",

    image:
      "https://images.unsplash.com/photo-1633010749341-aa78d0d9b2bb?w=400&h=300&fit=crop&auto=format",
  },
]

export interface Exhibition {
  id: number

  name: string

  location: string

  year: string

  description: string

  image: string
}

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 1,

    name: "[Exhibition Name]",

    location: "[Location]",

    year: "[Year]",

    description:
      "Participation in a major regional craft exhibition showcasing terracotta and clay products to domestic buyers and international visitors.",

    image:
      "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 2,

    name: "[Exhibition Name]",

    location: "[Location]",

    year: "[Year]",

    description:
      "National craft fair participation, connecting with buyers and distributors from across Indonesia and international markets.",

    image:
      "https://images.unsplash.com/photo-1719173150322-e75de9901efb?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 3,

    name: "[Exhibition Name]",

    location: "[Location]",

    year: "[Year]",

    description:
      "Export-focused trade event showcasing handcrafted terracotta products to international buyers and potential distribution partners.",

    image:
      "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 4,

    name: "[Exhibition Name]",

    location: "[Location]",

    year: "[Year]",

    description:
      "Local government-supported craft showcase celebrating the rich pottery tradition of Bantul, Yogyakarta.",

    image:
      "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 5,

    name: "[Exhibition Name]",

    location: "[Location]",

    year: "[Year]",

    description:
      "Regional craft exhibition promoting Indonesian artisan products, including a dedicated demonstration of clay-forming techniques.",

    image:
      "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=600&h=400&fit=crop&auto=format",
  },
]

export interface Activity {
  id: number

  type: string

  title: string

  date: string

  location: string

  description: string

  image: string
}

export const ACTIVITIES: Activity[] = [
  {
    id: 1,

    type: "Training",

    title: "[Craft Development Training]",

    date: "[Date]",

    location: "[Location]",

    description:
      "Professional development training focused on advanced clay-forming techniques and quality control for artisan producers.",

    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 2,

    type: "Workshop",

    title: "[Pottery Workshop]",

    date: "[Date]",

    location: "Bantul, Yogyakarta",

    description:
      "Hands-on workshop sharing traditional pottery techniques with participants from local communities and craft enthusiasts.",

    image:
      "https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 3,

    type: "Government Program",

    title: "[Government Craft Program]",

    date: "[Date]",

    location: "[Location]",

    description:
      "Participation in a government-supported craft development program connecting artisan producers with market opportunities.",

    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 4,

    type: "Seminar",

    title: "[Export & Market Development Seminar]",

    date: "[Date]",

    location: "[Location]",

    description:
      "Seminar on export market development strategies for Indonesian craft producers, with focus on international buyer requirements.",

    image:
      "https://images.unsplash.com/photo-1609881583302-61548332039c?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 5,

    type: "Community Activity",

    title: "[Community Craft Initiative]",

    date: "[Date]",

    location: "Klisat, Bantul",

    description:
      "Community engagement initiative supporting craft education and skills development for young artisans in Bantul.",

    image:
      "https://images.unsplash.com/photo-1609881582722-4a8ab7cd54d8?w=600&h=400&fit=crop&auto=format",
  },

  {
    id: 6,

    type: "Company Activity",

    title: "[Company Development Activity]",

    date: "[Date]",

    location: "[Location]",

    description:
      "Internal company development activity focused on process improvement and team capacity building.",

    image:
      "https://images.unsplash.com/photo-1598815272841-4e85a77e0a67?w=600&h=400&fit=crop&auto=format",
  },
]

export const GALLERY_IMAGES = [
  {
    id: 1,
    category: "Products",
    src: "https://images.unsplash.com/photo-1604264726154-26480e76f4e1?w=800&h=800&fit=crop&auto=format",
    alt: "Terracotta planter",
    caption: "Terracotta Planter",
  },

  {
    id: 2,
    category: "Craftsmanship",
    src: "https://images.unsplash.com/photo-1595351298020-038700609878?w=800&h=600&fit=crop&auto=format",
    alt: "Potter at wheel",
    caption: "Shaping Clay on the Wheel",
  },

  {
    id: 3,
    category: "Products",
    src: "https://images.unsplash.com/photo-1635175994617-1a9d85cdf680?w=800&h=600&fit=crop&auto=format",
    alt: "Clay pots display",
    caption: "Clay Pots Collection",
  },

  {
    id: 4,
    category: "Workshop",
    src: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=600&fit=crop&auto=format",
    alt: "Potter at work",
    caption: "Workshop — Shaping Process",
  },

  {
    id: 5,
    category: "Products",
    src: "https://images.unsplash.com/photo-1510828561531-05a3388f6d3d?w=800&h=700&fit=crop&auto=format",
    alt: "Brown clay vases",
    caption: "Handcrafted Vases",
  },

  {
    id: 6,
    category: "Craftsmanship",
    src: "https://images.unsplash.com/photo-1673339065001-a30d6c343cdd?w=800&h=1000&fit=crop&auto=format",
    alt: "Woman making vase",
    caption: "Clay Forming — Artisan at Work",
  },

  {
    id: 7,
    category: "Export",
    src: "https://images.unsplash.com/photo-1719173150322-e75de9901efb?w=800&h=600&fit=crop&auto=format",
    alt: "Stacked clay pots",
    caption: "Products Ready for Export",
  },

  {
    id: 8,
    category: "Products",
    src: "https://images.unsplash.com/photo-1699371830139-cb02e94878f1?w=800&h=600&fit=crop&auto=format",
    alt: "Pottery collection",
    caption: "Traditional Clay Pottery",
  },

  {
    id: 9,
    category: "Workshop",
    src: "https://images.unsplash.com/photo-1609881583302-61548332039c?w=800&h=700&fit=crop&auto=format",
    alt: "Clay pot making",
    caption: "Workshop — Forming Process",
  },

  {
    id: 10,
    category: "Products",
    src: "https://images.unsplash.com/photo-1557128712-4ab4dc147a71?w=800&h=700&fit=crop&auto=format",
    alt: "Terracotta pots",
    caption: "Decorative Terracotta Collection",
  },

  {
    id: 11,
    category: "Activities",
    src: "https://images.unsplash.com/photo-1609881582722-4a8ab7cd54d8?w=800&h=700&fit=crop&auto=format",
    alt: "Pottery holding",
    caption: "Quality Inspection",
  },

  {
    id: 12,
    category: "Export",
    src: "https://images.unsplash.com/photo-1697410154169-b2bbf83758e6?w=800&h=600&fit=crop&auto=format",
    alt: "Clay pots for export",
    caption: "Export-Ready Products",
  },

  {
    id: 13,
    category: "Products",
    src: "https://images.unsplash.com/photo-1633010749341-aa78d0d9b2bb?w=800&h=600&fit=crop&auto=format",
    alt: "Orange terracotta vases",
    caption: "Terracotta Vase Collection",
  },

  {
    id: 14,
    category: "Craftsmanship",
    src: "https://images.unsplash.com/photo-1598815272841-4e85a77e0a67?w=800&h=900&fit=crop&auto=format",
    alt: "Artisan holding ceramic",
    caption: "Finished Piece — Artisan Review",
  },

  {
    id: 15,
    category: "Workshop",
    src: "https://images.unsplash.com/photo-1468531390554-9f62f9767a87?w=800&h=600&fit=crop&auto=format",
    alt: "Stacked pots workshop",
    caption: "Workshop Storage — Clay Pots",
  },

  {
    id: 16,
    category: "Products",
    src: "https://images.unsplash.com/photo-1536266305399-b367feb671f9?w=800&h=600&fit=crop&auto=format",
    alt: "Assorted clay pots",
    caption: "Product Range — Clay Pottery",
  },
]
