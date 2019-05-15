<template>
  <div>
    <div style="padding:20px;">
      <!--<div class="show">-->
        <!--<div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>-->
      <!--</div>-->
      <div style="margin-top:20px;">
        <input type="file" id="upload" ref="referenceUpload" accept="image/jpg" title="heh"  @change="upload" capture="camera" style="display: none">
        <!--<label for="upload"></label>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Exif from 'exif-js'

export default {
  name: 'PhotoView',
  props:{
    commonFlag: Boolean
  },
  data () {
    return {
      headerImage:'',picValue:''
    }
  },
  mounted () {
  },
  methods: {
    upload (e) {
      //
      this.$emit('closeSimpleDialog')

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
      console.log(this.picValue)
    },
    postImg () {
      this.$refs.referenceUpload.value = null
      //这里写接口
      if (this.commonFlag === false) {
        this.$store.commit('SET_FACE_IMG',{
          'faceHeadImage': this.headerImage
        })
        this.$router.push({
          name: 'seconldPage',
          params: {
            picValue: this.headerImage
          }
        })
      }else{
        this.$store.commit('SET_TONG_IMG',{
          'tongHeadImage': this.headerImage
        })
        this.$router.push({
          name: 'thirdPage',
          params: {
            picValue: this.headerImage
          }
        })

      }
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
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.headerImage = data
              self.postImg()
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
<script src="http://cdn.loveqiao.com/jquery.js"></script>
<script type="text/javascript">
  var
    fileInput = document.getElementById('test-image-file'),
    info = document.getElementById('test-file-info'),
    preview = document.getElementById('test-image-preview');
  // 监听change事件:
  fileInput.addEventListener('change', function() {
    // 清除背景图片:
    preview.style.backgroundImage = '';
    // 检查文件是否选择:
    if(!fileInput.value) {
      info.innerHTML = '没有选择文件';
      return;
    }
    // 获取File引用:
    var file = fileInput.files[0];
    //判断文件大小
    var size = file.size;
    if(size >= 1*1024*1024){
      alert('文件大于1兆不行!');
      return false;
    }
    // 获取File信息:
    info.innerHTML = '文件: ' + file.name + '<br>' +
      '大小: ' + file.size + '<br>' +
      '修改: ' + file.lastModifiedDate;
    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      alert('不是有效的图片文件!');
      return;

      // 读取文件:
      var reader = new FileReader();
      reader.onload = function(e) {
        var
          data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...}'
        preview.style.backgroundImage = 'url(' + data + ')';
      };
      // 以DataURL的形式读取文件:
      reader.readAsDataURL(file);
      console.log(file);
    });
</script>

<style>
  #test-image-preview {
    　　border: 1px solid #ccc;
    width: 100%;
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
*{
  margin: 0;
  padding: 0;
}
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
