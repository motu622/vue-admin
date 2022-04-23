<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" :count="'￥' + listState.salesTotal">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;&nbsp;{{
                  Math.abs(listState.salesGrowthLastMonth)
                }}<svg
                  v-if="listState.salesGrowthLastMonth > 0"
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
              <span
                >日同比&nbsp;&nbsp;&nbsp;{{
                  Math.abs(listState.salesGrowthLastDay)
                }}<svg
                  v-if="listState.salesGrowthLastDay > 0"
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
            </template>
            <template slot="footer">
              <span>日销售额￥ {{ listState.salesToday }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" :count="listState.visitTotal">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量 {{ listState.visitToday }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" :count="listState.payTotal">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>转化率 {{ listState.payRate }}%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" :count="listState.activityRate + '%'">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;&nbsp;{{
                  Math.abs(listState.activityGrowthLastMonth)
                }}
                <svg
                  v-if="listState.activityGrowthLastMonth > 0"
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
              <span
                >日同比&nbsp;&nbsp;&nbsp;{{
                  Math.abs(listState.activityGrowthLastDay)
                }}
                <svg
                  v-if="listState.activityGrowthLastDay > 0"
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
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Detail from "./Detail";
import lineChart from "./lineChart";
import barChart from "./barChart";
import progressChart from "./progressChart";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart,
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
};
</script>


<style lang="less" scoped>
</style>

