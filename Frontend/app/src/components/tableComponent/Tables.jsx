import { TrashIcon, PencilIcon } from "@primer/octicons-react";
import '../tableComponent/Table.css';
import { useEffect, useState } from "react";

export function TableComponent({ heads, items, onEdit, onDelete, actions = true, IdView = false, elementForPage, pageActual }) {
    const [pageSlice, setPageSlice] = useState([])

    useEffect(() => {
        const elementosPorPagina = elementForPage;

        const inicio = (pageActual - 1) * elementosPorPagina;
        const datosPagina = items.slice(inicio, inicio + elementosPorPagina);

        setPageSlice(datosPagina)
    }, [pageActual, setPageSlice, items, elementForPage])


    return (
        <div>
            <table className="table table-striped position-relative">
                <thead>
                    <tr>
                        {!IdView && <th>#</th>}
                        {heads.map((head, idx) => (
                            <th key={idx}>{head.label}</th>
                        ))}
                        {actions && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {pageSlice.map((item, index) => (
                        <tr key={item._id}>
                            {!IdView && <td>{index + 1}</td>}
                            {heads.map((head, idx) => (
                                <td key={idx}>
                                    {
                                        typeof head.render === 'function'
                                            ? head.render(item[head.key], item)
                                            : item[head.key].toUpperCase()
                                    }
                                </td>
                            ))}
                            {actions && (
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <PencilIcon
                                            size={16}
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit"
                                            onClick={() => onEdit(item)}
                                        />
                                        <TrashIcon
                                            size={16}
                                            data-bs-toggle="modal"
                                            data-bs-target="#delete"
                                            onClick={() => onDelete(item)}
                                        />
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}