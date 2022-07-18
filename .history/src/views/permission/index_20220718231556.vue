<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after"
                   type="primary"
                   size="small"
                   @click="addPermission(1,'0')">
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
                       type="text"
                       @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑弹层 -->
    <el-dialog title="新增权限"
               :visible="showDialog">
      <el-form :model="formData"
               rules="rules">
        <el-form-item label="权限名称"
                      prop="name">
          <el-input v-model="formData.name"
                    style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识"
                      prop="code">
          <el-input v-model="formData.code"
                    style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description"
                    style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="formData.enVisible"
                     active-value="1"
                     inactive-value="0" />
        </el-form-item>
      </el-form>
      <el-row slot="footer"
              type="flex"
              justify="center">
        <el-col :span="6">
          <el-button type="primary"
                     size="small"
                     @click="btnOK">确定</el-button>
          <el-button size="small"
                     type="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from '@/api/permisson'
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
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    }
  },
  addPermission (type, pid) {
    this.formData.type = type
    this.formData.pid = pid
    this.showDialog = true
  },
  btnOK(){
    
  }
}
</script>

<style>
</style>
