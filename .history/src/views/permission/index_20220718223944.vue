<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after"
                   type="primary"
                   size="small">
          添加权限</el-button>
      </page-tools>
      <el-table :border="true"
                :data="list"
                row-key="id">
        <el-table-column label="名称"
                         prop="name" />
        <el-table-column align="center"
                         label="标识"
                         prop="code" />
        <el-table-column align="center"
                         label="描述"
                         prop="description" />
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type === 1"
                       type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑弹层 -->
    <el-dialog title="新增权限" :visible="">

    </el-dialog>
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
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      this.list = tranListToTreeData(await getPermissionList(), '0')
      console.log(this.list)
    }
  }
}
</script>

<style>
</style>
