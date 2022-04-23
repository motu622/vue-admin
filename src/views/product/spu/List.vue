<template>
  <div>
    <el-card>
      <CategorySelector
        @changeCategory="changeCategory"
        :isShowList="isShowList"
      ></CategorySelector>
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="!isShowSpuForm && !isShowSkuForm">
        <el-button type="primary" icon="el-icon-plus" @click="showAddSpuForm"
          >添加SPU</el-button
        >
        <el-table :data="spuList" border style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <HintButton
                type="success"
                title="添加SKU"
                @click="showAddSkuForm(row)"
                icon="el-icon-plus"
                size="mini"
              ></HintButton>
              <HintButton
                type="warning"
                title="修改SPU"
                @click="showUpdateSpuForm(row)"
                icon="el-icon-edit"
                size="mini"
              ></HintButton>
              <HintButton
                type="info"
                title="查看SKU列表"
                @click="handler(row)"
                icon="el-icon-info"
                size="mini"
              ></HintButton>
              <el-popconfirm
                style="margin: 0 5px"
                :title="`你确定删除${row.spuName}吗?`"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  slot="reference"
                  type="danger"
                  title="删除SPU"
                  icon="el-icon-delete"
                  size="mini"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[2, 3, 5]"
          :page-size="limit"
          style="text-align: center"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="isShowSpuForm"
        :visible.sync="isShowSpuForm"
        @successBack="successBack"
        @cancelBack="cancelBack"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="isShowSkuForm"
        ref="sku"
        :cisible.sync="isShowSkuForm"
      ></SkuForm>
    </el-card>
    <el-dialog
      :before-close="close"
      :title="`${spu.spuName}的列表`"
      :visible.sync="dialogTableVisible"
    >
      <el-table v-loading="loading" :data="skuList" border style="width: 100%">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>


<script>
import SkuForm from "@/views/product/components/SkuForm";
import SpuForm from "@/views/product/components/SpuForm";
export default {
  name: "",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 2,
      spuList: [],
      total: 0,

      isShowList: true,

      isShowSpuForm: false,
      isShowSkuForm: false,
      // 控制sku列表的显示
      dialogTableVisible: false,

      spu: {},

      skuList: [],

      loading: true,
    };
  },
  methods: {
    changeCategory({ categoryId, level }) {
      if (level === 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.attrList = [];
        this.category1Id = categoryId;
      } else if (level === 2) {
        this.category3Id = "";
        this.attrList = [];
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pager = 1) {
      this.page = pager;
      let { page, limit, category1Id, category2Id, category3Id } = this;
      let result = await this.$API.spu.getList(
        page,
        limit,
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 20000) {
        this.spuList = result.data;
        this.total = result.total;
      }
    },
    handleSizeChange(size) {
      this.limit = size;
      this.getSpuList();
    },
    // 点击添加spu
    showAddSpuForm() {
      this.isShowSpuForm = true;
      this.$refs.spu.initAddSpuFormData(this.category3Id);
    },
    //点击修改spu
    showUpdateSpuForm(row) {
      this.flag = row.categoryId;
      this.isShowSpuForm = true;
      console.log(row);
      this.$refs.spu.initUpdateSpuFormData(row);
    },
    // 点击添加sku
    showAddSkuForm(row) {
      this.isShowSkuForm = true;
      this.$refs.sku.initAddSkuFormData(
        row,
        this.category1Id,
        this.category2Id
      );
    },
    successBack() {
      if (this.flag) {
        // 修改回来
        this.getSpuList(this.page);
      } else {
        // 添加回来
        this.getSpuList();
      }
      this.flag = null;
    },
    // 取消返回后父组件的回调
    cancelBack() {
      this.flag = null;
    },
    // 删除spu
    async deleteSpu(row) {
      try {
        await this.$API.spu.remove(row.id);
        this.$message.success("删除成功");
        this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1);
      } catch (error) {
        this.$message.error("删除失败");
      }
    },
    // 查看sku列表
    async handler(row) {
      this.spu = row;
      this.dialogTableVisible = true;
      let result = await this.$API.spu.findSpuInfoByKeyword(row.category3Id);
      if (result.code === 20000) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 关闭对话框的回调
    close() {
      this.loading = false;
      this.sku = [];
    },
  },
};
</script>


<style lang="scss" scoped>
</style>

