<template>
  <div>
    <el-row type="flex"
            justify="end">
      <el-select size="small"
                 style="width: 120px" v-model="currentYear">
        <el-option v-for="item in yearList"
                   :key="item"
                   
                   :label="item"
                   :value="item" />
      </el-select>
      <el-select size="small"
                 style="width: 120px;margin-left:10px">
        <el-option v-for="item in 12"
                   :key="item"
                   v-model="currentMonth"
                   :label="item"
                   :value="item" />
      </el-select>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
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
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5)
    console.log(this.currentYear)
    console.log(this.currentMonth)
    console.log(this.yearList)
  }
}
</script>
<style>
</style>
