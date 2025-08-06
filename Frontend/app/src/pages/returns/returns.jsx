import { Navigation } from '../../layouts/Navigation'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { consumServices } from '../../contexts/execute'
import { keys, modifyMoney } from '../../utils'
import { useEffect, useState } from 'react'

export function Returns() {
    const [products, setProducts] = useState([])
    const [expandedRows, setExpandedRows] = useState(null);
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const productsGet = async () => {
            const resVentas = await consumServices(keys.getVentas, 'GET')
            if (resVentas.error) return console.error(resVentas.info);

            setProducts(resVentas.info.reverse())

            console.log(resVentas.info)

            setTimeout(() => {
                setLoader(false)
            }, 500);
        }

        productsGet()
    }, [])

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <p>Productos vendidos</p>
                <DataTable value={data.products}>
                    <Column field="idProduct" header="Id" sortable></Column>
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column field="cantidad" header="Cantidad" sortable></Column>
                    <Column field="price" header="Valor" sortable></Column>
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
                <p className='m-0 h5 mt-3 mb-2'>Devoluciones</p>
                <p className='m-0'>Realiza y lleva un control sobre las devoluciones de productos.</p>
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
                            <Column field="usuario" header="Vendedor" style={{width: '50px'}} />
                            <Column field="valor" header="Valor" style={{width: '50px'}} body={(rowData) => `$${modifyMoney(rowData.valor)}`}/>
                            <Column field="fecha" header="Fecha" style={{width: '50px'}}  />
                        </DataTable>
                    </div>
                    <div className="shadow p-3 rounded overflow-auto position-relative h-100 mt-3 w-50">

                    </div>
                </div>
            </Navigation>
        </div>
    )
}