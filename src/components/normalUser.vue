<template>
  <div class="backGround" :style="backgroundDiv" style="overflow: scroll">

    <el-row>

      <el-col :span="8" >
        <el-table
          :data="projectFileList"
          border
          style="width: 100%;margin-left: 20px;margin-top: 30px">

          <el-table-column
            prop="projectName"
            header-align="center"
            align="center"
            label="项目名称">
          </el-table-column>

          <el-table-column
            prop="imgUrl"
            header-align="center"
            align="center"
            label="接受的图片">
          </el-table-column>

          <el-table-column
            prop="projectIds"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <!--<div>-->
                <!--{{scope.row.downloadFile}}-->
              <!--</div>-->
              <a  :href="scope.row.downloadFile">下载</a>
              <!--<el-button type="text" size="small" @click="downloadPicture(scope.row.imgUrl)">下载</el-button>-->

            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <!--<div style="float:left;width: 1px;height: 2000px; background: #fff;"></div>-->
      <el-col :span="12">
        <div style="float: right">
          <el-button @click="backClick()">返回</el-button>
        </div>
        <el-table
          :data="joinProjectList"
          border
          @selection-change="currentChangeHandle"
          style="width: 50%;margin-left: 40%;margin-top: 30px">

          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>

          <el-table-column
            prop="projectName"
            header-align="center"
            align="center"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="joinNum"
            header-align="center"
            align="center"
            label="申请人数">
          </el-table-column>

        </el-table>

      </el-col>
      <el-col :span="4">

        <div style="margin-top: 50px">
          <el-row>
            <image-inputer @onChange="imgChange_1" :maxSize="maxSize" placeholder="选择本地加密图像"></image-inputer>
          </el-row>
          <el-row style="color: white;margin-top: 50%">
            <el-button  @click="downloadPicture()">申请还原</el-button>

          </el-row>
        </div>

      </el-col>

    </el-row>

    <!--<div class="questionBG">-->
    <!--<h3 >-->
    <!--系统用户-->
    <!--</h3>-->

    <!--</div>-->
    <div style="width: 400px;height: 500px;">

    </div>

    <userManage v-if="isUserManageVisible" ref="userManage"></userManage>
  </div>
</template>

<script>
// import Tools from '../utils/Tools.js'
import ImageInputer from '../components/ImageUploader'
import axios from 'axios'
import userManage from './userManage'

export default {
  name: 'normalUser',
  data () {
    return {
      isUserManageVisible: false,
      maxSize: 3072,
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/background.png') + ')'
      },
      projectFileList: [],
      joinProjectList: [],
      selectObjc: {},
      files: {}
    }
  },
  activated () {
    this.getProjectFileList()
    this.getProjectList()
  },
  components: {
    ImageInputer,
    userManage
  },
  methods: {
    imgChange_1 (files) {
      if (files) {
        this.files = files
        console.log(files)
      }
    },
    downloadPicture () {
      debugger
      if (typeof (this.selectObjc) === 'undefined') {
        this.$alert('请选择项目', '提示')
      }


      var form = new FormData()
      form.append('file', this.files[0])
      form.append('userId', this.selectObjc.userId)
      form.append('projectId', this.selectObjc.projectId)

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      axios.post('/api/project/applyRestore', form, config)
        .then(response => {
          if (response.data.code === 0) {
            this.$alert('申请成功', '提示')
          } else {
            this.$alert(response.data.msg, '提示')
          }
          console.log(response.data)
        })
    },
    backClick () {
      this.$router.go(-1)
    },
    userManageClick () {
      this.isUserManageVisible = true

      this.$nextTick(() => {
        this.$refs.userManage.init(1)
      })
    },
    // 当前页
    currentChangeHandle (val) {
      this.selectObjc = val[0]
      this.$refs.Table.toggleRowSelection(val)
    },
    // 获取数据列表
    getProjectFileList () {
      this.$http({
        url: this.$http.adornUrl('/api/project/receiveFileList'),
        method: 'get',
        params: this.$http.adornParams({
          userId: this.$store.state.userId
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.projectFileList = data.list
        } else {
          this.projectFileList = []
        }
      })
    },
    getProjectList () {
      this.$http({
        url: this.$http.adornUrl('/api/project/userJoinProjectList'),
        method: 'get',
        params: this.$http.adornParams({
          userId: this.$store.state.userId
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.joinProjectList = data.list
        } else {
          this.joinProjectList = []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  thead {
    .el-table-column--selection {
      .cell {
        display: none;
      }
    }
  }
</style>

<style >

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
    position: absolute;
    top: 25%;
    left: 35%;
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
    bottom: 10%;
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
