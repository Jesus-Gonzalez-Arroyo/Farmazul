import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home'
import { Loader } from './components/Loader';
import { Ventas } from './pages/ventas/ventas'
import { Inventary } from './pages/inventary/inventary'
import { Gastos } from './pages/gastos/gastos'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/loader' element={<Loader />} />
      <Route path='/ventas' element={<Ventas />} />
      <Route path='/inventario' element={<Inventary />} />
      <Route path='/gastos' element={<Gastos />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
