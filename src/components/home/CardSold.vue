<template>
    <div style="background-color: white">
      <mu-container>
        <mu-form ref="form"  class="mu-demo-form">
          <mu-form-item label="用户名" help-text="帮助文字" prop="recipient" :rules="usernameRules">
            <mu-text-field v-model="recipient" prop="recipient"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" help-text="帮助文字" prop="recipientPhone" :rules="usernameRules">
            <mu-text-field v-model="recipientPhone" prop="recipientPhone"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="折扣" help-text="帮助文字" prop="discountInfo" :rules="usernameRules">
            <mu-text-field v-model="discountInfo" prop="discountInfo"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="价格" help-text="帮助文字" prop="realPrice" :rules="usernameRules">
            <mu-text-field v-model="realPrice" prop="realPrice"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="备注信息" help-text="帮助文字" prop="remarks" :rules="usernameRules">
            <mu-text-field v-model="remarks" prop="remarks"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
</template>

<script>
export default {
  name: 'CardSold',
  data () {
    return {
      id: 0,
      cardNo: '',
      originPrice: 0,
      realPrice: 0,
      discountInfo: '',
      recipient: '',
      operator: '',
      createTime: '',
      cardId: '',
      recipientPhone: '',
      remarks: '',
      operatorDescription: '',
      usernameRules: [
        {
          validate: (val) => !!val, message: '必须填写用户名'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
