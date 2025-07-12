import React from 'react';
import { User, TrendingUp, Clock, Star, Eye, MessageSquare } from 'lucide-react';
import { UserProfile, SwapRequest } from '../types';

interface DashboardProps {
  user: UserProfile;
  swapRequests: SwapRequest[];
  onViewProfile: (userId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, swapRequests, onViewProfile }) => {
  const pendingRequests = swapRequests.filter(req => req.status === 'pending');
  const acceptedSwaps = swapRequests.filter(req => req.status === 'accepted');
  const incomingRequests = swapRequests.filter(req => req.toUserId === user.id && req.status === 'pending');
  const recentActivity = swapRequests.slice(-3).reverse();

  const stats = [
    {
      title: 'Profile Rating',
      value: user.rating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Completed Swaps',
      value: user.completedSwaps.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pending Requests',
      value: pendingRequests.length.toString(),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Swaps',
      value: acceptedSwaps.length.toString(),
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your skill swaps</p>
          </div>
          <div className="flex items-center space-x-4">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {incomingRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            Action Required - Incoming Requests
          </h2>
          <div className="space-y-3">
            {incomingRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    <span className="text-orange-600">{request.fromUserName}</span> wants to swap
                  </p>
                  <p className="text-sm text-gray-600">
                    Their <span className="font-medium text-blue-600">{request.offeredSkill}</span> for your <span className="font-medium text-purple-600">{request.requestedSkill}</span>
                  </p>
                </div>
                <button
                  onClick={() => onViewProfile(request.fromUserId)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Skills You Offer ({user.skillsOffered.length})
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
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Skills You Want ({user.skillsWanted.length})
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
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.fromUserId === user.id ? 'Sent request to' : 'Received request from'} {' '}
                      {activity.fromUserId === user.id ? activity.toUserName : activity.fromUserName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.offeredSkill} ↔ {activity.requestedSkill}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : activity.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No recent activity</p>
              <p className="text-sm">Start browsing users to make your first swap!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;