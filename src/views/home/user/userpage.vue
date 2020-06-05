<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2 ,3, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getusersdata } from "@/network/usersdata";
export default {
  name: "HelloWorld",

  data() {
    return {
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 3
      },
      total: 0,
      users: ""
    };
  },
  created() {
    this.getdata();
    this.$bus.$on('changekeywork',res=>{
      this.queryInfo.query=res
    }),
     this.$bus.$on('getUserList',res=>{
     this.getdata(); })
    this.$bus.$on('updata',res=>{
     this.getdata();
    })
  }, 
  methods: {
    getdata() {
      getusersdata(this.queryInfo).then(res => {
        console.log(res);
        
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
          this.users = res.data.data.users;
          this.total = res.data.data.total;
        }
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
    userStateChanged(userinfo) {
      ChangeduserState(userinfo.id, userinfo.mg_state).then(res => {
        if (res.data.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state;
          return this.$message.error("更新用户状态失败！");
        }
        this.$message.success("更新用户状态成功！");
      });
    },
    addusers() {
      this.$refs.adduser.dialogVisible = true;
    },
    adduser() {
      this.getdata();
    }
  },
  watch:{
    users(){
     
      this.$bus.$emit('getusers',this.users)
    }
  }
};
</script>

<style scoped>
</style>
