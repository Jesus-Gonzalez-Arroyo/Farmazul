import { Chart } from 'primereact/chart'
import { Navigation } from '../../layouts/Navigation'
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export function Reports() {
    const [chartData, setChartData] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartDataMonthTorta, setChartDataMonthTorta] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [selectedCity, setSelectedCity] = useState('Enero');
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    useEffect(() => {
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

        const data = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [540000, 325000, 702000, 620000, 400500, 600400, 832000, 755000, 800000, 600000, 500600, 700300],
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

        const dataVentasMonth = {
            labels: ['Ene', 'Feb'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [540000, 325000],
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

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartDataMonthTorta(dataMonthTorta);
        setChartDataMonth(dataVentasMonth);
        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div>
            <Navigation>
                <p className='m-0 h5 mt-3 mb-2'>Reportes</p>
                <p className='m-0'>Revisa tus metricas en tus ventas y demas reportes.</p>
                <div className='rounded p-3 mt-3' style={{ background: '#F0F4F8' }}>
                    <p className='h5'>Tus ventas mensuales (General)</p>
                    <div className="w-100 h-25">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className='rounded p-3 mt-3' style={{ background: '#F0F4F8' }}>
                    <div>
                        <p>Selecciona el mes que deseas visualizar</p>
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={months}
                            placeholder="Select a month" />
                    </div>
                    <div className='w-100 mt-4 d-flex justify-content-between align-items-center gap-5'>
                        <div className="w-50 h-25">
                            <p className='h5'>Tus ventas</p>
                            <Chart className='w-100' type="bar" data={chartDataMonth} options={chartOptions} />
                        </div>
                        <div className='m-auto d-block'>
                            <p className='h5'>Productos mas vendidos</p>
                            <Chart className='w-100' type="doughnut" style={{height: '300px'}} data={chartDataMonthTorta} options={{cutout: '60%'}} />
                        </div>
                    </div>
                </div>
            </Navigation>
        </div>
    )
}