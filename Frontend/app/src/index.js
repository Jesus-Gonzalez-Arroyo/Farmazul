import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/login/login';
import { Home } from './pages/home/home'
import { Loader } from './components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/loader' element={<Loader />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
