import React from 'react'
import { useEffect, useState } from 'react';
import defaultImage from '../../images/download.png'
import './create-post.scss'

const CreatePost = () => {
    const username = localStorage.getItem('socialMedia.username')

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [userData, setUserData] = useState(null);
    const [fileName, setFileName] = useState('No file chosen...');
    const [imagePreview, setImagePreview] = useState(defaultImage);


    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
      };

      
  
      useEffect(() => {
        // Make an API request to retrieve user data
        fetch(`https://blooming-hamlet-00342-f9cae0f8671e.herokuapp.com/api/user/${username}`)
          .then(response => response.json())
          .then(data => setUserData(data))
          .catch(error => console.error('Error fetching user data:', error));
      }, [username]);


      const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    
        // Create a URL for the selected image and set it as the preview background
        const imageURL = URL.createObjectURL(selectedImage);
        setImagePreview(imageURL);
    
        // Update the file name to display in the UI
        setFileName(selectedImage.name);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!image) {
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append('imageUpload', image);
          formData.append('caption', caption);
          formData.append('username', username)
          // Send the image to the backend
          const response = await fetch('https://blooming-hamlet-00342-f9cae0f8671e.herokuapp.com/api/create-post', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log('Post created:', responseData.message);
            console.log('Image URL:', responseData.imageUrl); // Cloudinary image URL
            window.location.href = `/profile/${username}`
          } else {
            console.error('Error creating post:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating post:', error);
        }
      };
  return (
    <div className='post-page-container'>
      <div className='post-page'>
      <h1 className='post-header'>Upload Your Image</h1>
      <div className='label-and-input'>
      <input
      className='caption-text'
        type="text"
        name="caption"
        placeholder="What's on your mind?"
        value={caption}
        onChange={handleCaptionChange}
      />
    </div>
        <div className='image-preview-container'>
        <div className="image-preview" style={{ backgroundImage: `url(${imagePreview})` }}></div>

    </div>
    <form className="create-post-container" encType='multipart/form-data' onSubmit={handleSubmit}>
    <div className='file-upload-flex-container'>
    <div className='file-upload-container'>
    <div className="file-upload">
    <div className='label-and-input'>
    <label className='form-label' htmlFor="profilePicture"></label>
    <div className="file-select">
      <div className="file-select-button" id="fileName">
        Choose File
      </div>
      <div className="file-select-name" id="noFile">
        {fileName}
      </div>
      <input
        type="file"
        name="profilePicture"
        id="profilePicture"
        onChange={handleImageChange}
      />
    </div>
    </div>
  </div>

       </div>
    </div>
  <div className='post-button-container'>
  <button className='profile-button post-create-button'>Create A New Post</button>

  </div>
  </form> 
      </div>
    </div>
 )
}

export default CreatePost