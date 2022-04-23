<template>
  <div>
    <el-card>
      <CategorySelector
        @changeCategory="changeCategory"
        :isShowList="isShowList"
      ></CategorySelector>
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="isShowList">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="showAddDiv"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <el-table border :data="attrList" style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="info"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改"
                @click="showUpdateDiv(row)"
              ></HintButton>
              <el-popconfirm
                :title="`确定要删除${row.attrName}吗?`"
                @onConfirm="deleteAttr(row)"
              >
                <HintButton
                  style="margin-left: 10px"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  title="删除"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改的界面 -->
      <div v-show="!isShowList">
        <el-form :model="attrForm" :inline="true">
          <el-form-item label="属性名">
            <el-input
              v-model="attrForm.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrForm.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowList = true">取消</el-button>
        <el-table
          border
          :data="attrForm.attrValueList"
          style="width: 100%; margin: 20px 0"
        >
          <el-table-column
            type="index"
            align="center"
            prop="prop"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                :ref="$index"
                v-if="row.isEdit"
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                @blur="toLook(row)"
                @keyup.enter.native="toLook(row)"
              ></el-input>
              <span
                style="display: block; width: 100%; height: 100%"
                v-else
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定要删除${row.valueName}吗?`"
                @onConfirm="attrForm.attrValueList.splice($index, 1)"
              >
                <HintButton
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrForm.attrValueList.length === 0"
          >保存</el-button
        >
        <el-button @click="isShowList = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>


<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowList: true,
      attrForm: {
        attrName: "",
        attrValueList: [],
        categoryId: "",
      },
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
        this.getAttrList();
      }
    },
    async getAttrList() {
      let { category1Id, category2Id, category3Id } = this;
      const result = await this.$API.attr.getList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 20000) {
        this.attrList = result.data;
      }
    },
    //  点击添加按钮到添加页面
    showAddDiv() {
      this.isShowList = false;

      this.attrForm = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
      };
    },
    addAttrValue() {
      this.attrForm.attrValueList.push({
        valueName: "",
        isEdit: true, //判定是否为编辑模式
      });

      this.$nextTick(() => {
        this.$refs[this.attrForm.attrValueList.length - 1].focus();
      });
    },
    // 点击修改按钮切换到修改的界面
    showUpdateDiv(row) {
      this.isShowList = false;
      this.attrForm = cloneDeep(row);
      this.attrForm.attrValueList.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
    },
    toLook(row) {
      // 判断用户是否输入为空
      let { valueName } = row;
      if (!valueName.trim()) {
        this.$message.info("输入的属性名称不能为空");
        row.valueName = "";
        return;
      }
      let isRepeat = this.attrForm.attrValueList.some((item) => {
        if (item !== row) {
          return item.valueName === valueName;
        }
      });
      if (isRepeat) {
        this.$message.info("输入的属性值名称不能重复");
        row.valueName = "";
        return;
      }
      row.isEdit = false;
    },
    toEdit(row, index) {
      row.isEdit = true;
      this.$nextTick(() => {
        // 等待页面最近更新之后再获取input
        this.$refs[index].focus();
      });
    },
    // 保存
    async save() {
      let attr = this.attrForm;
      attr.attrValueList = attr.attrValueList.filter((item) => {
        if (item.valueName != "") {
          delete item.isEdit;
          return true;
        }
      });
      if (attr.attrValueList.length === 0) {
        this.$message.info("属性值不能为空");
        return;
      }
      try {
        await this.$API.attr.addOrUpdate(attr);
        this.$message.success("保存成功");
        this.isShowList = true;
        this.getAttrList();
      } catch (error) {
        this.$message.error("保存失败");
      }
    },
    // 删除
    deleteAttr(row) {
      try {
        this.$API.attr.delete(row.categoryId);
        this.$message.success("删除成功");
        this.getAttrList();
      } catch (error) {
        this.$message.error("删除失败");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
</style>

