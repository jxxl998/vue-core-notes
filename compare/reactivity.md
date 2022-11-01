# 响应式数据的变化
## 设计上的变化
- vue2使用 `Object.defineProperty`的`getter/setter`实现
- vue3使用`Proxy`的`getter/setter`实现

> vue2 响应式原理 https://v2.cn.vuejs.org/v2/guide/reactivity.html   
> vue3 响应式原理 https://cn.vuejs.org/guide/extras/reactivity-in-depth.html  

### 核心都是使用了`setter`行为来实现，但vue2使用`Object.defineProperty`存在不足：

- 无法监听数组下标的变化，通过 arr[i] = newValue 这样的操作无法实时响应
- 无法监听数组长度的变化，例如通过 arr.length = 10 去修改数组长度，无法响应
- 只能监听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度监听
- 使用 Object.assign() 等方法给对象添加新属性时，也不会触发更新
- ...

也就是vue2提供`Vue.set`API的原因：https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9


## 用法上的变化
vue3取消了vue实例`this`，而是使用响应式API去访问：`ref`、`reactive`等，通过导入才能使用，在setup里定义

响应式 API：核心 https://cn.vuejs.org/api/reactivity-core.html 


# 响应式 API
## ref
`ref`对象，读写**任何**`ref`对象的值都必须通过`.value`

通常为引用类型

```js
  const msg = ref('text');

  console.log(msg.value);
```

## reactive
- 只适合对象、数组  
- 在使用上（读取、修改字段）普通对象一样

### ⚠ 赋值特殊说明：
- 数组
  - vue2的数组操作和普通数组操作一样，响应性会保留
  - vue3的reactive定义数组
    - **只能针对不会改变引用地址的数组操作**
    - **不可以解构，会失去响应性**

> 按照原来的方式操作reactive定义的数组，会造成数据变化，但是模板不更新的问题
  
  
🌰：对初始化的数组置空再赋值，会失去响应性
```js
  const users = reactive([1, 2, 3]);

  // 失去响应性的操作
  users = [];

  // 重新对数组操作 始终是空数组
  setTimeout(() => {
    users.push(1);
  }, 1000);


  // 正确食用方式 不会破坏响应性
  users.length = 0;

  setTimeout(() => {
    users.push(1);
  }, 1000);
```

## toRef & toRefs
  用于`reactive`向`ref`转换
- toRef
  - 创建一个`ref`变量
  ```js
    // toRef(reactive对象, 需要转换的key)
    const name = toRef(users, 'name');
  ```
  读写都通过.value，具有响应性，同时更新源和新转换的值
  > 创建reactive对象不存在的key，得到的值undefined，对其赋值则原reactive对象会新增这个key

- toRefs
  - 创建一个新的对象，每个字段都是`reactive`对象各个字段的`ref`变量，新对象的本身是个普通对象，但其每个字段都是关联的`ref`变量
  ```js
    const userRefs = toRefs(user);
  ```
### why convert?
  既可以在编写`script`的时候不容易出错，在写`template`的时候又比较简单  

【理解】
  - 写script的时候如果定义的是ref，需要`.value`的方式读写，在template里面可以直接写
  - 如果是reactive，在script以及template每次读写都要对象`.key`的方式
  - 因此可以根据场景不同，通过`toRefs`或者`toRef`创建并return`ref`出去，做模板渲染或者读写
