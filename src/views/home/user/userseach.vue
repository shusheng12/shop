<template>
  <el-row :gutter="20" class="msg">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="keywork" clearable @clear="getUserList" >
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addusers">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      keywork: ""
    };
  },
  methods:{
    addusers(){
    this.$bus.$emit('change')
    },
    getUserList(){
       this.$bus.$emit('getUserList')
    }
  },
  watch:{
    keywork(){
      this.$bus.$emit('changekeywork',this.keywork)
    }
  }
};
</script>

<style scoped>
.msg{
  margin-bottom: 20px;
}

</style>
