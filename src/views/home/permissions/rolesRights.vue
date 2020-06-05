<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="70%" @close="setRightDialogClosed">
      <el-tree
        :data="list"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getrightlist, changerights } from "@/network/getpowerdata";

export default {
  props: {
    roles: Object,
    default: {}
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      treeProps: {
        label: "authName",
        children: "children"
      },
      defKeys: [],
      strings: ""
    };
  },
  created() {
    this.getroles();   
  },
  methods: {
    getroles() {
      getrightlist().then(res => {
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
          this.list = res.data.data;
          if(this.roles){
            this.getLeafKeys(this.roles,this.defKeys);
          }
          
        }
      });
    },
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) {
        //console.log(node.id);
        return arr.push(node.id);
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    },
    setRightDialogClosed() {
      // console.log(1111);

      this.defKeys = [];

      // console.log(this.defKeys);
    },
    btn() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];

      const arrstr = keys.join(",");

      changerights(this.roles.id, arrstr).then(res => {
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg);
        } else {
          this.$message.success("分配权限成功"), this.$emit("rolesrights1");
        }
        this.dialogVisible = false;
      });
    }
  },
 
};
</script>

<style scoped>
</style>
