import { PencilIcon, TrashIcon } from "@primer/octicons-react";

export default function ActionsTemplate(onEdit, onDelete, item) {
    return (
        <div className="d-flex justify-content-center align-items-center gap-3">
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
    )
} 