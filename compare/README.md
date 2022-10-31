## 响应式数据的变化
### 设计上的变化
- vue2使用 `Object.defineProperty`的`getter/setter`实现
- vue3使用`Proxy`的`getter/setter`实现

> vue2 响应式原理 https://v2.cn.vuejs.org/v2/guide/reactivity.html   
> vue3 响应式原理 https://cn.vuejs.org/guide/extras/reactivity-in-depth.html  

#### 核心都是使用了`setter`行为来实现，但vue2使用`Object.defineProperty`存在不足：

- 无法监听数组下标的变化，通过 arr[i] = newValue 这样的操作无法实时响应
- 无法监听数组长度的变化，例如通过 arr.length = 10 去修改数组长度，无法响应
- 只能监听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度监听
- 使用 Object.assign() 等方法给对象添加新属性时，也不会触发更新
- ...

也就是vue2提供`Vue.set`API的原因：https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9


### 用法上的变化
vue3取消了vue实例`this`，而是使用响应式API去访问：`ref`、`reactive`等，通过导入才能使用，在setup里定义

响应式 API：核心 https://cn.vuejs.org/api/reactivity-core.html 
