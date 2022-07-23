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
	props:{
		
	}
  data () {
    return {}
  }
}
</script>
<style>
</style>
