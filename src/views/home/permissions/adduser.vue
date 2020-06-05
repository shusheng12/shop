<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%" @close="close">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addroles } from "@/network/getpowerdata";
export default {
  
  data() {
    return {
      dialogVisible: false,
      addForm: {
        roleName:'',
        roleDesc:''
      },
      addFormRules: {
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
    adduser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message.error("请输入角色名");
          return false;
        } else {
         addroles(this.addForm).then(res => {
         
          if(res.data.meta.status!==201){
              this.$message.error(res.data.meta.msg);
            }
          else{
         this.$emit('addroles')
         this.$message.success("添加角色成功")
         this.dialogVisible=false
         this.addForm={}
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
