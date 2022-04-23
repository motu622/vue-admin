<template>
  <div class="charts" ref="charts"></div>
</template>


<script>
import echarts from "echarts";
export default {
  name: "",
  mounted() {
    //   初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          color: "skyblue",
          data: [66, 23, 33, 25, 44, 40, 23, 33, 25, 35, 42, 11, 15, 9],
        },
      ],
      tooltip: {},

      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>


<style  scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>

