import { useEffect, useState } from 'react'
import { Navigation } from '../../components/Navigation'
import { TrashIcon, PencilIcon } from "@primer/octicons-react"
import './users.css'
import { consumServices, keys } from '../../utils';
import { Loader } from '../../components/Loader';

const ventas = [
    {
        id: 1,
        nombre: "Jesus Gonzalez",
        valor: 3200,
        fecha: '03/18/2025'
    },
    {
        id: 2,
        nombre: "Valery Maurys",
        valor: 31750,
        fecha: '01/10/2025'
    },
];

export function Users() {
    const [users, setUsers] = useState([])
    const [loader, setLoader] = useState(true)
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const roles = ["Admin", "Usuario"]

    const handleSelect = (value) => {
        setRol(value)
        setOpen(false)
    };

    useEffect(() => {
        async function getUsers() {
            const res = await consumServices(keys.getUsers, 'GET')

            if (res.error) return console.error(res)

            setUsers(res.info)
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
                                                        <PencilIcon data-bs-toggle="modal" data-bs-target="#editProduct" size={16}></PencilIcon>
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
                                        {ventas.map((producto, index) => (
                                            <tr key={producto.id}>
                                                <td>{index + 1}</td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.valor.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                                <td>{producto.fecha}</td>
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
                                                <input type="text" className="form-control mb-3 mt-1" />
                                                <label className='h6 required'>Usuario</label>
                                                <input type="text" className="form-control mb-3 mt-1" />
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
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Guardar</button>
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
                                                <input type="text" value='Acetaminofen' className="form-control mb-3 mt-1" />
                                                <label className='h6 required'>Usuario</label>
                                                <input type="text" className="form-control mb-3 mt-1" />
                                                <label className='h6 required'>Rol</label>
                                                <input type="text" className="form-control mb-3 mt-1" />
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