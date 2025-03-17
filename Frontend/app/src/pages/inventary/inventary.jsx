import { Navigation } from '../../components/Navigation'
import './inventary.css'

const productos = [
    {
        id: 1,
        nombre: "Acetaminofen",
        precio: 1500,
        precioVenta: 3000,
        cantidad: 7,
        cantidadActual: 6,
        proveedor: 'Genfar',
        estancia: "Estante 2",
    },
    {
        id: 2,
        nombre: "Aspirina",
        precio: 10100,
        precioVenta: 15500,
        cantidad: 7,
        cantidadActual: 3,
        proveedor: 'Genfar',
        estancia: "Estante 1",
    },
    { id: 3, nombre: "Dolex", precio: 4250, precioVenta: 6300, cantidad: 10, cantidadActual: 5, proveedor: 'Genfar', estancia: "Estante 6" },
    { id: 3, nombre: "Dolex", precio: 4250, precioVenta: 6300, cantidad: 10, cantidadActual: 5, proveedor: 'Genfar', estancia: "Estante 6" },
    { id: 3, nombre: "Dolex", precio: 4250, precioVenta: 6300, cantidad: 10, cantidadActual: 5, proveedor: 'Genfar', estancia: "Estante 6" },
    { id: 3, nombre: "Dolex", precio: 4250, precioVenta: 6300, cantidad: 10, cantidadActual: 5, proveedor: 'Genfar', estancia: "Estante 6" },
    { id: 3, nombre: "Dolex", precio: 4250, precioVenta: 6300, cantidad: 10, cantidadActual: 5, proveedor: 'Genfar', estancia: "Estante 6" },
];

export function Inventary() {
    return (
        <div>
            <Navigation>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nuevo producto</button>
                    </div>
                    <div className='w-25'>
                        <div class="input-group my-3">
                            <input type="text" className="form-control w-50" placeholder="Nombre del producto" aria-label="Nombre del producto" aria-describedby="button-addon2" />
                            <button className="btn btn-primary" type="button" id="button-addon2">Buscar</button>
                        </div>
                    </div>
                </div>
                <div className='h-90'>
                    <div className="shadow-sm p-3 rounded overflow-auto h-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio compra</th>
                                    <th scope="col">Precio venta</th>
                                    <th scope="col">Cantidad comprada</th>
                                    <th scope="col">Cantidad Actual</th>
                                    <th scope="col">Ganancia x unidad</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Estancia</th>
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
                                        <td>$
                                            {producto.precioVenta
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.cantidadActual}</td>
                                        <td>${producto.precioVenta - producto.precio}</td>
                                        <td>{producto.proveedor}</td>
                                        <td>{producto.estancia}</td>
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
                                <h5 class="modal-title" id="exampleModalLabel">Registrar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form action="">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Nombre</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio de compra</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Cantidad</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                    </div>
                                    <div>
                                        <label className='h6'>Proveedor</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6'>Lugar de estancia</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Escanear</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actualizar product */}

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
                                        <label className='h6 required'>Precio de compra</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6 required'>Cantidad</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                    </div>
                                    <div>
                                        <label className='h6'>Proveedor</label>
                                        <input type="text" className="form-control mb-3 mt-1" />
                                        <label className='h6'>Lugar de estancia</label>
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
            </Navigation>
        </div>
    )
}