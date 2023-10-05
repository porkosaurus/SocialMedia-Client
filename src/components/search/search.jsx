import React, { useEffect, useState } from 'react';
import './search.scss'

const SearchContainer = ({ searchValue, onSubmitSearch, onSearch, onSearchButton, filteredUsers, allUsers }) => {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  useEffect(()=>{
    console.log(allUsers)
  }, [filteredUsers])

  
  useEffect(() => {
    // Shuffle the allUsers array
    const shuffledUsers = [...allUsers];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
    }

    // Take the first five users and set them in suggestedUsers
    setSuggestedUsers(shuffledUsers.slice(0, 5));
  }, [allUsers]);
  return (
    <div className="search-container">
      <div className='search-inner'>
        <form onSubmit={onSubmitSearch}>
          <input placeholder='Search for users...' className='search-input' type="text" value={searchValue} onChange={onSearch} />
          <button className='search-button' onClick={onSearchButton}>
            <i className="fa-solid fa-magnifying-glass" onClick={onSearchButton}></i>
          </button>
        </form>
        <div className={`dropdown ${searchValue.length > 0 ? 'show-dropdown' : ''}`}>
        {filteredUsers.map((user) => (
          <div className='dropdown-row' key={user._id}>
            <a className='dropdown-link' href={`/profile/${user.username}`}>{user.username}</a>
          </div>
        ))}
      </div>

      </div>
      <h2 className='suggested-users-header'>Suggested Users</h2>
      <div>
      {suggestedUsers.map((user) => (
        <div className='suggested-users-container'>
        <img className='suggested-users-picture' src={user.profilePictureUrl} alt="" />
        <div className='suggested-users-text-container'>
        <h2 className='suggested-users-name' key={user._id}>{user.username}</h2>
        <p className='suggested-users-text'>Tap to chat...</p>
          </div>        
        </div>
))}
      </div>
    </div>
  );
}

export default SearchContainer;
