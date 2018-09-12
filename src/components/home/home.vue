<template>
  <div style="background-color: #42b983">
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-appbar style="width: 100%;" color="primary">
        <div >
          <mu-container>
            <mu-row gutter>
              <mu-col span="9" style="overflow: hidden">
                <mu-auto-complete :data="staticArray"  :max-search-results="6"  v-model="dataForm.key" open-on-focus   style="background-color: white"></mu-auto-complete>
                <!--<mu-button fab small color="red">x</mu-button>-->
              </mu-col>

              <mu-col span="3">
                <mu-button normal color="red" @click="search">搜索</mu-button>
              </mu-col>
            </mu-row>
          </mu-container>
        </div>
      </mu-appbar>
      <mu-list textline="two-line" >
        <div v-for="(item, index) in dataList" :key="index">
          <mu-list-item avatar :ripple="false" button >
            <mu-list-item-content>
              <mu-list-item-title>{{item.cardNo}}</mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">{{item.cardName}}</mu-list-item-sub-title>
              <mu-list-item-sub-title>
                {{item.updateTime}}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action >
              <div v-if="item.status === 2">
                卡已经售出
              </div>
              <div v-else-if="item.status === 3">
                卡已核销
              </div>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>

      </mu-list>
    </mu-paper>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      staticArray: ['190177820001', '190236590001', '190360930001', '190485610001', '190529660001', '190618270001']
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
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

<style scoped>
  .demo-list-wrap {
    width: 100%;
    max-width: 500px;

  }

</style>
