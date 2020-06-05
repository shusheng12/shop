<template>
  <div>
    <el-aside width="200px">
      <el-menu
        class="a"
        default-active="2"
        background-color="#fff"
        text-color="#000"
        active-text-color="#10d1ce"
        mode="vertical"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <i class="el-icon-menu aaa"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <i class="el-icon-menu aaa"></i>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
    </el-aside>
    {{time| gettimedata()}}
  </div>
</template>

<script>
import { formatDate } from "@/utils/utils.js";

export default {
  data() {
    return {
      time:'2010/05/13 19:53:40'
    };
  },
  methods: {
    aaa(a) {
      console.log(a);
      console.log(this.$refs.reference.$el);
    }
  },
  filters: {
    gettimedata(data) {
      let time=new Date(data) 
    return formatDate(time, "yyyy/MM/dd hh:mm:ss");
    }
  }
};
</script>
<style >
.aaa {
  float: right;
  margin-top: 20px;
}

.el-aside {
  background-color: #333744;
}
.el-menu {
  border-right: none;
}
</style>