import React, { useState } from 'react';
import './sidebar.scss'

const NavBar = ({ isNavOpen, toggleNav, currentUser }) => {
  const [isHoveredCreatePost, setIsHoveredCreatePost] = useState(false);
  const [isHoveredFeed, setIsHoveredFeed] = useState(false);
  const [isHoveredLogOut, setIsHoveredLogOut] = useState(false);

  const handleMouseEnterCreatePost = () => {
    setIsHoveredCreatePost(true);
  };

  const handleMouseLeaveCreatePost = () => {
    setIsHoveredCreatePost(false);
  };

  const handleMouseEnterFeed = () => {
    setIsHoveredFeed(true);
  };

  const handleMouseLeaveFeed = () => {
    setIsHoveredFeed(false);
  };

  const handleMouseEnterLogOut = () => {
    setIsHoveredLogOut(true);
  };

  const handleMouseLeaveLogOut = () => {
    setIsHoveredLogOut(false);
  };

  return (
    <div className={`nav-bar ${isNavOpen ? 'nav-bar-open' : 'nav-bar-closed'}`}>
      <div className="nav-header">
        <label htmlFor="nav-toggle">
          <span className="nav-toggle-burger" onClick={toggleNav}><i class="fas fa-bars"></i></span>
        </label>
      </div>
      <div className="nav-content">
        <div
          className={`nav-button ${isHoveredCreatePost ? 'hovered' : ''}`}
          onMouseEnter={handleMouseEnterCreatePost}
          onMouseLeave={handleMouseLeaveCreatePost}
        >
          <i className="fas fa-edit"></i>
          <a className='nav-links' href={`/post/${currentUser.username}`}>
          <span className={`nav-span ${isHoveredCreatePost ? 'hovered-text' : ''}`}>Create a Post</span>
          </a>
        </div>
        <div
          className={`nav-button ${isHoveredFeed ? 'hovered' : ''}`}
          onMouseEnter={handleMouseEnterFeed}
          onMouseLeave={handleMouseLeaveFeed}
        >
          <i className="fas fa-newspaper"></i>
          <a className='nav-links' href={`/feed/${currentUser.username}`}>
            <span className={`nav-span ${isHoveredFeed ? 'hovered-text' : ''}`}>Feed</span>
          </a>
        </div>
        <div
          className={`nav-button ${isHoveredLogOut ? 'hovered-text' : ''}`}
          onMouseEnter={handleMouseEnterLogOut}
          onMouseLeave={handleMouseLeaveLogOut}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className={`nav-span ${isHoveredLogOut ? 'hovered-text' : ''}`}>Log Out</span>
        </div>
      </div>
      <div className="nav-end">
      <a className='nav-links' href={`/profile/${currentUser.username}`}>
        <div className='nav-profile'>
        <img className="nav-image" src={currentUser.profilePictureUrl} alt="" />
        <span className='nav-span'>{currentUser.username}</span>
        </div>

      </a>

      </div>
    </div>
  );
};

export default NavBar;



