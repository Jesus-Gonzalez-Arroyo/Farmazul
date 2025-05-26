import { useEffect } from 'react'
import { Navigation } from '../../layouts/Navigation'
import { keys, modifyMoney } from '../../utils';
import { Loader } from '../../components/Loader';
import { TableComponent } from "../../components/tableComponent/Tables.jsx";
import { useGastos } from '../../hooks/useGastos.js';
import { AlertComponent } from '../../components/alert.jsx';
import { consumServices } from '../../contexts/execute.js';

export function Gastos() {

    const {
        loader,
        gastos,
        open,
        openState,
        types,
        typeState,
        form,
        type,
        state,
        dataRegisterUpdate,
        infoAlert,
        handleSelect,
        handleSelectState,
        handleIdGastoDelete,
        registerGasto,
        updateGastoService,
        deleteGasto,
        updateGasto,
        handleChange,
        handleChangeUpdate,
        setOpen,
        setOpenState,
        setGastos,
        setLoader
    } = useGastos()

    useEffect(() => {
        const gastosGet = async () => {
            const response = await consumServices(keys.getGastos, "GET");
            if (response.error) return console.error(response.info);
            setGastos(response.info);
            setTimeout(() => {
                setLoader(false);
            }, 500);
        };

        gastosGet();
    }, [setGastos, setLoader])

    return (
        <div>
            <Navigation>
                {
                    loader ? (
                        <Loader />
                    ) : (
                        <div className='h-100'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <p className='m-0 h5'>Gestor de gastos</p>
                                </div>
                                <div>
                                    <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#register">Nuevo gasto</button>
                                </div>
                            </div>
                            <div className='h-90'>
                                <div className="shadow p-3 rounded overflow-auto h-100">
                                    <TableComponent
                                        heads={[
                                            { label: "Nombre", key: "name" },
                                            { label: "Precio", key: "price", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Tipo", key: "type" },
                                            {
                                                label: "Estado", key: "estado", render: (estado) => (
                                                    <div className={`m-0 p-1 rounded w-75 text-center ${estado === 'Pagado' ? "bg-success" : "bg-danger"}`}>
                                                        <p className='m-0'>{estado}</p>
                                                    </div>
                                                )
                                            },
                                            { label: "Valor deuda", key: "valordeuda", render: (val) => `$${modifyMoney(val)}` },
                                            { label: "Fecha", key: "fecha" },
                                            { label: "Descripcion", key: "descripcion" }
                                        ]}
                                        items={gastos}
                                        onEdit={(item) => updateGasto(item)}
                                        onDelete={(item) => handleIdGastoDelete(item)}
                                    />
                                </div>
                            </div>

                            {/* MODAL PARA REGISTRAR */}

                            <div class="modal fade modal-lg" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Registrar gastos</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form ref={form} action="">
                                                <div className='mb-3'>
                                                    <label className='h6 required'>Fecha</label>
                                                    <input name='fecha' type="date" className="form-control mb-3 mt-1" onChange={handleChange} />
                                                    <label className='h6 required'>Nombre</label>
                                                    <input name='name' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                                    <label className='h6 required'>Precio</label>
                                                    <input name='price' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                                    <label className='h6 required'>Tipo</label>
                                                    <div className="position-relative w-100 mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            value={type}
                                                            readOnly
                                                            placeholder="Seleccionar tipo..."
                                                            onClick={() => setOpen(!open)}
                                                        />
                                                        {open && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow z-100">
                                                                {types.map((item) => (
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
                                                    <label className='h6 required'>Estado</label>
                                                    <div className="w-100 mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            value={state}
                                                            readOnly
                                                            placeholder="Seleccionar estado..."
                                                            onClick={() => setOpenState(!openState)}
                                                        />
                                                        {openState && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                                {typeState.map((item) => (
                                                                    <li
                                                                        key={item}
                                                                        className="list-group-item list-group-item-action"

                                                                        onClick={() => handleSelectState(item)}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <div className={`${state === typeState[1] ? "d-block" : "d-none"}`}>
                                                        <label className='h6 required'>Valor deuda</label>
                                                        <input name='valordeuda' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                                    </div>
                                                    <label className='h6'>Descripcion</label>
                                                    <textarea name='descripcion' class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" onChange={handleChange} style={{ height: "100px" }}></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" onClick={registerGasto} class="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MODAL PARA ACTUALIZAR ITEMS */}

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
                                                    <label className='h6 required'>Fecha</label>
                                                    <input value={dataRegisterUpdate.fecha} onChange={handleChangeUpdate} name='fecha' type="date" className="form-control mb-3 mt-1" />
                                                    <label className='h6 required'>Nombre</label>
                                                    <input value={dataRegisterUpdate.name} onChange={handleChangeUpdate} name='name' type="text" className="form-control mb-3 mt-1" />
                                                    <label className='h6 required'>Precio</label>
                                                    <input value={dataRegisterUpdate.price} onChange={handleChangeUpdate} name='price' type="text" className="form-control mb-3 mt-1" />
                                                    <label className='h6 required'>Tipo</label>
                                                    <div className="position-relative w-100 mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            value={type}
                                                            readOnly
                                                            onClick={() => setOpen(!open)}
                                                        />
                                                        {open && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow z-100">
                                                                {types.map((item) => (
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
                                                    <label className='h6 required'>Estado</label>
                                                    <div className="w-100 mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            value={state}
                                                            readOnly
                                                            onClick={() => setOpenState(!openState)}
                                                        />
                                                        {openState && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                                {typeState.map((item) => (
                                                                    <li
                                                                        key={item}
                                                                        className="list-group-item list-group-item-action"

                                                                        onClick={() => handleSelectState(item)}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <div className={`${state === typeState[1] ? "d-block" : "d-none"}`}>
                                                        <label className='h6 required'>Valor deuda</label>
                                                        <input value={dataRegisterUpdate.valordeuda} onChange={handleChangeUpdate} name='valordeuda' type="text" className="form-control mb-3 mt-1" />
                                                    </div>
                                                    <label className='h6'>Descripcion</label>
                                                    <textarea value={dataRegisterUpdate.descripcion} onChange={handleChangeUpdate} name='descripcion' class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" onClick={updateGastoService} class="btn btn-success" data-bs-dismiss="modal">Actualizar</button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MODAL PARA ELIMINAR ITEMS */}

                            <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Eliminar gasto</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>¿Estas seguro de eliminar este gasto?</p>
                                            <div className='d-flex gap-2'>
                                                <button type="button" onClick={deleteGasto} class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
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
                            />
                        </div>
                    )
                }
            </Navigation>
        </div>
    )
}