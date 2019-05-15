<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="name">
      <el-input v-model="dataForm.name" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="joinnum">
      <el-input v-model="dataForm.joinnum" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="threshold">
      <el-input v-model="dataForm.threshold" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="modifyTime">
      <el-input v-model="dataForm.modifyTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="sourceImgUrl">
      <el-input v-model="dataForm.sourceImgUrl" placeholder=""></el-input>
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
        name: '',
        joinnum: '',
        threshold: '',
        createTime: '',
        modifyTime: '',
        sourceImgUrl: ''
      },
      dataRule: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        joinnum: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        threshold: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        modifyTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sourceImgUrl: [
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
            url: this.$http.adornUrl(`/generator/tproject/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.tproject.name
              this.dataForm.joinnum = data.tproject.joinnum
              this.dataForm.threshold = data.tproject.threshold
              this.dataForm.createTime = data.tproject.createTime
              this.dataForm.modifyTime = data.tproject.modifyTime
              this.dataForm.sourceImgUrl = data.tproject.sourceImgUrl
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
            url: this.$http.adornUrl(`/generator/tproject/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'joinnum': this.dataForm.joinnum,
              'threshold': this.dataForm.threshold,
              'createTime': this.dataForm.createTime,
              'modifyTime': this.dataForm.modifyTime,
              'sourceImgUrl': this.dataForm.sourceImgUrl
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
