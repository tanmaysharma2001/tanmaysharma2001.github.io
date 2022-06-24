<script lang="ts">
    export {};

    var urlOfAPI = "https://weatherdbi.herokuapp.com/data/weather/innopolis";

    interface jsonData {
        contact_author: Map<string, string>;
        currentConditions: currentConditions;
        data_source: string;
        next_days: nextDaysElement[];
        region: string;
    }

    interface currentConditions {
        comment: string;
        dayhour: string;
        humidity: string;
        iconURL: string;
        precip: string;
        temp: genericTemp;
        wind: genericWind;
    }

    interface nextDaysElement {
        comment: string;
        day: string;
        iconURL: string;
        max_temp: genericTemp;
        min_temp: genericTemp;
    }

    interface genericTemp {
        c: number;
        f: number;
    }

    interface genericWind {
        km: number;
        mile: number;
    }

    let commentElement: string;
    let dayHourElement: string;
    let humidityElement: string;
    let tempElement: number;
    let windElement: number;

    function getData(): void {
        fetch(urlOfAPI)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const newData: jsonData = data;

                // !----- Important -----!
                // Note sometimes this API crashes for unknow reasons. So please try later,
                // or please contact me if it doesn't work.
                // This code works fine.
                // Thank you...!
                commentElement = newData.currentConditions.comment;
                dayHourElement = newData.currentConditions.dayhour;
                humidityElement = newData.currentConditions.humidity;
                tempElement = newData.currentConditions.temp.c;
                windElement = newData.currentConditions.wind.km;
            });
    }

    getData();
</script>

<div class="quote-section">
    <h3>Today's Weather: {commentElement}</h3>
    <h4>{dayHourElement} {humidityElement} humidity</h4>
    <h4>Temperature: {tempElement}°C Wind: {windElement} km/h</h4>
</div>
