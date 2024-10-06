import React from 'react';
import PageLayout from '../page-layout';
import LoginForm from '../loginform';

import Head from '../head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import SideLayout from '../side-layout';
import useTranslate from '../../hooks/use-translate';
import Header from '../header';

const LoginPage = () => {
  const { t } = useTranslate();
  return (
    <div>
        <PageLayout>
<Header/>
      <Head title={t('title')} >
        <LocaleSelect/>
        </Head>
        <Navigation/>
      <SideLayout/>
      <LoginForm/>
      </PageLayout>
    </div>
  );
};

export default LoginPage;
