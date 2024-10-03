import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useHistory для навигации
import './style.css';

function LoginButton() {
  const navigate = useNavigate();
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className='login-button'>
      <button id='login-button' onClick={handleLoginClick}>Вход</button>
    </div>
  );
}

export default LoginButton;
