<template>
  <div>
    <el-form ref="form" :model="skuForm" label-width="80px">
      <el-form-item label="SPU 名称">{{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU 名称">
        <el-input v-model="skuForm.skuName" placeholder="SKU 名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model="skuForm.price"
          placeholder="SKU 价格"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model="skuForm.weight"
          placeholder="SKU 重量"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuForm.skuDesc"
          placeholder="SKU 规格描述"
          rows="4"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="100px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select v-model="attr.attrIdValueId" placeholder="请选择">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="100px">
          <el-form-item
            :label="spuSaleAttr.saleAttrName"
            v-for="spuSaleAttr in spuSaleAttrList"
            :key="spuSaleAttr.baseSaleAttrId"
          >
            <el-select
              v-model="spuSaleAttr.spuAttrIdValueId"
              placeholder="请选择"
            >
              <el-option
                :label="spuSaleAttrValue.saleAttrValueName"
                :value="`${spuSaleAttr.baseSaleAttrId}:${spuSaleAttrValue.id}`"
                v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="setDefault(row)"
                v-if="row.isDefault === '0'"
                >设为默认</el-button
              >
              <el-tag type="success" v-else>默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sava">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuForm: {
        category3Id: "",
        price: "",
        tmId: "",
        weight: "",
        skuName: "",
        skuDefaultImg: "",
        skuDesc: "",
        skuAttrValueList: [],
        skuImageList: [],
        skuSaleAttrValueList: [],
      },
      spu: {},
      attrInfoList: [],
      spuSaleAttrList: [],
      spuImageList: [], //展示所有图片列表

      checkedImageList: [], //收集被选中的图片列表
    };
  },

  methods: {
    async initAddSkuFormData(row, category1Id, category2Id) {
      console.log(row);
      this.skuForm.category3Id = row.category3Id;
      this.spu = row;
      let promise1 = this.$API.attr.getList(
        category1Id,
        category2Id,
        row.category3Id
      );
      let promise2 = this.$API.sku.getSpuSaleAttrList(row.id);
      let promise3 = await this.$API.sku.getSpuImageList(row.id);
      const result = await Promise.all([promise1, promise2, promise3]);
      this.attrInfoList = result[0].data;
      this.spuSaleAttrList = result[1].data;
      let spuImageList = result[2].data;
      spuImageList.forEach((item) => (item.isDefault = "0"));
      this.spuImageList = spuImageList;
    },
    handleSelectionChange(val) {
      this.checkedImageList = val;
    },
    setDefault(row) {
      this.spuImageList.forEach((item) => (item.isDefault = "0"));
      row.isDefault = "1";
      this.skuForm.skuDefaultImg = row.imgUrl;
    },

    // 取消按钮
    cancel() {
      this.$emit("update:cisible", false);
      Object.assign(this._data, this.$options.data());
    },

    // 保存按钮的事件
    async sava() {
      const { attrInfoList, skuForm, spuSaleAttrList, checkedImageList } = this;
      skuForm.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdValueId) {
          const [attrId, valueId] = item.attrIdValueId.split(":");
          prev.push({
            attrId,
            valueId,
          });
        }
        return prev;
      }, []);
      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.spuAttrIdValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.spuAttrIdValueId.split(":");
          prev.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
        return prev;
      }, []);
      skuForm.skuImageList = checkedImageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      let result = await this.$API.sku.addUpdate(skuForm);
      if (result.code === 20000) {
        this.$message.success("添加SKU成功");
        this.$emit("update:cisible", false);
      }
    },
  },
};
</script>


<style lang="less" scoped>
</style>

