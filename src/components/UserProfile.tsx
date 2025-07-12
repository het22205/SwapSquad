import React, { useState } from 'react';
import { Star, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  user: UserProfileType;
  currentUser?: UserProfileType | null;
  onSwapRequest?: (targetUserId: string, offeredSkill: string, requestedSkill: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, currentUser, onSwapRequest }) => {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedWantedSkill, setSelectedWantedSkill] = useState('');
  const [showSwapForm, setShowSwapForm] = useState(false);

  const handleSwapRequest = () => {
    if (selectedOfferedSkill && selectedWantedSkill && onSwapRequest) {
      onSwapRequest(user.id, selectedOfferedSkill, selectedWantedSkill);
      setShowSwapForm(false);
      setSelectedOfferedSkill('');
      setSelectedWantedSkill('');
    }
  };

  const canMakeSwapRequest = currentUser && 
    currentUser.skillsOffered.some(skill => user.skillsWanted.includes(skill)) &&
    user.skillsOffered.some(skill => currentUser.skillsWanted.includes(skill));

  const matchingOfferedSkills = currentUser 
    ? currentUser.skillsOffered.filter(skill => user.skillsWanted.includes(skill))
    : [];

  const matchingWantedSkills = currentUser 
    ? user.skillsOffered.filter(skill => currentUser.skillsWanted.includes(skill))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          
          {user.location && (
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </p>
          )}
          
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{user.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">
              {user.completedSwaps} completed swaps
            </span>
          </div>
        </div>
      </div>

      {user.bio && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">About</h3>
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Skills Offered
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Skills Wanted
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Availability
        </h3>
        <div className="flex flex-wrap gap-2">
          {user.availability.map((time, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {canMakeSwapRequest && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-green-900">Perfect Match!</h3>
            <button
              onClick={() => setShowSwapForm(!showSwapForm)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Request Swap
            </button>
          </div>
          <p className="text-green-700 text-sm">
            You have skills they want, and they have skills you want!
          </p>
          
          {showSwapForm && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I can offer:
                </label>
                <select
                  value={selectedOfferedSkill}
                  onChange={(e) => setSelectedOfferedSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a skill to offer</option>
                  {matchingOfferedSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to learn:
                </label>
                <select
                  value={selectedWantedSkill}
                  onChange={(e) => setSelectedWantedSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a skill to learn</option>
                  {matchingWantedSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleSwapRequest}
                  disabled={!selectedOfferedSkill || !selectedWantedSkill}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowSwapForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;