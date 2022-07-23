<template>
  <el-row type="flex"
          justify="space-between"
          class="tree-card"
          align="middle"
          style="height: 40px; width:100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex"
              justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="true"
                                command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot"
                                command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot"
                                command="delete">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean, // 用于控制是否显示编辑部门和删除部门
      default: false
    }
  },
  methods: {
    operateDepts (type) {
      if (type === 'add') {
        // 显示新增部门弹层
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑部门信息
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('确定要删除该部门吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 自定义事件 调用父组件刷新数据
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
