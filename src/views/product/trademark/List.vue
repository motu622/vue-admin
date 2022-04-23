<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
      >添加</el-button
    >
    <el-table border :data="trademarkList" style="width: 100%; margin: 20px 0">
      <el-table-column
        prop="prop"
        label="序号"
        type="index"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <!-- row,$index对应的就是当前遍历的某个品牌对象，及品牌对象在数组中的下标 -->
          <img :src="row.logoUrl" alt="" style="width: 80px; heigth: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdateDialog(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[4, 6, 8]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tmForm" :rules="rules" ref="tmForm" style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- show-file-list上传的是不是照片墙  现在只是上传一张 -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "Trademark",
  data() {
    let validateTmName = (rule, value, callback) => {
      // 如果传递一个错误的对象就代表验证不成功
      // 如果没有传递参数 就代表验证成功
      if (value.length < 2 || value.length > 10) {
        callback(new Error("长度必须时2到10之间"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      limit: 4,
      total: 0,
      trademarkList: [],
      dialogFormVisible: false, //控制对话框dialog显示和隐藏
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // {
          //   min: 2,
          //   max: 10,
          //   message: "长度在 2 到 10 个字符",
          //   trigger: "change",
          // },
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [
          { required: true, message: "请选择上传图片", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getTrademarkList();
  },
  methods: {
    async getTrademarkList(page = 1) {
      this.page = page;
      let result = await this.$API.trademark.getPageList(this.page, this.limit);
      if (result.code === 20000) {
        this.trademarkList = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(size) {
      this.limit = size;
      this.getTrademarkList();
    },
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = URL.createObjectURL(file.raw);
      // this.tmForm.logoUrl =res.data;
    },
    // 上传前的回调(限定图片的格式和大小)
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击添加按钮，弹出dialog
    showAddDialog() {
      this.dialogFormVisible = true;
      // 解决添加数据完成后，点击取消后再次点击添加数据，以前数据依旧存在的bug
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    // 点击修改按钮，弹出dialog
    showUpdateDialog(row) {
      this.dialogFormVisible = true;
      // this.tmForm = row;
      this.tmForm = {
        ...row,
      };
    },
    addOrUpdate() {
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          let trademark = this.tmForm;
          try {
            this.$API.trademark.addOrUpdate(trademark);
            this.$message.success(
              trademark.id ? "修改品牌成功" : "添加品牌成功"
            );
            this.dialogFormVisible = false;
            this.getTrademarkList(trademark.id ? this.page : 1);
          } catch (error) {
            this.$message.error(trademark.id ? "修改品牌失败" : "添加品牌失败");
          }
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },

    deleteTrademark(row) {
      this.$confirm(`你确定删除${row.tmName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await this.$API.trademark.delete(row.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTrademarkList(
              this.trademarkList.length > 1 ? this.page : this.page - 1
            );
          } catch (error) {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

