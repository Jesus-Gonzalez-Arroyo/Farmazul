import {useState, useEffect} from 'react'
import { useNavigate } from "react-router";
import {PersonIcon, SignOutIcon, HomeIcon, CreditCardIcon, PackageIcon, GraphIcon, PeopleIcon, ChecklistIcon, ChevronRightIcon} from '@primer/octicons-react'
import {keys} from '../utils/index'
import {consumServices} from '../contexts/execute'

export function Navigation(props) {
  const [UserInfo, setUserInfo] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const user = localStorage.getItem('infoUser')

    if(user) return setUserInfo(JSON.parse(user))
  
    const InfoUserGet = async () => {
      const token = localStorage.getItem('TOKEN')
      const userData = await consumServices(keys.getInfoUser, 'GET', {"Authorization": `Bearer ${token}`})
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
          <div className='d-flex align-items-center gap-2'>
            <div>
              <PersonIcon size={24}/>
            </div>
            <p className="m-0">Hola, {UserInfo.name}</p>
          </div>
          <p onClick={handleLoguot} style={{ cursor: "pointer" }} className="m-0"><SignOutIcon size={24}/></p>
        </div>
      </div>
      <div className="d-block">
        <div className="d-flex">
          <div style={{ width: "15%", height: "calc(100vh - 70px)", background: "#B5CFD8" }}>
            <ul style={{ listStyleType: "none" }} className="p-3 pt-5 text-decoration-none d-flex flex-column gap-2">
              <a href="/home" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <HomeIcon size={16}></HomeIcon>
                  <p className="m-0 h6 w-50">Inicio</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
              <a href="/ventas" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <CreditCardIcon size={16} />
                  <p className="m-0 h6 w-50">Ventas</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
              <a href="/inventario" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around"/* style={{display: UserInfo.rol === 'admin' ? 'none': 'block'}} */>
                  <PackageIcon size={16}></PackageIcon>
                  <p className="m-0 h6 w-50">Inventario</p>
                  <ChevronRightIcon size={16} />

                </li>
              </a>
              <a href="/gastos" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <GraphIcon size={16}></GraphIcon>
                  <p className="m-0 h6 w-50">Gastos</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
              <a href="/users" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <PeopleIcon size={16}></PeopleIcon>
                  <p className="m-0 h6 w-50">Usuarios</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
              <a href="/ventas-realizadas" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <ChecklistIcon size={16}></ChecklistIcon>
                  <p className="m-0 h6 w-50">Ventas realizadas</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
              <a href="/box" className='text-decoration-none text-dark'>
                <li className="py-3 d-flex align-items-center align-content-center justify-content-around">
                  <PeopleIcon size={16}></PeopleIcon>
                  <p className="m-0 h6 w-50">Caja</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
            </ul>
          </div>
          <div
            className="px-4 pt-2 pb-5 overflow-auto"
            style={{ width: "calc(100% - 15%)", height: "calc(100vh - 70px)" }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
