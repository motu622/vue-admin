<template>
  <div>
    <el-form
      :inline="true"
      :model="cForm"
      class="demo-form-inline"
      :disabled="!isShowList"
    >
      <el-form-item label="一级分类">
        <el-select
          v-model="cForm.category1Id"
          placeholder="请选择"
          @change="changeCategory1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="cForm.category2Id"
          placeholder="请选择"
          @change="changeCategory2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="cForm.category3Id"
          placeholder="请选择"
          @change="changeCategory3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "",
  props: ["isShowList"],
  data() {
    return {
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.category.getCategory1();
      if (result.code === 20000) {
        this.category1List = result.data;
      }
    },
    async changeCategory1(category1Id) {
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      let result = await this.$API.category.getCategory2(category1Id);
      if (result.code === 20000) {
        this.category2List = result.data;
      }
      this.$emit("changeCategory", { categoryId: category1Id, level: 1 });
    },
    async changeCategory2(category2Id) {
      this.cForm.category3Id = "";
      this.category3List = [];
      let result = await this.$API.category.getCategory3(category2Id);
      if (result.code === 20000) {
        this.category3List = result.data;
      }
      this.$emit("changeCategory", { categoryId: category2Id, level: 2 });
    },
    changeCategory3(category3Id) {
      this.$emit("changeCategory", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>


<style lang="less" scoped>
</style>

