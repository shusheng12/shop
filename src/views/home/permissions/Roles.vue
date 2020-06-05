<template>
  <div>
    <user-header>
      <span slot="name1">权限管理</span>
      <span slot="name2">角色列表</span>
    </user-header>
    <el-card>
      <el-row class="adduser">
        <el-col>
          <el-button type="primary" @click="adduser">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table border stripe :data="List">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row :class="['vcenter','bdbottom',i1 === 0 ? 'bdtop' : '']" v-for="(tag,i1) in scope.row.children" :key="tag.id">
              <el-col :span="5">
                <el-tag @close="removeRightById(scope.row, tag.id)" closable>{{tag.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(tag1,i2) in tag.children" :key="tag1.id">
                  <el-col :span="6">
                    <el-tag @close="removeRightById(scope.row, tag1.id)" type="success" closable>{{tag1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag  @close="removeRightById(scope.row, item3.id)" type="warning" v-for="item3 in tag1.children" :key="item3.id" closable >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="changeuser(scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteuser(scope)">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-user ref="adduser" @addroles="getdata"></add-user>
    <change-user ref="changeuser" :roles="roles" @changeuser="getdata"></change-user>
    <roles-rights ref="rolesrights" :roles="roles1" @rolesrights1='rolesrights1'></roles-rights>
  </div>
</template>
<script>
import userHeader from "../user/userheader";
import addUser from "./adduser";
import changeUser from "./changeuser";
import rolesRights from "./rolesRights";

import { getrolesdata, deleteuser,delright} from "@/network/getpowerdata";
export default {
  components: {
    userHeader,
    addUser,
    changeUser,
    rolesRights
  },
  data() {
    return {
      List: [],
      roles: {
        id: "",
        roleName: "",
        roleDesc: ""
      },
      roles1:null
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    adduser() {
      this.$refs.adduser.dialogVisible = true;
    },
    getdata() {
      getrolesdata().then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取角色列表失败！");
        }
        this.List = res.data.data;
        //console.log(this.List);
      });
    },
    changeuser(scope) {
      this.roles.id = scope.id;
      this.roles.roleName = scope.roleName;
      this.roles.roleDesc = scope.roleDesc;
      this.$refs.changeuser.dialogVisible = true;
    },
    deleteuser(scope) {
      const confirmResult = this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          deleteuser(scope.row.id).then(res => {
            if (res.data.meta.status !== 200) {
              this.$message.error(res.data.meta.msg);
            } else {
              this.getdata();
              this.$message.success("删除角色成功");
            }
          });
        })
        .catch(err => this.$message.info("已取消删除"));
    },
    showSetRightDialog(data) {
      this.roles1=data
      this.$refs.rolesrights.dialogVisible = true;
      this.$refs.rolesrights.getroles()
     // console.log(data);
      
    },
    removeRightById(scope,id){

      delright(scope.id,id).then(res=>{
        if (res.data.meta.status !== 200) {
              this.$message.error(res.data.meta.msg);
            } else {
              scope.children = res.data.data
              this.$message.success("删除权限成功");
            }
      }) 
    },
    rolesrights1(){
      this.getdata();
    }
  }
};
</script>
<style  scoped>
.adduser {
  margin-bottom: 20px;
}
.el-tag {
  margin: 7px;
}

.vcenter {
  display: flex;
  align-items: center;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

</style>>
    