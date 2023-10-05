import React from 'react'
import { useState } from 'react';
import FileUpload from '../file-upload/file-upload';
import './register-form.scss'
import ThemeDropdown from '../theme-selector/theme-selector';

const RegisterForm = () => {
  const options = [
    { label: 'Light', value: 'light', icon: 'fa-sun' },
    { label: 'Dark', value: 'dark', icon: 'fa-moon' },
    { label: 'Forest', value: 'forest', icon: 'fa-tree' },
    { label: 'Ocean', value: 'ocean', icon: 'fa-umbrella-beach' },
    // Add more options as needed
  ];
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    theme: 'light',
    profilePicture: null
  });

  const updateFormData = (updatedData) => {
    setFormData({ ...formData, ...updatedData });
  };


  function handleInputChange(event){
    console.log(event.target);
    const {value} = event.target
    console.log(value);
    const username = event.target.name;
    setFormData({
      ...formData, [username] : value
    })
  }

  const handleRegistration = async (event) => {
    event.preventDefault();
    console.log(formData.username);

    console.log(formData.theme);
  
    console.log(formData.profilePicture)
    const formSubmitData = new FormData();
    console.log(formSubmitData);
    formSubmitData.append('username', formData.username);
    formSubmitData.append('email', formData.email);
    formSubmitData.append('password', formData.password);
    formSubmitData.append('gender', formData.gender);
    formSubmitData.append('theme', formData.theme);
    formSubmitData.append('profilePicture', formData.profilePicture); // Append file
    console.log(formSubmitData.get('username'));
    console.log([...formSubmitData]);
    const response = await fetch('https://blooming-hamlet-00342-f9cae0f8671e.herokuapp.com/api/submit-form', {
      method: 'POST',
      body: formSubmitData, // Use FormData
    });

    console.log('FormData:', formSubmitData);

  
    if (response.ok) {
      window.location.href = `/profile/${formData.username}`;
    } else {
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <div>
      <form  onSubmit={handleRegistration} encType="multipart/form-data">
        <div className='register-form'>
        <h3 className='header'>Sign Up</h3>
        <div className='auth-form-text-container register-container'>
        <input placeholder='Enter your username...' type="text" name="username" className='auth-form-text' value={formData.username} onChange={handleInputChange}  />
        <i class="form-icons fa-solid fa-user"></i>
        </div>
        <div className='auth-form-text-container register-container'>
        <input placeholder='Enter your email...' type="email" name="email" className='auth-form-text' value={formData.email} onChange={handleInputChange}  />
        <i class="form-icons fa-solid fa-at"></i>

        </div>
        <div className='auth-form-text-container register-container'>
        <input placeholder='Enter your password...' type="password" name="password" className='auth-form-text' value={formData.password} onChange={handleInputChange}  />
        <i class="form-icons fa-solid fa-lock"></i>
        </div>

        <div className='theme-and-file-container register-container'>

        <FileUpload formData={formData} updateFormData={updateFormData}></FileUpload>
        </div>

        <div className='btn-container'>
        <button className='btn' type="submit">Register</button>

        </div>

        </div>
      </form>
    </div>
  )
}

export default RegisterForm