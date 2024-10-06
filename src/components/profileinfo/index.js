import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../store/usercontext';
import './style.css'
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/v1/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //'X-Token': user.token,
'X-Token': 'de9911233f62807e70a6b02329c0c60e6115c8032e2f8cd082ff64ff42d224d9',
//'X-Token': localStorage.getItem('token'),
          },
        });

        if (response.ok) {
          const data = await response.json();

          setProfileData(data.result.items[0]);
        } else {
          setErrorMessage('Такой пользователь не найден.');
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Ошибка при получении данных профиля.');
      }

    };

    fetchProfile();
  }, [user, navigate]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!profileData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={'profile'}>
      <h1>Профиль </h1>
      <p>Имя:<span>{profileData.profile.name}</span></p>

      <p>Телефон:<span>{profileData.profile.phone}</span></p>
      <p>email:<span>{profileData.email}</span></p>

    </div>
  );
};

export default ProfileInfo;
