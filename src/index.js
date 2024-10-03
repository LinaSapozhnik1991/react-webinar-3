import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from './store/context';
import { I18nProvider } from './i18n/context';
import App from './app';
import Store from './store';
import { UserProvider } from './store/usercontext';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </UserProvider>
</I18nProvider>
  </StoreContext.Provider>,
);
