import React from 'react';
import { store, inc, dec } from '../store';
import "./stocks.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default class HistoryStocks extends React.Component {

    render() {
        if (this.props.stockHistory.length === 0) {
            return "hey";
        }
        else {
            console.log(this.props.stockHistory)
            const chartData = {
                labels: this.props.stockHistory.map(data => data.Date),
                datasets: [{
                    label: "open",
                    data: this.props.stockHistory.map(data => data.Open.slice(1)),
                    borderColor: "#61dafb",
                }]
            }

            const table = this.props.stockHistory.map(data =>
                <tr key={data.Date}>
                    <td> <p className="day">{data.Date}</p> </td><td> {data.Open}</td>
                </tr>);
            return (
                <>
                    <Line data={chartData} />
                    <table>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </>
            )
        }
    }


}