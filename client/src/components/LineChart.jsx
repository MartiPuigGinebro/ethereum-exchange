import {useEffect, useMemo, useState} from 'react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import axios from "axios";
import moment from "moment/moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,);

const LineChart = () => {
    const [ethData, setEthData] = useState([]);
    const score = [6, 7, 8, 6, 13, 12, 11, 12, 55,];
    const labels = [100, 200, 300, 400, 500, 600, 700,];

    const getData = async () => {
        const {data} = await axios.get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=eur&days=1&interval=hourly");
        setEthData(data);
    };
    useEffect(() => {
        getData().then(() => getData(ethData),).catch(() => {
            // TODO: handle error if data is not available
            console.log("error");
        });
    }, []);

    const data = useMemo(() => {
        return {
            labels: ethData.prices.map(element => moment(element[0]).format("HH:mm")) || labels,
            datasets: [{
                label: 'Ethereum',
                data: ethData.prices.map(element => element[1]) || score,
                borderColor: 'rgb(114,39,65)',
                borderWidth: 2,
            },],
        };
    }, [ethData]);

    const options = useMemo(() => ({
        responsive: true, maintainAspectRatio: false, plugins: {
            title: {
                display: true, text: 'ETH Price', padding: {
                    top: 10, bottom: 30
                }, color: "white", font: {
                    size: 16,
                }
            }, legend: {
                display: false
            },
        }, scales: {
            x: {
                display: false,
            }, y: {
                display: false,
            },
        }, interaction: {
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
