import React from 'react';
import './home.scss';
import background from '../../images/pexels-pixabay-163097.jpg';
import logo from '../../images/logo-white.png'
import Navigation from '../../components/navbar/navbar';
import About from '../../components/about-section/about';

const Home = () => {
  const blueContainerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
  };

  return (
    <div className='home-container' >
      <Navigation></Navigation>
      <div className='section-1' style={blueContainerStyle}>
        <img className='logo' src={logo} alt="" />
        <div className='blue-container'>
        <div className='welcome-container'>
            <h1 className='welcome-header'>Welcome to Social Sphere</h1>
            <div className='welcome-secondary-container'>
            <h3 className='welcome-secondary'>Your Voice, Your Story, Our Platform</h3>
            <button className='welcome-btn'>Register</button>
            </div>
          </div>
          <div className='overlay'></div>
        </div>
        <div className='white-container'></div>
      </div>
      <About></About>
      <div className='section-4'>
        <div className='info-container'>
          <div className='info-item'>
            <h2 className='info-item-header'>Build Your Tribe</h2>
            <p className='info-item-paragraph'>Connect with like-minded individuals and expand your social circle effortlessly. With our follower functionality, you can follow, be followed, and build a thriving community of supporters and enthusiasts who share your passions. Whether you're an influencer looking to engage your followers or simply want to connect with people who inspire you, our platform makes it easy to cultivate meaningful connections.</p>
          </div>
          <div className='info-item'>
              <h2 className='info-item-header'>Stay Connected in Real-Time</h2>
              <p className='info-item-paragraph'>Chat with friends, colleagues, and new acquaintances anytime, anywhere. Our chat functionality keeps you in the loop with real-time messaging. Whether you're sharing ideas, planning events, or simply catching up, our user-friendly chat features ensure your conversations flow seamlessly. Stay connected, exchange messages, and strengthen your connections effortlessly.</p>
          </div>
          <div className='info-item'>

              <h2 className='info-item-header'>Discover and Share</h2>
              <p className='info-item-paragraph'>Dive into the heart of our community with our feed functionality. Here, you can explore a rich tapestry of posts, stories, and updates from your network. Share your experiences, insights, and creativity with the world. Whether it's photos, articles, or videos, our feed is your canvas to inspire, inform, and connect with your audience. Unleash your creativity and watch your ideas come to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
