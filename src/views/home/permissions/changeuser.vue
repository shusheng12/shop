<template>
  <div>
    <el-dialog title="修改角色" :visible.sync="dialogVisible" width="50%" @close='close'>
      <el-form :model="roles" :rules="changeFormRules" ref="changeFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roles.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="changeuser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { changeroles } from "@/network/getpowerdata";
export default {
  props:{
roles:Object
  },
  data() {
    return {
      dialogVisible: false,
      changeFormRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          {
            min:2,
            max: 15,
            message: "角色名的长度在2~15个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changeuser() {
      this.$refs.changeFormRef.validate(valid => {
        if (!valid) {
          this.$message.error("请输入角色名");
          return false;
        } else {
         changeroles(this.roles).then(res => {
       
       console.log(res);
       
          if(res.data.meta.status!==200){
              this.$message.error(res.data.meta.msg);
            }
          else{
          this.$emit('changeuser')
         this.$message.success("修改角色成功")
         this.dialogVisible=false
          }         
               
          });
        }
      });
    },
    close(){
      this.$refs.addFormRef.resetFields()
    }
  },
  created(){
  }
};
</script>

<style scoped>
</style>
