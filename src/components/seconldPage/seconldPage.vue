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

    <mu-container>
      <mu-dialog  width="360" :open.sync="openTongueSimple">
        <!--<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>-->
        <div class="exampleTitle" style="color:rgba(0,0,0,0.6) ">标题</div>
        <img src="./../../assets/tongue-guidanc.jpg"  alt="tongueGuidence" style="width: 100%" />
        <div class="blackTitle">
          请确保:舌头在圈定范围内、将舌自然地伸出口外、舌面平展、不逆光
        </div>
        <mu-flex class="flex-wrapper" justify-content="center">
          <mu-button large color="primary" class="startPhotoBg"  @click="reTakePhoto">开始拍照</mu-button>
        </mu-flex>

      </mu-dialog>

    </mu-container>

    <PhotoView :commonFlag="commonFlag"></PhotoView>

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
      openTongueSimple: false,
      commonFlag: false,
      sheetOpen: false,
      shift: String,
      openSimple: false,
      headerImage: '',
      picValue: '',

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
      },
      btnFlag: false
    }
  },
  components: {
    PhotoView
  },
  activated () {
    console.log('activated')
    this.imgUrl = this.$store.state.faceHeadImage
  },
  created () {
    console.log('created')
    this.imgUrl = this.$route.params.picValue
  },
  mounted () {
    console.log('mounted')
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
        this.openTongueSimple = false
        var takePicture = document.getElementById('upload')
        takePicture.click()
      } else {
        this.sheetOpen = false
      }
    },
    reTakePhoto () {
      this.sheetOpen = false
      this.openSimple = false
      this.openTongueSimple = false
      // this.sheetOpen = true
      // this.openSimple = false
      // this.$router.go(-1)
      var takePicture = document.getElementById('upload')
      takePicture.click()
    },
    goBack () {
      this.$router.go(-1)
    },
    nextStep () {
      if (this.btnFlag === false) {
        this.btnFlag = true
        setTimeout(function () {
          this.btnFlag = false
        }, 1000)
        this.createPhoto()
        // if (this.$store.state.faceDetectRes === true) {
        //   this.$router.push({
        //     'name': 'thirdPage'
        //   })
        // } else {
        //   this.createPhoto()
        // }
      }
    },
    getPhoto () {
      var imageInput = document.querySelector('#upload')
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
              // var rotateBase64 = rotateCanvas.toDataURL('image/jpeg', 0.5)
              // var a = document.createElement('a')
              // a.href = rotateBase64
              // a.download = 'hha'
              // a.click()
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
        let photoBox = document.querySelector('#preview-img')
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
          var dataUrl = canvas.toDataURL('image/jpg')
          var file = Tools.dataURLtoFile(dataUrl)
          that.imgPreview(file)
          // that.$store.dispatch('ZW_UPLOAD_FACE', file).then(res => {
          //   if (res === true) {
          //     that.openTongueSimple = true
          //     that.commonFlag = true
          //     // that.$router.push({'name': 'thirdPage'})
          //   } else {
          //     that.openSimple = true
          //   }
          // }, error => {
          //   console.log(error)
          // })
        })
      } else {
        this.$alert('重新上传图片', '提示')
      }
    },
    uploadImage () {
      var file = Tools.dataURLtoFile(this.headerImage)
      this.$store.dispatch('ZW_UPLOAD_FACE', file).then(res => {
        if (res === true) {
          this.openTongueSimple = true
          this.commonFlag = true
          // this.$router.push({
          //   'name': 'thirdPage'
          // })
        } else {
          this.openSimple = true
        }
      }, error => {
        console.log(error)
      })
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result

          // 判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            self.uploadImage()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
              self.uploadImage()
            }
          }
        }
      }
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0
      const maxStep = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 10000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.8)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
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
