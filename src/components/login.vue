<template>
  <div class="backGround" :style="backgroundDiv">

    <div class="questionBG">
      <h1 >
        加权图像加解密系统
      </h1>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
        <el-form-item prop="userName">
          <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex">
            <el-col :span="12">
              <el-button style="width: 100px" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button style="width: 100px" type="primary" @click="registerUser()">注册</el-button>
            </el-col>
          </el-row>

          <el-row type="flex" style="margin-top: 20px;bottom: 0px">
            <el-col :span="12">

            </el-col>
            <el-col :span="12">
              <el-button  style="width: 100px" type="primary" @click="forgetPassword()">忘记密码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tools from '../utils/Tools.js'
export default {
  name: 'login',
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/background.png') + ')'
      },
      dataForm: {
        userName: '',
        password: ''
      },
      dataRule: {
        userName: [
          { required: true, message: '帐号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      captchaPath: ''
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    forgetPassword () {
      this.$router.push({ name: 'forgetpassword' })
    },
    registerUser () {
      this.$router.push({ name: 'register' })

      // Message.alert('Hello world', 'Alert')
    },
    // 提交表单
    dataFormSubmit () {
      if (this.dataForm.userName.length === 0) {
        this.$alert('请输入用户名', '提示')
        return
      }
      if (!Tools.checkLength(this.dataForm.password, 4, 20)) {
        this.$alert('密码长度4-20', '提示')
        return
      }
      this.$http({
        url: this.$http.adornUrl('/api/user/login'),
        method: 'post',
        params: {
          'username': this.dataForm.userName,
          'password': this.dataForm.password
        }
      }).then(({data}) => {

        if (data && data.code === 0) {
          this.$cookie.set('token', data.token)

          if (data.type === 1) {

          } else {
            this.$router.replace({ name: 'sysUserMain' })
          }
        } else {
          this.$alert(data.msg, '提示')
        }
      })

      // Message.alert('Hello world', 'Alert')
    },
    // 获取验证码
    getCaptcha () {
      // this.dataForm.uuid = getUUID()
      this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
    }
  }
}
</script>

<style >
  .backGround {
    min-height: 100%;
    /*height: auto;*/
    overflow-y: visible;
    background:  0% 0% / cover rgb(85, 140, 228);
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    /*background-repeat:no-repeat;*/
    /*background-size:100% 100%;*/
    /*background-attachment: fixed;*/
    position: fixed;
    width: 100%;
    height: 100%;

  }
  .alreadyAnswerQuestion{
    width: 100%;
    height: 15px;
    line-height: 1;
    font-size: 16px;
    color: white;
    margin: 30px auto 10px;
  }
  .questionBG{
    background-color: rgba(255, 255, 255, 0.4);
    width: 375px;
    border-radius: 3px;
    padding: 30px;
    margin: 0px 15px;
    position: absolute;
    top: 25%;
    left: 35%;
  }
  .cellQuestion{
    display: block;
    font-size: 18px;
    line-height: 1;
    text-align: left;
    color: rgb(51, 51, 51);
    font-weight: 500;
    width: 280px;
    height: 50px;
    background: none white;
    padding: 18px 21px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-radius: 3px;
    margin: 15px 3px;
    outline: none;
  }
  .btnClass {
    position: absolute;
    bottom: 10%;
    width: 100%;
    /*display: flex;*/
    /*-webkit-box-pack: justify;*/
    /*justify-content: space-between;*/
    /*margin: 0px 65px;*/
  }
  .leftBtnClass {
    text-align: center;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    white-space: nowrap;
    width: 100px;
    height: 38px;
    display: inline-block;
    font-size: 16px;
    line-height: 38px;
    color: white;
    background: none;
    border-width: 1px;
    border-style: solid;
    border-color: white;
    border-image: initial;
    border-radius: 7px;
    padding: 0px !important;
  }
  .rightBtnClass {
    text-align: center;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    white-space: nowrap;
    width: 100px;
    height: 38px;
    display: inline-block;
    font-size: 16px;
    line-height: 38px;
    color: rgb(34, 167, 240);
    background: none rgb(255, 255, 255);
    border-width: 2px;
    border-style: solid;
    border-color: white;
    border-image: initial;
    border-radius: 7px;
    padding: 0px !important;
  }
  .flex-wrapper {
    width: 100%;
    height: 70px;
    /*margin-top: 8px;*/
  }
</style>
