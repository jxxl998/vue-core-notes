## lifecycle
- Vue2 options API，2.7版本内置插件`@vue/composition-api`，<2.6需要单独安装实现使用composition API
- Vue3 composition API，也支持options。使用生命周期要单独引入API函数，统一在setup里面执行

## upgrade
生命周期对比  

| Vue2 | Vue3 | 执行时间 |
|------|------|---------|
| beforeCreated | setup（new）    | 组件创建前       |
| created       | setup（new）    | 组件创建前       |
| beforeMounted | onMounted       | 组件挂载节点之前  |
| mounted       | onMounted       | 组件挂载节点完成后  |
| beforeUpdate  | onBeforeUpdated | 组件更新之前       |
| updated       | onUpdated       | 组件更新之后      |
| beforeDestroy | onBeforeUnMount | 组件卸载前        |
| destroyed     | onUnmounted     | 组件卸载完成之后  |
| errorCaptured | onErrorCaptured | 当捕获一个来自子孙组件的异常时激活钩子函数 |


`setup`的执行时间在created之前，等同于Vue2的两个周期  
  

`<keep-alive>`组件：
| Vue2 | Vue3 | 执行时间 |
|------|------|---------|
| activated | onActivated | 被激活时执行 |
| deactivated | onDeactivated | 切换组件后，原组件消失前执行 |