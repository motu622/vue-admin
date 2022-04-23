<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineChart title="搜索用户数"></lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart title="人均搜索次数"></lineChart>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%; margin-bottom: 2px" borde>
        <el-table-column prop="date" label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable>
        </el-table-column>
        <el-table-column prop="address" label="周涨幅" sortable>
        </el-table-column>
      </el-table>
      <el-pagination layout="->,prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </el-card>
</template>


<script>
import lineChart from "./lineChart";
export default {
  name: "",
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    lineChart,
  },
};
</script>


<style  scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>

