import { Chart } from 'primereact/chart'
import { Navigation } from '../../layouts/Navigation'
import { useEffect, useState } from 'react';
import { consumServices } from '../../contexts/execute';
import { keys } from '../../utils';
import { Calendar } from 'primereact/calendar'

export function Reports() {
    const [dataVentas, setDataVentas] = useState([])
    const [date, setDate] = useState(null)
    const [week, setWeek] = useState(null)
    const [month, setMonth] = useState(null)
    const [chartData, setChartData] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartDataMonthTorta, setChartDataMonthTorta] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const mesesNombres = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    useEffect(() => {

        async function getInfoReports() {
            const getInfo = await consumServices(keys.getVentas)

            if (getInfo.error) return console.error(getInfo)

            getTotalVentas(getInfo.info)
        }

        getInfoReports()

        const documentStyle = getComputedStyle(document.documentElement);
        const dataMonthTorta = {
            labels: ['Floratil', 'Loratadina', 'Paracetamol', 'Ibuprofeno'],
            datasets: [
                {
                    data: [80, 50, 90, 30],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartDataMonthTorta(dataMonthTorta);
        setChartOptions(options);
    }, []);

    async function getTotalVentas(info, value) {
        const months = Array.from({ length: 12 }, (_, i) => {
            const mes = String(i + 1).padStart(2, '0');
            const anioActual = new Date()
            const anioSelect = new Date(value)
            return `${mes}/${date === null ? anioActual.getFullYear() : anioSelect.getFullYear()}`;
        });

        const ventasForMonth = info.reduce((acc, venta) => {
            const [, mes, anio] = venta.fecha.split('/');
            const key = `${mes}/${anio}`;

            if (!acc[key]) {
                acc[key] = {
                    ventas: [],
                    total: 0
                };
            }

            acc[key].ventas.push(venta);
            acc[key].total += parseInt(venta.valor);
            return acc;
        }, {});

        const resume = months.map((mes) => {
            return {
                mes,
                total: ventasForMonth[mes]?.total || 0
            };
        });

        const dataMonthsGeneral = resume.map((item) => item.total)

        const data = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Ventas',
                    data: dataMonthsGeneral,
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

        setDate(value)
        setChartData(data)
        setDataVentas(info)
    }

    function getDateMonth(value) {
        const dateSelect = new Date(value)
        const monthSelect = `${dateSelect.getMonth() + 1 < 10 ? '0' : ''}${dateSelect.getMonth() + 1}`
        const anioSelect = dateSelect.getFullYear()

        const months = [
            `${dateSelect.getMonth() + 1 < 10 ? '0' : ''}${monthSelect === '01' ? '12' : Number(monthSelect) - 1}/${monthSelect === '01' ? Number(anioSelect) - 1 : anioSelect}`,
            `${monthSelect}/${anioSelect}`,
            `${dateSelect.getMonth() + 1 < 10 ? '0' : ''}${monthSelect === '12' ? '01' : Number(monthSelect) + 1}/${monthSelect === '12' ? Number(anioSelect) + 1 : anioSelect}`,
        ]

        console.log('dATE', months)

        const ventasForMonth = dataVentas.reduce((acc, venta) => {
            const [, mes, anio] = venta.fecha.split('/');
            const key = `${mes}/${anio}`;

            if (!acc[key]) {
                acc[key] = {
                    ventas: [],
                    total: 0
                };
            }

            acc[key].ventas.push(venta);
            acc[key].total += parseInt(venta.valor);
            return acc;
        }, {});

        const resume = months.map((mes) => {
            return {
                mes,
                total: ventasForMonth[mes]?.total || 0
            };
        });

        const resultado = resume.map(item => ({
            ...item,
            nameMonth: converterMonth(item.mes)
        }));

        const dataMonths = resume.map((item) => item.total)
        const dataNameMonths = resultado.map((item) => item.nameMonth)

        const dataVentasMonth = {
            labels: dataNameMonths,
            datasets: [
                {
                    label: 'Ventas',
                    data: dataMonths,
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

        setChartDataMonth(dataVentasMonth);
        setMonth(value)
    }

    const converterMonth = (mesAnio) => {
        const [mes] = mesAnio.split('/');
        const nombreMes = mesesNombres[parseInt(mes, 10) - 1];
        return `${nombreMes}`;
    };

    return (
        <div>
            <Navigation>
                <p className='m-0 h5 mt-3 mb-2'>Reportes</p>
                <p className='m-0'>Revisa tus metricas en tus ventas y demas reportes.</p>
                <div className='rounded p-3 mt-3' style={{ background: '#F0F4F8' }}>
                    <div className='mb-4'>
                        <p className='mb-2'>Selecciona el año que deseas visualizar</p>
                        <Calendar value={date} onChange={(e) => getTotalVentas(dataVentas, e.value)} view="year" dateFormat="yy" />
                    </div>
                    <p className='h5'>Tus ventas mensuales (General)</p>
                    <div className="w-100 h-25">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className='rounded p-3 mt-3' style={{ background: '#F0F4F8' }}>
                    <div>
                        <p>Selecciona el mes que deseas visualizar</p>
                        <Calendar value={month} onChange={(e) => getDateMonth(e.value)} view="month" dateFormat="mm/yy" />
                    </div>
                    <div className='w-100 mt-4 d-flex justify-content-between align-items-center gap-5'>
                        <div className="w-50 h-25">
                            <p className='h5'>Tus ventas</p>
                            <Chart className='w-100' type="line" data={chartDataMonth} options={chartOptions} />
                        </div>
                        <div className='m-auto d-block'>
                            <p className='h5'>Productos mas vendidos</p>
                            <Chart className='w-100' type="doughnut" style={{ height: '300px' }} data={chartDataMonthTorta} options={{ cutout: '60%' }} />
                        </div>
                    </div>
                </div>
                <div className='rounded p-3 mt-3' style={{ background: '#F0F4F8' }}>
                    <div>
                        <p>Selecciona la semana que deseas visualizar</p>
                        <Calendar value={week} onChange={(e) => setWeek(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                    </div>
                    <div className='w-100 mt-4 d-flex justify-content-between align-items-center gap-5'>
                        <div className="w-50 h-25">
                            <p className='h5'>Tus ventas</p>
                            <Chart className='w-100' type="bar" data={{
                                labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
                                datasets: [
                                    {
                                        label: 'Ventas',
                                        data: [54000, 32500, 20000, 180000, 95000, 100000, 19000],
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
                            }} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </Navigation>
        </div>
    )
}