<template>
  <el-dialog title="分配角色"
             :visible="showRoleDialog"
             @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox v-for="item in list"
                   :key="item.id"
                   :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer"
            type="flex"
            justify="center">
      <el-col :span="6">
        <el-button size="small"
                   type="primary"
                   @click="btnOK">确定</el-button>
        <el-button size="small"
                   @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      list: [], // 所有角色列表
      roleIds: [] // 用户拥有的角色
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { rows } = await getRoleList({ page: 1, pagesize: 100 })
      this.list = rows
    },
    //  props 赋值是异步的,父组件调用此方法 所以这里不能用this.userId
    async getUserDetailById (id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async btnOK () {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel () {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
<style>
</style>
