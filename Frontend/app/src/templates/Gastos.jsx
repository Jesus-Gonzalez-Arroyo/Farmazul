import { Tag } from "primereact/tag";

const statusBodyTemplate = (rowData, getStatusGastos) => {
    return <Tag value={rowData.estado} severity={getStatusGastos(rowData.estado)} />;
};

export {statusBodyTemplate}