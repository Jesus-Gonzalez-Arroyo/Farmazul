import {useState} from 'react'
import { Navigation } from '../../components/Navigation'
import {TrashIcon, PencilIcon} from "@primer/octicons-react"

const productos = [
    {
        id: 1,
        nombre: "Recibo de luz",
        precio: 1500,
        tipo: 'Pago',
        estado: 'Pagado',
        deuda: 0,
        descripcion: 'Nomina',
        fecha: '03/31/2025'
    },
    {
        id: 2,
        nombre: "Compra de producto",
        precio: 10100,
        tipo: 'Compra',
        estado: 'En deuda',
        deuda: 5000,
        descripcion: 'Compra',
        fecha: '03/31/2025'
    }
];

export function Gastos () {
    const [rol, setRol] = useState("")
    const [open, setOpen] = useState(false)
    const types = ["Pago", "Compra"]

    const handleSelect = (value) => {
        setRol(value)
        setOpen(false)
    };

    return (
        <Navigation>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <p className='m-0 h5'>Gestor de gastos</p>
                </div>
                <div>
                    <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Nuevo gasto</button>
                </div>
            </div> 
            <div className='h-90'>
                    <div className="shadow-sm p-3 rounded overflow-auto h-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Valor deuda</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.nombre}</td>
                                        <td>$
                                            {producto.precio
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>{producto.tipo}</td>
                                        <td>
                                            <div className={`m-0 p-1 rounded w-75 text-center ${producto.estado === 'Pagado' ? "bg-success" : "bg-danger"}`}>
                                                <p className='m-0'>{producto.estado}</p>
                                            </div>
                                        </td>
                                        <td>{producto.deuda.toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>
                                            {producto.fecha}
                                        </td>
                                        <td>{producto.descripcion}</td>
                                        <td>
                                        <div className='d-flex align-items-center gap-3'>
                                                <PencilIcon
                                                    size={16}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editProduct"
                                                />
                                                <TrashIcon 
                                                    size={16}
                                                />
                                            </div>
                                        </td>
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
                                <h5 class="modal-title" id="exampleModalLabel">Registrar gastos</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form action="">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Fecha</label>
                                        <input type="date" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Nombre</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
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
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <div className={`${"d-block"}`}>
                                            <label className='h6 required'>Valor deuda</label>
                                            <input type="text" className="form-control mb-3 mt-1" />
                                        </div>
                                        <label className='h6'>Descripcion</label>
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
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
                                        <label className='h6 required'>Fecha</label>
                                        <input type="date" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Nombre</label>
                                        <input type="text" value='Acetaminofen' className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Tipo</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Estado</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <div className={`${"d-block"}`}>
                                            <label className='h6 required'>Valor deuda</label>
                                            <input type="text" className="form-control mb-3 mt-1" />
                                        </div>
                                        <label className='h6'>Descripcion</label>
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
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
        </Navigation> 
    )
}