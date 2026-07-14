const assetBase = '/Ker & Co. Business Group'

 export const brandMedia = {
   logo: `${assetBase}/KER&CO LOGO-04.png`,
   hero: {
     desktopVideo: `${assetBase}/ker_computer_hero.mp4`,
     mobileVideo: `${assetBase}/ker_Mobile_hero.mp4`,
     poster: `${assetBase}/Import  Export and Rural Ethiopia.jpg`,
   },
   founder: {
     portrait: `${assetBase}/Keria Ahmed.png`,
     beginnings: `${assetBase}/Keria Ahmed Beginnings.jpg`,
   },
   ventures: {
     distribution: `${assetBase}/Import  Export and Rural Ethiopia.jpg`,
     paper: `${assetBase}/mamco distribution.jpg`,
     partner: `${assetBase}/Import  Export and Rural Ethiopia.jpg`,
     fitness: `${assetBase}/Ker Fitness.jpg`,
     hotel: `${assetBase}/The Grand Palace Suites Hotel.jpg`,
     realEstate: `${assetBase}/Real Estate.jpg`,
     mining: `${assetBase}/Minch coal Mining PLC.jpg`,
     coalMining: `${assetBase}/Minch coal Mining PLC.jpg`,
     agriculture: `${assetBase}/Green Farm PLC.jpg`,
     export: `${assetBase}/coffe export.jpg`,
     grandPalace1: `${assetBase}/grand palace image.jpg`,
     grandPalace2: `${assetBase}/grand palace image2.jpg`,
     grandPalace3: `${assetBase}/grand palace image3.jpg`,
   },
 } as const

 // Background image slideshow used in place of the old hero video.
 export const heroSlides = [
   {
     src: brandMedia.ventures.export,
     eyebrow: 'Coffee & Meat Export',
     headline: 'Ethiopia to the world',
   },
   {
     src: brandMedia.ventures.paper,
     eyebrow: 'Paper & Sanitary Products',
     headline: 'A market-defining legacy',
   },
   {
     src: brandMedia.ventures.hotel,
     eyebrow: 'Grand Palace Suites Hotel',
     headline: 'Award-winning hospitality',
   },
   {
     src: brandMedia.ventures.grandPalace1,
     eyebrow: 'The Grand Palace Experience',
     headline: 'Luxury, redefined',
   },
   {
     src: brandMedia.ventures.realEstate,
     eyebrow: 'Real Estate Development',
     headline: 'Modern urban living',
   },
   {
     src: brandMedia.ventures.agriculture,
     eyebrow: 'Agriculture & Sourcing',
     headline: 'Rooted in the land',
   },
   {
     src: brandMedia.ventures.distribution,
     eyebrow: 'Import, Export & Distribution',
     headline: 'Built from humble beginnings',
   },
   {
     src: brandMedia.ventures.coalMining,
     eyebrow: 'Minch Coal Mining PLC',
     headline: 'Fueling Ethiopian industry',
   },
 ] as const

 export const brand = {
  name: 'Ker & Co. Business Group',
  shortName: 'Ker & Co.',
  founderName: 'Our Founder',
  founderTitle: 'Founder & Group Chairwoman',
  tagline: 'Legacy, Growth & Global Vision',
  signatureLine: 'Built from humble beginnings into a diversified Ethiopian business group.',
  logoPath: brandMedia.logo,
  phone: '+251 116 663 014',
  phoneHref: 'tel:+251116663014',
  location: 'Addis Ababa, Ethiopia',
  hours: 'Mon-Sun: 8:00 AM - 6:00 PM',
  emailLabel: 'Use the contact form for business inquiries',
  heroRotatingTexts: [
    'A diversified Ethiopian business group',
    'From rural distribution to global export',
    'Hospitality, wellness & real estate',
    'Mining, agriculture & coffee export',
    'Built on resilience, trust & vision',
  ],
  heroHighlights: [
    'Distribution & Trade',
    'Hospitality & Real Estate',
    'Mining & Agriculture',
    'Coffee & Meat Export',
  ],
  heroStats: [
    { value: 'Since 1997', label: 'Entrepreneurial Journey' },
    { value: '4', label: 'Ker Fitness Locations' },
    { value: '4', label: 'Luxury High-Rise Developments' },
    { value: '3', label: 'International Hotel Awards' },
  ],
} as const

export const founderStory = [
  {
    id: 'beginnings',
    title: 'Humble Beginnings',
    year: '1997',
    description:
      'Our founder began her entrepreneurial journey in 1997 by importing hair bands. With sharp business instinct and strong family support, she quickly built momentum in the fast-moving consumer goods sector.',
  },
  {
    id: 'rural-distribution',
    title: 'Import, Export & Rural Distribution',
    year: 'Growth Phase',
    description:
      'She expanded into essential goods for rural communities, including plastic slippers, lanterns, woven polypropylene bags, cooking oil, and paper products—serving daily needs while building trusted distribution networks across Ethiopia.',
  },
  {
    id: 'paper-products',
    title: 'Paper Products Legacy',
    year: 'Industry Leadership',
    description:
      'Our founder became MAMCO PLC’s sole agent and distributor for paper and sanitary products in Ethiopia, operating a landmark shop and warehouse in Bomb-Tera, Mercato, and shaping the country’s paper supply landscape.',
  },
  {
    id: 'fitness',
    title: 'Ker Fitness',
    year: 'Wellness Expansion',
    description:
      'Driven by a passion for health and wellness, she founded Ker Fitness—a premium gymnasium and spa with over one hundred Technogym machines, a wellness spa, and children’s playground facilities. The brand expanded to four top locations in Addis Ababa.',
  },
  {
    id: 'hospitality',
    title: 'Grand Palace Suites Hotel',
    year: '2023',
    description:
      'During a period marked by COVID-era pressure and political instability, our founder opened a hotel that achieved international recognition and won three prestigious awards within two years.',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Development',
    year: 'Long-Term Investment',
    description:
      'Our founder invested early in land and developed four luxury high-rise apartments in Ethiopia’s diplomatic hub—reflecting her commitment to modern, high-quality living spaces.',
  },
  {
    id: 'mining',
    title: 'Minch Mining PLC',
    year: 'Current Venture',
    description:
      'Through Minch Mining PLC, our founder expanded into local coal mining with a focus on open-cast operations and dependable supply for cement factories and other local industries.',
  },
  {
    id: 'agriculture',
    title: 'Green Farm PLC',
    year: 'Agricultural Commitment',
    description:
      'Green Farm PLC reflects our founder’s commitment to agriculture through cultivated land in Arba Minch and partnerships with farmers across Ethiopia to source and professionally export high-quality crops.',
  },
  {
    id: 'export',
    title: 'Coffee & Meat Export Ventures',
    year: 'Global Expansion',
    description:
      'Our founder is expanding into premium Ethiopian coffee and meat exports, pursuing new international partnerships and market opportunities that strengthen Ethiopia’s presence in global agricultural trade.',
  },
] as const

export const departments = [
  {
    id: 'distribution',
    title: 'FMCG & Rural Distribution',
    tagline: 'The foundation of the group',
    description:
      'Ker & Co. Business Group was built by understanding everyday demand. From hair bands to household essentials, the group’s early success came from bringing accessible products to underserved communities with dependable distribution.',
    features: [
      'Fast-moving consumer goods sourcing',
      'Rural distribution planning',
      'Everyday essentials supply chains',
      'High-volume market coverage',
    ],
    benefits: [
      'Deep market familiarity',
      'Reliable distribution discipline',
      'Strong trading foundation',
      'Long-term customer trust',
    ],
    image: brandMedia.ventures.distribution,
    image2: brandMedia.ventures.paper,
  },
  {
    id: 'paper',
    title: 'Paper & Sanitary Products',
    tagline: 'A market-defining legacy',
    description:
      'As MAMCO PLC’s sole agent and distributor in Ethiopia, our founder built one of the country’s most recognized paper and sanitary products businesses—serving households, retailers, and institutions through a landmark Mercato presence.',
    features: [
      'Paper products distribution',
      'Sanitary goods supply',
      'Retail and wholesale coverage',
      'Warehouse-led inventory coordination',
    ],
    benefits: [
      'Trusted reputation in the market',
      'Strong procurement and stock flow',
      'Recognized Mercato presence',
      'Reliable daily essentials coverage',
    ],
    image: brandMedia.ventures.paper,
    image2: brandMedia.ventures.partner,
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Wellness',
    tagline: 'Experience-led growth',
    description:
      'Through Ker Fitness and Grand Palace Suites Hotel, Ker & Co. Business Group has built a lifestyle and hospitality portfolio centered on quality service, premium environments, and memorable customer experience.',
    features: [
      'Gymnasium and spa operations',
      'Premium hospitality management',
      'Award-winning service positioning',
      'Customer experience design',
    ],
    benefits: [
      'Strong consumer-facing brands',
      'Recognized wellness leadership',
      'Hospitality credibility',
      'Premium service delivery',
    ],
    image: brandMedia.ventures.hotel,
    image2: brandMedia.ventures.grandPalace1,
    gallery: [
      brandMedia.ventures.grandPalace2,
      brandMedia.ventures.grandPalace3,
      brandMedia.ventures.fitness,
    ],
  },
  {
    id: 'real-estate',
    title: 'Real Estate Development',
    tagline: 'Modern urban living',
    description:
      'The real estate arm reflects our founder’s long-view investment mindset, with luxury high-rise developments designed to deliver quality living standards in one of Ethiopia’s most strategic urban locations.',
    features: [
      'High-rise residential development',
      'Long-term property investment',
      'Premium design standards',
      'Urban project execution',
    ],
    benefits: [
      'Asset-backed growth',
      'Quality-focused development',
      'Premium residential positioning',
      'Long-term capital value',
    ],
    image: brandMedia.ventures.realEstate,
    image2: brandMedia.ventures.realEstate,
  },
  {
    id: 'coal-mining',
    title: 'Minch Coal Mining PLC',
    tagline: 'Powering industry with domestic coal',
    description:
      'Minch Coal Mining PLC delivers reliable, locally sourced coal to support cement factories and other energy-intensive industries across Ethiopia, backed by disciplined extraction, logistics, and long-term supply commitments.',
    features: [
      'Coal extraction and processing',
      'Industrial energy supply',
      'Field logistics and dispatch',
      'Consistent supply scheduling',
    ],
    benefits: [
      'Domestic resource utilization',
      'Reliable industrial fuel supply',
      'Operational discipline',
      'Long-term supply capability',
    ],
    image: brandMedia.ventures.coalMining,
    image2: brandMedia.ventures.coalMining,
  },
  {
    id: 'agriculture',
    title: 'Green Farm PLC',
    tagline: 'Agriculture with export ambition',
    description:
      'Green Farm PLC combines cultivation with sourcing partnerships across Ethiopia. The company is positioned to move quality agricultural products from fertile production areas to international markets with professionalism and care.',
    features: [
      'Crop cultivation in Arba Minch',
      'Farmer partnership sourcing',
      'Export preparation and handling',
      'Standards-focused produce management',
    ],
    benefits: [
      'Agricultural depth',
      'Farmer network integration',
      'Export-ready workflows',
      'Professional quality positioning',
    ],
    image: brandMedia.ventures.agriculture,
    image2: brandMedia.ventures.agriculture,
  },
  {
    id: 'exports',
    title: 'Coffee & Meat Export Ventures',
    tagline: 'Expanding Ethiopia’s global trade footprint',
    description:
      'Ker & Co. Business Group is scaling export ventures in premium Ethiopian coffee and meat, with a focus on quality, strategic partnerships, and sustained international growth.',
    features: [
      'Premium coffee sourcing',
      'Meat export market development',
      'Trade partnership cultivation',
      'International buyer coordination',
    ],
    benefits: [
      'Global trade orientation',
      'Strong Ethiopia origin story',
      'Growth-minded export strategy',
      'Scalable partnership opportunities',
    ],
    image: brandMedia.ventures.export,
    image2: brandMedia.ventures.export,
  },
] as const

export const partnershipReasons = [
  {
    title: 'Founder-Led Entrepreneurial Legacy',
    description:
      'Ker & Co. Business Group is rooted in our founder’s journey from small-scale import trade to a diversified portfolio spanning distribution, hospitality, real estate, mining, agriculture, and export.',
  },
  {
    title: 'Diversified Operating Platform',
    description:
      'The group combines consumer distribution, industrial ventures, agriculture, hospitality, and export-focused businesses—creating multiple pathways for growth and collaboration.',
  },
  {
    title: 'Market Understanding Built in Ethiopia',
    description:
      'The business has been shaped by real local demand, especially in underserved and high-growth markets, giving partners an operator with practical commercial insight.',
  },
  {
    title: 'Long-Term Investment Mindset',
    description:
      'From land acquisition and real estate to hospitality and mining, our founder has consistently built ventures designed for durability rather than short-term wins.',
  },
  {
    title: 'Execution Across Multiple Sectors',
    description:
      'Ker & Co. has demonstrated the ability to launch, scale, and sustain businesses across very different industries while maintaining a clear entrepreneurial direction.',
  },
  {
    title: 'Growth in Local and Global Trade',
    description:
      'The group’s coffee, meat, crop, and industrial ventures create a strong platform for new supplier, buyer, and investor relationships.',
  },
] as const

export const leadershipGroups = [
  {
    title: 'Executive Leadership',
    members: [
      {
        name: 'Our Founder',
        role: 'Founder & Group Chairwoman',
        bio: 'Provides the long-term vision behind Ker & Co. Business Group and leads diversification across trade, hospitality, real estate, mining, agriculture, and export ventures.',
      },
      {
        name: 'Group Strategy Office',
        role: 'Corporate Strategy & Growth',
        bio: 'Supports portfolio alignment, partnership development, and long-range growth planning across the group’s business lines.',
      },
      {
        name: 'Executive Operations Office',
        role: 'Group Operations Coordination',
        bio: 'Aligns execution across trading, hospitality, real estate, agriculture, and industrial ventures with a focus on operational discipline.',
      },
    ],
  },
  {
    title: 'Commercial & Distribution Leadership',
    members: [
      {
        name: 'Distribution Leadership Team',
        role: 'FMCG & Rural Market Distribution',
        bio: 'Oversees everyday goods distribution models and supports reliable access to essential products across broad customer segments.',
      },
      {
        name: 'Paper Products Leadership',
        role: 'Paper & Sanitary Products Operations',
        bio: 'Guides wholesale, retail, stock planning, and product movement across one of the group’s foundational business lines.',
      },
      {
        name: 'Business Development Office',
        role: 'Partnerships & Market Expansion',
        bio: 'Builds commercial relationships and evaluates new opportunities across domestic and international markets.',
      },
    ],
  },
  {
    title: 'Venture Leadership',
    members: [
      {
        name: 'Hospitality & Wellness Team',
        role: 'Ker Fitness & Hotel Operations',
        bio: 'Leads customer experience, service standards, wellness programs, and hospitality growth initiatives.',
      },
      {
        name: 'Real Estate Development Team',
        role: 'Project Delivery & Asset Development',
        bio: 'Supports planning, execution, and long-term value management across premium residential developments.',
      },
      {
        name: 'Minch Mining PLC Team',
        role: 'Mining & Industrial Supply Operations',
        bio: 'Coordinates field execution, industrial supply planning, and responsible growth for the mining portfolio.',
      },
      {
        name: 'Green Farm PLC Team',
        role: 'Agriculture & Produce Sourcing',
        bio: 'Manages cultivation, farmer relationships, sourcing quality, and export-readiness for agricultural products.',
      },
    ],
  },
  {
    title: 'Export & Corporate Services',
    members: [
      {
        name: 'Coffee & Meat Export Team',
        role: 'International Trade Expansion',
        bio: 'Develops export channels, buyer relationships, and cross-border trade opportunities for premium Ethiopian products.',
      },
      {
        name: 'Finance & Governance Office',
        role: 'Stewardship & Oversight',
        bio: 'Supports disciplined decision-making, portfolio visibility, and sustainable growth across the group.',
      },
      {
        name: 'Brand & Communications Office',
        role: 'Reputation & Market Presence',
        bio: 'Shapes how Ker & Co. Business Group presents its story, values, and ventures to customers, investors, and partners.',
      },
    ],
  },
] as const

export const eventHighlights = [
  {
    title: 'Founder & Business Legacy Showcases',
    description: 'Events and presentations that share the journey of our founder and the evolution of Ker & Co. Business Group across multiple sectors.',
  },
  {
    title: 'Hospitality & Wellness Engagements',
    description: 'Brand activities tied to Ker Fitness and hospitality ventures, focused on service excellence, experience, and customer trust.',
  },
  {
    title: 'Agribusiness & Export Meetings',
    description: 'Commercial engagements that support crop sourcing, coffee and meat export growth, and relationship building with international buyers.',
  },
  {
    title: 'Industrial & Venture Strategy Sessions',
    description: 'Internal and external meetings that support portfolio coordination across mining, real estate, and commercial expansion.',
  },
] as const

export const operationSchedules = [
  {
    id: 1,
    activity: 'Commercial Distribution & Trading',
    area: 'Distribution',
    schedule: ['Monday – Sunday', '8:00 AM – 6:00 PM (Ethiopian Local Time)'],
  },
  {
    id: 2,
    activity: 'Hospitality & Wellness Operations',
    area: 'Hospitality & Wellness',
    schedule: ['Monday – Sunday', '8:00 AM – 6:00 PM (Ethiopian Local Time)'],
  },
  {
    id: 3,
    activity: 'Agriculture, Export & Business Development',
    area: 'Export Ventures',
    schedule: ['Monday – Friday', '8:00 AM – 6:00 PM (Ethiopian Local Time)'],
  },
  {
    id: 4,
    activity: 'Partnership & Investment Meetings',
    area: 'Corporate Engagements',
    schedule: ['Monday – Friday', 'By appointment (Ethiopian Local Time)'],
  },
] as const

export const projectProfiles = [
  {
    id: 'minch-field',
    title: 'Minch Mining PLC Field Development',
    subtitle: 'Industrial Resource Operations',
    description: 'Field development and structured site activity that support Ker & Co.’s industrial growth ambitions through Minch Mining PLC.',
    href: '/projects/okote/',
    image: '/Photoes and Videoes for Documentary/OKOTE Photoe and Video for Documenetary/PHOTOES/EXPLORATION_FIELD/Sunrise at Hallo from OKOTE_Ebicha.jpeg',
  },
  {
    id: 'industrial-operations',
    title: 'Industrial Materials & Site Operations',
    subtitle: 'Operational Capability',
    description: 'Heavy equipment, logistics, and site coordination that demonstrate execution capacity across industrial and infrastructure-linked ventures.',
    href: '/projects/aleltu/',
    image: '/Photoes and Videoes for Documentary/ALELTU Photes and Videoes for Documentary/PHOTOES/Crushed aggregate products.jpeg',
  },
] as const

export const investorHighlights = [
  {
    title: 'Founder-Led Diversification',
    description: 'A business group grown through entrepreneurial execution across consumer distribution, hospitality, real estate, mining, agriculture, and export.',
  },
  {
    title: 'Long-Term Asset Creation',
    description: 'A growth story built around operating businesses, strategic land investment, premium developments, and new sector expansion.',
  },
  {
    title: 'Partnership & Expansion Focus',
    description: 'An investor-facing platform open to strategic relationships that strengthen trade, industrial activity, and export performance.',
  },
] as const

// "What Our Customers Think" — customer & partner testimonials shown on the home page.
export const testimonials = [
  {
    quote:
      'Working with Ker & Co. has been seamless from day one. Their distribution reach across Ethiopia is unmatched, and deliveries always arrive exactly when promised.',
    name: 'Selamawit Bekele',
    role: 'Retail Partner, Addis Ababa',
    rating: 5,
  },
  {
    quote:
      'The Grand Palace Suites stay was world-class. Every detail, from the service to the rooms, reflected a level of care you rarely find. We will absolutely return.',
    name: 'James Okoro',
    role: 'Guest, Grand Palace Suites Hotel',
    rating: 5,
  },
  {
    quote:
      'We have sourced premium coffee through their export team for two seasons now. Quality is consistent, communication is clear, and they truly understand global trade.',
    name: 'Marco Bianchi',
    role: 'International Coffee Buyer, Italy',
    rating: 5,
  },
  {
    quote:
      'A genuinely reliable partner. Their paper and sanitary product supply kept our shelves stocked through difficult periods when others could not deliver.',
    name: 'Hanna Girma',
    role: 'Wholesale Distributor, Mercato',
    rating: 5,
  },
  {
    quote:
      'Ker Fitness changed the way our team approaches wellness. Modern equipment, professional staff, and a welcoming space for the whole family.',
    name: 'Daniel Tesfaye',
    role: 'Member, Ker Fitness',
    rating: 5,
  },
  {
    quote:
      'Professional, transparent, and forward-thinking. Partnering with Ker & Co. gave us confidence that long-term value always comes first.',
    name: 'Aisha Mohammed',
    role: 'Strategic Partner',
    rating: 5,
  },
] as const
