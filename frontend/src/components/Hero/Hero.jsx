import "./Hero.css";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-left">

                <h1>Argus</h1>

                <h2>Warehouse Congestion Prediction</h2>

                <p>
                    AI powered congestion forecasting
                </p>

            </div>

            <div className="hero-right">

                <div className="terminal">

                    <p><span>MODEL</span> : GRU</p>
                    <p><span>STATUS</span> : ONLINE</p>
                    <p><span>FORECAST</span> : 168 HOURS</p>
                    <p><span>ENGINE</span> : ONNX Runtime</p>

                </div>

            </div>

        </section>
    );
}

export default Hero;