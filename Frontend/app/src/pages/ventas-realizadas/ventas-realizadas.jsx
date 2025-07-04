import { useState, useEffect } from 'react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { FileIcon } from '@primer/octicons-react';
import { ProductsVendidosModel } from '../../models/productsVendidosModel.js';
import { TableComponent } from '../../components/tableComponent/Tables.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "./ventas-realizadas.css";

export function VentasRealizadas() {
    const [products, setProducts] = useState([])
    const [methodsPay] = useState([
        'Efectivo',
        'Transferencia'
    ]);
    const [productsVendidos, setProductsVendidos] = useState([])
    const [loader, setLoader] = useState(true)
    const [filters] = useState({
        usuario: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fecha: { value: null, matchMode: FilterMatchMode.CONTAINS },
        valor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        recibido: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        method: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const methodPaymentTemplate = (rowData) => (
        <div className={`p-2 rounded text-white ${rowData.method === 'Efectivo' ? 'bg-success' : 'bg-primary'}`}>
            {rowData.method}
        </div>
    )

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={methodsPay}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select One"
                className="p-column-filter"
                showClear
                style={{ minWidth: '12rem' }}
            />
        );
    };

    const productsTemplate = (rowData) => (
        <div className='d-flex justify-content-center align-items-center'>
            <FileIcon
                onClick={() => setProductsVendidos(rowData.products.map((item) => (
                    new ProductsVendidosModel(item)
                )))}
                size={24}
                data-bs-toggle="modal"
                data-bs-target="#showProducts"
            />
        </div>
    )

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

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="d-flex w-100 h-15 gap-4 mb-10">
                            <div className="w-100">
                                <p className="m-0 my-3 h5">Ventas realizadas</p>
                                <div className="shadow p-3 rounded">
                                    <DataTable
                                        value={products}
                                        paginator
                                        rows={10}
                                        dataKey="id"
                                        filters={filters}
                                        filterDisplay="row"
                                        emptyMessage="No customers found."
                                    >
                                        <Column
                                            field="usuario"
                                            header="Vendedor"
                                            filter
                                            filterPlaceholder="Search by name"
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='fecha'
                                            header="Fecha"
                                            filter
                                            sortable
                                            filterMatchMode="date"
                                            filterPlaceholder="Search by date"
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='valor'
                                            header="Valor"
                                            body={(rowData) => `$${modifyMoney(rowData.valor)}`}
                                            sortable
                                            filter
                                            filterPlaceholder="Search by price"
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='recibido'
                                            header="Recibido"
                                            body={(rowData) => `$${modifyMoney(rowData.recibido)}`}
                                            sortable
                                            filter
                                            filterPlaceholder="Search by price"
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='method'
                                            header="Metodo de pago"
                                            body={(rowData) => methodPaymentTemplate(rowData)}
                                            filterElement={statusRowFilterTemplate}
                                            filter
                                            filterPlaceholder="Search by price"
                                            style={{ minWidth: '15rem' }}
                                        />
                                        <Column
                                            field='products'
                                            header="Productos vendidos"
                                            body={(rowData) => productsTemplate(rowData)}
                                            style={{ minWidth: '12rem' }}
                                        />
                                    </DataTable>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="showProducts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Productos vendidos</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <TableComponent
                                            heads={[
                                                { label: "Id", key: "id" },
                                                { label: 'Producto', key: 'name' },
                                                { label: 'Cantidad', key: 'cantidad' },
                                                { label: 'Precio', key: 'price', render: (val) => `$${modifyMoney(val)}` }
                                            ]}
                                            IdView={true}
                                            items={productsVendidos}
                                            elementForPage={5}
                                            pageActual={1}
                                            actions={false}
                                        />
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
