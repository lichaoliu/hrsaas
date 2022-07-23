<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div ref="myDiv"
       class="radar-echart" />
</template>
<scripte>
// 完成加载过程
// var echarts = require('echarts')
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
</scripte>
<style>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
