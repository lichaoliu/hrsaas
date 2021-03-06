<template>
  <el-dialog title="新增员工"
             :visible="showDialog"
             @close="btnCancel">
    <el-form ref="addEmployee"
             label-width="120px"
             :model="formData"
             :rules="rules">
      <el-form-item label="姓名"
                    prop="username">
        <el-input v-model="formData.username"
                  style="width:50%"
                  placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机"
                    prop="mobile">
        <el-input v-model="formData.mobile"
                  style="width:50%"
                  placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间"
                    prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry"
                        style="width:50%"
                        placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式"
                    prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment"
                   style="width:50%"
                   placeholder="请选择">
          <el-option v-for="item in EmployeeEnum.hireType"
                     :key="item.id"
                     :label="item.value"
                     :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号"
                    prop="workNumber">
        <el-input v-model="formData.workNumber"
                  style="width:50%"
                  placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="部门"
                    prop="departmentName">
        <el-input v-model="formData.departmentName"
                  style="width:50%"
                  placeholder="请选择部门"
                  @focus="getDepartments" />
        <el-tree v-if="showTree"
                 v-loading="loading"
                 :data="treeData"
                 :props="{label: 'name'}"
                 @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间"
                    prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime"
                        style="width:50%"
                        placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <el-row slot="footer"
            type="flex"
            justify="center">
      <el-col :span="6">
        <el-button size="small"
                   @click="btnCancel">取消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        // 要用change 因为blur失去焦点 去el-tree选择数据的时候，input为空
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [], // 树形部门数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false // 控制树的显示或者隐藏进度条
    }
  }, methods: {
    async getDepartments () {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode (node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOk () {
      try {
        await this.$refs.addEmployee.validate()
        await addEmployee(this.formData)
        // 刷新列表
        // this.$parent.getEmployeeList()
        // this.$parent.showDialog = false
        this.$emit('refreshTableAndClose')
        this.$message.success('添加员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 重置表单校验结果
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>
</style>
