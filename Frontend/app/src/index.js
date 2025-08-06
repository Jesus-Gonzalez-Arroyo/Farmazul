import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './utils/protectRoutes/protectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home'
import { Ventas } from './pages/ventas/ventas'
import { Inventary } from './pages/inventary/inventary'
import { Gastos } from './pages/gastos/gastos'
import { Users } from './pages/users/users'
import { Box } from './pages/box/box'
import { Reports } from './pages/reports/reports';
import { Returns } from './pages/returns/returns'
import { VentasRealizadas } from './pages/ventas-realizadas/ventas-realizadas'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/inventario' element={<Inventary />} />
        <Route path='/gastos' element={<Gastos />} />
        <Route path='/users' element={<Users />} />
        <Route path='/ventas-realizadas' element={<VentasRealizadas />} />
        <Route path='/box' element={<Box />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/devoluciones' element={<Returns />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
