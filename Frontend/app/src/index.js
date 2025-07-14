import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home'
import { Ventas } from './pages/ventas/ventas'
import { Inventary } from './pages/inventary/inventary'
import { Gastos } from './pages/gastos/gastos'
import { Users } from './pages/users/users'
import {VentasRealizadas} from './pages/ventas-realizadas/ventas-realizadas'
import { Box } from './pages/box/box'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/ventas' element={<Ventas />} />
      <Route path='/inventario' element={<Inventary />} />
      <Route path='/gastos' element={<Gastos />} />
      <Route path='/users' element={<Users />} />
      <Route path='/ventas-realizadas' element={<VentasRealizadas />} />
      <Route path='/box' element={<Box />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
