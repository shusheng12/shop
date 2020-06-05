<template>
  <div>
    <user-header>
      <span slot="name1">权限管理</span>
      <span slot="name2">权限列表</span>
    </user-header>
    <el-card>

     <el-table border stripe :data="rightsList">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
      </el-table-column>
    </el-table>

    </el-card>
  </div>
</template>
<script>
import userHeader from "../user/userheader";

import { getdata } from "@/network/getpowerdata";
export default {
  components: {
    userHeader
  },
  data(){
      return{
          rightsList: []
      }
  }
  ,
  created(){
      getdata().then(res=>{
       if (res.data.meta.status!== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.rightsList = res.data.data
          
      })
  }
};
</script>
<style  scoped>
</style>>
    