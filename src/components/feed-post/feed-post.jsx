import React from 'react';
import './feed-post.scss'

const FeedContainer = ({ post, userData, formatTime }) => {

  return (
    <div className='feed-container'>
      <div className='feed-author-container'>
        <div className='author-picture' style={{backgroundImage: `url(${post.user.profilePictureUrl})`}}></div>
        <img className='author-image' src={post.user.profilePictureUrl} alt="" />
        <div className='author-name'><h3>{post.user.username}</h3></div>
      </div>
      <div className='feed-image-container'>
        <div className='feed-image' style={{ backgroundImage: `url(${post.url})` }} alt={`Post by ${userData.username}`} />
      </div>
      <div className='icons-container'>
        <i className="fa-regular fa-heart"></i>
        <i className="fa-regular fa-comment"></i>
      </div>
      <h3 className='feed-caption'>{post.caption}</h3>
      <h3 className='feed-timestamp'>{formatTime(Math.floor((new Date() - new Date(post.timestamp)) / 1000))}</h3>
    </div>
  );
}

export default FeedContainer;
