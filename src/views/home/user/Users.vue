<template>
  <div>
  <user-header >
  <span slot="name1">用户管理</span>
  <span slot="name2">用户列表</span>
  </user-header>
    <el-card>
      <user-seach></user-seach>
      <user-list></user-list>
      <user-page ref='userpage'></user-page>
    </el-card>
    <add-user @adduser='updateuser'> </add-user>
  </div>
</template>

<script>
import addUser from './adduser'
import userList from './userList'
import userHeader from'./userheader'
import userPage from'./userpage'
import userSeach from'./userseach'
export default {
  components:{
   addUser,
   userList,
   userHeader,
   userPage,
   userSeach
  },
  data() {
  
    return {
     keywork:''
    };
  },

  methods: {
 
    updateuser(){
      this.$refs.userpage.getdata()
    }
  },
}
</script>

<style scoped>

</style>
