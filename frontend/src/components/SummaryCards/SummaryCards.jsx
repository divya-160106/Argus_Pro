import "./SummaryCards.css";

function SummaryCards({

    predictions,
    selectedDate

}) {

    const selectedPredictions = predictions.filter(
        p => p.date === selectedDate
    );

    const current = selectedPredictions[0];

    if (!current) return null;

    const cards = [

        {
            title: "Truck Arrivals",
            value: current.truck_arrival_rate,
            color: "purple"
        },

        {
            title: "Workers",
            value: current.workers_present,
            color: "blue"
        },

        {
            title: "Utilization",
            value: `${current.conveyor_utilization}%`,
            color: "green"
        },

        {
            title: "Weather",
            value: current.weather,
            color: "pink"
        }

    ];

    return (

        <section className="summary-grid">

            {

                cards.map((card, index) => (

                    <div
                        key={index}
                        className={`summary-card ${card.color}`}
                    >

                        <h3>{card.title}</h3>

                        <h1>{card.value}</h1>

                    </div>

                ))

            }

        </section>

    );

}

export default SummaryCards;