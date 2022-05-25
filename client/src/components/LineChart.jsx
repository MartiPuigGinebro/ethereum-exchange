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
    const score = [1844, 1866, 1877, 1811, 1844, 1855, 1849, 1780, 1880, 1883, 1669, 1888, 1844, 1866, 1877, 1811, 1844, 1855, 1849, 1780, 1880, 1883, 1669, 1888,];
    const labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    const getData = async () => {
        const {data} = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=1&interval=hourly");
        setEthData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const data = useMemo(() => {
        return {
            labels: /*ethData.prices.map(element => moment(element[0]).format("HH:mm")) || */labels,

            datasets: [{
                label: 'Ethereum',
                data: /*ethData.prices.map(element => element[1]) ||*/ score,
                borderColor: 'rgb(114,39,65)',
                borderWidth: 2,
            },],
        };
    }, [ethData]);

    const options = useMemo(() => ({
        responsive: true, maintainAspectRatio: false,

        plugins: {
            title: {
                display: true, text: 'ETH Price', padding: {
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

    return (<Line
        data={data}
        options={options}
        width={100}
        height={100}
    />);
};

export default LineChart;
