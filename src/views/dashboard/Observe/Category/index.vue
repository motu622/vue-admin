<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value" @change="changeValue">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>


<script>
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      value: "全部渠道",
      mycharts: null,
      online: [],
      allList: [],
      shop: [],
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "",
        subtext: "",
        left: "center",
        top: "center",
      },
      grid:{

      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },

          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    });
    this.mycharts.on("mouseover", (params) => {
      const { name, value } = params.data;
      this.mycharts.setOption({
        title: { text: name, subtext: value },
      });
    });
  },
  methods: {
    changeValue() {
      let arr = [];
      const { value } = this;
      if (value === "全部渠道") {
        this.mycharts.setOption({
          title: {
            text: this.allList[0].name,
            subtext: this.allList[0].value,
          },
          series: [
            {
              data: this.allList,
            },
          ],
        });
      } else if (value === "线上") {
        this.mycharts.setOption({
          title: {
            text: this.online[0].name,
            subtext: this.online[0].value,
          },
          series: [
            {
              data: this.online,
            },
          ],
        });
      } else if (value === "门店") {
        this.mycharts.setOption({
          title: {
            text: this.shop[0].name,
            subtext: this.shop[0].value,
          },
          series: [
            {
              data: this.shop,
            },
          ],
        });
      }
    },
  },
  watch: {
    listState(newVal) {
      newVal.saleRank.online.name.forEach((item, index) => {
        this.online.push({
          name: item,
          value: newVal.saleRank.online.value[index],
        });
        this.allList.push({
          name: item,
          value: newVal.saleRank.online.value[index],
        });
      });
      newVal.saleRank.shop.name.forEach((item, index) => {
        this.shop.push({
          name: item,
          value: newVal.saleRank.shop.value[index],
        });
        this.allList.push({
          name: item,
          value: newVal.saleRank.shop.value[index],
        });
      });
      this.mycharts.setOption({
        title: {
          text: this.allList[0].name,
          subtext: this.allList[0].value,
        },
        series: [
          {
            data: this.allList,
          },
        ],
      });
    },
  },
  computed: {
    ...mapState({
      listState: (state) =>  state.home.list
      ,
    }),
  },
};
</script>


<style  scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 250px;
}
</style>

