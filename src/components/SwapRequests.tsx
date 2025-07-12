import React, { useState } from 'react';
import { Clock, Check, X, Trash2, Star, MessageSquare, Calendar } from 'lucide-react';
import { SwapRequest, UserProfile } from '../types';

interface SwapRequestsProps {
  swapRequests: SwapRequest[];
  currentUserId: string;
  onResponse: (requestId: string, response: 'accepted' | 'rejected') => void;
  onDelete: (requestId: string) => void;
  onRate: (userId: string, rating: number) => void;
  users: UserProfile[];
}

const SwapRequests: React.FC<SwapRequestsProps> = ({
  swapRequests,
  currentUserId,
  onResponse,
  onDelete,
  onRate,
  users
}) => {
  const [ratingData, setRatingData] = useState<{ [key: string]: number }>({});
  const [feedbackData, setFeedbackData] = useState<{ [key: string]: string }>({});

  const incoming = swapRequests.filter(req => req.toUserId === currentUserId);
  const outgoing = swapRequests.filter(req => req.fromUserId === currentUserId);
  const completed = swapRequests.filter(req => req.status === 'completed');

  const handleRating = (requestId: string, userId: string) => {
    const rating = ratingData[requestId];
    if (rating) {
      onRate(userId, rating);
      // Mark request as rated
      setRatingData(prev => ({ ...prev, [requestId]: 0 }));
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderRequest = (request: SwapRequest, type: 'incoming' | 'outgoing' | 'completed') => (
    <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">
              {type === 'incoming' ? request.fromUserName : request.toUserName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              request.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800'
                : request.status === 'accepted'
                ? 'bg-green-100 text-green-800'
                : request.status === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {request.status}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-blue-600">Offering:</span>
              <span className="ml-2">{request.offeredSkill}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-purple-600">Requesting:</span>
              <span className="ml-2">{request.requestedSkill}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDate(request.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {type === 'incoming' && request.status === 'pending' && (
            <>
              <button
                onClick={() => onResponse(request.id, 'accepted')}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Accept"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onResponse(request.id, 'rejected')}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          
          {type === 'outgoing' && request.status === 'pending' && (
            <button
              onClick={() => onDelete(request.id)}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              title="Cancel Request"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {request.status === 'accepted' && type !== 'completed' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <div className="flex items-center text-green-700 mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="font-medium">Swap Accepted!</span>
          </div>
          <p className="text-sm text-green-600">
            Connect with {type === 'incoming' ? request.fromUserName : request.toUserName} to coordinate your skill exchange.
          </p>
          
          {type === 'incoming' && (
            <div className="mt-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingData(prev => ({ ...prev, [request.id]: star }))}
                      className={`w-6 h-6 ${
                        star <= (ratingData[request.id] || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full" fill="currentColor" />
                    </button>
                  ))}
                </div>
                
                {ratingData[request.id] > 0 && (
                  <button
                    onClick={() => handleRating(request.id, request.fromUserId)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Submit Rating
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          Swap Requests
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Incoming Requests ({incoming.length})
            </h3>
            <div className="space-y-4">
              {incoming.length > 0 ? (
                incoming.map(request => renderRequest(request, 'incoming'))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No incoming requests</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Sent Requests ({outgoing.length})
            </h3>
            <div className="space-y-4">
              {outgoing.length > 0 ? (
                outgoing.map(request => renderRequest(request, 'outgoing'))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No sent requests</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequests;