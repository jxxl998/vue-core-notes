## 数据计算

### 使用方式对比

- Vue2

  - computed 和 data 同级配置
  - 通过 this 访问

- Vue3
  - 导入`computed`API
  - 定义的变量，通过`.value`读取

### 与 function 的对比

- 性能优势，`computed` 具有缓存，体现在处理巨大数据依赖计算的性能开销，避免多次执行 `getter`
- 书写统一
  - Vue3 中的 `computed` 和定义的 `ref` 变量都是通过`.value` 去读取值，无论是在 `template`，还是在 `script` 中，保持一致性
  - function 的话基本要通过调用才可以获取其 return 的值

以上，如果**使用的数据不需要具有响应性**，可以简单使用 function 的返回值就可以了，原因如下：

- 只会更新响应式数据的计算

  ```js
  // 获取最新时间
  const currentTime = computed(() => new Date());
  console.log(currentTime);
  // 当前时间

  setTimeout(() => {
    console.log(currentTime);
  }, 2000);
  // 2s之后还是会输出👆的当前时间，因为不是响应式数据，所以获取最新时间需要用普通函数去返回
  ```

- 数据是只读的
  不能赋值，会报错  
  不过必要情况下可以使用 `setter`

### 应用场景

- 数据拼接和计算
- 复用组件动态数据
  - 动态拼接接口
- 获取多层级对象的值，结合 `try/catch` 使用

  ```js
  // 例子比较极端，但在 Vuex 这种大型数据树上，也不是完全不可能存在
  const foo = computed(() => {
    // 正常情况下返回需要的数据
    try {
      return store.state.foo3.foo2.foo1.foo;
    } catch (e) {
      // 处理失败则返回一个默认值
      return '';
    }
  });
  ```

- 不同类型数据格式转换

  - 需求类似于，让用户在输入框里，按一定的格式填写文本，比如用英文逗号`,`隔开每个词，然后保存的时候，是用数组的格式提交给接口

  ```js
  const result = ref([]);

  const inputValue = computed({
    // 读取转为字符串
    get() {
      return result.value.join(',');
    },
    // 用户输入时候切割数组
    set(newValue) {
      result.value = newValue.split(',');
    },
  });

  // 在对inputValue赋值的时候才会
  ```

  ```html
  <input
    type="text"
    v-model="inputValue"
    placeholder="请输入标签，多个标签用英文逗号隔开"
  />
  ```
