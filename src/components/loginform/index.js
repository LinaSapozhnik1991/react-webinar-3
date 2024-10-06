import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useUser } from '../../store/usercontext';
function LoginForm() {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Заполните все поля.');
      return;
    }

    try {
      const response = await fetch('/api/v1/users/sign/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        login(data.result);
        navigate('/');
      } else {
        const error = await response.json();
        setErrorMessage(error.data?.message || 'Пользователь не найден.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className='login-page'>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <label>Логин</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Пароль</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Войти</button>
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
