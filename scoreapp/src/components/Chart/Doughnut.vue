<script>
import { Doughnut } from "vue-chartjs";

export default {
    extends: Doughnut,
    name: "doughnut",
    props: {
        labels: Array,
        datasets: Array
    },
    data() {
        return {
            datas: {
                // 凡例とツールチップに表示するラベル
                labels: this.labels,
                // 表示するデータ
                datasets: [
                    {
                        data: this.datasets,
                        backgroundColor: ["#f87979", "#aa4c8f", "#38b48b", "#006e54", "#c1e4e9", "#89c3eb", "#c3d825"]
                    }
                ]
            },
            options: {
                responsive: true
            }
        };
    },
    mounted() {
        this.renderChart(this.datas, this.options);
    }
};
</script>
