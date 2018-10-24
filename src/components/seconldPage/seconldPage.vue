<template>
  <div class="photo-box">
    <div class="preview-box">
      <img :src="imgUrl" id="preview-img" :style="{transform:'scale('+ myImg.scale+ ') translate('+myImg.position.x+'px,'+myImg.position.y+'px)'}" @touchstart="getPosition($event)" @touchmove="getMovePosition($event)" @touchend="getLeavePosition($event)">
    </div>
    <img :src="imgArr[curIndex]" style="height: 75%" id="preview-bg" @touchstart="getInitPosition($event)" @touchmove="getMovePosition($event)" @touchend="getLeavePosition($event)">
    <div class="alertTitle">请确保<br/>脸在圈定范围内、美颜已关闭、不戴眼镜、不逆光</div>
    <div class="BottomBg">
      <mu-flex class="flex-wrapper" align-items="center" justify-content="around">
        <mu-button color="primary" class="startPhotoBg"  @click="reTakePhoto">重新拍照</mu-button>
        <mu-button color="primary" class="startPhotoBg"  @click="goBack">上一步</mu-button>
        <mu-button color="primary" class="startPhotoBg"  @click="nextStep">进入舌诊</mu-button>
      </mu-flex>
    </div>
    <mu-container>
      <mu-dialog  width="360" :open.sync="openSimple">
        <!--<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>-->
        <div class="exampleTitle">面诊失败,请重新拍照</div>
        <img src="./../../assets/face-guidance.jpg"  alt="faceGuidence" style="width: 100%" />
        <div class="blackTitle">
          请确保：脸在圈定范围内、美颜已关闭、不戴眼镜、不逆光
        </div>
        <mu-flex class="flex-wrapper" justify-content="center">
          <mu-button large color="primary" class="startPhotoBg"  @click="reTakePhoto">重新拍照</mu-button>
        </mu-flex>

      </mu-dialog>

    </mu-container>

    <mu-bottom-sheet :open.sync="sheetOpen">
      <mu-list  :value.sync="shift" @change="BottomNavChange">
        <mu-list-item button value="1">
          <mu-flex class="sheet-wrapper" justify-content="center">
            <div style="text-align: center"><mu-list-item-title>拍照</mu-list-item-title></div>
          </mu-flex>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button value="2">
          <mu-flex class="sheet-wrapper" justify-content="center" align="center">
            <div style="text-align: center"><mu-list-item-title>取消</mu-list-item-title></div>
          </mu-flex>

        </mu-list-item>

      </mu-list>
    </mu-bottom-sheet>



    <PhotoView></PhotoView>

  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import Exif from 'exif-js'
import PhotoView from '@/components/photoview/photoview'
import Tools from '../../utils/Tools.js'
export default {
  name: 'seconldPage',
  data () {
    return {
      sheetOpen: false,
      shift: String,
      openSimple: false,

      curIndex: 0,
      imgArr: [
        require('../../assets/face-mask.png')
      ],
      imgUrl: '',
      initTouchX: 0,
      initTouchY: 0,
      changeTouchX: 0,
      changeTouchY: 0,
      reviewImgDom: '',
      lastTouchX: 0,
      lastTouchY: 0,
      previewImg: '',
      myImg: {
        position: {
          x: 0,
          y: 0
        },
        scale: 1,
        lastScale: 1
      }
    }
  },
  components: {
    PhotoView
  },
  created () {
    this.imgUrl = this.$route.params.picValue
  },
  mounted () {
    this.previewImg = document.querySelector('#preview-img')
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    var lastTouchEnd = 0
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
  },
  methods: {
    BottomNavChange (value) {
      this.sheetOpen = false
      if (value === '1') {
        this.openSimple = false
        var takePicture = document.getElementById('upload')
        takePicture.click()
      } else {
        this.sheetOpen = false
      }
    },
    reTakePhoto () {
      this.sheetOpen = true
      // this.openSimple = false
      // this.$router.go(-1)
      // var takePicture = document.getElementById('upload')
      // takePicture.click()
    },
    goBack () {
      this.$router.go(-1)
    },
    nextStep () {
      this.createPhoto()
    },
    getPhoto () {
      var imageInput = document.querySelector('#image-input')
      var that = this
      imageInput.addEventListener('change', function (e) {
        let reads = new FileReader()
        reads.readAsDataURL(this.files[0])
        reads.addEventListener('load', function (e) {
          that.imgUrl = this.result
          that.myImg.position.x = 0
          that.myImg.position.y = 0
          that.myImg.scale = 1
          var rotateCanvas = document.createElement('canvas')
          var orientation
          that.previewImg.addEventListener('load', function () {
            Exif.getData(that.previewImg, function () { // 获取图像的数据
              Exif.getAllTags(this) // 获取图像的全部数据，值以对象的方式返回
              orientation = Exif.getTag(this, 'Orientation') // 获取图像的拍摄方向

              var rotateCtx = rotateCanvas.getContext('2d')
              // 针对图像方向进行处理
              switch (orientation) {
                case 1 :
                  rotateCanvas.width = that.previewImg.width
                  rotateCanvas.height = that.previewImg.height
                  rotateCtx.drawImage(that.previewImg, 0, 0, that.previewImg.width, that.previewImg.height)
                  break
                case 6 : // 顺时针 90 度
                  rotateCanvas.width = that.previewImg.height
                  rotateCanvas.height = that.previewImg.width
                  rotateCtx.translate(0, 0)
                  rotateCtx.rotate(90 * Math.PI / 180)
                  rotateCtx.drawImage(that.previewImg, 0, -that.previewImg.height, that.previewImg.width, that.previewImg.height)
                  break
                case 8 :
                  rotateCanvas.width = that.previewImg.height
                  rotateCanvas.height = that.previewImg.width
                  rotateCtx.translate(0, 0)
                  rotateCtx.rotate(-90 * Math.PI / 180)
                  rotateCtx.drawImage(that.previewImg, -that.previewImg.width, 0, that.previewImg.width, that.previewImg.height)
                  break
                case 3 : // 180 度
                  rotateCanvas.width = that.previewImg.width
                  rotateCanvas.height = that.previewImg.height
                  rotateCtx.translate(0, 0)
                  rotateCtx.rotate(Math.PI)
                  rotateCtx.drawImage(that.previewImg, -that.previewImg.width, -that.previewImg.height, that.previewImg.width, that.previewImg.height)
                  break
                default :
                  rotateCanvas.width = that.previewImg.width
                  rotateCanvas.height = that.previewImg.height
                  rotateCtx.drawImage(that.previewImg, 0, 0, that.previewImg.width, that.previewImg.height)
              }
              rotateCanvas.toDataURL('image/jpeg', 0.5)
            })
          })
        })
      })
    },
    changeIndex (index) {
      this.curIndex = index
    },
    getInitPosition (e) {
      event.preventDefault()
      if (this.imgUrl) {
        var length = e.touches.length
        if (length > 1) {
          let pointOne = e.touches[0]
          let pointTwo = e.touches[1]
          this.initTouchX = pointOne.clientX - pointTwo.clientX
          this.initTouchY = pointOne.clientY - pointTwo.clientY
        } else {
          var touches = e.touches[0]
          this.initTouchX = touches.clientX
          this.initTouchY = touches.clientY
        }
      }
    },
    getMovePosition (e) {
      event.preventDefault()
      if (this.imgUrl) {
        var length = e.touches.length
        if (length > 1) {
          let pointOne = e.touches[0]
          let pointTwo = e.touches[1]
          this.changeTouchX = pointOne.clientX - pointTwo.clientX
          this.changeTouchY = pointOne.clientY - pointTwo.clientY
          var scale = (this.changeTouchX - this.initTouchX) > (this.changeTouchY - this.initTouchY) ? (this.changeTouchX / this.initTouchX) : (this.changeTouchY / this.initTouchY)
          scale *= this.myImg.lastScale
          this.myImg.scale = scale > 3 ? 3 : scale < 0.5 ? 0.5 : scale
        } else {
          var touches = e.touches[0]
          this.changeTouchX = touches.clientX - this.initTouchX
          this.changeTouchY = touches.clientY - this.initTouchY
          this.myImg.position.x = this.lastTouchX + (this.changeTouchX / this.myImg.scale)
          this.myImg.position.y = this.lastTouchY + (this.changeTouchY / this.myImg.scale)
        }
      }
    },
    getLeavePosition (e) {
      this.myImg.lastScale = this.myImg.scale
      if (e.touches.length > 0) {
        var touches = e.touches[0]
        this.initTouchX = touches.clientX
        this.initTouchY = touches.clientY
      }
      this.lastTouchX = this.myImg.position.x
      this.lastTouchY = this.myImg.position.y
    },
    createPhoto () {
      if (this.imgUrl) {
        let photoBox = document.querySelector('.preview-box')
        let newImgWidth = photoBox.style.offsetWidth
        let newImgHeight = photoBox.style.offsetHeight
        let scale = window.devicePixelRatio
        let that = this
        html2canvas(photoBox, {
          width: newImgWidth,
          height: newImgHeight,
          scale: scale,
          useCORS: true
        }).then(function (canvas) {
          var dataUrl = canvas.toDataURL('image/jpg', 0.5)
          var file = Tools.dataURLtoFile(dataUrl)
          that.$store.dispatch('ZW_UPLOAD_FACE', file).then(res => {
            if (res === true) {
              // that.$router.push({'name': 'login'})
            } else {
              that.openSimple = true
            }
          }, error => {
            console.log(error)
          })
        })
      } else {
        this.$alert('重新上传图片', '提示')
      }
    }
  }
}

</script>

<style lang="less">
  .photo-box {
    /*margin: 0.4rem auto 0.2rem auto;*/
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      position: absolute;
      z-index: 99;
    }
    .preview-box {
      position: absolute;
      z-index: 9;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      /*background-color: red;*/
    }
  }
</style>
<style scoped>
  #imgCanvas{
    width: 600px;
    height: 400px;
  }
  .alertTitle{
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    font-size: 14px;
    line-height: 1.5;
    color: white;
    text-align: center;
    text-shadow: rgb(150, 150, 150) 0px 2px 4px;
    z-index: 99;
  }
  .BottomBg{
    z-index: 99;
    position: fixed;
    bottom: 0px;
    height: 70px;
    width: 100%;
    background-color: rgba(58, 61, 67, 0.5);
    overflow: hidden;
  }
  .exampleTitle{
    color: red;
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 1;
    min-height: 16px;
    font-weight: normal;
    margin: 0px 0px 16px;
  }
  .flex-wrapper {
    width: 100%;
    height: 70px;
    /*margin-top: 8px;*/
  }
  .sheet-wrapper {
    width: 100%;
    height: 56px;
    margin-top: 8px;
  }
  .flex-demo {
    /*width: 80px;*/
    /*height: 40px;*/
    /*background-color: rgba(58, 61, 67, 0.5);*/
    /*text-align: center;*/
    /*line-height: 40px;*/
    /*margin-left: 8px;*/
  }
</style>
