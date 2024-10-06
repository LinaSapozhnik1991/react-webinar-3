import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';

import LoginPage from '../components/loginpage';

import ProfilePage from '../components/profilepage';



function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />

        <Route path={"/login"} element={<LoginPage/>} />
        <Route path={'/profilepage'}  element={<ProfilePage/>} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
