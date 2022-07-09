<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <tree-tools :is-root="true"
                    :tree-node="company" />
        <el-tree :data="departs"
                 :default-expand-all="true"
                 :props="defaultProps">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <tree-tools slot-scope="{ data }"
                      :tree-node="data"
                      @delDepts="getDepartments" />
        </el-tree>
        <!-- 放置新增弹层组件 -->
        <AddDept />
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import AddDept from '@/views/departments/components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data () {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: []
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人' }
      // 将list 转换为树形结构
      this.departs = tranListToTreeData(res.depts, '')
      console.log(res)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
