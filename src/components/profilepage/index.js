import React from 'react';
import PageLayout from '../page-layout';

import Head from '../head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import SideLayout from '../side-layout';
import useTranslate from '../../hooks/use-translate';
import ProfileInfo from '../profileinfo';
import LogoutButton from '../logoutbutton';

const ProfilePage = () => {
  const { t } = useTranslate();
  return (
    <div>
        <PageLayout>
      <LogoutButton/>
      <Head title={t('title')} >
        <LocaleSelect/>
        </Head>
        <Navigation/>
      <SideLayout/>
      <ProfileInfo/>
      </PageLayout>
    </div>
  );
};

export default ProfilePage;
