import { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { PersonIcon, SignOutIcon, ThreeBarsIcon, HomeIcon, CreditCardIcon, PackageIcon, GraphIcon, PeopleIcon, ChecklistIcon, ChevronRightIcon } from '@primer/octicons-react'
import { keys, modifyMoney } from '../utils/index'
import { consumServices } from '../contexts/execute'
import { SideBar } from '../components/sideBar/sideBar'

export function Navigation(props) {
  const [UserInfo, setUserInfo] = useState('')
  const [infoBox, setInfoBox] = useState('0')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const menuItems = [
    {
      path: "/home",
      label: "Inicio",
      icon: <HomeIcon size={16} />
    },
    {
      path: "/ventas",
      label: "Ventas",
      icon: <CreditCardIcon size={16} />
    },
    {
      path: "/inventario",
      label: "Inventario",
      icon: <PackageIcon size={16} />,
      visible: (rol) => rol === 'admin'
    },
    {
      path: "/gastos",
      label: "Gastos",
      icon: <GraphIcon size={16} />
    },
    {
      path: "/users",
      label: "Usuarios",
      icon: <PeopleIcon size={16} />
    },
    {
      path: "/ventas-realizadas",
      label: "Ventas realizadas",
      icon: <ChecklistIcon size={16} />
    },
    {
      path: "/box",
      label: "Caja",
      icon: <PeopleIcon size={16} />
    },
    {
      path: '/reports',
      label: "Reportes",
      icon: <GraphIcon size={16} />,
    }
  ];

  useEffect(() => {
    const getBoxInfo = async () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayDashFormat = `${yyyy}-${mm}-${dd}`;
      const infoBox = await consumServices(keys.getDepositsBox)
      
      const valueBox = infoBox.info.filter(item => item.date === todayDashFormat );
      
      setInfoBox(modifyMoney(valueBox[0]?.value || 0))
    }

    getBoxInfo()
    
    const user = localStorage.getItem('infoUser')
    if (user) return setUserInfo(JSON.parse(user))

    const InfoUserGet = async () => {
      const token = localStorage.getItem('TOKEN')
      const userData = await consumServices(keys.getInfoUser, 'GET', { "Authorization": `Bearer ${token}` })
      
      if (userData.error) return console.error(userData.error);
    
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
        <div className="px-4 d-flex gap-3">
          <ThreeBarsIcon onClick={() => setVisible(true)} size={24} />
          <p className="m-0 white">Farmazul</p>
        </div>
        <div className="d-flex gap-4 px-4">
          <div>
            <p className='m-0'>En caja: ${infoBox}</p>
          </div>
          <div className='d-flex align-items-center gap-2'>
            <div>
              <PersonIcon size={24} />
            </div>
            <p className="m-0">Hola, {UserInfo.name}</p>
          </div>
          <p onClick={handleLoguot} style={{ cursor: "pointer" }} className="m-0"><SignOutIcon size={24} /></p>
        </div>
      </div>
      <div className="d-block">
        <div className="d-flex">
          <div
            className="px-4 pt-2 pb-5 overflow-auto"
            style={{ width: "100%", height: "calc(100vh - 70px)" }}
          >
            {props.children}
          </div>
        </div>
      </div>

      <SideBar visible={visible} setVisible={setVisible}>
        <ul style={{ listStyleType: "none" }} className="p-3 text-decoration-none d-flex flex-column gap-2">
          {menuItems
            .filter(item => item.visible ? item.visible(UserInfo.rol) : true)
            .map((item, index) => (
              <a key={index} href={item.path} className='text-decoration-none text-dark'>
                <li className="mb-4 d-flex align-items-center align-content-center justify-content-around">
                  {item.icon}
                  <p className="m-0 h6 w-50">{item.label}</p>
                  <ChevronRightIcon size={16} />
                </li>
              </a>
            ))}
        </ul>
      </SideBar>
    </div>
  );
}
