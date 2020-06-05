<template>
    <div>
      <div class="input">
        <el-input v-model="input" @input="handleInput" placeholder="请输入内容" width></el-input>
      </div>
         <el-table border stripe :data="users">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>

      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch  @change="handleClick(scope)" v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="aaa(scope)"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getlist.pagenum"
      :page-sizes="[1, 2, 4]"
      :page-size="getlist.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
    </div>
</template>

<script>
import { gethomedata, ChangeduserState } from '@/network/test'
export default {
     data() {
    return {
      total:0,
      users:[],
      input: '',
      getInput:{
      uId:'',
      type:''
      },
      getlist:{
        query:'',
        pagenum:1,
        pagesize:3,
      } 
    }
  },
  created(){
    this.get()
  },
  methods:{
    async handleClick(scope){   
    let res= await ChangeduserState(scope.row.id,scope.row.mg_state)
        if(res.data.meta.status == 200){
         this.$message('这是一条消息提示');
        }    
    },
    handleInput(val){
      this.getlist.query = val
      this.get();
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getlist.pagesize = val
        this.get()
       
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getlist.pagenum = val
        this.get()
      },
     async get(){
      let{data:res} = await  gethomedata(this.getlist)
      this.total = res.data.total
      this.users = res.data.users
      }
  }
}
</script>

<style>
.input{
      width: 218px;
    margin-bottom: 17px;
}
</style>