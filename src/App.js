import logo from './logo.svg';
import React, {useMemo, createContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify';
import { usePersistState } from './hooks/usePersistState';
import './App.css';

export const AppContext = createContext()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = usePersistState('isLoggedIn', false);
  const [userId, setUserId] = usePersistState('userId', null);
  const appRoutes = useMemo(() => {
    return AppRoutes();
  },[])
  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userId,
      setUserId,
    }} >
      <Layout>
      <ToastContainer />
      <Routes>
          {appRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
