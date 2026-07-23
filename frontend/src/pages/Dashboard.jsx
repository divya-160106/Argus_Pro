import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero/Hero";
import DateSelector from "../components/DateSelector/DateSelector";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import StatusCard from "../components/StatusCard/StatusCard";
import PredictionTable from "../components/PredictionTable/PredictionTable";
import WarehouseTable from "../components/WarehouseTable/WarehouseTable";
import "./Dashboard.css";


function Dashboard() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("");
    const [warehouseData, setWarehouseData] = useState([]);
    const [warehousePage, setWarehousePage] = useState(1);
    const [warehouseTotalPages, setWarehouseTotalPages] = useState(1);

    // Predict endpoint
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/predict")
            .then((res) => {
                console.log(res.data);
                setPredictions(res.data);
                if (res.data.length > 0) {
                    setSelectedDate(res.data[0].date);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    const dates = useMemo(() => {
        return [...new Set(predictions.map(p => p.date))];
    }, [predictions]);


    const filteredPredictions = useMemo(() => {
        return predictions.filter(
            p => p.date === selectedDate
        );
    }, [predictions, selectedDate]);


    // Warehouse endpoint

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/warehouse?page=${warehousePage}`)
            .then((res) => {
                setWarehouseData(res.data.data);
                setWarehouseTotalPages(res.data.total_pages);
            });
    }, [warehousePage]);

    if (loading)
        return <h2>Loading...</h2>;


    return (

        <div className="dashboard">
            <Hero />
            <DateSelector dates={dates}
                selectedDate={selectedDate}
                onChange={setSelectedDate}
            />
            <SummaryCards
                predictions={filteredPredictions}
            />
            <PredictionTable
                data={filteredPredictions}
            />
            
            <WarehouseTable
                data={warehouseData}
            />

            <div className="pagination">
                <button
                    disabled={warehousePage === 1}
                    onClick={() => setWarehousePage(warehousePage - 1)}
                >
                    ◀ Prev
                </button>
                <select
                    value={warehousePage}
                    onChange={(e) => setWarehousePage(Number(e.target.value))}
                >
                    {Array.from(
                        { length: warehouseTotalPages },
                        (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Page {i + 1}
                            </option>
                        )
                    )}
                </select>
                <button
                    disabled={warehousePage === warehouseTotalPages}
                    onClick={() => setWarehousePage(warehousePage + 1)}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
