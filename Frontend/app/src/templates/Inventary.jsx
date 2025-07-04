import { Tag } from "primereact/tag";

const unitBodyTemplate = (rowData, getUnitProducts) => {
    return <Tag value={rowData.cantidad} severity={getUnitProducts(Number(rowData.cantidad))} />;
};

export {unitBodyTemplate}