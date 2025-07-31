import { useState } from "react"

export const UseReports = () => {
    const [loader, setLoader] = useState(true)
    const [dataVentas, setDataVentas] = useState([])
    const [date, setDate] = useState(null)
    const [week, setWeek] = useState(null)
    const [month, setMonth] = useState(null)
    const [chartData, setChartData] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartDataWeek, setChartDataWeek] = useState({})
    const [chartDataMonthTorta, setChartDataMonthTorta] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const monthsName = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    /**
     * @name groupSalesByMonth
     * @description Agrupa todas las ventas de los meses y saca el total
     * @param {Array} sales ventas realizadas
     * @returns {Array} con las ventas que correspondan al mes seleccionado
     */

    function groupSalesByMonth(sales) {
        return sales.reduce((acc, venta) => {
            const [, mes, anio] = venta.fecha.split('/');
            const key = `${mes}/${anio}`;

            if (!acc[key]) {
                acc[key] = {
                    ventas: [],
                    total: 0
                };
            }

            acc[key].ventas.push(venta);
            acc[key].total += parseInt(venta.valor, 10);

            return acc;
        }, {});
    }

    function getTotalGananciasMonth(sales) {
        return sales.reduce((acc, venta) => {
            const [, mes, anio] = venta.fecha.split('/');
            const key = `${mes}/${anio}`;

            if (!acc[key]) {
                acc[key] = {
                    ventas: [],
                    total: 0
                };
            }

            acc[key].ventas.push(venta);
            acc[key].total += venta.products.reduce((total, product) => {
                return total + parseInt(product.ganancia * product.cantidad, 10);
            }, 0);

            return acc;
        }, {});
    }

    //#region getInfoFullMonths

    async function getTotalVentas(info, value) {
        const selectedDate = value ? new Date(value) : new Date();
        const months = getAllMonthsOfYear(selectedDate);
        const groupedSales = groupSalesByMonth(info);
        console.log('groupedSales', groupedSales);
        const gananciasSales = getTotalGananciasMonth(info);
        console.log('gananciasSales', gananciasSales);
        const monthlyTotals = buildMonthlyTotals(months, groupedSales, gananciasSales);
        const chartData = buildChartData(monthlyTotals);

        setDate(value);
        setChartData(chartData);
        setDataVentas(info);
    }

    function getAllMonthsOfYear(selectedDate) {
        const year = selectedDate.getFullYear();
        return Array.from({ length: 12 }, (_, i) => {
            const mes = String(i + 1).padStart(2, '0');
            return `${mes}/${year}`;
        });
    }

    function buildMonthlyTotals(months, groupedSales, gananciasSales) {
        return months.map((mes) => ({
            mes,
            total: groupedSales[mes]?.total + gananciasSales[mes]?.total || 0
        }));
    }

    function buildChartData(monthlyTotals) {
        return {
            labels: monthsName,
            datasets: [
                {
                    label: 'Ventas',
                    data: monthlyTotals.map((item) => item.total),
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    }

    //#region getInfoMonth

    function getDateMonth(value, info) {
        const selectedDate = new Date(value);
        const month = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`;

        const months = getSurroundingMonths(selectedDate);
        const groupedSales = groupSalesByMonth(info);
        const gananciasSalesMonth = getTotalGananciasMonth(info);
        const monthlySummary = buildMonthlySummary(months, groupedSales, gananciasSalesMonth);
        const chartData = buildMonthChartData(monthlySummary);
        const dataMonthTorta = getProductsTop(groupedSales[month]?.ventas || [])
        const chartDataProductsTop = buildChartDataProductsTop(dataMonthTorta);

        setChartDataMonth(chartData);
        setMonth(value);
        setChartDataMonthTorta(chartDataProductsTop);
    }

    function formatMonth(month) {
        return String(month).padStart(2, '0');
    }

    function getSurroundingMonths(date) {
        const currentMonth = date.getMonth() + 1;
        const year = date.getFullYear();

        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

        const prevYear = currentMonth === 1 ? year - 1 : year;
        const nextYear = currentMonth === 12 ? year + 1 : year;

        return [
            `${formatMonth(prevMonth)}/${prevYear}`,
            `${formatMonth(currentMonth)}/${year}`,
            `${formatMonth(nextMonth)}/${nextYear}`
        ];
    }

    function buildMonthlySummary(months, groupedSales, gananciasSales) {
        return months.map((mes) => ({
            mes,
            total: groupedSales[mes]?.total + gananciasSales[mes]?.total || 0,
            nameMonth: converterMonth(mes)
        }));
    }

    function buildMonthChartData(summary) {
        return {
            labels: summary.map((item) => item.nameMonth),
            datasets: [
                {
                    label: 'Ventas',
                    data: summary.map((item) => item.total),
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    }

    function buildChartDataProductsTop(infoProducts) {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: infoProducts.map((item) => item.name.toUpperCase()),
            datasets: [
                {
                    data: infoProducts.map((item) => item.cantidad_total),
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--purple-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--purple-500')
                    ]
                }
            ]
        }
    }

    const converterMonth = (mesAnio) => {
        const [mes] = mesAnio.split('/');
        const nombreMes = monthsName[parseInt(mes, 10) - 1];
        return `${nombreMes}`;
    };

    function getProductsTop(info) {
        const conteo = {};

        info.forEach((venta) => {
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

        return productOrdenDesc.slice(0, 5);
    }

    //#endregion getInfoMonth

    //#region getInfoWeek

    function getDateWeek(value = null) {
        if (!value || value.length !== 2) return;

        const [startDate, endDate] = value.map(d => new Date(d));

        const ventasFiltradas = filterSalesByDateRange(dataVentas, startDate, endDate);
        const ventasAgrupadas = groupSalesByDay(ventasFiltradas);
        const rangoDias = getDateRange(startDate, endDate);
        const ventasArray = Object.entries(ventasAgrupadas).map(([fecha, data]) => ({
            fecha,
            ...data
        }));
        const gananciasTotal = getTotalGananciasDays(ventasArray)

        const resumenSemana = rangoDias.map((dia) => ({
            day: dia,
            total: ventasAgrupadas[dia.date]?.total + gananciasTotal[dia.date] || 0
        }));

        const chartData = dataWeekGrafic(resumenSemana);

        setChartDataWeek(chartData);
        setWeek(value);
    }

    function formatDate(date) {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    function getDayName(date) {
        const nombreDia = date.toLocaleDateString('es-ES', { weekday: 'long' });
        return nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
    }

    function getDateRange(start, end) {
        const dias = [];
        let tempDate = new Date(start);
        while (tempDate <= end) {
            dias.push({
                date: formatDate(tempDate),
                nameDay: getDayName(tempDate)
            });
            tempDate.setDate(tempDate.getDate() + 1);
        }
        return dias;
    }

    function filterSalesByDateRange(ventas, startDate, endDate) {
        return ventas.filter(({ fecha }) => {
            const [d, m, y] = fecha.split('/');
            const fechaVenta = new Date(`${y}-${m}-${d}`);
            return fechaVenta >= startDate && fechaVenta <= endDate;
        });
    }

    function groupSalesByDay(ventas) {
        return ventas.reduce((acc, venta) => {
            const key = venta.fecha;
            if (!acc[key]) {
                acc[key] = { ventas: [], total: 0 };
            }
            acc[key].ventas.push(venta);
            acc[key].total += parseInt(venta.valor, 10);
            return acc;
        }, {});
    }

    function getTotalGananciasDays(sales) {
        const result = {};

        for (const fecha in sales) {
            const infoDia = sales[fecha];
            const ventas = infoDia.ventas || [];

            let totalGananciaDia = 0;

            ventas.forEach(venta => {
                venta.products.forEach(producto => {
                    const ganancia = parseInt(producto.ganancia * producto.cantidad, 10) || 0;
                    totalGananciaDia += ganancia;
                });
            });

            result[sales[fecha].fecha] = totalGananciaDia;
        }

        return result;
    }


    function dataWeekGrafic(summary) {
        return {
            labels: summary.map((d) => d.day.nameDay),
            datasets: [
                {
                    label: 'Ventas',
                    data: summary.map((d) => d.total),
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    }

    return {
        loader,
        week,
        month,
        chartData,
        chartDataMonth,
        chartDataWeek,
        chartOptions,
        chartDataMonthTorta,
        date,
        dataVentas,
        setLoader,
        setChartDataMonthTorta,
        setChartOptions,
        getTotalVentas,
        getDateMonth,
        getDateWeek
    }
}