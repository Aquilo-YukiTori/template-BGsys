<template>
  <div class="login-page">
    <div class="login-form">
      <div class="tit">后台管理系统</div>
      <div class="form-box">
        <div class="head">用户登录</div>
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginDom">
          <el-form-item prop="stCode">
            <el-input type="text" placeholder="请输入用户名" v-model="loginForm.stCode"></el-input>
            <i class="iconfont icon-yonghu"></i>
          </el-form-item>
          <el-form-item prop="urLoginpassword">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.urLoginpassword"></el-input>
            <i class="iconfont icon-icon-"></i>
          </el-form-item>
          <el-form-item>
            <el-button class="block-btn" type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem } from '../utils/localStorage'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        stCode: '',
        urLoginpassword: ''
      },
      loginFormRules: {
        stCode: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        urLoginpassword: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    // 键盘回车绑定登录事件
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginDom.validate(valid => {
        if (valid) {
          this.axios.post(this.ajaxUrl + '/sys/login/login', this.loginForm).then(res => {
            if (res.data.code === 0) {
              setItem('userInfo', JSON.stringify(res.data.data))
              this.$router.push('/welcome')
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        }
      })
    }
  }
}
</script>
