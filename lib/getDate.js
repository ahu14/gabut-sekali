import moment from "moment";

export let getDate = () => {
    return moment()._d.toString();
}

export let setDate = (date) => {
    let date2 = moment.unix(date);    
    return date2.fromNow();
}

export let setDateFormat = (date) => {
    let date2 = moment.unix(date);
    return `${date2.date()}/${date2.month()+1}/${date2.year()} ${date2.hour()}:${date2.minute()}`
}