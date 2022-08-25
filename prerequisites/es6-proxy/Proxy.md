## Proxy

元编程（meta programming），即对编程语言进行编程

Proxy是用于修改某些操作的默认行为，属于一种元编程

### 作用

给一个对象常见代理，从而可以拦截对象的操作，因此可以添加一些业务逻辑，或者对源对象做保护

```js
const obj = {
  a: 1,
  b: 2,
}
let objProxy = new Proxy(obj, {})

objProxy.a = 5
console.log(obj.a) // 5
```

默认对代理的操作可以反应到源对象中，即修改代理的属性也会修改源对象的属性

在Proxy中可以定义一系列拦截对对象操作的方法，成为陷阱（traps），几乎所有对象的操作都可以拦截

拦截方法：

- **get(target, key, receiver) 获取对象的属性值**
- **set(target, key, value, receiver) 给对象添加或修改属性值**
- define Property(target, key, descriptors) 和Object.define Property()类似 与Object.defineProperty()类似
- deleteProperty(target, key) 相当于delete的函数版本
- has(target, key) 相当于in的函数版本
- ownKeys(target) 用于获取对象自有的属性
- getPrototypeOf 类似于Object.getPrototypeOf()

其中get、set比较常用，参数说明：

- target 目标对象
- key 属性名
- receiver Proxy实例本身
- value 属性对应的值

###  用法

```js
let obj = {
  a: 1,
  b: 2,
}

let objProxy = new Proxy(obj, {
  // 定义要拦截的方法，如果参数不传递即声明的是透明代理，对代理的任何操作都会传递给源对象
  
  // 定义一个拦截访问的操作
  get(target, key, receiver) {
    console.log(`访问了${target}的${key}, 值是${target[key]}`);
    
    return target[key];
  }
})

console.log(objProxy.a)	// 测试访问
```

在除了使用target对象的.或者[]访问源对象属性值，还可以使用Reflect工具类来实现对源对象的访问及操作来传递给源对象

Reflect类提供了一组和Proxy具有**一样**的函数签名的方法，即对象方法操作的函数形式

. 或者 []即调用中括号方式访问对象属性，即调用get方法，同名同参

```js
let objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  }
  
  set(target, key, value, receiver) {
  	return Reflect.set(target, key, value, receiver)
	}
})
```



只有调用到set才会更改源对象属性，这样就可以设置校验，不满足就提示错误

### 应用场景

- 处理日志记录
- 数据校验，包括私有属性、数据格式
- 计算属性
- 分析&性能度量
- 自动填充对象属性来避免null异常
- 包装宿主对象（e.g. DOM用于减少浏览器的不兼容性？

