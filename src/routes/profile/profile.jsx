import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './profile.scss'
import ThemeDropdown from '../../components/theme-selector/theme-selector';
import FileUpload from '../../components/file-upload/file-upload';
import Navigation from '../../components/navbar/navbar';
const Profile = () => {
    let {username} = useParams();
    console.log(username)
    const isAuthenticated = localStorage.getItem("socialMedia.isAuthenticated")
    const storedUsername = localStorage.getItem("socialMedia.username")
    const adminAccess = isAuthenticated === 'true' && storedUsername === username;

    const [fileName, setFileName] = useState('No file chosen...');
    const [isFollowing, setIsFollowing] = useState(false); // Track follow status
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const options = [
      { label: 'Light', value: 'light', icon: 'fa-sun' },
      { label: 'Dark', value: 'dark', icon: 'fa-moon' },
      { label: 'Forest', value: 'forest', icon: 'fa-tree' },
      { label: 'Ocean', value: 'ocean', icon: 'fa-umbrella-beach' },
      // Add more options as needed
    ];
    
    const [numRows, setNumRows] = useState(1); 
    const [numPosts, setNumPosts] = useState(0)

    useEffect(() => {
      if (userData && userData.posts) {
        const numPosts = userData.posts.length;
        const numRowsCalculated = Math.ceil(numPosts / 3); // Assuming 3 items per row
        setNumRows(numRowsCalculated);
      }
    }, [userData]);

    const dynamicHeight = `${57.5 * numRows}vh`;
    
    const handleCaptionChange = (event) => {
      setCaption(event.target.value);
    };

    useEffect(() => {
      // Make an API request to retrieve user data
      fetch(`http://localhost:8000/api/user/${username}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }, [username]);
    
    const handleFollow = () => {
        fetch(`http://localhost:8000/api/follow/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storedUsername})        })
        .then(response => response.json())
        .then(data => {
          setIsFollowing(true);
          // Handle any other updates or notifications
    
          setUserData(prevData => ({
            ...prevData,
            followers: [...prevData.followers, data.currentUserId] // Assuming data.currentUserId is the current user's ID
          }));
        })
        .catch(error => console.error('Error following user:', error));
        console.log(userData);
      };
    
      const handleUnfollow = () => {
        // Make an API request to unfollow the user
        fetch(`http://localhost:8000/api/unfollow/${username}`, {
          method: 'POST',
          // Include necessary headers or authentication tokens if needed
        })
          .then(response => response.json())
          .then(data => {
            setIsFollowing(false);
            // Handle any other updates or notifications
          })
          .catch(error => console.error('Error unfollowing user:', error));
      };
    
      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!image) {
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append('imageUpload', image);
          formData.append('caption', caption);
          formData.append('username', storedUsername)
          // Send the image to the backend
          const response = await fetch('http://localhost:8000/api/create-post', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Post created:', responseData.message);
            console.log('Image URL:', responseData.imageUrl); // Cloudinary image URL
          } else {
            console.error('Error creating post:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating post:', error);
        }
      };


    console.log(userData)
    return (
      <>
    <div className='profile-page-container'>
      <Navigation></Navigation>
     <a href= {`/feed/${storedUsername}`}> <i class="fa-solid fa-arrow-left"></i></a>
    {userData && (
        <>
          <div className='picture-and-followers-container'>
          <div className='picture-and-followers'>
          <div className='user-profile-picture' style={{ backgroundImage: `url(${userData.profilePictureUrl})` }}></div>
          <div className='user-profile-right-container'>
          <div className='user-profile-header'>
          <h1 className='user-profile-username'>{username}</h1>
          <a href={`/message/${username}`}> <button className='profile-button'>Message</button></a>
          <a href="" onClick={handleFollow}> <button className='profile-button'>Follow</button></a>

          </div>

          <div className='followers-container'>
          <h3 className='followers'>{userData.posts.length} posts</h3>
          <h3 className='followers'>{userData.followers.length} followers</h3>
          <h3 className='following'>{userData.following.length} following</h3>
          </div>
          {isAuthenticated ?
        (
            <>
            </>
        ):(<></>)}
          </div>

          </div>

          </div>
          <div>
          <div className='posts-header-container'>
          <div className='posts-header'>
          <h4 className='gallery-header'><i class="fa-solid fa-table-cells"></i>Posts</h4>

          </div>
          </div>
          <div className='gallery-full-container'style={{ height: dynamicHeight }}>

          <div className="gallery-container">
    {userData &&
      userData.posts.slice().reverse().map(post => (
        <div className='post-container' key={post._id}>
          <div
            className="post-image"
            style={{ backgroundImage: `url(${post.url})` }}
            alt={`Post by ${userData.username}`}
          ></div>
        </div>
      ))}
  </div>
</div>


    </div>
        </>
      )}

    { adminAccess 
    ? 
    (<div>
  <div className='post-button-container'>
    <a href={`/post/${storedUsername}`}>  <button className='profile-button post-button'>Create A New Post</button>
</a>

  </div>

    </div>)
       
    : 
         
    (
    <div>
    </div>
    )
    }
    </div>
      </>
  )
}

export default Profile