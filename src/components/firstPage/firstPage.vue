<template>
<div class="background">
  <div class="head">简单3步，足不出户，健康解读</div>
  <div class="blockBg">
    <div class="leftTitle">第1步</div>
    <div class="imageBg">
      <img src="./../../assets/manHead.jpg"  alt="manHead" style="width: 80px" />
    </div>
    <div class="blockRightBg">
      <div class="blueTitle">面诊</div>
      <div class="blackTitle">通过观察面部神、色等情况，判断机体状态的一种方法。</div>
    </div>
  </div>

  <div class="blockBg">
    <div class="leftTitle">第2步</div>
    <div class="imageBg">
      <img src="./../../assets/she_shouye_icon.png"  alt="manHead" style="width: 80px" />
    </div>
    <div class="blockRightBg">
      <div class="blueTitle">舌诊</div>
      <div class="blackTitle">通过观察舌象的颜色、质地，了解机体生理功能和病理变化的诊察方法。</div>
    </div>
  </div>
  <div class="blockBg">
    <div class="leftTitle">第3步</div>
    <div class="imageBg">
      <img src="./../../assets/womanHead.jpg"  alt="manHead" style="width: 80px" />
    </div>
    <div class="blockRightBg">
      <div class="blueTitle">问诊</div>
      <div class="blackTitle">通过症状询问，以了解机体健康状态的有关情况。</div>
    </div>
  </div>
  <div class="alertTitle">
    本产品源于上海中医药大学专利技术开发
  </div>
  <div class="nextBtnBg">
    <mu-button large color="primary" full-width @click="openSimpleDialog">拍照，从面诊开始</mu-button>
  </div>
  <mu-container>
    <mu-dialog  width="360" :open.sync="openSimple">
      <!--<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>-->
      <div class="exampleTitle">示例</div>
      <img src="./../../assets/face-guidance.jpg"  alt="faceGuidence" style="width: 100%" />
      <div class="blackTitle">
        请确保：脸在圈定范围内、美颜已关闭、不戴眼镜、不逆光
      </div>
      <mu-flex class="flex-wrapper" justify-content="center">
        <mu-button large color="primary" class="startPhotoBg"  @click="startPictureAlert">开始拍照</mu-button>
      </mu-flex>

    </mu-dialog>

  </mu-container>

  <photo-view @closeSimpleDialog="closeSimpleDialog" :commonFlag="false"></photo-view>

  <mu-bottom-sheet :open.sync="open">
    <mu-list  :value.sync="shift" @change="BottomNavChange">
      <mu-list-item button value="1">
        <mu-flex class="flex-wrapper" justify-content="center">
          <div style="text-align: center"><mu-list-item-title>拍照</mu-list-item-title></div>
        </mu-flex>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button value="2">
        <mu-flex class="flex-wrapper" justify-content="center" align="center">
          <div style="text-align: center"><mu-list-item-title>取消</mu-list-item-title></div>
        </mu-flex>

      </mu-list-item>

    </mu-list>
  </mu-bottom-sheet>
</div>
</template>

<script>
import PhotoView from '@/components/photoview/photoview'
export default {
  name: 'firstPage',
  data () {
    return {
      openSimple: false,
      open: false,
      shift: String
    }
  },
  created () {
    this.$store.dispatch('ZW_LOGIN').then(res => {
      this.getQuestions()
    })
  },
  mounted: function () {

    // var file = new Image()
    // this.$store.dispatch('ZW_UPLOAD_FACE', file)
  },
  methods: {
    getQuestions () {
      this.$store.dispatch('ZW_GET_QUESTIONS').then(res => {

      }, error => {
        console.log(error)
      })
    },
    nextBtn: function () {
      console.log('123')
    },
    openSimpleDialog () {
      // this.$router.push({
      //   'name': 'question1'
      // })
      // window.location.href = 'https://openapi-dev.zhiyuntcm.com/#/report/SRsNvShmjy2ubXlA'
      this.openSimple = true
    },
    startPictureAlert () {
      this.open = true
    },
    closeSimpleDialog () {
      this.openSimple = false
      this.open = false
    },
    closeBottomSheet () {
      this.open = false
    },
    openBotttomSheet () {
      this.open = true
    },
    BottomNavChange (value) {
      this.open = false
      if (value === '1') {
        var takePicture = document.getElementById('upload')
        takePicture.click()
      } else {
        this.open = false
        // this.openSimple = false
      }
    }
  },
  components: {
    PhotoView
  }
}
</script>

<style scoped>
  .background{
    min-height: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    background: rgb(242, 242, 242);
    box-sizing: border-box;
  }
.head{
  display: block;
  text-align: center;
  width: 100%;
  height: 25px;
  background-color: rgb(245, 71, 70);
  color: rgb(255, 255, 255);
  font-size: 12px;
  line-height: 25px;
}
  .blockBg{
    width: 95%;
    max-width: 100%;
    height: 140px;
    margin: 5px 10px;
    background: white;
    border-radius: 3px;
    box-sizing: border-box;
    display: block;
  }
  .leftTitle{
    width: 100%;
    padding-top: 15px;
    padding-left: 20px;
    font-size: 13px;
    color: rgb(51, 51, 51);
    line-height: 1;
    display: block;
  }
  .imageBg{
    width: 20px;
    margin-left: 50px;
    margin-top: 10px;
    float: left;
    height: 70px;
    box-sizing: border-box;
  }
  .blockRightBg{
    float: right;
    margin-right: 20px;
    width: 160px;
    /*background-color: red;*/
    display: block;
  }
  .blueTitle{
    font-size: 15px;
    font-weight: 200;
    color: rgb(34, 167, 240);
    margin-bottom: 10px;
    line-height: 1;
  }
  .blackTitle{
    font-size: 13px;
    color: rgb(75, 75, 75);
    text-align: justify;
  }
  .alertTitle{
    width: 100%;
    font-size: 12px;
    text-align: center;
    line-height: 1;
    padding: 10px 0px 10px;
    color: rgb(255, 138, 95);
    font-weight: bold;
  }
  .nextBtnBg{
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    flex-basis: 100px;
  }
  .nextBtn{
    display: block;
    color: rgb(255, 255, 255);
    line-height: 1.4;
    text-align: center;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    white-space: nowrap;
    width: 230px;
    height: 50px;
    font-size: 18px;
    background: none rgb(34, 167, 240);
    border-radius: 3px;
    border-width: 0.5px;
    border-style: solid;
    border-color: rgb(2, 142, 219);
    border-image: initial;
    padding: 0px !important;
  }
  .exampleTitle{
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 1;
    min-height: 16px;
    font-weight: normal;
    margin: 0px 0px 16px;
  }
  .closeRight{
    position: absolute;
    width: 25px;
    height: 25px;
    margin-top: 10px;
    margin-right: 10px;
    background-color: red;
    float: right;
  }
  .startPhotoBg{
    display: block;
    text-align: center;
  }
</style>
<style>
  div {
    display: block;
  }
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .flex-wrapper {
    width: 100%;
    height: 56px;
    margin-top: 8px;
  }
  .flex-demo {
    width: 200px;
    height: 32px;
    background-color: #e0e0e0;
    text-align: center;
    line-height: 32px;
    margin-left: 8px;
  }
  /*.flex-wrapper:first-child {*/
    /*margin-top: 0;*/
  /*}*/
  /*.flex-demo:first-child {*/
    /*margin-left: 0;*/
  /*}*/

</style>
