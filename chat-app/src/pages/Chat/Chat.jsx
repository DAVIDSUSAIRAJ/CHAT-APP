import React, { useState } from 'react';
import './Chat.css';

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSidebar from '../../components/RightSidebar/RightSidebar';

const Chat = () => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowLeftSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    if (isMobile) {
      setShowLeftSidebar(false);
    }
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
    if (isMobile) {
      setShowLeftSidebar(false);
    }
  };

  const handleBackToFriends = () => {
    if (isMobile) {
      setShowLeftSidebar(true);
      setShowRightSidebar(false);
      setSelectedFriend(null);
    }
  };

  return (
    <div className='chat'>
      <div className={`chat-container ${showLeftSidebar ? 'show-left-sidebar' : ''} ${showRightSidebar ? 'show-right-sidebar' : ''}`}>
        <div className={`${showLeftSidebar ? 'active' : ''}`}>
          <LeftSidebar 
            onClose={() => setShowLeftSidebar(false)}
            onFriendSelect={handleFriendSelect}
          />
        </div>
        <ChatBox 
          onMenuClick={handleBackToFriends}
          onProfileClick={toggleRightSidebar}
          selectedFriend={selectedFriend}
          showBackButton={isMobile}
        />
        <div className={`${showRightSidebar ? 'active' : ''}`}>
          <RightSidebar 
            onClose={() => setShowRightSidebar(false)}
            onBackToFriends={handleBackToFriends}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
