import {useEffect, useMemo, useState} from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import axios from "axios";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);

const LineChart = () => {
    const [ethData, setEthData] = useState(['', '']);
    const [ethPrices, setEthPrices] = useState([]);
    const [ethHourLabel, setEthHourLabel] = useState([]);

    /**
     * Obtiene los datos de la API y establece el estado del componente.
     */
    const getData = async () => {
        await axios.get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=1&interval=hourly")
            .then(res => {
                const data = res.data;
                setEthData(data);
                setEthPrices(data.prices);
                if (data.prices?.length > 0) {
                    const hourLabel = data.prices.map(price => moment(price.x).format("HH:mm"));
                    setEthHourLabel(hourLabel);
                }
            });
    };

    useEffect(() => {
        getData();
    }, []);

    /* Datos de la gráfica. */
    const data = useMemo(() => {

        return {
            labels: ethHourLabel,

            datasets: [{
                label: 'Ethereum',
                data: ethPrices,
                borderColor: 'rgb(114,39,65)',
                borderWidth: 2,
            },],
        };
    }, [ethData]);

    /* Opciones de la gráfica. */
    const options = useMemo(() => ({
        responsive: true, maintainAspectRatio: false,

        plugins: {
            title: {
                display: true, text: 'ETH price last 24h in €', padding: {
                    top: 10, bottom: 30
                }, color: "white", font: {
                    size: 16,
                }
            }, legend: {
                display: false
            },
        },

        scales: {
            x: {
                display: false,
            }, y: {
                display: false,
            },
        },

        interaction: {
            intersect: false, mode: 'index',
        },
    }), []);

    /* Devolviendo el gráfico. */
    return (<Line
        data={data}
        options={options}
        width={100}
        height={100}
    />);
};

export default LineChart;
