export function getMounth() {
    const fecha = new Date();
    let mes = fecha.toLocaleString("es-ES", { month: "long" });
    return mes = mes.charAt(0).toUpperCase() + mes.slice(1);
}