import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navbar/navbar';
import SearchContainer from '../../components/search/search';
import FeedContainer from '../../components/feed-post/feed-post';
import './feed.scss';

const Feed = () => {
  const [userData, setUserData] = useState([]);
  const username = localStorage.getItem("socialMedia.username");
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  async function fetchUserData(userId) {
    try {
      const response = await fetch(`http://localhost:8000/api/userId/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data by ID:', error);
      return null; // Handle the error as needed
    }
  }

  async function fetchPostsForUser(userId) {
    try {
      const response = await fetch(`http://localhost:8000/posts/${userId}`);
      const data = await response.json();
      return data; // Return the fetched posts
    } catch (error) {
      console.error('Error fetching posts for user:', error);
      return []; // Return an empty array on error
    }
  }
  
  

  // Fetch list of user names from the server
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(userList => {
        setAllUsers(userList); // Here is the list of users with names
      })
      .catch(error => console.error('Error fetching user list:', error));
  }, [username]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const onSearchButton = () => {
    // Fetch stuff
    console.log('search', searchValue);
  }

  const onSubmitSearch = (e) => {
    e.preventDefault();
    console.log('submit', searchValue);
  }

  function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  // Find current user
  useEffect(() => {
    // Make an API request to retrieve user data
    fetch(`http://localhost:8000/api/user/${username}`)
      .then(response => response.json())
      .then(data => setCurrentUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [username]);

  useEffect(() => {
    if (currentUser && currentUser.following) {
      const fetchPostsAndUserData = async () => {
        const postsArray = await Promise.all(
          currentUser.following.map(async (followedUser) => {
            const postsResponse = await fetchPostsForUser(followedUser._id);
            // Remove the first post from the array
            postsResponse.shift();
  
            // Fetch user data for each post
            const postsWithUserData = await Promise.all(
              postsResponse.map(async (post) => {
                const user = await fetchUserData(post.user);
                return { ...post, user };
              })
            );
  
            return postsWithUserData;
          })
        );
  
        // Merge the fetched posts with existing posts in allPosts
        const updatedAllPosts = [...allPosts, ...postsArray.flat()];
  
        setAllPosts(updatedAllPosts);
      };
  
      fetchPostsAndUserData();
    }
  }, [currentUser, allPosts]);
  
  
  

  useEffect(() => {
    console.log("currentUser", currentUser);
    console.log("userData", userData);
  }, [userData, currentUser]);

  useEffect(() => {
    const filteredResults = allUsers.filter((user) =>
      user.username.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [searchValue, allUsers]);

  return (
<div className='feed-page-container'>
  <div className='search-and-page'>
    <div className="search-full-container">
      <SearchContainer
        searchValue={searchValue}
        onSubmitSearch={onSubmitSearch}
        onSearch={onSearch}
        onSearchButton={onSearchButton}
        filteredUsers={filteredUsers}
        allUsers={allUsers}
      />
    </div>
    <div className="navbar-and-feed">
      <h1 className='feed-username-header'>{username}'s Feed</h1>
      <div className="feed-grid">
      {allPosts &&
  allPosts.flat().reverse().map((post) => (
    <div className="grid-container">
      <FeedContainer
        post={post}
        userData={userData} 
        formatTime={formatTime}
      />
    </div>
  ))}


        <Navigation></Navigation>
      </div>
    </div>
  </div>
</div>


  );
}

export default Feed;
