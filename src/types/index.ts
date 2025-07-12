export interface UserProfile {
  id: string;
  name: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  bio?: string;
  rating: number;
  completedSwaps: number;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  toUserName: string;
  offeredSkill: string;
  requestedSkill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  rating?: number;
  feedback?: string;
}