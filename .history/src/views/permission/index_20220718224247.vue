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
    <el-dialog title="新增权限"
               :visible="showDialog">
      <el-form :model="formData">
        <el-form-item label="权限名称"
                      prop="name">
          <el-input />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input />
        </el-form-item>
        <el-form-itemlabel="权限描述">
          <el-input />
        </el-form-itemlabel=>
        <el-form-item>
          <el-input />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'

export default {
  data () {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
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
