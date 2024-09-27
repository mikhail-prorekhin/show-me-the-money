import React from 'react';
import MainLayout from 'components/MainLayout/MainLayout';
import 'components/App/App.css';
import {
  Route,
  Routes
} from "react-router-dom";
import PageNotFound from 'components/PageNotFound/PageNotFound';
import BalancePage from 'components/BalancePage/BalancePage';

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<BalancePage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
