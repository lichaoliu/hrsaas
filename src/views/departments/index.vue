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
                      :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  components: {
    TreeTools
  },
  data () {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: 'a', children: [{ name: '董事会', manager: 'b' }] },
      { name: '行政部', manager: 'c' }, { name: '人事部', manager: 'd' }]
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
