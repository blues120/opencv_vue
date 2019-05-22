<template>
  <div class="backGround" :style="backgroundDiv" style="overflow: scroll">

    <el-row>
      <el-col :span="12">
        <div style="margin-left: 15%;margin-top: 50px;width: 500px">
          <el-row>
            <el-col :span="12">
              <image-inputer @onChange="imgChange_1" :maxSize="maxSize" placeholder="选择待加密图像"></image-inputer>
            </el-col>
            <el-col :span="12">
              <image-inputer @onChange="imgChange_2" :maxSize="maxSize" placeholder="选择载体图像"></image-inputer>
            </el-col>
          </el-row>

          <div style="margin-top: 20px">
            <p>选择参与加密的用户，并设置权值</p>
          </div>
          <el-row type="flex" justify="start" align="middle" style="margin-top: 20px">
            <p>用户1:</p>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 150px" v-model="userName_1"  placeholder="选择用户" @change="selectUser(userName_1,1)">
                <el-option
                  v-for="item in  userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 120px" v-model="auth_1"  placeholder="选择权值" @change="selectAuth(userName_1,1)">
                <el-option
                  v-for="item in  authList"
                  :key="item.type"
                  :label="item.type"
                  :value="item.type">
                </el-option>
              </el-select>
            </div>

          </el-row>
          <el-row type="flex" justify="start" align="middle" >
            <p>用户2:</p>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 150px" v-model="userName_2"  placeholder="选择用户" @change="selectUser(userName_2,2)">
                <el-option
                  v-for="item in  userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 120px" v-model="auth_2"  placeholder="选择权值" @change="selectAuth(userName_2,2)">
                <el-option
                  v-for="item in  authList"
                  :key="item.type"
                  :label="item.type"
                  :value="item.type">
                </el-option>
              </el-select>
            </div>

          </el-row>
          <el-row type="flex" justify="start" align="middle" >
            <p>用户3:</p>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 150px" v-model="userName_3"  placeholder="选择用户" @change="selectUser(userName_3,3)">
                <el-option
                  v-for="item in  userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 120px" v-model="auth_3"  placeholder="选择权值" @change="selectAuth(userName_3,3)">
                <el-option
                  v-for="item in  authList"
                  :key="item.type"
                  :label="item.type"
                  :value="item.type">
                </el-option>
              </el-select>
            </div>

          </el-row>
          <el-row type="flex" justify="start" align="middle" >
            <p>用户4:</p>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 150px" v-model="userName_4"  placeholder="选择用户"  @change="selectUser(userName_4,4)">
                <el-option
                  v-for="item in  userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 120px" v-model="auth_4"  placeholder="选择权值" @change="selectAuth(userName_4,4)">
                <el-option
                  v-for="item in  authList"
                  :key="item.type"
                  :label="item.type"
                  :value="item.type">
                </el-option>
              </el-select>
            </div>

          </el-row>
          <el-row type="flex" justify="start" align="middle" >
            <p>用户5:</p>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 150px" v-model="userName_5"  placeholder="选择用户" @change="selectUser(userName_5,5)">
                <el-option
                  v-for="item in  userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px">
              <el-select size="mini" style="width: 120px" v-model="auth_5"  placeholder="选择权值" @change="selectAuth(userName_5,5)">
                <el-option
                  v-for="item in  authList"
                  :key="item.type"
                  :label="item.type"
                  :value="item.type">
                </el-option>
              </el-select>
            </div>

          </el-row>
          <el-row type="flex" justify="start" align="middle" >
            <p>请输入阈值:</p>

            <div style="margin-left: 20px">
              <el-input type="number" size="mini" style="width: 150px" v-model="threshold" placeholder="阈值" clearable></el-input>
            </div>
            <div style="margin-left: 20px">

            </div>

          </el-row>

          <el-row type="flex" justify="start" align="middle" >
            <p>请输入项目名称:</p>

            <div style="margin-left: 20px">
              <el-input type="text" size="mini" style="width: 150px" v-model="projectName" placeholder="秘密名称" clearable></el-input>
            </div>
            <div style="margin-left: 20px">
              <el-button  style="width: 100px" size="mini" @click="encryption()">加密</el-button>
            </div>

          </el-row>

        </div>
      </el-col>
      <!--<div style="float:left;width: 1px;height: 2000px; background: #fff;"></div>-->
      <el-col :span="12" >
        解密部分
        <div style="background-color: white;border: 1px solid #fff;width: 500px;height: 250px;">
          <el-table
            :data="projectList"
            border
            @selection-change="currentChangeHandle"
            style="width: 100%;">
            <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              label="秘密名称">
            </el-table-column>

          </el-table>
        </div>
        <div style="background-color: white;border: 1px solid #fff;width: 500px;height: 250px;margin-top: 20px">
          <el-table
            :data="projectList"
            border
            style="width: 100%;">
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              label="秘密名称">
            </el-table-column>
            <el-table-column
              prop="applyNum"
              header-align="center"
              align="center"
              label="申请人数">
            </el-table-column>
            <el-table-column
              prop="authTotal"
              header-align="center"
              align="center"
              label="权值之和">
            </el-table-column>
            <el-table-column
              prop="threshold"
              header-align="center"
              align="center"
              label="设定的阈值">
            </el-table-column>

          </el-table>
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
  </div>
</template>

<script>
import Tools from '../utils/Tools.js'
import ImageInputer from '../components/ImageUploader'
import axios from 'axios'

export default {
  name: 'sysUserMain',
  data () {
    return {
      maxSize: 3072,
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/background.png') + ')'
      },
      files: {},
      bgFiles: {},
      projectList: [],
      projectFileList: [],
      projectName: '',
      threshold: 0,
      authList: [],
      userList: [],
      userSelect: {},
      userName_1: '',
      auth_1: 0,
      userName_2: '',
      auth_2: 0,
      userName_3: '',
      auth_3: 0,
      userName_4: '',
      auth_4: 0,
      userName_5: '',
      auth_5: 0,
      dataForm: {
        userName: '',
        password: ''
      },
      dataRule: {
        userName: [
          { required: true, message: '帐号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      captchaPath: ''
    }
  },
  created () {
    this.getProjectFileList()
    this.getUserList()
    this.getProjectList()

    for (let i = 0; i < 5; i++) {
      var tempDic = {}

      tempDic['type'] = i + 1

      this.authList.push(tempDic)
    }
  },
  components: {
    ImageInputer
  },
  methods: {
    // 当前页
    currentChangeHandle (val) {
      this.$refs.Table.toggleRowSelection(val)
    },
    // 获取数据列表
    getProjectFileList () {
      this.$http({
        url: this.$http.adornUrl('/api/project/fileList'),
        method: 'get',
        params: this.$http.adornParams({

        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.projectFileList = data.list
        } else {
          this.projectFileList = []
        }
      })
    },
    // 获取数据列表
    getProjectList () {
      this.$http({
        url: this.$http.adornUrl('/api/project/list'),
        method: 'get',
        params: this.$http.adornParams({

        })
      }).then(({data}) => {
        //
        if (data && data.code === 0) {
          this.projectList = data.list
        } else {
          this.projectList = []
        }
      })
    },
    encryption () {
      if (this.threshold === 0) {
        this.$alert('请输入阈值', '提示')
        return
      }
      if (Tools.isNull(this.projectName)) {
        this.$alert('请输入项目秘密名称', '提示')
        return
      }
      let flag = false
      for (var k in this.userSelect) {
        flag = true
        // 遍历对象，k即为key，obj[k]为当前k对应的值
        console.log(this.userSelect[k])
        if (Tools.isNull(this.userSelect[k]['auth']) || this.userSelect[k]['auth'] === 0) {
          this.$alert(`请输入${this.userSelect[k]['name']}的权值 `, '提示')
          return
        }
      }

      if (flag === true) {
      //  todo
        var form = new FormData()
        form.append('file', this.files[0])
        form.append('bgFiles', this.bgFiles[0])
        form.append('threshold', this.threshold)
        form.append('projectName', this.projectName)
        form.append('userSelect', JSON.stringify(this.userSelect))
        // var config = {
        //   onUploadProgress: progressEvent => {
        //     var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        //     this.progress = complete
        //   }
        // }
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        axios.post('/api/project/uploadFile', form, config)
          .then(response => {
            if (response.data.code === 200) {
              this.$alert('加密成功', '提示')
            } else {
              this.$alert(response.data.msg, '提示')
            }
            console.log(response.data)
          })
      } else {
        this.$alert('请选择至少一个用户并输入对应的权值', '提示')
      }
    },
    selectAuth (userName, value) {
      if (!Tools.isNull(this.userSelect[userName])) {
        if (value === 1) {
          this.userSelect[userName]['auth'] = this.auth_1
        } else if (value === 2) {
          this.userSelect[userName]['auth'] = this.auth_2
        } else if (value === 3) {
          this.userSelect[userName]['auth'] = this.auth_3
        } else if (value === 4) {
          this.userSelect[userName]['auth'] = this.auth_4
        } else if (value === 5) {
          this.userSelect[userName]['auth'] = this.auth_5
        }
      } else {
        if (value === 1) {
          this.auth_1 = 0
        } else if (value === 2) {
          this.auth_2 = 0
        } else if (value === 3) {
          this.auth_3 = 0
        } else if (value === 4) {
          this.auth_4 = 0
        } else if (value === 5) {
          this.auth_5 = 0
        }
        this.$alert('请先选择用户', '提示')
      }
    },
    selectUser (userName, value) {
      if (!Tools.isNull(this.userSelect[userName])) {
        if (value === 1) {
          this.userName_1 = ''
        } else if (value === 2) {
          this.userName_2 = ''
        } else if (value === 3) {
          this.userName_3 = ''
        } else if (value === 4) {
          this.userName_4 = ''
        } else if (value === 5) {
          this.userName_5 = ''
        }
      } else {
        var tempDic = {}

        tempDic['name'] = userName

        this.userSelect[userName] = tempDic
      }
    },
    getUserList () {
      this.$http({
        url: this.$http.adornUrl('/api/user/list'),
        method: 'post',
        params: {
        }
      }).then(({data}) => {
        //
        if (data && data.code === 0) {
          this.userList = data.userList
        } else {
          this.$alert(data.msg, '提示')
        }
      })
    },
    imgChange_1 (files) {
      if (files) {
        this.files = files
        console.log(files)
      }
    },
    imgChange_2 (files) {
      if (files) {
        this.bgFiles = files
        console.log(files)
      }
    },
    // 提交表单
    dataFormSubmit () {
      if (this.dataForm.userName.length === 0) {
        this.$alert('请输入用户名', '提示')
        return
      }
      if (!Tools.checkLength(this.dataForm.password, 4, 20)) {
        this.$alert('密码长度4-20', '提示')
        return
      }
      this.$http({
        url: this.$http.adornUrl('/api/user/login'),
        method: 'post',
        params: {
          'username': this.dataForm.userName,
          'password': this.dataForm.password
        }
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$cookie.set('token', data.token)

          if (data.type === 1) {

          } else {
            this.$router.replace({ name: 'sysUserMain' })
          }
        } else {
          this.$alert(data.msg, '提示')
        }
      })

      // Message.alert('Hello world', 'Alert')
    },
    // 获取验证码
    getCaptcha () {
      // this.dataForm.uuid = getUUID()
      this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
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
