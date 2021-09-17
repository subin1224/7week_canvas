//각도 -> 라디안 으로 변경
const radion = function (degree) {
    return ( degree * Math.PI/180 );
}

//percent에 따른 각도 - 0.1% 마다 2.7도씩 이동
const degree = function (data) {
    return ( 2.7 * data );
}

// 각도 에 따른 percent
const toPercent = function (degree) {
    return (degree * (10/27));
}

// 마우스 클릭 좌표가 원의 내부 인지 확인 -> 조금 더 넓게 범위 잡음
const isInsideArc = function (circleX, circleY, mousePosX, mousePosY, radius) {
    const x =   mousePosX - circleX;
    const y =   mousePosY - circleY;
    const len   =   Math.sqrt(Math.abs(x * x) + Math.abs(y * y));

    return (radius * 1.5 >= len) ? true : false;
}

//마우스 클릭 좌표와 원의 중심 좌표 사이의 라디안 계산 => 캔버스 각도로 변경
const pointDegree = function ( circleX, circleY, mousePosX, mousePosY ) {
    const x =   mousePosX - circleX;
    const y =   mousePosY - circleY;

    const degree = ( Math.atan2(y, x) * 180 / Math.PI ) + 225;

    if ( degree >= 360 ) {
        return degree - 360;
    }else if ( degree >= 270 && degree < 315 ) {
        return 270;
    }else if ( degree >= 315 && degree <360 ) {
        return 0;
    }else {
        return degree;
    }
}

// 픽셀 위치 값 보정
function crispPixel( pixel, thickness = 1 ) {
    const halfThickness = thickness / 2;
  
    return thickness % 2
      ? ( Number.isInteger( pixel ) ? pixel : Math.round(pixel - halfThickness) ) + halfThickness
      : Math.round( pixel );
}

export { radion, degree, isInsideArc, pointDegree, toPercent, crispPixel };

