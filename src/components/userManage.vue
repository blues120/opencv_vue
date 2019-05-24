<template>
  <el-dialog
    title="用户管理界面"
    :close-on-click-modal="true"
    :append-to-body='true'
    :visible.sync="visible">
    <el-table
      :data="userList"
      border
      style="width: 100%;">

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>

      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>

      <el-table-column
        prop="projectIds"
        header-align="center"
        align="center"
        label="参与的项目id">
      </el-table-column>

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">返回管理员界面</el-button>

    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'userManage',
  data () {
    return {
      visible: false,
      userList: []
    }
  },
  methods: {
    init (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$http({
          url: this.$http.adornUrl('/api/user/userManageList'),
          method: 'post',
          params: {
          }
        }).then(({data}) => {
          debugger
          if (data && data.code === 0) {
            this.userList = data.userList
          } else {
            this.$alert(data.msg, '提示')
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
