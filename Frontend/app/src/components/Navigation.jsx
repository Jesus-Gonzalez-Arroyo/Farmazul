import {useState, useEffect} from 'react'

export function Navigation(props) {
  const [UserInfo, setUserInfo] = useState({})

  useEffect(()=>{
    const InfoUserGet = async () => {
      const token = localStorage.getItem('TOKEN')
      const userResponse = await fetch("http://127.0.0.1:5000/index/protect", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
      });
  
      const userData = await userResponse.json();
      if (userData.error) return console.error(userData.info);
      setUserInfo(userData.info)
    }

    InfoUserGet()
  }, [])

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ height: "70px", background: "#D6C0B3" }}
      >
        <div className="px-5">
          <p className="m-0">Farmazul</p>
        </div>
        <div className="d-flex gap-4 px-4">
          <p className="m-0">Hola, {UserInfo.name}</p>
          <p className="m-0">Cerrar sesion</p>
        </div>
      </div>
      <div className="d-block">
        <div className="d-flex">
          <div style={{ width: "15%", height: "calc(100vh - 70px)" }}>
            <ul style={{ listStyleType: "none" }} className="p-0 pt-5">
              <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                <p className="mx-5 m-0">Inicio</p>
              </li>
              <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                <p className="mx-5 m-0">Ventas</p>
              </li>
              <li className="py-3" /* style={{background: '#E4E0E1'}} */ /* style={{display: UserInfo.rol === 'admin' ? 'none': 'block'}} */>
                <p className="mx-5 m-0">Inventario</p>
              </li>
              <li className="py-3" /* style={{background: '#E4E0E1'}} */>
                <p className="mx-5 m-0">Gastos</p>
              </li>
            </ul>
          </div>
          <div
            className="px-4 py-2"
            style={{ background: "#E4E0E1", width: "calc(100% - 15%)" }}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
