import React, { useContext } from 'react';
import { StoreContext } from '../../store/context';

function LogoutButton() {
  const store = useContext(StoreContext);

  const handleLogout = (e) => {
e.preventDefault(),
    localStorage.removeItem('token');


    if (store.actions.user && typeof store.actions.user.clearUser === 'function') {
      store.actions.user.clearUser();
    }


    window.location.href = '/login';
  };

  return <div className='login-button'><button onClick={handleLogout}>Выход</button></div>
}

export default LogoutButton;
