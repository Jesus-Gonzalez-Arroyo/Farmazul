import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login/login';
import { Navigation } from './components/Navigation';
import { Loader } from './components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/index' element={<Navigation />} />
      <Route path='/loader' element={<Loader />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
