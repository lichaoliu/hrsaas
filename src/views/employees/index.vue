<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <div slot="after">
          <el-button type="success">导入</el-button>
          <el-button type="danger">导出</el-button>
          <el-button type="primary"
                     @click="addEmployee">新增员工</el-button>
        </div>
      </page-tools>
      <el-card>
        <el-table v-loading="loading"
                  :border="true"
                  :data="list">
          <el-table-column label="序号"
                           sortable=""
                           type="index" />
          <el-table-column label="姓名"
                           sortable=""
                           prop="username" />
          <el-table-column label="工号"
                           sortable=""
                           prop="workNumber" />
          <el-table-column label="聘用形式"
                           sortable=""
                           :formatter="formatEmployment"
                           prop="formOfEmployment" />
          <el-table-column label="部门"
                           sortable=""
                           prop="departmentName" />
          <!-- 作用于插槽 + 过滤器 -->
          <el-table-column label="入职时间"
                           sortable=""
                           prop="timeOfEntry">
            <template slot-scope="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态"
                           sortable=""
                           prop="enableState">
            <template slot-scope="{row}">
              <el-switch :value="row.enableState === 1" />
            </template>

          </el-table-column>
          <el-table-column label="操作"
                           sortable=""
                           fixed="right"
                           width="280">
            <template slot-scope="{row}">
              <el-button type="text"
                         size="small">查看</el-button>
              <el-button type="text"
                         size="small">转正</el-button>
              <el-button type="text"
                         size="small">调岗</el-button>
              <el-button type="text"
                         size="small">离职</el-button>
              <el-button type="text"
                         size="small">角色</el-button>
              <el-button type="text"
                         size="small"
                         @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex"
                justify="center"
                align="middle"
                style="height: 60px">
          <el-pagination layout="prev, pager, next"
                         :current-page="page.page"
                         :page-size="page.size"
                         :total="page.total"
                         @current-change="changePage" />
        </el-row>
      </el-card>
      <!-- 放置弹层组件 -->
      <AddEmployee :show-dialog.sync="showDialog"
                   @refreshTableAndClose="refreshTableAndClose" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'

export default {
  components: { AddEmployee },
  data () {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 4,
        total: 0
      },
      showDialog: false
    }
  },
  created () {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList () {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    formatEmployment (row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(x => x.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee (id) {
      try {
        await this.$confirm('是否确定删除员工?')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    addEmployee () {
      this.showDialog = true
    },
    refreshTableAndClose () {
      this.getEmployeeList()
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
