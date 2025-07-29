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
import { FinalizeShop } from '../../components/finalizeShop/modalFinalizeShop.jsx'
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

                        <FinalizeShop 
                            carProducts={carProducts}
                            form={form}
                            methodPay={methodPay}
                            methodsPay={methodsPay}
                            open={open}
                            setOpen={setOpen}
                            handleSelectMethodPay={handleSelectMethodPay}
                            handleChange={handleChange}
                            handleRegisterVenta={handleRegisterVenta} 
                        />

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
                    </div>
                )
            }
        </Navigation>
    );
}
