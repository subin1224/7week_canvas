const DEFAULT  =   "0";
const ON   =   "1";
const OFF  =   "2";
const mousePos = {x: 0, y: 0};

const radion = function (degree) {
    return degree * Math.PI/180 ;
}

const degree = function (data) {
    return (2.7 * data).toFixed(1);
}

const data = function () {
    return parseFloat(((Math.floor(Math.random() * 1001))/10).toFixed(1));
}

const colors = [
    "#4b45ab", "#554fb8", "#605ac7", "#2a91a8", "#2e9ab2",
    "#32a5bf", "#81b144", "#85b944", "#8fc549", "#e0af27"
]

export { mousePos, radion, data, colors, ON, OFF, DEFAULT, degree };