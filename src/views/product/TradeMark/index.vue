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
          <el-button type="danger">修改</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="page"
      :page-sizes="[3, 6, 8]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <el-dialog title="新增" :visible.sync="isVisible">
      <el-form :model="form">
        <el-form-item label="品牌名" :label-width="formLabelWidth">
          <el-input v-model="form.content1" placeholder="请输入" ></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="isVisible = false"
          >确 定</el-button
        >
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
      limit: 5,
      total: 0,
      isVisible: false,
      form: {
        content1: "",
      },
      formLabelWidth:'60px'
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
  },
};
</script>

<style scoped></style>
