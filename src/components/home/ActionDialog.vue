<template>
  <mu-container>
    <!--<mu-flex justify-content="center">-->
      <!--<mu-button @click="openScrollDialog"></mu-button>-->
    <!--</mu-flex>-->
    <mu-dialog :title="cardNo" width="360" scrollable :open.sync="openScroll">
      <mu-list>
        <div v-if="cardStatus === 0 || cardStatus === 1">
          <mu-list-item >
          <mu-list-item-content>
            <mu-radio label="转售"  value="转售" v-model="ringtone"></mu-radio>
          </mu-list-item-content>
        </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item >
            <mu-list-item-content>
              <mu-radio label="售出"  value="售出" v-model="ringtone"></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <div v-if="cardStatus === 2">
          <mu-list-item >
            <mu-list-item-content>
              <mu-radio label="核销"  value="核销" v-model="ringtone"></mu-radio>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <div v-if="cardStatus === 3">
          卡已核销
        </div>
      </mu-list>
      <mu-button slot="actions" flat color="primary" @click="closeScrollDialog">确认</mu-button>
    </mu-dialog>
    </mu-container>
</template>

<script>
export default {
  name: 'ActionDialog',
  props: {
    ActionDialogVisible: String,
    cardNo: String,
    cardId: String,
    cardType: String,
    cardStatus: Number
  },
  data () {
    return {
      openScroll: false,
      ringtone: 'None',
      options: [
        'None',
        'Atria',
        'Callisto',
        'Dione',
        'Ganymede',
        'Hangouts Call',
        'Luna',
        'Oberon',
        'Phobos',
        'Pyxis',
        'Sedna',
        'Titania',
        'Triton',
        'Umbriel'
      ]
    }
  },
  watch: {
    ActionDialogVisible: function (newValue) {
      this.openScroll = true
    }
  },
  methods: {
    openScrollDialog () {
      this.openScroll = true
    },
    closeScrollDialog () {
      this.openScroll = false
      this.$emit('selectActionValue', this.ringtone)
    }
  }
}
</script>

<style scoped>

</style>
