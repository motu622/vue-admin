<template>
  <div>
    <div class="header">
      <span class="search-header">{{ title }}</span>
      <svg
        t="1650557286476"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2174"
        width="16"
        height="16"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="2175"
          fill="#cdcdcd"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content"
        >{{ Math.abs(number) }}
        <svg
          v-if="number > 0"
          t="1650558058290"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6113"
          width="16"
          height="16"
        >
          <path
            d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
            fill="#1afa29"
            p-id="6114"
          ></path></svg
        ><svg
          v-else
          t="1650558028342"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4986"
          width="16"
          height="16"
        >
          <path
            d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
            fill="#d81e06"
            p-id="4987"
          ></path></svg
      ></span>
    </div>
    <div class="header">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      number: (Math.random() * 20 - 10).toFixed(1),
    };
  },
  props: ["title"],
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
            color: "skyblue",
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
                  color: "skyblue", // 0% 处的颜色
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
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 10px;
}
.main {
  margin-top: 10px;
}
.main-content {
  margin-right: 10px;
}
.main-title {
  margin-right: 30px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>

