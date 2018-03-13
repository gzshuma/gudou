<template>
    <div class="user-home">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
             <el-form-item label="原密码" prop="passold">
                <el-input type="password" v-model.number="ruleForm2.passold" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>


<script>
import $ from 'jquery'
import { setPassWordFetch } from '@/axios/api'
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        puser:sessionStorage.getItem('user'),
        ptoken:sessionStorage.getItem('flag'),
        ruleForm2: {
          passold: '',
          pass: '',
          checkPass: '',
        },
        rules2: {
          passold: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this._setPassWord();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //修改密码
      _setPassWord(){
        var self = this;
        setPassWordFetch(self).then(res => {
            if(res.data.status == 0) {
                this.$message.success('修改密码成功')
            }else{
                this.$message.error(res.data.errorMessage)
            }
        }).catch((res) => {
          console.log(res.data.errorMessage)
        })
      },
    }
  
}
</script>
<style scoped>
.user-home { background: #f6f6f6; padding: 80px 100px 150px; }


</style>

