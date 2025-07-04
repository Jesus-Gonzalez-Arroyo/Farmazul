import Swal from "sweetalert2";

export function Alerts(title, text, icon = 'success') {
    Swal.fire({
        title,
        text,
        icon,
        timer: 5000
    })
}

export function Dialog(onConfirm) {
  Swal.fire({
    title: "¿Está seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (typeof onConfirm === 'function') {
        await onConfirm()
      }
    }
  });
}
