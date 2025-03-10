import { useState } from 'react'
import {useNavigate} from 'react-router'
import './login.css';


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:5000/index/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json()
      if(data.error === true) return console.error(data) 
      
      const userResponse = await fetch("http://127.0.0.1:5000/index/protect", {
        method: "GET",
        headers: { "Authorization": `Bearer ${data.info}`},
      });

      const userData = await userResponse.json();
      if (data.error) return console.error(userData);
      localStorage.setItem('TOKEN', data.info)

      if (userData.info.rol === "admin") {
        setTimeout(()=>{
          navigate('/index')
        }, 5000)
        navigate("/loader");
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='w-75 h-75 d-flex shadow rounded'>
          <div className='w-50 bg-info d-flex justify-content-center align-items-center rounded'>
            <p className='display-3'>Farmazul</p>
          </div>
          <div className='w-50 d-flex align-items-center justify-content-center'>
            <form className='w-75' onSubmit={handleLogin}>
              <p className='text-center display-6 mb-3'>Log in</p>
              <div className='m-auto w-75 mb-4'>
                <label className='d-block mb-2' htmlFor="">Usuario</label>
                <input className='w-100 form-control' placeholder='user@gmail.com' type="text" onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className='m-auto w-75 mb-5'>
                <label className='d-block mb-2' htmlFor="">Contraseña</label>
                <input className='w-100 form-control' type="password" placeholder='Ingrese su contraseña' onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div className='m-auto w-75 mt-2'>
                <button className='btn btn-primary w-75 d-block m-auto mt-5' type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </>
  );
}

export default Login
