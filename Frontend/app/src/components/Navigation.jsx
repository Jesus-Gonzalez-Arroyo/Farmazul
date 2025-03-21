import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";

export function Navigation(props) {
  const [UserInfo, setUserInfo] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem('infoUser')

    if(user) {
      return setUserInfo(JSON.parse(user))
    }

    const InfoUserGet = async () => {
      const token = localStorage.getItem('TOKEN')
      const userResponse = await fetch("http://127.0.0.1:5000/index/API/v1/getInfoUser", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
      });
  
      const userData = await userResponse.json();
      if (userData.error) return console.error(userData.info);
      setUserInfo(userData.info)
      localStorage.setItem('infoUser', JSON.stringify(userData.info))
    }

    InfoUserGet()
  }, [])

  function handleLoguot() {
    navigate('/')
    localStorage.clear()
  }

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ height: "70px", background: "#7393A7" }}
      >
        <div className="px-5">
          <p className="m-0 white">Farmazul</p>
        </div>
        <div className="d-flex gap-4 px-4">
          <p className="m-0">Hola, {UserInfo.name}</p>
          <p onClick={handleLoguot} className="m-0">Cerrar sesion</p>
        </div>
      </div>
      <div className="d-block">
        <div className="d-flex">
          <div style={{ width: "15%", height: "calc(100vh - 70px)", background: "#B5CFD8" }}>
            <ul style={{ listStyleType: "none" }} className="p-0 pt-5 text-decoration-none">
              <a href="/home" className='text-decoration-none text-dark'>
                <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                  <p className="mx-5 m-0 h6">Inicio</p>
                  <p style={{fontSize: '13px'}} className='m-0 mx-5 fw-light'>Un resumen de tus secciones</p>
                </li>
              </a>
              <a href="/ventas" className='text-decoration-none text-dark'>
                <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                  <p className="mx-5 m-0 h6">Ventas</p>
                  <p style={{fontSize: '13px'}} className='m-0 mx-5 fw-light'>Realiza y registra tus ventas</p>
                </li>
              </a>
              <a href="/inventario" className='text-decoration-none text-dark'>
                <li className="py-3" /* style={{background: '#E4E0E1'}} */ /* style={{display: UserInfo.rol === 'admin' ? 'none': 'block'}} */>
                  <p className="mx-5 m-0 h6">Inventario</p>
                  <p style={{fontSize: '13px'}} className='m-0 mx-5 fw-light'>Lleva un control de tus productos</p>
                </li>
              </a>
              <a href="/gastos" className='text-decoration-none text-dark'>
                <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                  <p className="mx-5 m-0 h6">Gastos</p>
                  <p style={{fontSize: '13px'}} className='m-0 mx-5 fw-light'>Obten un registro de tus gastos</p>
                </li>
              </a>
              <a href="/users" className='text-decoration-none text-dark'>
                <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                  <p className="mx-5 m-0 h6">Usuarios</p>
                  <p style={{fontSize: '13px'}} className='m-0 mx-5 fw-light'>Registra y vizualiza los usuarios</p>
                </li>
              </a>
            </ul>
          </div>
          <div
            className="px-4 py-2"
            style={{ width: "calc(100% - 15%)", height: "calc(100vh - 70px)" }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
