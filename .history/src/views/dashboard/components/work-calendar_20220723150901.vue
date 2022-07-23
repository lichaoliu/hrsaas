<template>
  <div>
    <el-row type="flex"
            justify="end">
      <el-select />
      <el-select>
        <el-option v-for="item in 12"
                   :key="item"
                   :label="item"
                   :value="item">{{ item }}</el-option>
      </el-select>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: new Date()
    }
  },
  data () {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  created () {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
		this.yearList = Array.from(Array(11),(value,index) => this.)
  }
}
</script>
<style>
</style>
