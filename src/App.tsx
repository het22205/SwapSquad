import React, { useState } from 'react';
import { User, Search, Plus, Star, Clock, Users, Settings, ArrowLeft } from 'lucide-react';
import ProfileForm from './components/ProfileForm';
import UserProfile from './components/UserProfile';
import BrowseUsers from './components/BrowseUsers';
import SwapRequests from './components/SwapRequests';
import Dashboard from './components/Dashboard';
import { UserProfile as UserProfileType, SwapRequest } from './types';
import { mockUsers } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'browse' | 'requests' | 'edit-profile'>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfileType | null>(null);
  const [users, setUsers] = useState<UserProfileType[]>(mockUsers);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfileType | null>(null);

  const handleCreateProfile = (profile: Omit<UserProfileType, 'id' | 'rating' | 'completedSwaps'>) => {
    const newProfile: UserProfileType = {
      ...profile,
      id: Date.now().toString(),
      rating: 0,
      completedSwaps: 0
    };
    setCurrentUser(newProfile);
    setUsers(prev => [...prev, newProfile]);
    setCurrentView('dashboard');
  };

  const handleUpdateProfile = (updatedProfile: UserProfileType) => {
    setCurrentUser(updatedProfile);
    setUsers(prev => prev.map(user => user.id === updatedProfile.id ? updatedProfile : user));
    setCurrentView('dashboard');
  };

  const handleSwapRequest = (targetUserId: string, offeredSkill: string, requestedSkill: string) => {
    if (!currentUser) return;
    
    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toUserId: targetUserId,
      fromUserName: currentUser.name,
      toUserName: users.find(u => u.id === targetUserId)?.name || '',
      offeredSkill,
      requestedSkill,
      status: 'pending',
      createdAt: new Date()
    };
    
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const handleSwapResponse = (requestId: string, response: 'accepted' | 'rejected') => {
    setSwapRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: response }
          : req
      )
    );
  };

  const handleDeleteRequest = (requestId: string) => {
    setSwapRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleRateUser = (userId: string, rating: number) => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id === userId) {
          const newCompletedSwaps = user.completedSwaps + 1;
          const newRating = ((user.rating * user.completedSwaps) + rating) / newCompletedSwaps;
          return { ...user, rating: newRating, completedSwaps: newCompletedSwaps };
        }
        return user;
      })
    );
  };

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </h1>
            </div>
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('browse')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'browse' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Search className="w-4 h-4 inline mr-1" />
                Browse
              </button>
              <button
                onClick={() => setCurrentView('requests')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'requests' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-1" />
                Requests
              </button>
              <button
                onClick={() => setCurrentView('edit-profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'edit-profile' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-1" />
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    if (!currentUser && currentView !== 'profile') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {renderNavigation()}
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="max-w-md w-full mx-4">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SkillSwap</h2>
                <p className="text-gray-600">Connect with others and exchange skills to grow together</p>
              </div>
              <button
                onClick={() => setCurrentView('profile')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Create Your Profile
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {renderNavigation()}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {currentView === 'profile' && (
            <div>
              {currentUser && (
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </button>
              )}
              <ProfileForm onSubmit={handleCreateProfile} />
            </div>
          )}
          
          {currentView === 'edit-profile' && currentUser && (
            <div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <ProfileForm 
                onSubmit={handleUpdateProfile} 
                initialData={currentUser} 
                isEditing={true}
              />
            </div>
          )}
          
          {currentView === 'dashboard' && currentUser && (
            <Dashboard 
              user={currentUser}
              swapRequests={swapRequests.filter(req => 
                req.fromUserId === currentUser.id || req.toUserId === currentUser.id
              )}
              onViewProfile={(userId) => {
                const user = users.find(u => u.id === userId);
                if (user) {
                  setSelectedUser(user);
                  setCurrentView('profile');
                }
              }}
            />
          )}
          
          {currentView === 'browse' && currentUser && (
            <BrowseUsers 
              users={users.filter(u => u.id !== currentUser.id && u.isPublic)}
              currentUser={currentUser}
              onSwapRequest={handleSwapRequest}
              onViewProfile={(user) => {
                setSelectedUser(user);
                setCurrentView('profile');
              }}
            />
          )}
          
          {currentView === 'requests' && currentUser && (
            <SwapRequests 
              swapRequests={swapRequests}
              currentUserId={currentUser.id}
              onResponse={handleSwapResponse}
              onDelete={handleDeleteRequest}
              onRate={handleRateUser}
              users={users}
            />
          )}
        </main>
        
        {selectedUser && currentView === 'profile' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">User Profile</h2>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setCurrentView('browse');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <UserProfile 
                  user={selectedUser}
                  currentUser={currentUser}
                  onSwapRequest={handleSwapRequest}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderContent();
}

export default App;