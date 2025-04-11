import React from 'react';
import './Login.css';
import assets from '../../assets/assets';

const Login = () => {
  return (
    <div className='login'>
      <img src={assets.logo_big} alt="chat icon" className="logo" />
    </div>
  );
};

export default Login;
