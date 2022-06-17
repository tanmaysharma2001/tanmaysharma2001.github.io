export { };

var urlOfAPI = "https://weatherdbi.herokuapp.com/data/weather/innopolis";

const CommentElement: HTMLSpanElement = document.querySelector("#comment") as HTMLSpanElement;
const DayHourElement: HTMLSpanElement = document.querySelector("#dayhour") as HTMLSpanElement;
const HumidityElement: HTMLSpanElement = document.querySelector("#humidity") as HTMLSpanElement;
const TempElement: HTMLSpanElement = document.querySelector("#temp") as HTMLSpanElement;
const WindElement: HTMLSpanElement = document.querySelector("#wind") as HTMLSpanElement;

function getData(): void {
    fetch(urlOfAPI).then((response) => {
        return response.json()
    }).then((data => {
        
        // !----- Important -----!
        // Note sometimes this API crashes for unknow reasons. So please try later,
        // or please contact me if it doesn't work.
        // This code works fine.
        // Thank you...!
        CommentElement.textContent = data.currentConditions.comment;
        DayHourElement.textContent = data.currentConditions.dayhour;
        HumidityElement.textContent = data.currentConditions.humidity;
        TempElement.textContent = data.currentConditions.temp.c;
        WindElement.textContent = data.currentConditions.wind.km;
    }))
}

getData();
