<template>
  <div>
    <el-form :model="spuForm" label-width="100px">
      <el-form-item label="SPU名称">
        <el-input v-model="spuForm.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option
            :label="tm.name"
            :value="tm.id"
            v-for="tm in trademarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuForm.description"
          type="textarea"
          rows="4"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="spuSaleAttrIdName"
          :placeholder="
            unUseSpuSaleAttrList.length > 0
              ? `还有${unUseSpuSaleAttrList.length}为选择`
              : '没有啦!!!'
          "
        >
          <el-option
            :label="unUseSpuSaleAttr.name"
            :value="`${unUseSpuSaleAttr.id}:${unUseSpuSaleAttr.name}`"
            v-for="unUseSpuSaleAttr in unUseSpuSaleAttrList"
            :key="unUseSpuSaleAttr.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="!spuSaleAttrIdName"
          >添加销售属性</el-button
        >
        <el-table
          :data="spuForm.spuSaleAttrList"
          border
          style="width: 100%; margin: 20px 0"
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                :key="spuSaleAttrValue.id"
                v-for="(spuSaleAttrValue, index) in row.spuSaleAttrValueList"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                :disable-transitions="false"
              >
                {{ spuSaleAttrValue.saleAttrValueName }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
                ref="savaTagInput"
                size="small"
                placeholder="名称"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ $index }">
              <HintButton
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除"
                @click="spuForm.spuSaleAttrList.splice($index, 1)"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="sava">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "SpuForm",
  data() {
    return {
      spuForm: {
        category3Id: 0,
        spuName: "",
        description: "",
        tmId: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },

      category3Id: "",

      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,

      spuImageList: [],
      trademarkList: [], //品牌列表
      baseSaleAttrList: [], //spu销售属性
      spuSaleAttrIdName: "",
    };
  },
  methods: {
    // 删除成功后的回调
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    // 预览大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功的回调
    handleSuccess(res, file, fileList) {
      // this.tmForm.logoUrl =res.data;
      this.spuImageList = fileList;
    },
    // 请求初始化数据
    async initUpdateSpuFormData(spu) {
      this.category3Id = spu.categoryId;
      const result = await this.$API.spu.get(spu.categoryId);
      if (result.code === 20000) {
        this.spuForm = result.data;
      }
      const imgResult = await this.$API.sku.getSpuImageList(spu.categoryId);
      if (imgResult.code === 20000) {
        let spuImageList = imgResult.data;
        spuImageList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = spuImageList;
      }
      const trademarkResult = await this.$API.trademark.getList();
      if (trademarkResult.code === 20000) {
        this.trademarkList = trademarkResult.data;
      }
      const baseSaleAttrResult = await this.$API.spu.getSaleAttrList();
      if (baseSaleAttrResult.code === 20000) {
        this.baseSaleAttrList = baseSaleAttrResult.data;
      }
    },
    async initAddSpuFormData(category3Id) {
      this.category3Id = category3Id;
      const trademarkResult = await this.$API.trademark.getList();
      if (trademarkResult.code === 20000) {
        this.trademarkList = trademarkResult.data;
        console.log(trademarkResult.data);
      }
      const baseSaleAttrResult = await this.$API.spu.getSaleAttrList();
      if (baseSaleAttrResult.code === 20000) {
        this.baseSaleAttrList = baseSaleAttrResult.data;
      }
    },
    // 点击添加销售属性
    addSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.spuSaleAttrIdName.split(":");
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuForm.spuSaleAttrList.push(obj);
      this.spuSaleAttrIdName = "";
    },

    // 点击添加显示input框
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$nextTick(() => {
        this.$refs.savaTagInput.focus();
      });
    },
    // input失去焦点或者回车之后的回调
    handleInputConfirm(row) {
      let saleAttrValueName = row.inputValue;
      let id = new Date().valueOf().toString();
      if ((saleAttrValueName ?? "").trim() === "") {
        row.inputValue = "";
        return;
      }
      let isRepeat = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName === saleAttrValueName
      );
      if (isRepeat) {
        this.$message.info("输入的属性值不能重复");
        row.inputValue = "";
        return;
      }
      let obj = {
        saleAttrValueName,
        id,
      };
      row.spuSaleAttrValueList.push(obj);
      row.inputValue = "";
      row.inputVisible = false;
    },
    // 保存
    async sava() {
      let { spuForm, spuImageList, category3Id } = this;

      spuForm.spuImageList = spuImageList.map((item) => ({
        imgName: item.name,
        imgUrl: item.url,
      }));
      spuForm.category3Id = category3Id;

      spuForm.spuSaleAttrList.forEach((item) => {
        delete item.inputValue;
        delete item.inputVisible;
      });
      try {
        await this.$API.spu.addUpdate(spuForm);
        this.$message.success("保存成功");
        this.$emit("update:visible", false);
        this.$emit("successBack");

        // 清空data里的数据
        Object.assign(this._data, this.$options.data());
      } catch (error) {
        this.$message.error("保存失败");
      }
    },

    // 取消
    cancel() {
      this.$emit("update:visible", false);
      this.$emit("cancelBack");
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    unUseSpuSaleAttrList() {
      return this.baseSaleAttrList.filter((baseSaleAttr) =>
        this.spuForm.spuSaleAttrList.every(
          (spuSaleAttr) => baseSaleAttr.name !== spuSaleAttr.saleAttrName
        )
      );
    },
  },
};
</script>


<style  scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

