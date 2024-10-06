import { memo, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';

import { useUser } from '../../store/usercontext';
import Header from '../../components/header';


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const { t } = useTranslate();
  const { user, logout } = useUser();
  const navigate = useNavigate();
console.log('user',user)
  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <PageLayout>
    <Header />

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
