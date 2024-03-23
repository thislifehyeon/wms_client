import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IpgoPage from './pages/ipgo';
import StatusPage from './pages/status';
import StatusTable from './pages/status_table';
import ExpChange from './pages/exp_change';
import Location from './pages/location';
import Product_Master from './pages/product_master.js';


import SideBar from './components/SideBar';
import VisitCounter from './components/VisitCounter.js';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <VisitCounter />
      <SideBar />
      <Routes style={{ flex: 1 }}>
        <Route path="/" element={<HomePage />} />
        <Route path="/IpgoPage" element={<IpgoPage />} />
        <Route path="/StatusPage" element={<StatusPage />} />
        <Route path="/Status_Table" element={<StatusTable />} />
        <Route path="/Exp_Change" element={<ExpChange />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/" element={<Product_Master />} />
      </Routes>
      </div>
    </Router>
  );
}



export default App;
