import { useEffect } from 'react'
import { Navigation } from '../../layouts/Navigation'
import { keys, modifyMoney } from '../../utils';
import { Loader } from '../../components/Loader';
import { TableComponent } from '../../components/tableComponent/Tables.jsx';
import './users.css'
import { UseUsers } from '../../hooks/useUsers';
import { AlertComponent } from '../../components/alert.jsx';
import { consumServices } from '../../contexts/execute.js';

export function Users() {

    const {
        users,
        resumeVentas,
        loader,
        open,
        roles,
        rol,
        dataUpdateUser,
        form,
        infoAlert,
        handleSelect,
        handleChangeNewUser,
        handleChangeUpdateUser,
        updateInfoUser,
        deleteUser,
        registerUser,
        getIdUser,
        getInfoUserUpdate,
        setOpen,
        setUsers,
        setResumenVentas,
        setLoader
    } = UseUsers()

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
    }, [setLoader, setResumenVentas, setUsers])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='h-100 position-relative'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='m-0 h5'>Gestor de usuarios</p>
                            </div>
                            <div>
                                <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo usuario</button>
                            </div>
                        </div>
                        <div className='h-90 d-flex gap-3'>
                            <div className="shadow p-3 rounded overflow-auto w-60 h-100">
                                <p className='h6'>Usuarios activos</p>
                                <TableComponent
                                    heads={[
                                        { label: "Nombre", key: "name" },
                                        { label: "Usuario", key: "email", },
                                        { label: "Rol", key: "rol" }
                                    ]}
                                    items={users}
                                    onEdit={(item) => getInfoUserUpdate(item)}
                                    onDelete={(item) => getIdUser(item)}
                                />
                            </div>
                            <div className='shadow p-3 rounded overflow-auto w-40 h-100'>
                                <p className='h6'>Ventas realizadas</p>
                                <div>
                                    <TableComponent
                                        heads={[
                                            { label: "Nombre", key: "usuario" },
                                            { label: "Valor venta", key: "valor", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Fecha", key: "fecha" }
                                        ]}
                                        items={resumeVentas}
                                        actions={false}
                                    />
                                </div>
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
                                        <form ref={form} action="">
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

                        <div class="modal fade modal-lg" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={updateInfoUser}>Actualizar</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Eliminar usuario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>¿Estas seguro de eliminar este usuario?</p>
                                        <div className='d-flex gap-2'>
                                            <button type="button" class="btn btn-danger" onClick={deleteUser} data-bs-dismiss="modal">Eliminar</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AlertComponent
                            show={infoAlert.show}
                            message={infoAlert.message}
                            type={infoAlert.type}
                            error={infoAlert.error}
                        />
                    </div>
                )
            }
        </Navigation>
    )
}