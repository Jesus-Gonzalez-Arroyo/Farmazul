export function getMounth() {
    const fecha = new Date();
    let mes = fecha.toLocaleString("es-ES", { month: "long" });
    return mes = mes.charAt(0).toUpperCase() + mes.slice(1);
}

export function getDate() {
    const fecha = new Date();
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate() + 1).padStart(2, '0');

    return `${dd}/${mm}/${yyyy}`
}