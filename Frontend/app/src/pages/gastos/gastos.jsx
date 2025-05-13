import { useEffect, useRef, useState } from 'react'
import { Navigation } from '../../layouts/Navigation'
import { keys, modifyMoney } from '../../utils';
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { GastosInfoModel } from '../../models/gastosInfo.model';
import { GastosInfoUpdateModel } from '../../models';
import { TableComponent } from "../../components/Tables";

export function Gastos() {
    const [loader, setLoader] = useState(true)
    const [productId, setProductId] = useState({})
    const [gastos, setGastos] = useState([])
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const types = ["Pago", "Compra"]
    const [dataRegister, setDataRegister] = useState(new GastosInfoModel());
    const [dataRegisterUpdate, setDataRegisterUpdate] = useState(new GastosInfoUpdateModel({}));
    const form = useRef()

    const handleSelect = (value) => {
        setRol(value)
        setOpen(false)
    };

    const handleIdGastoDelete = (product) => {
        setProductId({
            id: product._id
        })
    }

    const registerGasto = async () => {
        dataRegister.type = rol

        const res = await consumServices(keys.registerGastos, 'POST', '', dataRegister)

        if (res.error) {
            return console.error(res)
        }

        setGastos((prev) => [...prev, res.info[0]])
    }

    const updateGastoService = async () => {
        const res = await consumServices(keys.updateGasto, 'POST', '', dataRegisterUpdate)


        if (res.error) {
            return console.error(res)
        }

        setGastos((prev) =>
            prev.map((gasto) =>
                gasto._id === dataRegisterUpdate.id ? res.info[0] : gasto
            )
        );
    }

    const deleteGasto = async () => {

        const res = await consumServices(keys.deleteGasto, 'DELETE', '', productId)

        if (res.error) return console.error(res)

        setGastos((prev) => prev.filter((producto) => producto._id !== res.info.product._id))
    }

    const updateGasto = (info) => {
        setDataRegisterUpdate(new GastosInfoUpdateModel(info))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataRegister((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;
        setDataRegisterUpdate((prev) => ({ ...prev, [name]: value }));
    };

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
    }, [])

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
                                                            value={rol}
                                                            readOnly
                                                            placeholder="Seleccionar rol..."
                                                            onClick={() => setOpen(!open)}
                                                        />
                                                        {open && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow">
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
                                                    <input name='estado' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                                    <div className={`${"d-block"}`}>
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
                                                    <input value={dataRegisterUpdate.type} onChange={handleChangeUpdate} name='type' type="text" className="form-control mb-3 mt-1" />
                                                    <label className='h6 required'>Estado</label>
                                                    <input value={dataRegisterUpdate.estado} onChange={handleChangeUpdate} name='estado' type="text" className="form-control mb-3 mt-1" />
                                                    <div className={`${"d-block"}`}>
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
                        </div>
                    )
                }
            </Navigation>
        </div>
    )
}