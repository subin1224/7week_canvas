const DEFAULT  =   "0";
const ON   =   "1";
const OFF  =   "2";

const mousePos = {x: 0, y: 0};

//랜덤값 데이터 0.0 ~ 100.0
const data = function () {
    return parseFloat(((Math.floor(Math.random() * 1001))/10).toFixed(1));
}

//게이지 퍼센트에 따른 컬러 코드
const colors = [
    "#4b45ab", "#554fb8", "#605ac7", "#2a91a8", "#2e9ab2",
    "#32a5bf", "#81b144", "#85b944", "#8fc549", "#e0af27", "#ffff00"
]

export { DEFAULT, ON, OFF, mousePos, data, colors };