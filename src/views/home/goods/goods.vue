<template>
  <div>
    <user-header>
      <span slot="name1">商品管理</span>
      <span slot="name2">商品列表</span>
    </user-header>

    <el-card>
      <el-row :gutter="20" class="msg">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="keywork" clearable @clear="seach">
            <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table border stripe :data="list">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" width="700px"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number"></el-table-column>
        <el-table-column label="商品状态" prop="goods_state"></el-table-column>
        <el-table-column label="更新时间" width="200px">
           <template slot-scope="scope">
               <div>
                   {{scope.row.upd_time | dateFormat}}
               </div>
           </template>
        </el-table-column>

        <el-table-column label="操作" width="150px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10,30,50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import userHeader from "../user/userheader";

import { getgoodsdata } from "@/network/getgoodsdata";
export default {
  components: {
    userHeader
  },
  data() {
    return {
      keywork: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      list: [],
      total: 0
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      getgoodsdata(this.queryInfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取商品分类列表失败！");
        }
       // console.log(res.data.data);
        this.list = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(e) {
      this.queryInfo.pagesize = e;
      this.getdata();
    },
    handleCurrentChange(e) {
      this.queryInfo.pagenum = e;
      this.getdata();
    },
    seach(){
        this.queryInfo.query=this.keywork
        this.getdata();
    },
     goAddpage() {
      this.$router.push('/add')
    }
  }
};
</script>

<style  scoped>
.msg{
  margin-bottom: 20px;
}
</style>