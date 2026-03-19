export interface TimelineSectionData {
  year: string
  slug: string
  title: string
  description: string
  /** Image paths under /images/sections/{slug}/ (ordered 1, 2, 3...) */
  images: string[]
}

/** Sections in chronological order: 1988 birth → 2025 stayathomedad */
export const timelineSections: TimelineSectionData[] = [
  {
    year: '1988',
    slug: '1988-birth',
    title: 'Life begins',
    description: "I was born on a hot summer day July 1, 1988. I was supposed to be a Jacob, but my dad mentioned the name Jarek at the hospital, or as my grandmother called me, 'Yah-deck' with her thick Polish accent, and the name stuck. I've been a Jarek ever since.",
    images: ['1.png', '2.png', '3.png'],
  },
  {
    year: '2000',
    slug: '2000-llws',
    title: 'Little League World Series',
    description: `I played in the 2000 Little League World Series on the East team from Goffstown, NH. I was also in the home run derby. It catapulted me into a life of baseball. It was an unforgettable summer with a lot of Nelly's Country Grammar.`,
    images: ['1.jpg', '2.PNG', '3.PNG'],
  },
  {
    year: '2012',
    slug: '2012-woodworking',
    title: 'Woodworking',
    description: `I lived with my grandmother in Vermont the summer after college. I helped her around the house and brought her to visit my grandfather while he was in a nursing home. That's when I first started tinkering in his garage. I'd get driftwood from the Connecticut river, like he did, and created my first pieces of furniture.`,
    images: ['1.JPG', '2.JPG', '3.JPG', '4.JPG'],
  },
  {
    year: '2014',
    slug: '2014-freelance',
    title: 'Freelance',
    description: 'After designing some t-shirts, I got pretty good with Photoshop Elements. I really enjoyed design and always had ideas, especially for mobile apps. I put some mockups and designs together, put them on Elance and started getting gigs. Short term gigs turned into longer ones, and was eventually outsourcing my overflow work to other designers. I even designed a tequila bottle.',
    images: ['1.JPG', '2.PNG', '3.PNG', '4.PNG', '5.JPG'],
  },
  {
    year: '2016',
    slug: '2016-boston',
    title: 'Boston',
    description: `After freelancing, I got a job at Six Red Marbles in Charlestown. I sold my car and rented a room in a town house on the top floor. I couldn't fit my box spring up the spiral stairs so I slept on my mattress on the floor. My future wife moved down and we got a place in Melrose, with a bed that included a box spring.`,
    images: ['1.JPG', '2.JPG', '3.JPG'],
  },
  {
    year: '2018',
    slug: '2018-gitlab',
    title: 'GitLab',
    description: `After just a couple years working in Boston, I got a remote job at GitLab. Thus began a life changing 4 years. I started when we were "just" 300 people and left when we were 1,600. We went public in 2021 while I was there and went to New Orleans for our annual event. I didn't however get to go to Prague or the Carribean because of COVID.`,
    images: ['1.PNG', '2.JPG', '3.JPG', '4.JPG', '5.JPG', '6.JPG'],
  },
  {
    year: '2018',
    slug: '2018-married',
    title: 'Married',
    description: `I ended up marrying said wife, whose the love of my life. She's also the mother I knew she'd be, caring and loving to the nth degree. I proposed in St. Thomas, got married in Pittsburg, NH, and went to Quebec for our honeymoon. Riding ATVs through the muddy wilderness the day before our wedding was a blast.`,
    images: ['1.JPG', '2.JPG', '3.JPG', '4.JPG'],
  },
  {
    year: '2019',
    slug: '2019-crosscountrytrip',
    title: 'Cross-Country Trip',
    description: `A buddy of mine was moving back home from Eugene, OR. I took a flight out and we started across the country the next day. We saw the Badlands in South Dakota, saw some real cowboys in Wyoming, and played golf in Ohio and Montana. All with his two massive dogs in the truck bed.`,
    images: ['1.JPG', '2.JPG', '3.JPG'],
  },
  {
    year: '2019',
    slug: '2019-house',
    title: 'House',
    description: 'We settled down in Bedford, NH and got ourselves a house and a yard to mow. Personally, I love mowing. I also love snowblowing the driveway in winter. Although for some reason, each year that passes, Florida seems more and more appealing in the winter.',
    images: ['1.JPG', '2.JPG', '3.jpg', '4.png'],
  },
  {
    year: '2022',
    slug: '2022-brooks',
    title: 'Brooks',
    description: `Our first child was born in 2022, the year I left GitLab. The timing couldn't have been better. I spent a lot of time with him after Mom went back to work after maternity leave, I'm truly grateful for it.`,
    images: ['1.png', '2.png'],
  },
  {
    year: '2022',
    slug: '2022-lonebirch',
    title: 'Lone Birch',
    description: 'After leaving GitLab, I wanted to start my own business and wanted to start making things with my hands again. I love launching a brand, so I created Lone Birch, where I made home office products out of my garage. Things started taking off after a few months and had a really successful first year.',
    images: ['1.JPG', '2.png', '3.png', '4.png', '5.png', '6.png'],
  },
  {
    year: '2023',
    slug: '2023-distro',
    title: 'Distro',
    description: `I needed to scale production for Lone Birch because I couldn't keep up. I looked at a commercial space, but all I saw were dollar signs. Instead, I found people across the country to help make my products and ship them directly to my customers. I built a Shopify integration and dashboard to pull orders in and route them automatically based on how close they were to the customer. It worked so well I turned it into an on demand manufacturing service, Distro.`,
    images: ['1.png', '2.png', '3.png'],
  },
  {
    year: '2025',
    slug: '2025-nara',
    title: 'Nara',
    description: `We welcomed the newest member of our team in 2025, Nara, named after the city in Japan. In the hospital room I couldn't believe my eyes when I looked at the rolling bassinet, whose brand name was "Nara". It was meant to be. I'm really grateful to have a boy and a girl.`,
    images: ['1.png', '2.png', '3.png'],
  },
  {
    year: '2025-',
    slug: '2025-stayathomedad',
    title: 'Stay-at-Home Dad',
    description: `Since Nara was born, I decided to stop working on Lone Birch and Distro to focus everything on helping raise the kids. It's not always easy, but I know I'll never get this time back, so to be able to spend this much time with them, this early in their life, is a blessing.`,
    images: ['1.png', '2.png', '3.png'],
  },
]

export function getSectionImagePaths(section: TimelineSectionData): string[] {
  const base = `/images/sections/${section.slug}`
  return section.images.map((file) => `${base}/${file}`)
}
