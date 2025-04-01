import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css";
import { consumServices, keys } from "../../utils";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    text: "",
    block: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAlert({
      text: "",
      block: false,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault()

    if (formData.email === "" || formData.password === "") return setAlert({text: "Hacen falta campos por llenar", block: true})

    const data = await consumServices(keys.loginUser, 'POST', '', formData)

    if (data.error) return setAlert({text: data.info, block: true})

    localStorage.setItem("TOKEN", data.info.access_token)
    navigate("/home")
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-75 h-75 d-flex shadow rounded">
          <div className="w-50 bg-info d-flex justify-content-center align-items-center rounded">
            <p className="display-3">Farmazul</p>
          </div>
          <div className="w-50 d-flex align-items-center justify-content-center">
            <form className="w-75" onSubmit={handleLogin}>
              <div className={`alert alert-danger text-center w-75 m-auto mb-3 ${alert.block ? 'd-block' : 'd-none'}`} role="alert">
                {alert.text}
              </div>
              <p className="text-center display-6 mb-3">Log in</p>
              <div className="m-auto w-75 mb-4">
                <label className="d-block mb-2" htmlFor="">
                  Usuario
                </label>
                <input
                  value={formData.email}
                  name="email"
                  className={`w-100 form-control ${alert.text === "Usuario incorrecto"
                    ? "border border-danger"
                    : ""
                    }`}
                  placeholder="user@gmail.com"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="m-auto w-75 mb-5">
                <label className="d-block mb-2" htmlFor="">
                  Contraseña
                </label>
                <input
                  value={formData.password}
                  name="password"
                  className={`w-100 form-control ${alert.text === "Contraseña incorrecta"
                    ? "border border-danger"
                    : ""
                    }`}
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                />
              </div>
              <div className="m-auto w-75 mt-2">
                <button
                  className="btn btn-primary w-75 d-block m-auto mt-5"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
