import { useEffect } from 'react'
import { PlusCircleIcon, XCircleIcon } from '@primer/octicons-react'
import { Navigation } from "../../layouts/Navigation";
import { keys } from '../../utils/index'
import {consumServices} from '../../contexts/execute'
import "./ventas.css";
import { Loader } from '../../components/Loader';
import { ProductInfoCar } from '../../models';
import { useVentas } from '../../hooks/index'

export function Ventas() {
    const {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        setOpen,
        handleSelectMethodPay,
        setProducts,
        setLoader,
        setCarProducts,
        handleAddProductCar,
        handleMoreCant,
        handleDeleteProduct,
        handleChange,
        handleRegisterVenta
    } = useVentas()

    useEffect(() => {
        const productsGet = async () => {
            const responseProducts = await consumServices(keys.getProducts, 'GET')
            if (responseProducts.error) return console.error(responseProducts.info);
            setProducts(responseProducts.info)
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [setProducts, setLoader])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='h-100'>
                        <div className="d-flex w-100 h-15 gap-4">
                            <div className="w-75">
                                <p className="m-0 my-3 h5">Tus productos disponibles</p>
                                <div className="shadow-sm p-3 rounded overflow-auto h-100">
                                    <div class="input-group mb-4 w-50">
                                        <input type="text" className="form-control w-75" placeholder="Nombre del producto" aria-label="Nombre del producto" aria-describedby="button-addon2" />
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Cantidad</th>
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
                                                        {producto.price_venta
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                    </td>
                                                    <td>{producto.cantidad}</td>
                                                    <td>{producto.estancia}</td>
                                                    <td>
                                                        <PlusCircleIcon style={{ cursor: "pointer" }} onClick={() => handleAddProductCar(new ProductInfoCar(producto))} size={16} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-25">
                                <p className="h5 m-0 my-3">Carrito de compras</p>
                                <div className="p-3 shadow-sm rounded h-100">
                                    <p className="h6 mb-3">Productos agregados</p>
                                    <div className="h-85 position-relative custom-scroll">
                                        {
                                            carProducts.length === 0 ? (
                                                <div>No hay productos agregados</div>
                                            ) : (
                                                carProducts.map((product) => (
                                                    <div className='position-relative'>
                                                        <XCircleIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteProduct(product)} className='position-absolute top-0 end-0 m-2' size={16}></XCircleIcon>
                                                        <div key={product.id} className="w-100 shadow-sm p-3 mb-2 rounded m-auto d-flex gap-4">
                                                            <div className="w-75 border-end">
                                                                <div className="mb-3">
                                                                    <p className="mb-6 h6 fw-bold">Nombre</p>
                                                                    <p className="m-0 text-secondary">{product.name}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="mb-6 h6 fw-bold">Precio</p>
                                                                    <p className="m-0 text-secondary">${product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                                                </div>
                                                            </div>
                                                            <div className="w-25 d-flex align-items-center">
                                                                <div>
                                                                    <p className="mb-6 h6 fw-bold">Cantidad</p>
                                                                    <div>
                                                                        <input 
                                                                            value={product.cantidad} 
                                                                            className='form-control d-block text-center m-auto' 
                                                                            style={{width: '50px'}} 
                                                                            type="text" 
                                                                            onChange={(e) => handleMoreCant(product, e.target.value)} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                    <div className="d-flex border-top p-1 align-items-center justify-content-between gap-2">
                                        <div>
                                            <div className="mb-2">
                                                <p className="mb-6 h6 fw-bold">Total</p>
                                                <p className="m-0 text-secondary">${String(carProducts.reduce((total, item) => total + item.price * item.cantidad, 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                            </div>
                                            <div>
                                                <p className="mb-6 h6 fw-bold">Total productos</p>
                                                <p className="m-0 text-secondary">{carProducts.length}</p>
                                            </div>
                                        </div>
                                        <div className="end-0">
                                            <button className="btn btn-success d-block mb-3" type="button" data-bs-toggle="modal" disabled={carProducts.length === 0} data-bs-target="#exampleModal">Comprar</button>
                                            <button onClick={() => setCarProducts([])} className="btn btn-danger">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade modal-lg h-30" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Finalizar compra</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className='d-flex w-100 gap-5'>
                                            <div className='w-50'>
                                                <p className='fw-bold'>Resumen de compra</p>
                                                <div className='overflow-auto h-350'>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Nombre</th>
                                                                <th scope="col">Precio</th>
                                                                <th scope="col">Cantidad</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {carProducts.map((producto) => (
                                                                <tr key={producto.id}>
                                                                    <td>{producto.name}</td>
                                                                    <td>$
                                                                        {producto.price
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                                                    </td>
                                                                    <td>{producto.cantidad}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='mt-4'>
                                                    <p className='m-0 fw-bold'>Total de la compra</p>
                                                    <p>${String(carProducts.reduce((total, item) => total + item.price * item.cantidad, 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                                </div>
                                            </div>
                                            <div className='w-50'>
                                                <p className='fw-bold'>Metodo de pago</p>
                                                <form action=''>
                                                    <div className="position-relative w-100 mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control w-100"
                                                            value={methodPay}
                                                            readOnly
                                                            placeholder="Selecciona"
                                                            onClick={() => setOpen(!open)}
                                                        />
                                                        {open && (
                                                            <ul className="list-group position-absolute w-100 mt-1 shadow">
                                                                {methodsPay.map((item) => (
                                                                    <li
                                                                        key={item}
                                                                        className="list-group-item list-group-item-action"
                                                                        onClick={() => handleSelectMethodPay(item)}
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <div style={{display: methodPay === 'Efectivo' ? 'block':'none'}}>
                                                        <p className='fw-bold'>Recibido</p>
                                                        <input type="text" name='recibido' onChange={handleChange} className="form-control mb-3"/>
                                                    </div>
                                                    <div>    
                                                        <p className='fw-bold'>Descuento</p>
                                                        <input type="text" name='descuent' onChange={handleChange} className="form-control"/>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="button" onClick={handleRegisterVenta} class="btn btn-success" data-bs-dismiss="modal">Finalizar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navigation>
    );
}
