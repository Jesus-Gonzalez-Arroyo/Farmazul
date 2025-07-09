import { Tag } from "primereact/tag";

const statusBodyTemplate = (rowData, getStatusGastos) => {
    return <Tag value={rowData.estado} severity={getStatusGastos(rowData.estado)} />;
};

const typeBodyTemplate = (rowData, getStatusGastos) => {
    return <Tag value={rowData.type} severity={getStatusGastos(rowData.type)} />;
};

export {statusBodyTemplate, typeBodyTemplate}