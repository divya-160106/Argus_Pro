import "./WarehouseTable.css";

function WarehouseTable({

    data,

}) {

    return (

        <section className="warehouse-table">

            <h2>WAREHOUSE RECORDS</h2>

            <table>

                <thead>

                    <tr>
                        <th>Timestamp</th>
                        <th>Time</th>
                        <th>Truck Arrivals</th>
                        <th>Incoming</th>
                        <th>Processed</th>
                        <th>Queue</th>
                        <th>Workers</th>
                        <th>Utilization</th>
                        <th>Weather</th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((row) => (

                        <tr key={row.timestamp}>
                            <td>{row.timestamp}</td>
                            <td>{row.date} {row.hour}:00</td>
                            <td>{row.truck_arrival_rate}</td>
                            <td>{row.total_incoming_packages}</td>
                            <td>{row.processed_packages}</td>
                            <td>{row.queue_length}</td>
                            <td>{row.workers_present}</td>
                            <td>{row.conveyor_utilization}%</td>
                            <td>{row.weather}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </section>

    );

}

export default WarehouseTable;