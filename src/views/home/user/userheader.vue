<template>
  <el-breadcrumb class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="name1"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name='name2'></slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {
  name: 'HelloWorld',

}
</script>

<style scoped>
.el-icon-arrow-right {
  margin: 2px 0 10px 0;
}

</style>
