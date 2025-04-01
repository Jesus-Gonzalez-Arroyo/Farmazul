import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@primer/octicons-react'
import { Navigation } from "../../components/Navigation";
import { consumServices, keys } from '../../utils/index'
import "./ventas.css";
import { Loader } from '../../components/Loader';

export function Ventas() {
    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(true)

    function handleAddProduct(product) {
        console.log("event", product);
    }

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
    }, [])

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
                                                        <PlusCircleIcon onClick={() => handleAddProduct(producto)} size={16} />
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
                                        <div className="w-100 shadow-sm p-3 mb-2 rounded m-auto d-flex gap-4">
                                            <div className="w-75 border-end">
                                                <div className="mb-3">
                                                    <p className="mb-6 h6 fw-bold">Nombre</p>
                                                    <p className="m-0 text-secondary">Novalgina</p>
                                                </div>
                                                <div>
                                                    <p className="mb-6 h6 fw-bold">Precio</p>
                                                    <p className="m-0 text-secondary">$1.500</p>
                                                </div>
                                            </div>
                                            <div className="w-25 d-flex align-items-center">
                                                <div>
                                                    <p className="mb-6 h6 fw-bold">Cantidad</p>
                                                    <p className="m-0 text-center text-secondary">4</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100 shadow-sm p-3 mb-2 rounded m-auto d-flex gap-4">
                                            <div className="w-75 border-end">
                                                <div className="mb-3">
                                                    <p className="mb-6 h6 fw-bold">Nombre</p>
                                                    <p className="m-0 text-secondary">Dolex gripa</p>
                                                </div>
                                                <div>
                                                    <p className="mb-6 h6 fw-bold">Precio</p>
                                                    <p className="m-0 text-secondary">$2.500</p>
                                                </div>
                                            </div>
                                            <div className="w-25 d-flex align-items-center">
                                                <div>
                                                    <p className="mb-6 h6 fw-bold">Cantidad</p>
                                                    <p className="m-0 text-center text-secondary">1</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex border-top p-1 align-items-center justify-content-between gap-2">
                                        <div>
                                            <div className="mb-2">
                                                <p className="mb-6 h6 fw-bold">Total</p>
                                                <p className="m-0 text-secondary">$300.000</p>
                                            </div>
                                            <div>
                                                <p className="mb-6 h6 fw-bold">Total productos</p>
                                                <p className="m-0 text-secondary">4</p>
                                            </div>
                                        </div>
                                        <div className="end-0">
                                            <button className="btn btn-success d-block mb-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar</button>
                                            <button className="btn btn-danger">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Finalizar compra</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="">
                                            <p>Metodo de pago</p>
                                            <input type="text" className="form-control mb-3" />
                                            <p>Recibido</p>
                                            <input type="text" className="form-control mb-3" />
                                            <p>Descuento</p>
                                            <input type="text" className="form-control" />
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Finalizar</button>
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
