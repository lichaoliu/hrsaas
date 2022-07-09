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
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
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
  }
}
</script>
<style scoped>
</style>
