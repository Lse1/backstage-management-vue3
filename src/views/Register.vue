<template>
  <el-card :class="flag ? 'login' :'register'">
    <div v-show="flag">
      <h1>登录</h1>
      <el-form :model="loginRuleForm"
               status-icon
               :rules="loginRules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="login">
          <el-input v-model.number="loginRuleForm.login"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input type="password"
                    v-model="loginRuleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="!flag">
      <h1>注册</h1>
      <el-form :model="registerRuleForm"
               status-icon
               :rules="registerRules"
               ref="registerRuleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="login">
          <el-input v-model.number="registerRuleForm.login"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pass">
          <el-input type="password"
                    v-model="registerRuleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认"
                      prop="againPass">
          <el-input type="password"
                    v-model="registerRuleForm.againPass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="registerRuleForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册码"
                      prop="RegistrationCode">
          <el-input v-model="registerRuleForm.RegistrationCode"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitRegisterForm('registerRuleForm')">注册</el-button>
          <el-button @click="resetForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getLogin, getRegister } from '../api/index'
// import { Message } from 'element-ui'
export default {
  name: 'register',
  data () {
    var checkLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerRuleForm.againPass !== '') {
          this.$refs.registerRuleForm.validateField('againPass')
        }
        callback()
      }
    }
    var confirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerRuleForm.pass) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerRuleForm: {
        pass: '',
        login: '',
        againPass: '',
        email: '',
        RegistrationCode: '123456'
      },
      loginRuleForm: {
        pass: '123456',
        login: 'lse2'
      },
      loginRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        login: [
          { validator: checkLogin, trigger: 'blur' }
        ]
      },
      registerRules: {
        pass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        login: [
          { validator: checkLogin, trigger: 'blur' }
        ],
        againPass: [
          { validator: confirmPass, trigger: 'blur' }
        ]
      },
      flag: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getLogin({ ruleForm: this.loginRuleForm })
            .then((res) => {
              localStorage.setItem('token', res.token)
              localStorage.setItem('identity', res.identity)
              localStorage.setItem('user', res.user)
              localStorage.setItem('lastTime', res.lastTime)
              this.$router.push({ name: 'home' })
            }).catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitRegisterForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getRegister({ ruleForm: this.registerRuleForm })
            .then((res) => {
              console.log(res)
              // localStorage.setItem('token', res.token)
              // this.$router.push({ name: 'home' })
            }).catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
  // transform: translateX(-50%);
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 30px;
  }
}
.register {
  width: 400px;
  height: 400px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
  // transform: translateX(-50%);
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 30px;
  }
}
</style>
