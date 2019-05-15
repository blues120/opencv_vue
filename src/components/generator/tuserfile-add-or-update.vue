<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="userId">
      <el-input v-model="dataForm.userId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="projectId">
      <el-input v-model="dataForm.projectId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="authWeight">
      <el-input v-model="dataForm.authWeight" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="mignotte">
      <el-input v-model="dataForm.mignotte" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="modifyTime">
      <el-input v-model="dataForm.modifyTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="imgUrl">
      <el-input v-model="dataForm.imgUrl" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        userId: '',
        projectId: '',
        authWeight: '',
        mignotte: '',
        createTime: '',
        modifyTime: '',
        imgUrl: ''
      },
      dataRule: {
        userId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        projectId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        authWeight: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        mignotte: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        modifyTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/generator/tuserfile/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.userId = data.tuserfile.userId
              this.dataForm.projectId = data.tuserfile.projectId
              this.dataForm.authWeight = data.tuserfile.authWeight
              this.dataForm.mignotte = data.tuserfile.mignotte
              this.dataForm.createTime = data.tuserfile.createTime
              this.dataForm.modifyTime = data.tuserfile.modifyTime
              this.dataForm.imgUrl = data.tuserfile.imgUrl
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/generator/tuserfile/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'userId': this.dataForm.userId,
              'projectId': this.dataForm.projectId,
              'authWeight': this.dataForm.authWeight,
              'mignotte': this.dataForm.mignotte,
              'createTime': this.dataForm.createTime,
              'modifyTime': this.dataForm.modifyTime,
              'imgUrl': this.dataForm.imgUrl
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
