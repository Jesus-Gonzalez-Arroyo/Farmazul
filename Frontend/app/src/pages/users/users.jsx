import { useEffect, useState } from 'react'
import { Navigation } from '../../layouts/Navigation'
import { TrashIcon, PencilIcon } from "@primer/octicons-react"
import './users.css'
import { keys } from '../../utils';
import {consumServices} from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { NewUser, NewUserUpdate } from '../../models';

export function Users() {
    const [users, setUsers] = useState([])
    const [resumeVentas, setResumenVentas] = useState([])
    const [loader, setLoader] = useState(true)
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const [dataNewUser, setDataNewUser] = useState(new NewUser())
    const [dataUpdateUser, setDataUpdateUser] = useState(new NewUserUpdate({}))
    const roles = ["Admin", "Usuario"]

    const handleSelect = (value) => {
        setRol(value)
        setOpen(false)
    };

    const handleChangeNewUser = (e) => {
        const { name, value } = e.target;
        setDataNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeUpdateUser = (e) => {
        const { name, value } = e.target;
        setDataUpdateUser((prev) => ({ ...prev, [name]: value }));
    };

    function getInfoUserUpdate(info) {
        setDataUpdateUser(new NewUserUpdate(info))
        setRol(info.rol)
    }

    async function registerUser () {
        dataNewUser.rol = rol

        const registerUser = await consumServices(keys.register_user, 'POST', '', dataNewUser)

        if(registerUser.error) return console.error(registerUser)

        setUsers((prev) => [...prev, registerUser.info[0]])
    }

    useEffect(() => {
        async function getUsers() {
            const res = await consumServices(keys.getUsers, 'GET')
            const resVentas = await consumServices(keys.getVentas, 'GET')

            if (res.error || resVentas.error) return console.error(res.error ? res : resVentas)

            setUsers(res.info)
            setResumenVentas(resVentas.info)
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        getUsers()
    }, [])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='h-100'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='m-0 h5'>Gestor de usuarios</p>
                            </div>
                            <div>
                                <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo usuario</button>
                            </div>
                        </div>
                        <div className='h-90 d-flex gap-3'>
                            <div className="shadow-sm p-3 rounded overflow-auto w-60 h-100">
                                <p className='h6'>Usuarios activos</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Usuario</th>
                                            <th scope="col">Rol</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.rol}</td>
                                                <td>
                                                    <div className='d-flex align-items-center gap-3'>
                                                        <PencilIcon data-bs-toggle="modal" data-bs-target="#editProduct" size={16} onClick={() => getInfoUserUpdate(user)} />
                                                        <TrashIcon size={16}></TrashIcon>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='shadow-sm p-3 rounded overflow-auto w-40 h-100'>
                                <p className='h6'>Ventas realizadas</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Valor venta</th>
                                            <th scope="col">Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resumeVentas.map((venta, index) => (
                                            <tr key={venta.id}>
                                                <td>{index + 1}</td>
                                                <td>{venta.usuario}</td>
                                                <td>{venta.valor.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                                <td>{venta.fecha}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Registrar usuario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="">
                                            <div className='mb-3'>
                                                <label className='h6 required'>Nombre</label>
                                                <input name='name' type="text" className="form-control mb-3 mt-1" onChange={handleChangeNewUser} />
                                                <label className='h6 required'>Usuario</label>
                                                <input name='user' type="text" className="form-control mb-3 mt-1" onChange={handleChangeNewUser} />
                                                <label className='h6 required'>Contraseña</label>
                                                <input name='password' type="password" className="form-control mb-3 mt-1" onChange={handleChangeNewUser} />
                                                <label className='h6 required'>Rol</label>
                                                <div className="position-relative w-100">
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={rol}
                                                        readOnly
                                                        placeholder="Seleccionar rol"
                                                        onClick={() => setOpen(!open)}
                                                    />
                                                    {open && (
                                                        <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                            {roles.map((item) => (
                                                                <li
                                                                    key={item}
                                                                    className="list-group-item list-group-item-action"
                                                                    onClick={() => handleSelect(item)}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={registerUser}>Guardar</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade modal-lg" id="editProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Actualizar producto</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="">
                                            <div className='mb-3'>
                                                <label className='h6 required'>Nombre</label>
                                                <input type="text" name='name' value={dataUpdateUser.name} className="form-control mb-3 mt-1" onChange={handleChangeUpdateUser} />
                                                <label className='h6 required'>Usuario</label>
                                                <input type="text" name='user' value={dataUpdateUser.user} className="form-control mb-3 mt-1" onChange={handleChangeUpdateUser} />
                                                <label className='h6 required'>Contraseña</label>
                                                <label className='pass'></label>
                                                <input type="text" name='password' className="form-control mb-3 mt-1 pass" onChange={handleChangeUpdateUser} />
                                                <label className='h6 required'>Rol</label>
                                                <div className="position-relative w-100">
                                                    <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        value={rol}
                                                        readOnly
                                                        placeholder="Seleccionar rol"
                                                        onClick={() => setOpen(!open)}
                                                    />
                                                    {open && (
                                                        <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                            {roles.map((item) => (
                                                                <li
                                                                    key={item}
                                                                    className="list-group-item list-group-item-action"
                                                                    onClick={() => handleSelect(item)}
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Actualizar</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navigation>
    )
}