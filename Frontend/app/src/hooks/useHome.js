import { useState } from "react";
import { getMounth, keys } from "../utils";
import { consumServices } from "../contexts/execute";

export const UseHome = () => {
    const [info, setInfo] = useState({
        resumLowUnits: [],
        users: [],
        resumVentas: [],
    });
    const [cantProduct, setCantProduct] = useState("");
    const [totalIngresos, setTotalIngresos] = useState("");
    const [totalGanancias, setTotalGanancias] = useState("");
    const [productMasVendidos, setProductMasVendidos] = useState([]);
    const [mes, setMes] = useState("");
    const [loader, setLoader] = useState(true);

    const getInfoSystem = async () => {
        try {
            const conteo = {};
            const resInfo = await consumServices(keys.getInfoSystem, "GET");
            if (resInfo.error) return console.error(resInfo.info);
            setInfo(resInfo.info);

            const productosPorVenta = resInfo.info.resumVentas.map((venta) => {
                return venta.products.reduce(
                    (acc, producto) => acc + Number(producto.cantidad),
                    0
                );
            });

            const totalProductos = productosPorVenta.reduce(
                (acc, cantidad) => acc + cantidad,
                0
            );

            const totalValor = resInfo.info.resumVentas.reduce((acc, venta) => {
                return acc + Number(venta.valor);
            }, 0);

            const totalGanancias = resInfo.info.resumVentas.map(venta =>
                venta.products.reduce((total, product) =>
                    total + parseInt(product.ganancia, 10), 0)
            ).reduce((totalVentas, gananciaVentas) => totalVentas + gananciaVentas, 0)

            resInfo.info.resumVentas.forEach((venta) => {
                venta.products.forEach((producto) => {
                    const id = producto.id;
                    const cantidad = parseInt(producto.cantidad, 10);
                    const name = producto.name;

                    if (!conteo[id]) {
                        conteo[id] = {
                            id,
                            name,
                            cantidad_total: 0,
                        };
                    }

                    conteo[id].cantidad_total += cantidad;
                });
            });

            const ordenados = Object.values(conteo).sort(
                (a, b) => b.cantidad_total - a.cantidad_total
            );

            const totalGananciasMes = totalValor + totalGanancias

            setMes(getMounth());
            setProductMasVendidos(ordenados);
            setTotalGanancias(`$${totalGanancias.toLocaleString()}`)
            setTotalIngresos(`$${totalGananciasMes.toLocaleString()}`);
            setCantProduct(totalProductos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    return {
        info,
        cantProduct,
        totalIngresos,
        totalGanancias,
        productMasVendidos,
        mes,
        loader,
        getInfoSystem
    }
}