import "./StatusCard.css";

function StatusCard({ prediction }) {

    if (!prediction) return null;

    const score = prediction.congestion_score;

    let status = "";
    let message = "";
    let className = "";

    if (score >= 50) {

        status = "HIGH CONGESTION";
        message = "Heavy warehouse traffic expected.";
        className = "high";

    }

    else if (score >= 40) {

        status = "MEDIUM CONGESTION";
        message = "Moderate warehouse traffic expected.";
        className = "medium";

    }

    else {

        status = "LOW CONGESTION";
        message = "Warehouse operating normally.";
        className = "low";

    }

    return (

        <section className={`status-card ${className}`}>

            <div className="status-dot"></div>

            <div>

                <h2>{status}</h2>

                <p>{message}</p>

            </div>

        </section>

    );

}

export default StatusCard;