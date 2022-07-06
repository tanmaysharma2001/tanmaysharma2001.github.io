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

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat&family=Sacramento&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="quote-section">
  <h4 class="weather-text">Today's Weather: {commentElement}</h4>
  <h5>{dayHourElement} {humidityElement} humidity</h5>
  <h5>Temperature: {tempElement}°C Wind: {windElement} km/h</h5>
</div>

<style>
  .weather-text {
    font-family: "Montserrat", sans-serif;
    color: #11999e;
  }

  .quote-section {
    position: absolute;
    top: 20px;
    right: 500px;
  }
</style>
