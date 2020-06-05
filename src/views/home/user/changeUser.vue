<template>
  <div>
    <el-dialog title="修改用户" :visible.sync="changeuserinput" width="50%">
      <el-form :model=" user" :rules="userFormRef" ref="userFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model=" user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model=" user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model=" user.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="changeuserinput=false">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { changeusersdata } from "@/network/usersdata";

export default {
  props: {
    user: {
      type: Object,
      default: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      }
    }
  },

  data() {
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }

      cb(new Error("请输入合法的邮箱"));
    };

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };

    return {
      changeuserinput: false,
      userFormRef: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    btn(){
       this.$refs.userFormRef.validate(valid => {
        if (!valid) {
          this.$message.error("请输入正确的邮箱或手机号");
          return false;
        } else {
           changeusersdata(this.user).then(res => {
          if(res.data.meta.status!==200){
              this.$message.error(res.data.meta.msg);
            }
          else{
            this.$bus.$emit('updata')
         this.$message.success("修改用户成功")
         this.changeuserinput=false
          }         
          });
        }
      });
    },
    
  }
};
</script>

<style scoped>
</style>
