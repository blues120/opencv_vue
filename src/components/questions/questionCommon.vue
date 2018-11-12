<!--suppress ALL -->
<template>
<div class="backGround" :style="backgroundDiv">
  <div class="alreadyAnswerQuestion">
  <div style="float: right;margin-right: 35px">
    <div>
      已答 <span style="color: rgb(245, 71, 70);">{{index}}/13</span>
    </div>
  </div>
  </div>
  <div class="questionBG">
  <div style="margin-bottom: 20px;font-size: 18px;color: white">
    {{index}}、{{questionsTitle}}
  </div>
    <ul v-for="(item, index) in questionsArray" :key="item.id">
      <div>
        <button class="cellQuestion" @click="clickBtn($event,index)">
          <span style="color: rgb(34, 167, 240);">{{ABCD[index]}}、{{ item}}</span>
          <img hidden src="../../assets/selected.jpg" alt="tick" style="width: 20px;height: 20px;float: right;margin-right: -2px">
        </button>
      </div>

    </ul>

  </div>
  <div class="btnClass">

    <mu-flex class="flex-wrapper" align-items="center" justify-content="around">
      <button class="leftBtnClass" @click="lastPage">
        <div v-if="index===1">上一页</div>
        <div v-else>上一题</div>
      </button>
      <button class="rightBtnClass" @click="nextPage" v-if="answerArray.length !== 0">
        下一题
      </button>
    </mu-flex>
  </div>

</div>
</template>

<script>
export default {
  name: 'questionCommon',
  props: {
    index: Number

  },
  data () {
    return {
      questionsArray: [],
      questionsTitle: '',
      ABCD: ['A', 'B', 'C', 'D'],
      answerArray: [],
      multiple: false,
      exclusiveOption: 0,
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../assets/background.png') + ')'
      }
    }
  },
  created () {
    var objc = this.$store.state.questions[this.index - 1]
    this.questionsArray = objc.options
    this.questionsTitle = objc.label
    this.multiple = objc.multiple
    this.exclusiveOption = objc.exclusiveOption
  },
  methods: {
    clickBtn (event, index) {
      var flag = $(event.currentTarget).find('img').eq(0).is(':hidden')
      var answer = this.ABCD[index]
      if (this.multiple === false) {
        this.answerArray = []
        $('.cellQuestion').find('img').each(function () {
          $(this).hide()
        })
        $(event.currentTarget).find('img').show()
        this.answerArray.push(answer)
      } else {
        if (this.exclusiveOption === index) {
          if (flag) {
            this.answerArray = []
            $('.cellQuestion').find('img').each(function () {
              $(this).hide()
            })
            $(event.currentTarget).find('img').show()
            this.answerArray.push(answer)
          } else {
            this.answerArray = []
            $('.cellQuestion').find('img').each(function () {
              $(this).hide()
            })
            $(event.currentTarget).find('img').hide()
            this.answerArray.pop(answer)
          }
          console.log(this.answerArray)
        } else {
          $('.cellQuestion').find('img').eq(this.exclusiveOption).hide()
          var tempAnswer = this.ABCD[this.exclusiveOption]
          this.answerArray.remove(tempAnswer)
          if (flag) {
            $(event.currentTarget).find('img').show()
            this.answerArray.push(answer)
          } else {
            $(event.currentTarget).find('img').hide()
            this.answerArray.pop(answer)
          }
          console.log(this.answerArray)
        }
      }
    },
    lastPage () {
      this.$router.go(-1)
    },
    nextPage () {
      this.$store.commit('REPAIR_QUESTIONS', {
        'index': this.index - 1,
        'answer': this.answerArray
      })

      console.log(this.$store.state.questions)
      if (this.index === 13) {
        this.$store.dispatch('ZW_EXAMINATIONS').then(res => {
          window.localStorage.clear()
          window.sessionStorage.clear()

          this.$router.replace({name: 'firstPage'})
          window.location.href = res['report_url']
          // window.open = res['report_url']
          // var a = document.createElement('a')
          // a.href = 'https://openapi-dev.zhiyuntcm.com/#/history/SREz8j4CbqbsLseQ'
          // a.setAttribute('target', '_blank')
          // a.click()
          // window.open = 'https://openapi-dev.zhiyuntcm.com/#/history/SREz8j4CbqbsLseQ'
        })
      } else {
        var tempName = 'question' + (this.index + 1)
        this.$router.push({
          name: tempName
        })
      }
    }
  }
}
</script>

<style scoped>
.backGround {
  min-height: 100%;
  /*height: auto;*/
  overflow-y: visible;
  background:  0% 0% / cover rgb(85, 140, 228);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  /*background-repeat:no-repeat;*/
  /*background-size:100% 100%;*/
  /*background-attachment: fixed;*/
  position: fixed;
  width: 100%;
  height: 100%;

}
  .alreadyAnswerQuestion{
    width: 100%;
    height: 15px;
    line-height: 1;
    font-size: 16px;
    color: white;
    margin: 30px auto 10px;
  }
  .questionBG{
    background-color: rgba(255, 255, 255, 0.4);
    width: 375px;
    border-radius: 3px;
    padding: 30px;
    margin: 0px 15px;
  }
  .cellQuestion{
    display: block;
    font-size: 18px;
    line-height: 1;
    text-align: left;
    color: rgb(51, 51, 51);
    font-weight: 500;
    width: 280px;
    height: 50px;
    background: none white;
    padding: 18px 21px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
    border-radius: 3px;
    margin: 15px 3px;
    outline: none;
  }
  .btnClass {
    position: absolute;
    bottom: 80px;
    width: 100%;
    /*display: flex;*/
    /*-webkit-box-pack: justify;*/
    /*justify-content: space-between;*/
    /*margin: 0px 65px;*/
  }
  .leftBtnClass {
    text-align: center;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    white-space: nowrap;
    width: 100px;
    height: 38px;
    display: inline-block;
    font-size: 16px;
    line-height: 38px;
    color: white;
    background: none;
    border-width: 1px;
    border-style: solid;
    border-color: white;
    border-image: initial;
    border-radius: 7px;
    padding: 0px !important;
  }
  .rightBtnClass {
    text-align: center;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    white-space: nowrap;
    width: 100px;
    height: 38px;
    display: inline-block;
    font-size: 16px;
    line-height: 38px;
    color: rgb(34, 167, 240);
    background: none rgb(255, 255, 255);
    border-width: 2px;
    border-style: solid;
    border-color: white;
    border-image: initial;
    border-radius: 7px;
    padding: 0px !important;
  }
.flex-wrapper {
  width: 100%;
  height: 70px;
  /*margin-top: 8px;*/
}
</style>
