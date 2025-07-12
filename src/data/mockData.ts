import { UserProfile } from '../types';

export const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Photoshop', 'UI/UX Design', 'Figma'],
    skillsWanted: ['React', 'JavaScript', 'Photography'],
    availability: ['Weekends', 'Evenings'],
    isPublic: true,
    bio: 'Creative designer with 5+ years of experience. Love helping others learn design fundamentals.',
    rating: 4.8,
    completedSwaps: 12
  },
  {
    id: '2',
    name: 'Mike Chen',
    location: 'New York, NY',
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
    skillsWanted: ['Guitar', 'Spanish', 'Cooking'],
    availability: ['Weekends'],
    isPublic: true,
    bio: 'Software engineer passionate about AI and machine learning. Always excited to share knowledge!',
    rating: 4.9,
    completedSwaps: 8
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Austin, TX',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Spanish', 'Photography', 'Adobe Lightroom'],
    skillsWanted: ['Excel', 'Marketing', 'Photoshop'],
    availability: ['Evenings', 'Weekends'],
    isPublic: true,
    bio: 'Professional photographer and native Spanish speaker. Love connecting with people through teaching.',
    rating: 4.7,
    completedSwaps: 15
  },
  {
    id: '4',
    name: 'Alex Thompson',
    location: 'Seattle, WA',
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Guitar', 'Music Production', 'Piano'],
    skillsWanted: ['Web Development', 'Graphic Design', 'Video Editing'],
    availability: ['Weekends', 'Mornings'],
    isPublic: true,
    bio: 'Professional musician and audio engineer. Happy to teach music theory and instrument techniques.',
    rating: 4.6,
    completedSwaps: 10
  },
  {
    id: '5',
    name: 'Lisa Park',
    location: 'Los Angeles, CA',
    profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    skillsOffered: ['Marketing', 'Content Writing', 'Social Media'],
    skillsWanted: ['Yoga', 'Meditation', 'Photography'],
    availability: ['Evenings'],
    isPublic: true,
    bio: 'Digital marketing specialist with expertise in content strategy and social media growth.',
    rating: 4.9,
    completedSwaps: 20
  }
];