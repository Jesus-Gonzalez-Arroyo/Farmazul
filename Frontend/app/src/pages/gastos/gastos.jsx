import { Navigation } from '../../components/Navigation'

const productos = [
    {
        id: 1,
        nombre: "Recibo de luz",
        precio: 1500,
        tipo: 'Pago',
        estado: 'Pagado',
        descripcion: 'Nomina'
    },
    {
        id: 2,
        nombre: "Compra de producto",
        precio: 10100,
        tipo: 'Compra',
        estado: 'En deuda',
        descripcion: 'Compra',
    }
];

export function Gastos () {
    return (
        <Navigation> 
            <div>
                <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nuevo gasto</button>
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
                                            <p className={`m-0 ${producto.estado === 'Pagado' ? "text-success" : "text-danger"}`}>{producto.estado}</p>
                                        </td>
                                        <td>{producto.descripcion}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                type="button" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#editProduct"
                                            >
                                                Editar
                                            </button>
                                            <button className='btn btn-danger mx-2'>
                                                Eliminar
                                            </button>
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
                                        <label className='h6 required'>Nombre</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Tipo</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Estado</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
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
                                        <label className='h6 required'>Nombre</label>
                                        <input type="text" value='Acetaminofen' className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Tipo</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Estado</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
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