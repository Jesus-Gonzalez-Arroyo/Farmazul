import { useState } from "react";
import { getDate, getMounth, keys, modifyMoney } from "../utils";
import { consumServices } from "../contexts/execute";

export const UseHome = () => {
    const [cantProduct, setCantProduct] = useState("");
    const [totalGastos, setTotalGastos] = useState("");
    const [totalIngresos, setTotalIngresos] = useState("");
    const [totalGanancias, setTotalGanancias] = useState("");
    const [productMasVendidos, setProductMasVendidos] = useState([]);
    const [infoDay, setInfoDay] = useState({ gananciaDay: '', productDay: '' })
    const [mes, setMes] = useState("");
    const [loader, setLoader] = useState(true);
    const [info, setInfo] = useState({
        resumLowUnits: [],
        users: [],
        resumVentas: [],
        gastosMonth: []
    });
    
    const getInfoSystem = async () => {
        try {
            const resInfo = await consumServices(keys.getInfoSystem, "GET");
            if (resInfo.error) return console.error(resInfo.info);
            setInfo(resInfo.info);

            const totalValor = resInfo.info.resumVentas.reduce((acc, venta) => {
                return acc + Number(venta.valor);
            }, 0);

            const totalGanancias = resInfo.info.resumVentas.map(venta =>
                venta.products.reduce((total, product) =>
                    total + parseInt(product.ganancia * product.cantidad, 10), 0)
            ).reduce((totalVentas, gananciaVentas) => totalVentas + gananciaVentas, 0)

            getInfoVentasInDay(resInfo.info)
            getProductVendidos(resInfo.info)
            getProductsTop(resInfo.info)
            getGastosMonth(resInfo.info.gastosMonth)

            setMes(getMounth());
            setTotalGanancias(`$${modifyMoney(totalGanancias)}`)
            setTotalIngresos(`$${modifyMoney((totalValor + totalGanancias) - totalGastos)}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };


    function getInfoVentasInDay(info) {
        const ventasForDay = []
        
        info.resumVentas.forEach((venta) => {
            if (venta.fecha === getDate()) {
                ventasForDay.push(venta)
            }
        })

        const totalGananciasForDay = ventasForDay.map(venta =>
            venta.products.reduce((total, product) =>
                total + parseInt(product.ganancia * product.cantidad, 10), 0)
        ).reduce((totalVentas, gananciaVentas) => totalVentas + gananciaVentas, 0)

        const totalIngresosForDay = ventasForDay.reduce((total, venta) => {
            return total + parseInt(venta.valor);
        }, 0);

        setInfoDay({ 
            gananciaDay: `$${ventasForDay.length === 0 ? '0' : modifyMoney(totalGananciasForDay)}`, 
            productDay: ventasForDay.length,
            ingresosDay: `$${modifyMoney(totalIngresosForDay + totalGananciasForDay)}`
        })
    }

    function getProductVendidos(info) {
        const productosPorVenta = info.resumVentas.map((venta) => {
            return venta.products.reduce(
                (acc, producto) => acc + Number(producto.cantidad),
                0
            );
        });

        const totalProductos = productosPorVenta.reduce(
            (acc, cantidad) => acc + cantidad,
            0
        );

        setCantProduct(totalProductos);
    }

    function getProductsTop(info) {
        const conteo = {};

        info.resumVentas.forEach((venta) => {
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

        const productOrdenDesc = Object.values(conteo).sort(
            (a, b) => b.cantidad_total - a.cantidad_total
        );

        setProductMasVendidos(productOrdenDesc.slice(0, 5));
    }

    function getGastosMonth(info) {
        const totalGastos = info.reduce(
            (acc, gasto) => acc + Number(gasto.price),
            0
        );

        setTotalGastos(totalGastos)
    }

    return {
        info,
        cantProduct,
        totalIngresos,
        totalGanancias,
        productMasVendidos,
        mes,
        loader,
        infoDay,
        totalGastos: `$${modifyMoney(totalGastos)}`,
        getInfoSystem
    }
}