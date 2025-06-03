import { XCircleIcon } from '@primer/octicons-react'
import { modifyMoney } from '../../utils'
import './ShoppingCart.css'

export function ShoppingCart({carProducts, deleteProduct, moreCant, setCar }) {
    return (
        <>
            <div className="h-80 position-relative custom-scroll">
                {
                    carProducts.length === 0 ? (
                        <div>No hay productos agregados</div>
                    ) : (
                        carProducts.map((product) => (
                            <div className='position-relative'>
                                <XCircleIcon style={{ cursor: "pointer" }} onClick={() => deleteProduct(product)} className='position-absolute top-0 end-0 m-2' size={16}></XCircleIcon>
                                <div key={product.id} className="w-100 shadow-sm p-3 mb-2 rounded m-auto d-flex gap-4">
                                    <div className="w-75 border-end">
                                        <div className="mb-3">
                                            <p className="mb-6 h6 fw-bold">Nombre</p>
                                            <p className="m-0 text-secondary">{product.name.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="mb-6 h6 fw-bold">Precio</p>
                                            <p className="m-0 text-secondary">${modifyMoney(product.price)}</p>
                                        </div>
                                    </div>
                                    <div className="w-25 d-flex align-items-center">
                                        <div>
                                            <p className="mb-6 h6 fw-bold">Cantidad</p>
                                            <div>
                                                <input
                                                    value={product.cantidad}
                                                    className='form-control d-block text-center m-auto'
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    onChange={(e) => moreCant(product, e.target.value)}
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
                        <p className="m-0 text-secondary">${modifyMoney(carProducts.reduce((total, item) => total + item.price * item.cantidad, 0))}</p>
                    </div>
                    <div>
                        <p className="mb-6 h6 fw-bold">Total productos</p>
                        <p className="m-0 text-secondary">{carProducts.length}</p>
                    </div>
                </div>
                <div className="end-0">
                    <button className="btn btn-success d-block mb-3" type="button" data-bs-toggle="modal" disabled={carProducts.length === 0} data-bs-target="#exampleModal">Comprar</button>
                    <button onClick={() => setCar([])} className="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </>
    )
}