import type { Testimonial, TeamMember, TimelineEvent } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ali Raza',
    role: 'Architect, Karachi',
    content:
      'NovaTech helped me build a reliable home studio setup in record time. The laptop and audio gear arrived quickly, and the after-sales support felt genuinely local and helpful.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    id: 't2',
    name: 'Ayesha Malik',
    role: 'Small Business Owner, Lahore',
    content:
      'I upgraded my shop systems with NovaTech monitors and a workstation package. Everything feels premium, efficient, and worth every rupee.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    id: 't3',
    name: 'Hamza Siddiqui',
    role: 'Content Creator, Islamabad',
    content:
      'As a creator, I need gear that works under pressure. NovaCam and NovaSound have been flawless, and the delivery experience was smooth from start to finish.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    id: 't4',
    name: 'Fatima Noor',
    role: 'Gaming Enthusiast, Rawalpindi',
    content:
      'The NovaStrike setup gave me the edge I wanted for competitive play. Great performance, durable build, and excellent support.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?img=15',
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Ali Khan',
    role: 'CEO & Co-Founder',
    bio: 'Former product engineer with a passion for making premium technology more accessible in Pakistan.',
    image: 'https://i.pravatar.cc/300?img=45',
  },
  {
    id: 'tm2',
    name: 'Ayesha Ahmed',
    role: 'CTO',
    bio: 'Leads our hardware and software integration strategy with a strong focus on reliability and local service.',
    image: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 'tm3',
    name: 'Muhammad Hamza',
    role: 'Head of Design',
    bio: 'Award-winning designer shaping NovaTech products with a strong eye for usability and local needs.',
    image: 'https://i.pravatar.cc/300?img=23',
  },
  {
    id: 'tm4',
    name: 'Hira Malik',
    role: 'VP of Customer Experience',
    bio: 'Dedicated to building service experiences that feel fast, personal, and dependable for every customer.',
    image: 'https://i.pravatar.cc/300?img=53',
  },
]

export const timeline: TimelineEvent[] = [
  {
    year: '2018',
    title: 'NovaTech Founded',
    description:
      'Ali Khan and Ayesha Ahmed launch NovaTech in Lahore with a mission to bring premium electronics closer to Pakistani homes and businesses.',
  },
  {
    year: '2019',
    title: 'First Product Launch',
    description:
      'NovaBook Air makes its debut with strong demand from students, creators, and professionals across the country.',
  },
  {
    year: '2020',
    title: 'Nationwide Expansion',
    description:
      'Opened service hubs in Karachi, Islamabad, and Faisalabad, reaching more than 25,000 customers in the first year.',
  },
  {
    year: '2021',
    title: 'Local Support Network',
    description:
      'Built a nationwide after-sales support team to make setup, warranty, and upgrades easier for customers.',
  },
  {
    year: '2022',
    title: '85K+ Customers',
    description:
      'Crossed the 85,000-customer milestone with one of the highest satisfaction ratings in the segment.',
  },
  {
    year: '2023',
    title: 'Sustainability Pledge',
    description:
      'Committed to responsible packaging and longer-lasting devices that reduce electronic waste.',
  },
  {
    year: '2024',
    title: 'NovaPhone Fold',
    description:
      'Entered the foldable smartphone category with a design tailored to modern Pakistani lifestyles.',
  },
  {
    year: '2025',
    title: 'Growing Community',
    description:
      'NovaTech now serves a growing community of creators, gamers, and professionals across 24 cities.',
  },
]

export const companyValues = [
  {
    icon: 'HiOutlineLightBulb',
    title: 'Innovation First',
    description:
      'We push boundaries and create technology that meets the needs of modern Pakistani households.',
  },
  {
    icon: 'HiOutlineHeart',
    title: 'Customer Obsession',
    description: 'Every decision starts with the customer. Their success is our success.',
  },
  {
    icon: 'HiOutlineGlobeAlt',
    title: 'Sustainability',
    description:
      'Building a better future through responsible packaging and durable, repair-friendly devices.',
  },
  {
    icon: 'HiOutlineUserGroup',
    title: 'Inclusive Design',
    description:
      'Technology should be accessible to everyone, regardless of ability, budget, or background.',
  },
]
