<template>
    <div style="background-color: white">
      <NavHead>售出</NavHead>
      <mu-container style="">
        <mu-form ref="form" :model="dataForm" class="mu-demo-form">
          <mu-form-item label="用户名" help-text="帮助文字" prop="recipient" :rules="usernameRules">
            <mu-text-field v-model="dataForm.recipient" prop="recipient"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" help-text="帮助文字" prop="recipientPhone" :rules="phoneRules">
            <mu-text-field v-model="dataForm.recipientPhone" prop="recipientPhone" type="number" :max-length="11"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="折扣" help-text="帮助文字" prop="discountInfo" :rules="discountRules">
            <mu-text-field v-model="dataForm.discountInfo" prop="discountInfo"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="价格" help-text="帮助文字" prop="realPrice" :rules="usernameRules">
            <mu-text-field v-model="dataForm.realPrice" prop="realPrice"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="备注信息" help-text="帮助文字" prop="remarks" :rules="usernameRules">
            <mu-text-field v-model="dataForm.remarks" prop="remarks"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <!--<mu-button color="primary" @click="submit">提交</mu-button>-->
            <!--<mu-button @click="clear">重置</mu-button>-->
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
</template>

<script>
import NavHead from '../head/NavHead'
export default {
  name: 'CardSold',
  data () {
    return {
      dataForm: {
        recipientPhone: '',
        remarks: '',
        realPrice: 0,
        discountInfo: '',
        recipient: ''
      },
      id: 0,
      cardNo: '',
      originPrice: 0,
      operator: '',
      createTime: '',
      cardId: '',
      operatorDescription: '',
      usernameRules: [
        {
          validate: (val) => !!val, message: '必须填写用户名'
        }
      ],
      phoneRules: [
        {
          validate: (val) => !!val, message: '必须填写手机号'
        },
        {
          validate: (val) => val.length === 11, message: '11位手机号'
        }
      ],
      discountRules: [
        {
          validate: (val) => val.length >= 1 && val.length <= 10, message: '折扣区间(1-10),10代表不打折'
        }
      ]
    }
  },
  components: {
    NavHead
  }
}
</script>

<style scoped>

</style>
