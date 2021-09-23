//각도 -> 라디안 으로 변경
const radion = function (degree) {
    if (degree === 90) {
        degree = 180;
    } 
    
    return ( degree * Math.PI/180 );
}

//percent에 따른 각도 - 0.1% 마다 2.7 도씩 이동 => 0.1 % 마다 circleDegree / 100씩 이동
const degree = function (circleDegree, data) {
    return ( (circleDegree / 100) * data );
}

// 각도 에 따른 percent
const toPercent = function (circleDegree, degree) {
    return (degree * (100/circleDegree));
}

// 마우스 클릭 좌표가 원의 내부 인지 확인 -> 조금 더 넓게 범위 잡음
const isInsideArc = function (x, y, radius) {
    const len   =   Math.sqrt(Math.abs(x * x) + Math.abs(y * y));

    return (radius * 1.5 >= len) ? true : false;
}

//마우스 클릭 좌표와 원의 중심 좌표 사이의 라디안 계산 => 캔버스 각도로 변경
const pointDegree = function ( x, y, circleDegree ) {
    let degree = ( Math.atan2(y, x) * 180 / Math.PI ) + 180;
    if( circleDegree == 270 ) degree = ( Math.atan2(y, x) * 180 / Math.PI ) + 225;
    
    // 개선 필요
    if ( degree >= 360 ) {
        return degree - 360;
    }else if ( degree >= circleDegree && degree < circleDegree + 45 ) {
        if ( circleDegree == 180 && degree >= 270 ) return 0;

        return circleDegree;
    }else if ( degree >= circleDegree + 45 && degree < 360 ) {
        return 0;
    }else {
        return degree;
    }
}

// 픽셀 위치 값 보정 ?? 
function crispPixel( pixel, thickness = 1 ) {
    const halfThickness = thickness / 2;
    
    console.log (thickness % 2);

    return thickness % 2 
      ? ( Number.isInteger( pixel ) ? pixel : Math.round(pixel - halfThickness) ) + halfThickness   //두께가 홀수라면 두꼐의 절반만큼 좌표 이동
      : Math.round( pixel );
}

export { radion, degree, isInsideArc, pointDegree, toPercent, crispPixel };

