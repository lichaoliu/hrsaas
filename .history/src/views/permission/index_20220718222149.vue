<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after"
                   type="primary"
                   size="small">
          添加权限</el-button>
      </page-tools>
      <el-table :border="true">
        <el-table-column align="center"
                         label="名称" />
        <el-table-column align="center"
                         label="标识" />
        <el-table-column align="center"
                         label="描述" />
        <el-table-column align="center"
                         label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'

export default {
  data () {
    return {
      list: []
    }
  },
  created () { 
    this.
  },
  methods: {
    async getPermissionList () {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    }
  }
}
</script>

<style>
</style>
