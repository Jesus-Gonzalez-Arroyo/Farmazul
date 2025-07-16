import { useState, useEffect } from 'react'
import { Navigation } from "../../layouts/Navigation";
import { keys, modifyMoney } from '../../utils/index'
import { consumServices } from '../../contexts/execute'
import { Loader } from '../../components/Loader';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { TableComponent } from '../../components/tableComponent/Tables.jsx';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { methodBodyTemplate, productsTemplate } from '../../templates/ventas-realizadas.template.jsx'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "./ventas-realizadas.css";

export function VentasRealizadas() {
    const [date, setDate] = useState(null)
    const [products, setProducts] = useState([])
    const [methodsPay] = useState([
        'Efectivo',
        'Transferencia'
    ]);
    const [productsVendidos, setProductsVendidos] = useState([])
    const [loader, setLoader] = useState(true)
    const [filters, setFilters] = useState({
        usuario: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fecha: { value: null, matchMode: FilterMatchMode.DATE_IS },
        valor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        recibido: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        method: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const parseDate = (str) => {
        const [day, month, year] = str.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    useEffect(() => {
        const productsGet = async () => {
            const resVentas = await consumServices(keys.getVentas, 'GET')
            if (resVentas.error) return console.error(resVentas.info);

            resVentas.info.forEach((item) => {
                item.fecha = parseDate(item.fecha)
            })
            setProducts(resVentas.info.reverse())

            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [])

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

    const onCalendarChange = (e, field) => {
        const selectedDate = e.value;
        setDate(selectedDate);

        const _filters = { ...filters };
        _filters[field].value = selectedDate;
        setFilters(_filters);
    };

    const calendarFilterTemplate = (options) => {
        return (
            <Calendar
                value={date}
                onChange={(e) => {
                    onCalendarChange(e, options?.field || 'fecha');
                    if (options?.filterApplyCallback) {
                        options.filterApplyCallback(e.value);
                    }
                }}
                dateFormat="dd/mm/yy"
                placeholder="Seleccione fecha"
                appendTo={document.body}
            />
        );
    };


    const formatDate = (value) => {
        if (!value) return '';
        return new Intl.DateTimeFormat('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(value);
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.fecha);
    };

    return (
        <Navigation>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="d-flex w-100 h-15 gap-4 mb-10">
                            <div className="w-100">
                                <p className="m-0 mt-3 h5">Ventas realizadas</p>
                                <p className='m-0 mt-2 mb-3'>Revisa las ventas que se han realizado en los ultimos dias.</p>
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
                                            filterField='usuario'
                                            filter
                                            filterPlaceholder="Search by name"
                                            showFilterMenu={false}
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='fecha'
                                            header="Fecha"
                                            filter
                                            filterPlaceholder="Search by date"
                                            filterElement={calendarFilterTemplate}
                                            body={(rowData) => dateBodyTemplate(rowData)}
                                            showFilterMenu={false}
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='valor'
                                            header="Valor"
                                            body={(rowData) => `$${modifyMoney(rowData.valor)}`}
                                            sortable
                                            filter
                                            filterPlaceholder="Search by price"
                                            showFilterMenu={false}
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='descuent'
                                            header="Descuento"
                                            body={(rowData) => `$${modifyMoney(rowData.descuent)}`}
                                            sortable
                                            style={{ minWidth: '10rem' }}
                                        />
                                        <Column
                                            field='recibido'
                                            header="Recibido"
                                            body={(rowData) => `$${modifyMoney(rowData.recibido)}`}
                                            sortable
                                            filter
                                            filterPlaceholder="Search by price"
                                            showFilterMenu={false}
                                            style={{ minWidth: '12rem' }}
                                        />
                                        <Column
                                            field='method'
                                            header="Metodo de pago"
                                            body={(rowData) => methodBodyTemplate(rowData)}
                                            filterElement={statusRowFilterTemplate}
                                            filter
                                            filterPlaceholder="Search by price"
                                            showFilterMenu={false}
                                            style={{ minWidth: '15rem' }}
                                        />
                                        <Column
                                            field='products'
                                            header="Productos vendidos"
                                            body={(rowData) => productsTemplate(rowData, setProductsVendidos)}
                                            style={{ minWidth: '8rem' }}
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
