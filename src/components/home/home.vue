
<template>
  <div >
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <div style="width: 100%;background-color: #2196f3;padding: 1rem">
        <div >
          <mu-auto-complete solo :data="staticArray"  :max-search-results="6"  v-model="dataForm.key" open-on-focus   style="background-color: white"></mu-auto-complete>

          <mu-button normal color="red" @click="search">搜索</mu-button>
        </div>
      </div>
      <mu-list textline="two-line">
          <div v-for="(item, index) in dataList"  :key="index"  class="action-btn" @touchstart="BtnTouchStart" @touchend="BtnTouchEnd" :data-index="index" :id="index" @click="clickDivItem(item.cardNo, item.cardId, item.cardName, item.status)">
            <div >
              <li>卡号:{{item.cardNo}}</li>
              <li>{{item.cardName}}</li>
              <li>{{item.updateTime}}</li>
              <mu-divider></mu-divider>

            </div>

            <div style="float: right">
              <div v-if="item.status === 2">
                卡已经售出
              </div>
              <div v-else-if="item.status === 3">
                卡已核销
              </div>
            </div>

          </div>

      </mu-list>
    </mu-paper>
    <div style="height: 60px"></div>
    <ActionDialog :ActionDialogVisible="ActionDialogVisible" @selectActionValue="selectActionValue" :card-status="selectStatus" :card-id="selectId" :card-no="selectCardNo"></ActionDialog>
  </div>
</template>

<script >
import ActionDialog from './ActionDialog'
export default {
  name: 'home',
  data () {
    return {
      dataForm: {
        key: ''
      },
      ActionDialogVisible: '',
      selectStatus: 0,
      selectId: '',
      selectCardNo: '',
      tapIndex: 0,
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      staticArray: ['190177820001', '190236590001', '190360930001', '190485610001', '190529660001', '190618270001']
    }
  },
  components: {
    ActionDialog
  },
  activated () {
    this.getDataList()
  },
  methods: {
    selectActionValue (value) {
      this.ActionDialogVisible = false
      if (value === '核销') {
        console.log('1')
      } else if (value === '转售') {
        console.log('2')
      } else if (value === '售出') {
        this.$router.push({ name: 'CardSold' })
      } else {
        console.log('4')
      }
    },
    clickDivItem (cardNo, cardId, cardType, cardStatus) {
      this.selectId = cardId + ''
      this.selectStatus = cardStatus
      this.selectCardNo = cardNo + ''
      this.ActionDialogVisible = this.RndNum(6) + ''
    },
    RndNum (n) {
      var rnd = ''
      for (var i = 0; i < n; i++) { rnd += Math.floor(Math.random() * 10) }
      return rnd
    },
    BtnTouchStart (event) {
      if ($(event.currentTarget).hasClass('action-btn')) {
        $(event.currentTarget).addClass('activeClass')
      }
    },
    BtnTouchEnd () {
      if ($(event.currentTarget).hasClass('action-btn')) {
        $(event.currentTarget).removeClass('activeClass')
      }
    },
    alertTest () {
      // this.$alert('请输入用户名', '提示')
    },
    search () {
      this.getDataList()
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl('/generator/card/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        // this.dataListLoading = false
      })
    }

  }
}

</script>

<style scoped lang="less">
  .demo-list-wrap {
    width: 100%;
    max-width: 500px;

  }
  .action-btn {
    /*display: block;*/
    /*color: inherit;*/
    /*position: relative;*/
    /*outline: none;*/
    /*cursor: pointer;*/
    /*-webkit-overflow-scrolling: touch;*/
    padding: 1rem 1rem 0rem 2rem;

  }
  .activeClass{
    background-color: #e3e3e3;
  }

</style>
