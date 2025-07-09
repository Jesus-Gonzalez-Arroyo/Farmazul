import { FileIcon } from "@primer/octicons-react";
import { Tag } from "primereact/tag";
import { ProductsVendidosModel } from "../models";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

function getMethodPay(method) {
    switch (method) {
        case 'Efectivo':
            return 'success';
        default:
            return 'info';
    }
}

const methodBodyTemplate = (rowData) => {
    return <Tag value={rowData.method} severity={getMethodPay(rowData.method)} />;
};


const calendarFilterTemplate = (date, setDate) => {
    return (
        <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat='dd/mm/yy' />
    )
}

const statusRowFilterTemplate = (options, methodsPay) => {
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

const productsTemplate = (rowData, setProductsVendidos) => (
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

export { methodBodyTemplate, calendarFilterTemplate, productsTemplate, statusRowFilterTemplate }
