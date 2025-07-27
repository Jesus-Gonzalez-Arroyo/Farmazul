import { useEffect } from 'react'
import { PlusCircleIcon } from '@primer/octicons-react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { ProductInfoCar } from '../../models';
import { useVentas } from '../../hooks/index'
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart.jsx'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SideBar } from '../../components/sideBar/sideBar'
import {ArrowLeftIcon} from '@primer/octicons-react'
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
        filters,
        visible,
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
        setVisible,
        closeCarComplete
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

    const actionAddProductTemplate = (producto) => (
        <PlusCircleIcon style={{ cursor: "pointer" }} onClick={() => handleAddProductCar(new ProductInfoCar(producto))} size={16} />
    )

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className='position-relative'>
                        <div className="w-100 gap-4">
                            <div className="w-100">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <p className="m-0 mt-3 h5">Tus productos disponibles</p>
                                        <p className='mb-3 mt-2 m-0'>Realiza y registra tus ventas del dia.</p>
                                    </div>
                                    <div onClick={() => setVisible(true)}>
                                        <ArrowLeftIcon size={24} />
                                    </div>
                                </div>
                                <div className="shadow p-3 position-relative rounded overflow-auto">
                                    <DataTable
                                        value={products}
                                        filters={filters}
                                        paginator
                                        rows={10}
                                        dataKey="id"
                                        filterDisplay="row"
                                        emptyMessage="No customers found."
                                    >
                                        <Column
                                            field="idProduct"
                                            header="Id producto"
                                            filter
                                            showFilterMenu={false}
                                            filterPlaceholder="Search by id"
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field="name"
                                            header="Nombre"
                                            sortable
                                            body={(rowData) => rowData.name.toUpperCase()}
                                            filter
                                            showFilterMenu={false}
                                            filterPlaceholder="Search by name"
                                            style={{ minWidth: '350px' }}
                                        />
                                        <Column
                                            field="price_venta"
                                            header="Precio de venta"
                                            sortable
                                            body={(rowData) => `$${modifyMoney(rowData.price_venta)}`}
                                            style={{ minWidth: '9rem' }}
                                        />
                                        <Column
                                            field="cantidad"
                                            header="Cantidad"
                                            sortable
                                            style={{ minWidth: '8rem' }}
                                        />
                                        <Column
                                            field="estancia"
                                            header="Estancia"
                                            filter
                                            showFilterMenu={false}
                                            filterPlaceholder="Search by estante"
                                            body={(rowData) => rowData.estancia.toUpperCase()}
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            header="Acciones"
                                            style={{ minWidth: '8rem' }}
                                            body={(rowData) => actionAddProductTemplate(rowData)}
                                        />
                                    </DataTable>
                                </div>
                            </div>
                        </div>

                        <SideBar isVentas={true} position='right' visible={visible} setVisible={setVisible}>
                            <div className="p-1 h-90">
                                <p className="h6 mb-3">Productos agregados</p>
                                <ShoppingCart
                                    closeModal={closeCarComplete}
                                    carProducts={carProducts}
                                    deleteProduct={handleDeleteProduct}
                                    moreCant={handleMoreCant}
                                    setCar={setCarProducts}
                                />
                            </div>
                        </SideBar>

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
