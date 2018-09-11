<template>
    <div class="background">
      <div class="welcome">
        <div>登录</div>
        <div>Hi，欢迎来玩～</div>
      </div>
      <div class="userAndPassword">
        <mu-container>
          <mu-text-field  v-model="formData.userName"  placeholder="请输入用户名"  icon="account_circle" full-width max-length="30"  ></mu-text-field>
          <mu-text-field v-model="formData.password" placeholder="请输入密码" type="password"  icon="locked" full-width max-length="18" ></mu-text-field>
      </mu-container>
      </div>
      <div class="loginBtn">
        <mu-button full-width round color="primary" @click="submit">登录</mu-button>
      </div>

        <!--<mu-flex fill></mu-flex>-->
      <!--<mu-flex class="bottomBackground" justify-content="around" >-->
          <!--<mu-flex class="leftImageView" align-items="center" align-content="center" justify-content="center">-->
            <!--<mu-button fab small color="green">-->
            <!--<mu-icon value="thumb_up" style=""></mu-icon>-->
            <!--</mu-button>-->
          <!--</mu-flex>-->
        <!--<mu-flex class="leftImageView" align-items="center" align-content="center" justify-content="center">-->
          <!--<mu-button fab small color="green">-->
            <!--<mu-icon value="thumb_up" style=""></mu-icon>-->
          <!--</mu-button>-->
        <!--</mu-flex>-->
      <!--</mu-flex>-->

    </div>
</template>

<script>
import Tools from '../../utils/Tools.js'
import { getUUID } from '@/utils'
export default {
  name: 'login',
  data () {
    return {
      formData: {
        userName: '',
        password: '',
        uuid: '',
        captcha: ''
      }
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    submit () {
      if (this.formData.userName.length === 0) {
        this.$alert('请输入用户名', '提示')
        return
      }
      if (!Tools.checkLength(this.formData.password, 6, 18)) {
        this.$alert('密码长度6-18', '提示')
        return
      }
      this.$http({
        url: this.$http.adornUrl('/sys/app/login'),
        method: 'post',
        data: this.$http.adornData({
          'username': this.formData.userName,
          'password': this.formData.password,
          'uuid': this.formData.uuid,
          'captcha': this.formData.captcha
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$cookie.set('token', data.token)
          this.$router.replace({ name: 'root' })
        } else {
          this.getCaptcha()
          this.$alert(data.msg, '提示')
        }
      })
      // Message.alert('Hello world', 'Alert')
    },
    // 获取验证码
    getCaptcha () {
      this.formData.uuid = getUUID()
      this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.formData.uuid}`)
    }
  }
}
</script>

<style scoped>
  .formClass{
    width: 100%;
  }
  .background{
    width: 100%;
    height: 100%;
    background-color: white;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    /*align-content: flex-start;*/
    /*align-items: center;*/
    /*display: inline-flex;*/
  }
  .welcome{
    width: 90%;
    height: 65px;
    margin-left: 25px;
    margin-top: 40px;
    font-size:25px;
    font-family:PingFangSC-Medium,serif;
    font-weight:500;
    color:rgba(33,150,243,1);
    line-height:36px;
    /*background-color: black;*/
  }
  .userAndPassword{
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
  }
  .loginBtn{
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 20px;
  }
  .bottomBackground{
    height: 25%;
    margin-left: 10%;
    margin-right: 10%;
    /*align-self:center;*/
    background-color: green;
  }
  .leftImageView{
    height: 50px;
    width: 50px;
    margin-left: 10%;
    background-color: red;
  }
  .rightImageView{
    height: 50px;
    width: 50px;
    margin-right: 10%;
    background-color: red;
  }
</style>

<style lang="less" scoped>
  .button-wrapper {
    text-align: center;
      margin-right: 10%;
      margin-left: 10%;
      .mu-button{
        margin-right: 10%;
        margin-left: 10%;
        margin-top: 10px;
        vertical-align: middle;
    }
  }
</style>
