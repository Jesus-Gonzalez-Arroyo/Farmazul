import { useEffect } from 'react'
import { Navigation } from '../../layouts/Navigation'
import { keys, modifyMoney } from '../../utils';
import { Loader } from '../../components/Loader';
import { TableComponent } from '../../components/tableComponent/Tables.jsx';
import './users.css'
import { UseUsers } from '../../hooks/useUsers';
import { consumServices } from '../../contexts/execute.js';
import { TableFooter } from '../../components/TableFooter.jsx'
import ActionsTemplate from '../../templates/Actions.jsx';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';

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
        paginaActual,
        paginaActualUsers,
        totalPages,
        totalPagesUser,
        filters,
        setTotalPages,
        setTotalPagesUser,
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
        setLoader,
        nextPage,
        nextPageUser,
        previuosPage,
        previuosPageUser
    } = UseUsers()

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={roles}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select One"
                className="p-column-filter"
                showClear
                style={{ minWidth: '12rem' }}
            />
        );
    };

    useEffect(() => {
        async function getUsers() {
            const res = await consumServices(keys.getUsers, 'GET')
            const resVentas = await consumServices(keys.getVentas, 'GET')

            if (res.error || resVentas.error) return console.error(res.error ? res : resVentas)

            setUsers(res.info)
            setResumenVentas(resVentas.info.reverse())
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        getUsers()
    }, [setLoader, setResumenVentas, setUsers, setTotalPages, setTotalPagesUser])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='position-relative'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <p className='m-0 h5'>Gestor de usuarios</p>
                            </div>
                            <div>
                                <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo usuario</button>
                            </div>
                        </div>
                        <div className='d-flex gap-3'>
                            <div className="shadow p-3 rounded overflow-auto w-60 position-relative">
                                <p className='h6 mb-3'>Usuarios activos</p>
                                <DataTable
                                    value={users}
                                    paginator
                                    rows={10}
                                    dataKey="id"
                                    filters={filters}
                                    filterDisplay="row"
                                    emptyMessage="No customers found."
                                >
                                    <Column
                                        field="name"
                                        header="Nombre"
                                        filter
                                        filterPlaceholder="Search by name"
                                        showFilterMenu={false}
                                        style={{ minWidth: '15rem' }}
                                    />
                                    <Column
                                        field="email"
                                        header="Usuario"
                                        filter
                                        filterPlaceholder="Search by email"
                                        showFilterMenu={false}
                                        style={{ minWidth: '12rem' }}
                                    />
                                    <Column
                                        field="rol"
                                        header="Rol"
                                        filter
                                        filterElement={(rowData) => statusRowFilterTemplate(rowData)}
                                        filterPlaceholder="Search by rol"
                                        showFilterMenu={false}
                                        style={{ minWidth: '150px' }}
                                    />
                                    <Column
                                        header="Acciones"
                                        body={(rowData) => ActionsTemplate(getInfoUserUpdate, getIdUser, rowData)}
                                        style={{ minWidth: '100px' }}
                                    />
                                </DataTable>
                            </div>
                            <div className='shadow p-3 rounded overflow-auto w-40 h-100 position-relative'>
                                <p className='h6 mb-3'>Ventas realizadas</p>
                                <div>
                                    <DataTable
                                        value={resumeVentas}
                                        paginator
                                        rows={10}
                                        dataKey="id"
                                        filterDisplay="row"
                                        emptyMessage="No customers found."
                                    >
                                        <Column
                                            field="usuario"
                                            header="Nombre"
                                            style={{ minWidth: '200px' }}
                                        />
                                        <Column
                                            field="valor"
                                            header="Valor venta"
                                            body={(rowData) => `$${modifyMoney(rowData.valor)}`}
                                            style={{ minWidth: '150px' }}
                                        />
                                        <Column
                                            field="fecha"
                                            header="Fecha"
                                            style={{ minWidth: '150px' }}
                                        />
                                    </DataTable>
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
                    </div>
                )
            }
        </Navigation>
    )
}