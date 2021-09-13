
export default class App extends Component {
    template () {
        const gauge = document.createElement('section');
        gauge.className = "gauge";
        document.querySelector('.dynamic').appendChild(gauge);

        const dataList = document.createElement('article');
        dataList.className = "dataList";
        document.querySelector('.dynamic').appendChild(dataList);

        const footer = document.createElement('footer');
        footer.className = "footer";
        document.querySelector('.dynamic').appendChild(footer);
    }

    mounted () {
        const $gauge = this.$target.querySelector('.gauge');

        new Gauge($gauge, {});
    }

}