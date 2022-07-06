export const imgerror = {
  // 指令对象 会在当面的dom元素插入到节点之后执行
  inserted(dom, options) {
    // 当图片有地址 但是地址没有加载成功的时候 会报错 触发一个事件 onerror
    dom.onerror = function () {
      // options.value指令的值
      dom.src = options.value
    }
  }
}
