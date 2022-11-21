<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">新增</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="LOGO">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="height:100px;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="操作"
        width="180">
        <template slot-scope="{row,$index}">
          <el-button type="danger">修改</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-pagination
      style="margin-top:20px;textAlign:center"
      :current-page="page"
      :page-sizes="[3,6,8]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next,->, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data(){
    return {
      tableData: [],
      page:1,
      limit:5,
      total:0
    }
  },
  mounted(){
    this.getPageList()
  },
  methods:{
    async getPageList(){
      const {page,limit}=this
      let result = await this.$API.trademark.reqTradeMarkList(page,limit )
      this.tableData=result.data.records
      this.total=result.data.total
      console.log(result)
    },
    handleCurrentChange(page){
      this.page=page
      this.getPageList()
    },
    handleSizeChange(size){
      this.limit=size
    }
  }
};
</script>

<style scoped></style>
