import { Navigation } from '../../components/Navigation'
import './users.css'

const productos = [
    {
        id: 1,
        nombre: "Jesus Gonzalez",
        user: 'jesusgonzales1102@gmail.com',
        rol: 'usuario'
    },
    {
        id: 2,
        nombre: "Valery Maurys",
        user: 'vale1102@gmail.com',
        rol: 'admin'
    },
];

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
    return (
        <Navigation>
            <div>
                <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nuevo usuario</button>
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
                            {productos.map((producto, index) => (
                                <tr key={producto.id}>
                                    <td>{index + 1}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.user}</td>
                                    <td>{producto.rol}</td>
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
                                    <input type="text" className="form-control mb-3 mt-1" />
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
        </Navigation>
    )
}