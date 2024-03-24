<template>
  <Line :data="chartData" />
</template>


<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { state } from "../socket.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  name: "Chart",
  components: { Line },
  props: ["stock"],
  data() {
    return { chartOptions: { responsive: true } };
  },
  computed: {
    chartData() {
      let labels = [];
      let data = [];
      let tmpStock = this.$store.state.stockModal;
      state.updateEvents.forEach((arr) => {
        let findedStock = arr[0].find(
          (stock) => stock.designation === tmpStock
        );
        labels.push(findedStock.Date);
        data.push(findedStock.Open.slice(1));
      });
      return {
        labels,
        datasets: [{ data, borderColor: "#61dafb", label: tmpStock, pointRadius: 1 }],
      };
    },
  },
};
</script>


<style>
</style>