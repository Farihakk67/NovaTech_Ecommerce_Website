import type { Testimonial, TeamMember, TimelineEvent } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    role: 'Product Designer, Stripe',
    content:
      'NovaTech has become my go-to for all things tech. The quality is unmatched, and their customer service feels genuinely personal. I upgraded my entire home office with NovaTech gear.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 't2',
    name: 'David Okonkwo',
    role: 'Software Engineer, Google',
    content:
      'The NovaBook Pro 16 changed how I work. Battery life is incredible, the display is gorgeous, and it handles everything I throw at it — from IDE to 4K video editing.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 't3',
    name: 'Emily Rodriguez',
    role: 'Content Creator',
    content:
      'As a creator, I need reliable gear. NovaCam and NovaSound have exceeded every expectation. The attention to detail in both hardware and the shopping experience is remarkable.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    id: 't4',
    name: 'James Park',
    role: 'Esports Athlete',
    content:
      'NovaStrike gaming gear gives me the competitive edge I need. Zero latency, perfect ergonomics, and build quality that survives tournament travel.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?img=15',
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Elena Vasquez',
    role: 'CEO & Co-Founder',
    bio: 'Former Tesla engineer with a vision to democratize premium technology.',
    image: 'https://i.pravatar.cc/300?img=45',
  },
  {
    id: 'tm2',
    name: 'Marcus Chen',
    role: 'CTO',
    bio: 'Led chip design at Intel before co-founding NovaTech to build better silicon.',
    image: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 'tm3',
    name: 'Aisha Patel',
    role: 'Head of Design',
    bio: "Award-winning industrial designer shaping NovaTech's iconic aesthetic.",
    image: 'https://i.pravatar.cc/300?img=23',
  },
  {
    id: 'tm4',
    name: "Ryan O'Brien",
    role: 'VP of Engineering',
    bio: '20 years in consumer electronics, obsessed with quality and sustainability.',
    image: 'https://i.pravatar.cc/300?img=53',
  },
]

export const timeline: TimelineEvent[] = [
  {
    year: '2018',
    title: 'NovaTech Founded',
    description:
      'Elena Vasquez and Marcus Chen launch NovaTech in a San Francisco garage with a mission to build technology that inspires.',
  },
  {
    year: '2019',
    title: 'First Product Launch',
    description:
      'NovaBook Air debuts to critical acclaim, winning "Best Laptop" at CES Innovation Awards.',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description:
      'Opened offices in London, Tokyo, and Singapore. Reached 500,000 customers worldwide.',
  },
  {
    year: '2021',
    title: 'NovaCore Chip Unveiled',
    description:
      'Revolutionary custom silicon delivers desktop performance in mobile form factors.',
  },
  {
    year: '2022',
    title: '1 Million Customers',
    description: 'Crossed the million-customer milestone with 99% satisfaction rating.',
  },
  {
    year: '2023',
    title: 'Sustainability Pledge',
    description: 'Committed to carbon-neutral operations and 100% recyclable packaging by 2025.',
  },
  {
    year: '2024',
    title: 'NovaPhone Fold',
    description: "Entered the smartphone market with the industry's most refined foldable device.",
  },
  {
    year: '2025',
    title: '2M+ Community',
    description: 'NovaTech community surpasses 2 million members across 150 countries.',
  },
]

export const companyValues = [
  {
    icon: 'HiOutlineLightBulb',
    title: 'Innovation First',
    description: 'We push boundaries and challenge conventions to create technology that matters.',
  },
  {
    icon: 'HiOutlineHeart',
    title: 'Customer Obsession',
    description: 'Every decision starts with the customer. Their success is our success.',
  },
  {
    icon: 'HiOutlineGlobeAlt',
    title: 'Sustainability',
    description: 'Building a better future through responsible manufacturing and circular design.',
  },
  {
    icon: 'HiOutlineUserGroup',
    title: 'Inclusive Design',
    description:
      'Technology should be accessible to everyone, regardless of ability or background.',
  },
]
