import { useEffect } from 'react'
import { PlusCircleIcon } from '@primer/octicons-react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { ProductInfoCar } from '../../models';
import { useVentas } from '../../hooks/index'
import { TableFooter } from '../../components/TableFooter.jsx'
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart.jsx'
import "./ventas.css";

export function Ventas() {
    const {
        products,
        carProducts,
        loader,
        methodPay,
        methodsPay,
        open,
        form,
        totalPages,
        paginaActual,
        setTotalPages,
        setOpen,
        handleSelectMethodPay,
        setProducts,
        setLoader,
        setCarProducts,
        handleAddProductCar,
        handleMoreCant,
        handleDeleteProduct,
        handleRegisterVenta,
        handleChange,
        nextPage,
        previuosPage
    } = useVentas()

    useEffect(() => {
        const productsGet = async () => {
            const responseProducts = await consumServices(keys.getProducts, 'GET')
            if (responseProducts.error) return console.error(responseProducts.info);
            setProducts(responseProducts.info)
            const totalPaginas = Math.ceil(responseProducts.info.length / 10);
            setTotalPages(totalPaginas)
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [setProducts, setLoader, setTotalPages])

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='h-100 position-relative'>
                        <div className="d-flex w-100 h-15 gap-4">
                            <div className="w-75">
                                <p className="m-0 my-3 h5">Tus productos disponibles</p>
                                <div className="shadow p-3 position-relative rounded overflow-auto h-100">
                                    <div class="input-group mb-4 w-50">
                                        <input type="text" className="form-control w-75" placeholder="Nombre del producto" aria-label="Nombre del producto" aria-describedby="button-addon2" />
                                    </div>
                                    <table className="table position-relative">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Estancia</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((producto) => (
                                                <tr key={producto._id}>
                                                    <td>{producto.idProduct}</td>
                                                    <td>{producto.name.toUpperCase()}</td>
                                                    <td>$
                                                        {modifyMoney(producto.price_venta)}
                                                    </td>
                                                    <td>{producto.cantidad}</td>
                                                    <td>{producto.estancia.toUpperCase()}</td>
                                                    <td>
                                                        <PlusCircleIcon style={{ cursor: "pointer" }} onClick={() => handleAddProductCar(new ProductInfoCar(producto))} size={16} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <TableFooter nextPage={nextPage} previuosPage={previuosPage} totalPages={totalPages} paginaActual={paginaActual} />
                                </div>
                            </div>
                            <div className="w-25">
                                <p className="h5 m-0 my-3">Carrito de compras</p>
                                <div className="p-3 shadow rounded h-100">
                                    <p className="h6 mb-3">Productos agregados</p>
                                    <ShoppingCart 
                                        carProducts={carProducts} 
                                        deleteProduct={handleDeleteProduct} 
                                        moreCant={handleMoreCant} 
                                        setCar={setCarProducts}
                                    />
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
                                                                        {modifyMoney(producto.price)}
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
                                                <form ref={form} action=''>
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
                                                    <div style={{ display: methodPay === methodsPay[0] ? 'block' : 'none' }}>
                                                        <p className='fw-bold'>Recibido</p>
                                                        <input type="text" name='recibido' onChange={handleChange} className="form-control mb-3" />
                                                    </div>
                                                    <div>
                                                        <p className='fw-bold'>Descuento</p>
                                                        <input type="text" name='descuent' onChange={handleChange} className="form-control" />
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
