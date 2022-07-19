<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row>
              <el-button type="primary"
                         size="small"
                         icon="el-icon-plus"
                         @click="showDialog = true">新增角色</el-button>
            </el-row>
            <el-table :border="true"
                      :data="list">
              <el-table-column align="center"
                               type="index"
                               label="序号"
                               width="120" />
              <el-table-column align="center"
                               prop="name"
                               label="角色名称"
                               width="240" />
              <el-table-column align="center"
                               prop="description"
                               label="描述" />
              <el-table-column align="center"
                               label="操作">
                <template slot-scope="{row}">
                  <el-button size="small"
                             type="success"
                             @click="assignPerm">分配权限</el-button>
                  <el-button size="small"
                             type="primary"
                             @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small"
                             type="danger"
                             @click="deleteRole(row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex"
                    justify="center"
                    align="middle"
                    style="height: 60px">
              <el-pagination layout="prev, pager, next"
                             :total="page.total"
                             :current-page="page.page"
                             :page-size="page.pagesize"
                             @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="用户信息">
            <el-form ref="roleForm"
                     label-width="120px"
                     style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name"
                          disabled
                          style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress"
                          disabled
                          style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox"
                          disabled
                          style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks"
                          type="textarea"
                          :rows="3"
                          disabled
                          style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 编辑角色弹层 -->
        <el-dialog title="编辑弹层"
                   :visible="showDialog"
                   @close="btnCancel">
          <el-form ref="roleForm"
                   :model="roleForm"
                   :rules="rules"
                   label-width="120px">
            <el-form-item label="角色名称"
                          prop="name">
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <!-- 底部 -->
          <el-row slot="footer"
                  type="flex"
                  justify="center">
            <el-col :span="6">
              <el-button size="small"
                         @click="btnCancel">取消</el-button>
              <el-button size="small"
                         type="primary"
                         @click="btnOK">确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
    <el-dialog :visible="showPermDialog">
      <el-tree :data="permData"
               :props="defaultProps" />
      <el-row slot="footer"
              type="flex"
              justify="center">
        <el-col :span="6">
          <el-button type="primary"
                     size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, updateRole, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { transListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permisson'

export default {
  computed: {
    ...mapGetters(['companyId'])
  },
  data () {
    return {
      // 角色列表
      list: [],
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 2,
        total: 0 // 记录总数
      },
      formData: {}, // 公司信息
      showDialog: false,
      // 专门接收新增或者编辑的编辑的表单数据
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showPermDialog: false,
      defaultProps: {
        label: 'name'
      },
      permData: [] // 专门用来接收权限数据 树形数据
    }
  },
  created () {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList () {
      const { total, rows } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    changePage (newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    async getCompanyInfo () {
      const formData = await getCompanyInfo(this.companyId)
      console.log(formData)
      this.formData = formData
    },
    // 删除角色
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRole(id)
        this.getRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        this.$message.info('取消删除角色')
      }
    },
    async editRole (id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true // 为了不出现闪烁的问题 先获取数据 再弹出层
    },
    async btnOK () {
      this.showDialog = true
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          console.log('11111111')
          await updateRole(this.roleForm)
        } else {
          // 新增业务
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.formData = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    // 分配权限
    async assignPerm () {
      console.log('=============')
      const res = await getPermissionList()
      log
      this.permData = transListToTreeData(res, '0')
      console.log(this.permData)
      this.showPermDialog = true
    }
  }
}
</script>

<style>
</style>
