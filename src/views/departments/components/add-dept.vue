<template>
  <el-dialog title="新增部门"
             :visible="showDialog"
             @close="btnCancel">
    <el-form ref="deptForm"
             label-width="120px"
             :model="formData"
             :rules="rules">
      <el-form-item label="部门名称"
                    prop="name">
        <el-input v-model="formData.name"
                  style="width:80%"
                  placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码"
                    prop="code">
        <el-input v-model="formData.code"
                  style="width:80%"
                  placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人"
                    prop="manager">
        <el-select v-model="formData.manager"
                   style="width:80%"
                   placeholder="请选择"
                   @focus="getEmployeeSimple">
          <el-option v-for="item in peoples"
                     :key="item.id"
                     :label="item.username"
                     :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍"
                    prop="introduce">
        <el-input v-model="formData.introduce"
                  style="width:80%"
                  placeholder="1-300个字符"
                  type="textarea"
                  :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer"
            type="flex"
            justify="center">
      <el-col :span="6">
        <el-button size="small"
                   @click="btnCancel">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="btnOK">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
// import { getEmployeeSimple } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作节点
    treeNode: {
      type: Object,
      default: null
    }
  },
  data () {
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const checkNameRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartments()
      const isRepeat = depts.filter(x => x.pid === this.treeNode.id).some(x => x.name === value)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 检查部门编码是否重复
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(x => x.code === this.treeNode.code)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    return {
      value: '',
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
        { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
        { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
        { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
        { validator: checkCodeRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
        { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: [] // 部门负责人
    }
  },
  methods: {
    getEmployeeSimple () {
      // this.peoples = getEmployeeSimple() //没有接口用假数据代替
      this.peoples = [{ id: 123, username: '张三' }, { id: 1234, username: '李四' }]
    },
    // 新增部门提交
    btnOK () {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          this.$emit('addDepts')
          // emit语法糖 update:props名称
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel () {
      this.$emit('update:showDialog', false)
      // this.showDialog = false
      this.$refs.deptForm.resetFields()
    },
    // 编辑 获取部门信息
    async getDepartDetail (id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>
<style>
</style>
