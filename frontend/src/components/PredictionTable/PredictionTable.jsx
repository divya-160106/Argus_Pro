import "./PredictionTable.css";

function PredictionTable({ data }) {

    return (

        <div className="prediction-table-container">

            <div className="table-title">
                PREDICTION LOG
            </div>

            <table className="prediction-table">

                <thead>

                    <tr>
                        <th>Timestamp</th>
                        <th>Hour</th>
                        <th>Day</th>
                        <th>Weather</th>
                        <th>Congestion Score</th>
                        <th>Incoming Packages</th>
                        <th>Conveyor Utilization</th>
                        <th>Avg Processing Time</th>
                        <th>Processed Packages</th>
                        <th>Queue Length</th>
                        <th>Occupied Docks</th>
                    </tr>

                </thead>


                <tbody>

                    {data.map((item) => (

                        <tr key={item.timestamp}>

                            <td>{item.timestamp}</td>

                            <td>
                                {item.hour}:00
                            </td>

                            <td>
                                {item.day}
                            </td>

                            <td>
                                {item.weather}
                            </td>

                            <td>
                                {item.congestion_score}
                            </td>

                            <td>
                                {item.total_incoming_packages}
                            </td>

                            <td>
                                {item.conveyor_utilization.toFixed(2)}%
                            </td>

                            <td>
                                {item.avg_processing_time.toFixed(2)} hrs
                            </td>

                            <td>
                                {item.processed_packages}
                            </td>

                            <td>
                                {item.queue_length}
                            </td>

                            <td>
                                {item.occupied_docks}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default PredictionTable;