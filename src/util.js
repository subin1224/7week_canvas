const _ON = "1";
const _OFF = "0";

const radion = function (degree) {
    return degree * Math.PI/180 ;
}

const degree = function (data) {
    return (2.7 * data).toFixed(1);
}

const data = function () {
    return (Math.round((Math.random() * 1001))/10).toFixed(1);
}

const colors = [
    "rgb(163, 254, 0)", "rgb(186, 249, 72)",
    "rgb(255, 87, 51)", "rgb(201, 244, 124)",
    "rgb(218, 247, 166)", "rgb(255, 195, 0)",
    "rgb(255, 87, 51)", "rgb(199, 0, 57)",
    "rgb(144, 12, 63)", "rgb(88, 24, 69)",
]

export { radion, data, colors, _ON, _OFF, degree };