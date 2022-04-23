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
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          color: "skyblue",
          data: [78],
          barWidth: 10,
          color: "yellowgreen",
          // 背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
            color:'red'
          },
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

