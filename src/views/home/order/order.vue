<template>
  <div>
    <user-header>
      <span slot="name1">订单管理</span>
      <span slot="name2">订单列表</span>
    </user-header>

    <el-card>
      <el-row :gutter="20" class="msg">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="keywork" clearable @clear="seach">
            <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table border stripe :data="orderlist">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number" width="400px"></el-table-column>
        <el-table-column label="订单价格(元)" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货">
          <template slot-scope="scope">
            <template>{{scope.row.is_send}}</template>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="200px">
          <template slot-scope="scope">
            <div>{{scope.row.create_time| dateFormat}}</div>
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
        :page-sizes="[1,5,7,15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import userHeader from "../user/userheader";

import { getorder } from "@/network/getorderdata";
export default {
  components: {
    userHeader
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize:7
      },
      keywork: "",
      orderlist: [],
      total: 0
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    handleSizeChange(e) {
      this.queryInfo.pagesize = e;
      this.getdata();
    },
    handleCurrentChange(e) {
      this.queryInfo.pagenum = e;
      this.getdata();
    },
    seach() {
      this.queryInfo.query = this.keywork;
      this.getdata();
    },
    getdata() {
      getorder(this.queryInfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取订单列表失败！");
        }
       // console.log(res.data.data);
        this.orderlist = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
     seach(){
      // console.log(this.keywork);
       
        this.queryInfo.query=this.keywork
        this.getdata();
    }
  }
};
</script>
<style  scoped>
.msg {
  margin-bottom: 20px;
}
</style>