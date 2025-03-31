import { useEffect } from 'react'
import {TrashIcon, PencilIcon} from "@primer/octicons-react"
import { Navigation } from '../../components/Navigation'
import {consumServices} from '../../utils/index'
import {useInventary} from '../../hooks/index'
import './inventary.css'

export function Inventary() {

    const {
        setProducts, 
        setAllProducts, 
        products, 
        handleSearchProduct, 
        updateProduct, 
        handleIdProductDelete, 
        newProduct, 
        handleChange, 
        handleChangeUpdate, 
        infoUpdateProduct, 
        updateProductService, 
        deleteProduct
    } = useInventary()

    useEffect(() => {
        const productsGet = async () => {
            const responseProducts = await consumServices('', 'http://127.0.0.1:5000//index/API/v1/get_products_all', 'GET')
            if (responseProducts.error) return console.error(responseProducts.info);
            setProducts(responseProducts.info)
            setAllProducts(responseProducts.info)
        }

        productsGet()
    }, [setProducts, setAllProducts])

    return (
        <div>
            <Navigation>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <p className='m-0 h5'>Inventario de productos</p>
                    </div>
                    <div>
                        <button className='btn btn-success my-3' type="button" data-bs-toggle="modal" data-bs-target="#addProduct">Agregar producto</button>
                    </div>
                </div>
                <div className='h-90'>
                    <div className="shadow-sm p-3 rounded overflow-auto h-100">
                        <div class="input-group mb-4 w-50">
                            <input type="text" className="form-control w-100" placeholder="Nombre del producto" aria-label="Nombre del producto" aria-describedby="button-addon2" onChange={handleSearchProduct} />
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio compra</th>
                                    <th scope="col">Precio venta</th>
                                    <th scope="col">Cantidad comprada</th>
                                    <th scope="col">Fecha ultima compra</th>
                                    <th scope="col">Cantidad Actual</th>
                                    <th scope="col">Ganancia x unidad</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Estancia</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((producto, index) => (
                                    <tr key={producto._id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.name}</td>
                                        <td>$
                                            {producto.price
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>$
                                            {producto.price_venta
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.fecha}</td>
                                        <td>{producto.cantidad_actual}</td>
                                        <td>${String(Number(producto.price_venta) - Number(producto.price)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                        <td>{producto.proveedor}</td>
                                        <td>{producto.estancia}</td>
                                        <td>
                                            <div className='d-flex align-items-center gap-3'>
                                                <PencilIcon
                                                    size={16}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editProduct"
                                                    onClick={() => updateProduct(producto)}
                                                />
                                                <TrashIcon 
                                                    size={16}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteProduct"
                                                    onClick={() => handleIdProductDelete(producto)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Agregar producto */}

                <div class="modal fade modal-lg" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Registrar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form action="" onSubmit={newProduct}>
                                <div class="modal-body">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Nombre</label>
                                        <input name='name' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Precio de compra</label>
                                        <input name='price' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input name='priceventa' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6 required'>Cantidad</label>
                                        <input name='cant' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='h6 required'>Fecha</label>
                                        <input name='fecha' type="date" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6'>Proveedor</label>
                                        <input name='prov' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                        <label className='h6'>Lugar de estancia</label>
                                        <input name='estancia' type="text" className="form-control mb-3 mt-1" onChange={handleChange} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary">Escanear</button>
                                    <button type="submit" data-bs-dismiss="modal" class="btn btn-success">Guardar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Actualizar producto */}

                <div class="modal fade modal-lg" id="editProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Actualizar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={updateProductService}>
                                <div class="modal-body">
                                    <div className='mb-3'>
                                        <label className='h6 required'>Nombre</label>
                                        <input name='name' type="text" value={infoUpdateProduct.name} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6 required'>Precio de compra</label>
                                        <input name='price' type="text" value={infoUpdateProduct.price} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6 required'>Precio de venta</label>
                                        <input name='priceventa' value={infoUpdateProduct.priceventa} type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Nueva cantidad comprada</label>
                                        <input name='cant' type="text" className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                    </div>
                                    <div>
                                        <label className='h6 required'>Fecha</label>
                                        <input name='fecha' type="date" value={infoUpdateProduct.fecha} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Proveedor</label>
                                        <input name='prov' type="text" value={infoUpdateProduct.prov} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                        <label className='h6'>Lugar de estancia</label>
                                        <input name='estancia' type="text" value={infoUpdateProduct.estancia} className="form-control mb-3 mt-1" onChange={handleChangeUpdate} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Actualizar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Eliminar producto */}

                <div class="modal" id="deleteProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Eliminar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>¿Estas seguro de eliminar este producto?</p>
                                <div className='d-flex gap-2'>
                                    <button type="button" onClick={deleteProduct} class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Navigation>
        </div>
    )
}