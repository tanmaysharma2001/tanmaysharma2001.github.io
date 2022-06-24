export { };

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

const CommentElement: HTMLSpanElement = document.querySelector("#comment") as HTMLSpanElement;
const DayHourElement: HTMLSpanElement = document.querySelector("#dayhour") as HTMLSpanElement;
const HumidityElement: HTMLSpanElement = document.querySelector("#humidity") as HTMLSpanElement;
const TempElement: HTMLSpanElement = document.querySelector("#temp") as HTMLSpanElement;
const WindElement: HTMLSpanElement = document.querySelector("#wind") as HTMLSpanElement;

function getData(): void {
    fetch(urlOfAPI).then((response) => {
        return response.json()
    }).then((data => {

        const newData: jsonData = data;
        
        // !----- Important -----!
        // Note sometimes this API crashes for unknow reasons. So please try later,
        // or please contact me if it doesn't work.
        // This code works fine.
        // Thank you...!
        CommentElement.textContent = newData.currentConditions.comment;
        DayHourElement.textContent = newData.currentConditions.dayhour;
        HumidityElement.textContent = newData.currentConditions.humidity;
        TempElement.textContent = (newData.currentConditions.temp.c).toString();
        WindElement.textContent = (newData.currentConditions.wind.km).toString();
    }))
}

getData();
