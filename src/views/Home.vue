<template>
  <el-container class="elcontainer">
    <el-header>
      <div>电商管理后台</div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
              >{{ subItem.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { gethomedata } from "@/network/gethomedata";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menulist: [],
      activePath: "",
      // 是否折叠
      isCollapse: false,
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear("token");
      this.$router.push("/Login");
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  created() {
    gethomedata().then((res) => {
      if (res.data.meta.status !== 200) {
        this.$message.error(res.data.meta.msg);
      } else {
        this.menulist = res.data.data;
      }
    });
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>
<style scoped>
.el-menu {
  border-right-width: 0;
}
.el-container {
  height: 90vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
}
.el-aside {
  background-color: #333744;
  color: #fff;
}
.el-main {
  background-color: #eaedf1;
}
</style>
