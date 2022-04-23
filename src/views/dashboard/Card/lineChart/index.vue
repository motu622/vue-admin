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
          type: "line",
          smooth: true,
          data: [66, 23, 33, 25, 44, 40, 23, 33, 25, 35, 42, 11, 9],
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "purple",
            cap: "round",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
   
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

