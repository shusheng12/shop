<template>
  <div>
    <user-header>
      <span slot="name1">商品管理</span>
      <span slot="name2">商品分类</span>
    </user-header>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="changeinput=true" class="msg">添加分类</el-button>
        </el-col>
      </el-row>

      <el-table
        border
        stripe
        :data="list"
        row-key="cat_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>

        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              v-if="scope.row.cat_deleted === false"
              style="color: lightgreen;"
            ></i>
            <i class="el-icon-error" v-else style="color: red;"></i>
          </template>
        </el-table-column>

        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="排序" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click='sub(scope.row)'>修改</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click='del(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="catedata.pagenum"
        :page-sizes="[1, 5 ,7, 10]"
        :page-size="catedata.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加分类" :visible.sync="changeinput" width="50%">
      <el-form :model="catename" :rules="cateFormRef" ref="cateFormRef" label-width="130px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="catename.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            change-on-select
            :options="list1"
            :props="cascaderProps"
            v-model="key"
            @change="parentCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="changeinput=false">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>


<el-dialog title="修改分类" :visible.sync="subchangeinput" width="50%">
      <el-form  label-width="130px">
        <el-form-item label="分类名称">
          <el-input v-model="changecate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="subchangeinput=false">取 消</el-button>
        <el-button type="primary" @click="change_btn">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import userHeader from "../user/userheader";

import { getcatedata, getcatedata1,addcate,delcate,changecate} from "@/network/getgoodsdata";

export default {
  components: {
    userHeader
  },
  data() {
    return {
      catedata: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      list: [],
      list1: [],
      total: 0,
      changeinput:false,
      catename: {
        cat_pid:"",
        cat_name:"",
        cat_level:""
      },
      cateFormRef:{
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在1到15个字符", trigger: "blur" }
        ]
      },
      cascaderProps:{
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      key:[],
      subchangeinput:false,
      ativeid:0,
      changecate:''
    };
  },

  created() {
    this.getdata1();
    getcatedata1(2).then(res => {
      if (res.data.meta.status !== 200) {
        return this.$message.error("获取商品分类列表失败！");
      }
      this.list1 = res.data.data;
    });
  },
  methods: {
    getdata1() {
      getcatedata(this.catedata).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取商品分类列表失败！");
        }
        this.list = res.data.data.result;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(e) {
      this.catedata.pagesize = e;
      this.getdata1();
    },
    handleCurrentChange(e) {
      this.catedata.pagenum = e;
      this.getdata1();
    },
    parentCateChanged() {
      if (this.key.length > 0) {
        this.catename.cat_pid = this.key[this.key.length - 1];
        this.catename.cat_level = this.key.length;
      } else {
        this.catename.cat_pid = 0;
        this.catename.cat_level = 0;
      }
    },btn(){
      this.$refs.cateFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error('请输入分类名称');
             return false;
          } 
          else {
      addcate(this.catename).then(res=>{
         if (res.data.meta.status !== 201) {
          return this.$message.error("添加分类失败！");
        }
        this.$message.success('添加分类成功')
        this.changeinput=false 
         this.getdata1(); 
      })
          }
    })},
    del(scope){
      
       const confirmResult = this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(()=>{
        delcate(scope.cat_id).then(res=>{      
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
         this.$message.success("删除分类成功")
        this.getdata1();
        }
      })
      })
      .catch(err =>this.$message.info('已取消删除') )   
      
    },
    sub(scope){
  this.subchangeinput=true
  this.ativeid=scope.cat_id
  this.changecate=scope.cat_name
    },
    change_btn(){
      changecate(this.ativeid,this.changecate).then(res=>{
       if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
         this.$message.success("更新分类成功")
        this.getdata1();
        this.subchangeinput=false 
        }
        
      })
    }
  }
};
</script>

<style  scoped>
.msg{
  margin-bottom: 20px;
}
</style>