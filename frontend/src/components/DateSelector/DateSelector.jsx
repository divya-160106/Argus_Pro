import "./DateSelector.css";

function DateSelector({

    dates,
    selectedDate,
    onChange

}) {

    return (

        <div className="date-section">

            <label htmlFor="date-select">Select Date</label>

            <select

                id="date-select"
                value={selectedDate}

                onChange={(e)=>onChange(e.target.value)}

            >

                {dates.map(date=>

                    <option
                        key={date}
                        value={date}
                    >
                        {date}
                    </option>

                )}

            </select>

        </div>

    );

}

export default DateSelector;