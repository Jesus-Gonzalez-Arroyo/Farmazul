import { Chart } from 'primereact/chart'
import { Navigation } from '../../layouts/Navigation'
import { useEffect } from 'react';
import { consumServices } from '../../contexts/execute';
import { keys } from '../../utils';
import { Calendar } from 'primereact/calendar'
import { UseReports } from '../../hooks/useReports';
import { Loader } from '../../components/Loader';

export function Reports() {

    const {
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
        setChartOptions,
        getTotalVentas,
        getDateMonth,
        getDateWeek
    } = UseReports()

    useEffect(() => {
        const day = new Date();
        const oneDayMonth = new Date(day.getFullYear(), day.getMonth(), 1);

        async function getInfoReports() {
            const getInfo = await consumServices(keys.getVentas)

            if (getInfo.error) return console.error(getInfo)

            getTotalVentas(getInfo.info, new Date())
            getDateMonth(oneDayMonth, getInfo.info)
            setLoader(false)
        }

        getInfoReports()

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartOptions(options);
    }, []);

    return (
        <div>
            <Navigation>
                {
                    loader ? <Loader /> : (
                        <>
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
                                    <Calendar value={month} onChange={(e) => getDateMonth(e.value, dataVentas)} view="month" dateFormat="mm/yy" />
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
                                    <Calendar value={week} onChange={(e) => getDateWeek(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                                </div>
                                <div className='w-100 mt-4 d-flex justify-content-between align-items-center gap-5'>
                                    <div className="w-50 h-25">
                                        <p className='h5'>Tus ventas</p>
                                        <Chart className='w-100' type="bar" data={chartDataWeek} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </Navigation>
        </div>
    )
}