<template>
    <div class="background">
      <div class="welcome">
        <div>登录</div>
        <div>Hi，欢迎来玩乎～</div>
      </div>
      <div >
        <mu-container>
          <mu-text-field v-model="userName"  placeholder="请输入手机号" icon="account_circle" ></mu-text-field>
          <mu-text-field v-model="password" placeholder="请输入密码" type="password" icon="locked"></mu-text-field>
        </mu-container>
      </div>

    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  }
}
</script>

<style scoped>
  .background{
    width: 100%;
    height: 100%;
    background-color: white;
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
</style>
