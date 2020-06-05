<template>
  <div>
    <user-header>
      <span slot="name1">商品管理</span>
      <span slot="name2">分类参数</span>
    </user-header>

    <el-card>
      <el-alert class="msg" show-icon title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader  :options="catelist" :props="cateProps" v-model="key" @change="handleChange"></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" class="msg">添加静态属性</el-button>


     <el-table border stripe :data="onlyTableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
              <el-button size="mini" type="primary" icon="el-icon-search" >查看</el-button>
             <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


        </el-tab-pane>
        <el-tab-pane label="动态属性" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" class="msg">添加动态属性</el-button>

   <el-table border stripe :data="manyTableData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="属性名称" prop="attr_name"></el-table-column>
        <el-table-column label="可选参数" prop="attr_vals"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
              <el-button size="mini" type="primary" icon="el-icon-search" >查看</el-button>
             <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import userHeader from "../user/userheader";
import { getcatedata1, getparamsdata } from "@/network/getgoodsdata";
export default {
  components: {
    userHeader
  },
  data() {
    return {
      catelist: [],
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      key: [],
      activeName: "only",
       manyTableData: [],
       onlyTableData: [],
    };
  },
  methods: {
    handleChange() {
      if (this.key.length != 3) {
        this.key = [];
       this.manyTableData=[],
       this.onlyTableData=[]
        return
      } 
      this.getparams() 

    },
    handleClick() {
      this.getparams()  
    },
    getparams(){
        getparamsdata(this.key[2],this.activeName).then(res => {
       if (res.data.meta.status !== 200) {
        return 
      }
      if(this.activeName=='only'){
         // console.log(res.data.data);
          this.onlyTableData=res.data.data
      }
      else{
         // console.log(res.data.data);
          this.manyTableData=res.data.data
      }

      });
    }
  },
  computed: {
    isBtnDisabled() {
      if (this.key.length == 3) {
        return false;
      }
      return true;
    }
  },
  created() {
    getcatedata1(3).then(res => {
      if (res.data.meta.status !== 200) {
        return this.$message.error("获取商品分类列表失败！");
      }
      this.catelist = res.data.data;
    });
  }
};
</script>

<style  scoped>
.msg{
  margin-bottom: 20px;
}
</style>