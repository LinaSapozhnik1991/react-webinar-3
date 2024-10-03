import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../store/context';

function Header() {
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const user = store.state.user;

  const handleLogout = () => {
    localStorage.removeItem('token');
    store.actions.user.clearUser(); // Очистка состояния пользователя
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/login">Вход</Link>
        {user && (
          <>
            <Link to="/profilepage">{'user.name'}</Link>
            <button onClick={handleLogout}>Выход</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
