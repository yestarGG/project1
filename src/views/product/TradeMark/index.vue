<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="handleDialog"
      >新增</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="tmName" label="品牌名" width="180">
      </el-table-column>
      <el-table-column prop="logoUrl" label="LOGO">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="tmName" label="操作" width="180">
        <template slot-scope="{ row, $index }">
          <el-button type="danger" >修改</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :page-sizes="[10, 20]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="新增" :visible.sync="isVisible">
      <el-form :model="form" width="80%">
        <el-form-item label="品牌名" :label-width="formLabelWidth">
          <el-input v-model="form.tmName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTradeMarkInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
      isVisible: false,
      form: {
        tmName: "",
        logoUrl: "",
      },
      formLabelWidth: "60px"
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      this.tableData = result.data.records;
      this.total = result.data.total;
      console.log(result);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getPageList();
    },
    handleSizeChange(size) {
      this.limit = size;
    },
    handleDialog() {
      this.isVisible = !this.visible;
    },
    handleAvatarSuccess(res, file) {
        this.form.logoUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    async updateTradeMarkInfo(){
      this.isVisible=false
      await this.$API.trademark.reqUpdateTradeMark(this.form).then((res)=>{
        this.$message('成功')
        getPageList()
      }).catch((e)=>
      console.error(e))
    }
  },
};
</script>

<style scoped>
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
