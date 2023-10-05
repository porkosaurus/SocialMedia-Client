import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utilities/authContext';
import './login-form.scss'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // Handle login error here
        console.error('Login failed');
        return;
      }

      const userResponse = await fetch(`http://localhost:8000/api/user/${formData.username}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!userResponse.ok) {
        // Handle user fetch error here
        console.error('Failed to fetch user data');
        return;
      }

      const userData = await userResponse.json();
      ctx.setIsAuthenticated(true);
      ctx.setUser(userData);
      const userJSON = JSON.stringify(userData);
      localStorage.setItem('socialMedia.isAuthenticated', 'true');
      localStorage.setItem('socialMedia.gender', userData.gender);
      localStorage.setItem('socialMedia.username', userData.username);
      localStorage.setItem('socialMedia.theme', userData.theme);
      localStorage.setItem('socialMedia.userData', userJSON);
      navigate(`/profile/${formData.username}`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('socialMedia.isAuthenticated');
    if (storedIsAuthenticated === 'true') {
      ctx.setIsAuthenticated(true);
      const storedUserData = JSON.parse(localStorage.getItem('socialMedia.userData'));
      ctx.setUser(storedUserData);
    }
  }, []);

  return (
    <div className='login-form-full-container'>
      {ctx.isAuthenticated === true ? (
        navigate(`/profile/${ctx.user.username}`)
      ) : (
        <form className='login-form-container' onSubmit={handleSubmit}>
          <h3 className='header'>Log In</h3>
        <div className='auth-form-text-container register-container'>
        <input placeholder='Enter your username...' type="text" name="username" className='auth-form-text' value={formData.username} onChange={handleInputChange}  />
        <i class="form-icons fa-solid fa-user"></i>
        </div>
        <div className='auth-form-text-container register-container'>
        <input placeholder='Enter your password...' type="password" name="password" className='auth-form-text' value={formData.password} onChange={handleInputChange}  />
        <i class="form-icons fa-solid fa-lock"></i>
        </div>
          <button className='btn login-btn' type="submit">Log In</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
