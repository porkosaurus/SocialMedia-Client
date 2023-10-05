import React, { useState } from 'react';
import RegisterForm from '../../components/register-form/register-form';
import LoginForm from '../../components/login-form/login-form';
import './register.scss';

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="form-container">
      <div className="register-headers">
        <h3 className="header">Sign Up</h3>
        <h3 className="header">Log In</h3>
      </div>
      <div  className={`arrow-background`}>
        <div className={`arrow-circle ${isChecked ? 'translate-right' : 'translate-left'}`}>
          <i onClick={handleCheckboxChange} className={`fa-solid fa-arrow-up ${isChecked ? 'rotate-135' : 'rotate-45'}`}></i>
        </div>
      </div>
      <label htmlFor="reg-log"></label>
      <div className="card-container">
        <div className={isChecked ? 'card-full-checked' : 'card-full-unchecked'}>
          <div className="card-front">
            <RegisterForm></RegisterForm>
          </div>
          <div className="card-back">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
