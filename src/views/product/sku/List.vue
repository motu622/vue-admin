<template>
  <div>
    <el-table border style="width: 100%" :data="records">
      <el-table-column type="index" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            style="width: 80px; height: 80px"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            @click="sale(row)"
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale === 0"
          ></el-button>
          <el-button
            @click="cancel(row)"
            type="success"
            v-else
            icon="el-icon-top"
            size="mini"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit"
            size="mini"
          ></el-button>
          <el-button
            type="info"
            @click="getSkuInfo(row)"
            icon="el-icon-info"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="attr in skuInfo.skuAttrValueList"
              :key="attr.id"
              style="margin-right: 10px"
              >{{ attr.attrName }}--{{ attr.valueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      page: 1,
      limit: 5,
      records: [], //存储Sku列表的数据
      total: 0,
      skuInfo: {},
      drawer: false, //抽屉的显示与隐藏
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.getList(page, limit);
      if (result.code === 20000) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    //  上架
    async sale(row) {
      console.log(row);
      let result = await this.$API.sku.onSale(row.category3Id);
      if (result.code === 20000) {
        row.isSale = 1;
        this.$message.success("上架成功");
      }
    },
    //  下架
    async cancel(row) {
      let result = await this.$API.sku.cancelSale(row.category3Id);
      if (result.code === 20000) {
        row.isSale = 0;
        this.$message.success("下架成功");
      }
    },
    edit() {
      this.$message.info("正在开发中");
    },
    async getSkuInfo(row) {
      this.drawer = true;
      let result = await this.$API.sku.get(row.category3Id);
      if (result.code === 20000) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>

<style>
.el-carousel__button {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}
</style>

