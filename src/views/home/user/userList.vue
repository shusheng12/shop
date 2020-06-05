<template>
  <div>
    <el-table border stripe :data="users">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeuser(scope)"></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteuser(scope)"></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="changeroles(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <change-user ref="change" :user="user"></change-user>
  


     <el-dialog
  title="分配角色"
  :visible.sync="dialogVisible"
  width="50%"
  >
  <p>当前用户:{{this.userinfo.username}}</p>
  <p>当前的角色:{{this.userinfo.role_name}}</p>

   <el-select v-model="newroles" placeholder="请选择">
    <el-option
      v-for="item in roles"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changerole">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import { ChangeduserState,deleteuser,getrolesdata,Changeroles } from "@/network/usersdata";
import changeUser from "./changeUser";
export default {
  name: "HelloWorld",
  components: {
    changeUser
  },
  data() {
    return {
      users: [],
      user: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      },
      dialogVisible:false,
      userinfo:{},
      roles:[],
      newroles:''
    };
  },

  created() {
    this.$bus.$on("getusers", ref => {
      this.users = ref;
    });
  },
  methods: {
    userStateChanged(userinfo) {
      ChangeduserState(userinfo.id, userinfo.mg_state).then(res => {
        if (res.data.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state;
          return this.$message.error("更新用户状态失败！");
        }
        this.$message.success("更新用户状态成功！");
      });
    },
    changeuser(scope) {
      this.user.username = scope.row.username;
      this.user.id = scope.row.id;
      this.user.email = scope.row.email;
      this.user.mobile = scope.row.mobile;

      this.$refs.change.changeuserinput = true;
    },
    deleteuser(scope) {

      const confirmResult = this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(()=>{
        deleteuser(scope.row.id).then(res=>{
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
           this.$bus.$emit('updata')
         this.$message.success("删除用户成功")
        }
      })
      })
      .catch(err =>this.$message.info('已取消删除') )     
    },
    changeroles(userinfo){
    this.userinfo=userinfo
    this.dialogVisible=true
   
     getrolesdata().then(res=>{
      if (res.data.meta.status!== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roles= res.data.data   
      })

    },
    changerole(){
      Changeroles(this.userinfo.id,this.newroles).then(res=>{
        console.log(res);
        
      if (res.data.meta.status!== 200) {
        return this.$message.error('分配角色失败！')
      }
     this.$bus.$emit('updata')
     this.$message.success("分配角色成功")
     this.dialogVisible=false
      })
    }
    
  }
};
</script>

<style scoped>
</style>
