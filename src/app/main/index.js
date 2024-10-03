import { memo, useContext } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import LoginButton from '../../components/loginbutton';
import LogoutButton from '../../components/logoutbutton';

import { useUser } from '../../store/usercontext';
import { useNavigate } from 'react-router-dom';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Вызываем функцию выхода
    navigate('/login'); // Перенаправляем на главную страницу или страницу входа
  };

  console.log('Current user:', user);
  return (
    <PageLayout>

         {user ? (
        <div>
                 <span
            style={{ cursor: 'pointer', backgroundcolor: 'blue' }}
            onClick={() => navigate('/profile')} // Переход на страницу профиля
          >gryhtyh
            {user}
          </span>

          <button onClick={handleLogout}>Выход</button> {/* Кнопка выхода */}
        </div>
      ) : (
        <LoginButton />
      )}


      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
