import { Navigation } from '../../layouts/Navigation'
import { ArrowLeftIcon, PlusCircleIcon, XCircleIcon } from "@primer/octicons-react";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { consumServices } from '../../contexts/execute'
import { keys, modifyMoney } from '../../utils'
import { useEffect, useState } from 'react'
import { SideBar } from '../../components/sideBar/sideBar'
import { Loader } from '../../components/Loader'
import { Alerts } from '../../utils/alerts';

export function Returns() {
    const [returns, setReturns] = useState([])
    const [products, setProducts] = useState([])
    const [expandedRows, setExpandedRows] = useState(null);
    const [loader, setLoader] = useState(true)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const productsGet = async () => {
            const resVentas = await consumServices(keys.getVentas, 'GET')
            if (resVentas.error) return console.error(resVentas.info);

            setProducts(resVentas.info.reverse())
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [])

    const showAlert = (title, message, type = 'info') => {
        Alerts(title, message, type)
        setVisible(false)
    }

    const addReturns = (product) => {
        const stockDisponible = Number(product.cantidad);

        setReturns((prevReturnsProducts) => {
            const productExist = prevReturnsProducts.find((item) => item.id === product.id)

            if (productExist) {
                const cantidadRegistrada = Number(productExist.cant)

                if (cantidadRegistrada + 1 > stockDisponible) {
                    showAlert('Acción no permitida', `Solo existen ${stockDisponible} unidades compradas para el producto ${product.name.toUpperCase()}`, 'warning')
                    return prevReturnsProducts
                }

                return prevReturnsProducts.map((item) =>
                    item.id === product.id ? { ...item, cant: cantidadRegistrada + 1 } : item
                )
            }

            return [...prevReturnsProducts, { ...product, cant: 1 }]
        })
    }

    const handleMoreCant = (product, valueInput) => {
        const productExist = returns.find((item) => item.id === product.id)

        if (Number(valueInput) > Number(productExist?.cantidad)) {
            return showAlert('Acción no permitida', `Solo existen ${productExist?.cantidad} unidades disponibles para el producto ${product.name.toUpperCase()}`, 'warning')
        }

        setReturns(
            returns.map((item) =>
                item.id === product.id ? { ...product, cant: Number(valueInput) } : item
            )
        )
    }

    const handleDeleteProduct = (product) => {
        setReturns(returns.filter((item) => item.id !== product.id))
    }

    const rowActionsReturnTemplate = (row) => {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <PlusCircleIcon style={{ cursor: "pointer" }} onClick={() => { addReturns(row) }} />
            </div>
        )
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <p>Productos vendidos</p>
                <DataTable value={data.products}>
                    <Column field="idProduct" header="Id" sortable></Column>
                    <Column field="name" header="Nombre" sortable body={(rowData) => `${rowData.name.toUpperCase()}`}></Column>
                    <Column field="cantidad" header="Cantidad" sortable></Column>
                    <Column field="price" header="Valor" sortable body={(rowData) => `$${modifyMoney(rowData.price)}`}></Column>
                    <Column header="Accciones" body={(rowData) => rowActionsReturnTemplate(rowData)} style={{ width: '50px' }} />
                    <Column headerStyle={{ width: '4rem' }}></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.products.length > 0;
    };

    return (
        <div>
            <Navigation>
                {
                    loader ? (
                        <Loader />
                    ) : (
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <p className='m-0 h5 mt-3 mb-2'>Devoluciones</p>
                                    <p className='m-0'>Realiza y lleva un control sobre las devoluciones de productos.</p>
                                </div>
                                <div onClick={() => setVisible(true)}>
                                    <ArrowLeftIcon size={24} />
                                </div>
                            </div>
                            <div className='d-flex gap-2'>
                                <div className="shadow p-3 rounded overflow-auto position-relative h-100 mt-3 w-50">
                                    <DataTable
                                        value={products}
                                        expandedRows={expandedRows}
                                        onRowToggle={(e) => setExpandedRows(e.data)}
                                        rowExpansionTemplate={rowExpansionTemplate}
                                        dataKey="_id"
                                        tableStyle={{ minWidth: '60rem' }}
                                        paginator
                                        rows={10}
                                        rowsPerPageOptions={[5, 10, 25]}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                    >
                                        <Column expander={allowExpansion} style={{ width: '50px' }} />
                                        <Column field="usuario" header="Vendedor" style={{ width: '50px' }} />
                                        <Column field="valor" header="Valor" style={{ width: '50px' }} body={(rowData) => `$${modifyMoney(rowData.valor)}`} />
                                        <Column field="fecha" header="Fecha" style={{ width: '50px' }} />
                                    </DataTable>
                                </div>
                                <div className="shadow p-3 rounded overflow-auto position-relative h-100 mt-3 w-50">

                                </div>

                                <SideBar isVentas={true} position='right' visible={visible} setVisible={setVisible}>
                                    <div className="p-1 h-90">
                                        <p className="h6 mb-3">Productos para devolucion</p>
                                        <div>
                                            {
                                                returns.map((product) => (
                                                    <div className='position-relative' key={product.id}>
                                                        <XCircleIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteProduct(product)} className='position-absolute top-0 end-0 m-2' size={16}></XCircleIcon>
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
                                                                            value={product.cant}
                                                                            className='form-control d-block text-center m-auto'
                                                                            style={{ width: '50px' }}
                                                                            type="text"
                                                                            onChange={(e) => handleMoreCant(product, e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </SideBar>
                            </div>
                        </div>
                    )
                }

            </Navigation>
        </div>
    )
}