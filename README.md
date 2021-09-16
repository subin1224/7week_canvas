# 🌈 Dynamic Gauge 만들기

![canvas](https://user-images.githubusercontent.com/76253952/133101297-3aaf4cc8-69f3-4236-9da6-3f733bf038b9.png)

(참고) 해당 이미지는 클론하고자 하는 원본 이미지 입니다. 
  -> 추후에 완성 이미지로 변경 예정
> Canvas 이용하여 Dynamic Gauge 만들어보기
---

<br>
<br>
<br>

## 📋 요구 사항
1) 기능별 파일 모듈화
2) 브라우저 크기 변화에 따라 게이지 차트의 크기 변화
3) 게이지 바와 차트 중앙의 숫자가 점진적으로 크기가 변경 되는 애니메이션 효과 부여
4) 캔버스 성능 올리기 위한 방법 적용


---
<br>
<br>
<br>



## 💡 주요 기능

- 중앙의 버튼을 클릭하면 5초마다 0.0 ~ 100.0 까지의 랜덤한 데이터 값이 전송 됩니다.
  - 해당 데이터 값에 따라 색상이 변경되고, 해당 게이지까지 애니메이션 효과가 보여집니다.


---
<br>
<br>
<br>

## 💻 폴더 구조
```
├── src
│   ├── app.js
│   ├── event.js
│   ├── gauge.js
│   ├── calc.js
│   └── util.js
│
├── css
│   └── main.css
└── index.html

```

---
<br>
<br>
<br>

## 📂 업데이트 내역
- 0.0.1
  - 먼저 하나의 파일에 기능을 구현 하였습니다.
  - => 추후에 기능별로 모듈화를 할 것이며, 전송한 데이터의 값들을 볼 수 있는 목록을 추가 할 예정 입니다.



---



