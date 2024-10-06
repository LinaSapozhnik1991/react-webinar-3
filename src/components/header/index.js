import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../store/usercontext';
import './style.css';
function Header() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className={'header'}>
      <nav>
        {user ? (
          <>
            <NavLink to="/profilepage"><span>{user.user.profile.name}</span></NavLink>
            <button onClick={handleLogout}>Выход</button>
          </>
        ) : (
          <button onClick={handleLogin}>Вход</button>
        )}
      </nav>
    </header>
  );
}

export default Header;
