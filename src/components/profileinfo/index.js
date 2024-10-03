import React, { useEffect, useState } from 'react';
import Spinner from '../spinner';

function ProfileInfo() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = //'e9911233f62807e70a6b02329c0c60e6115c8032e2f8cd082ff64ff42d224d9'
    localStorage.getItem('token');

    if (!token) {

      window.location.href = '/login';
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/v1/users?`, {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',


          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          setError(errorResponse.message);

          if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          return;
        }

        const data = await response.json();
        if (data.result && data.result.items && data.result.items.length> 0) {
          setUserData(data.result.items[0]);
}else{
  setError ('нет данных о пользователе')
}
     } catch (err) {
        console.error('Network error:', err);
        setError('Произошла ошибка при подключении к серверу. Попробуйте позже.');
      }
    };

   fetchUserProfile();
 }, []);

 if (error) {
  return <div className='error-message'>{error}</div>;
  }
if(!userData){
  return <div><Spinner/></div>
}


  return (
    <div className='profile-page'>
      <h2>Профиль пользователя</h2>
      <p>Имя: {userData.profile.name}</p>
      <p>Телефон:{userData.profile.phone}</p>
      <p>Email: {userData.email}</p>

    </div>
  );
}

export default ProfileInfo;
