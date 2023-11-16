export default function converter(str){
    let numFormat = str.search(/[0-9]/g);
    let strFormat = numFormat - 1;
    let format = `${str[strFormat]}${str[numFormat]}`;

    return format;
}