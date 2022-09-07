# Set 和 Map数据结构

- Set 集合（一堆无序、相关联、内存结构不重复元素的组合）
- Map 字典（元素带有key值的集合，类似于Object，但key值运行任意类型）

## Map
key可以为任意类型，甚至可以为Object类型，并且**不会转成字符串**

### 方法&属性:
- new Map()
- map.set(key, value)
- map.get(key)
- map.has(key)
- map.delete(key)
- map.clear()
- map.size

```js
let map = new Map()

map.set('1', 'str1')
map.set(1, 'num1')

// difference
map.get(1)    // 'num1'
map.get('1')  // 'str1'
```

> ⚠ map[key] isn’t the right way to use a Map
> map[key]可以work，但是已经视为了普通的Object对象了
> 因此建议使用map自带的方法get()、set()

一个 Object 的键必须是一个 String 或是 Symbol

```js
// 使用Object作为key

let john = { name: "john"}

let visitsCountMap = new Map()

visitsCountMap.set(john, 3)

console.log(visitsCountMap.get(john))   // 3
```

```js
// 但是不可以使用另一个Object作为key在一个对象里面

let john = { name: "john" }
let ben = { name: "ben" }

let visitsCountObj = {}   // 这里使用一个对象

visitsCountObj[ben] = 234
visitsCountObj[john] = 123  // 会被replaced

console.log(visitsCountObj)    // {[object Object]: 123}
```
why?  
因为被重写了   

> As `visitsCountObj` is an object, it converts all `Object` keys, such as `john` and `ben` above, to same string `"[object Object]"`. Definitely not what we want.


### 链式调用
调用map.set之后返回map本身，因此可以使用链式调用

```js
let map = new Map()

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1')

console.log(map)  // Map(3) {'1' => 'str1', 1 => 'num1', true => 'bool1'}
```

### 迭代方法
- map.keys()      返回所有的key
- map.values()    返回所有的value
- map.entries()   返回所有的`[key, value]`键值对数组, `for...of`默认使用的就是这个，并且Map有保留的插入时的顺序，**按顺序返回**

> 使用插入顺序。普通的Object对象未保留顺序
返回的都是新的迭代对象

### Object.entries

- 使用键值对 or 其他可迭代对象 初始化
```js
  let map = new Map([
    ['1', 'str1'],
    [1,   'num1'],
    [true, 'bool1']
  ])

  console.log(map.get('1'))
```

- 普通Object创建Map
  使用Object.entries(obj)，返回对象的键/值对数组，该数组格式完全按照Map所需的格式
```js
let obj = {
  name: 'john',
  age: 20
}

let map = new Map(Object.entries(obj))  // entries 完之后[ ["name","John"], ["age", 30] ]

console.log(map)  // Map(2) {'name' => 'john', 'age' => 20}
```


### Object.fromEntries

作用与`Object.entries(obj)`相反：给定一个具有`[key, value]`键值对的数组，会根据给定数组创建一个对象

```js
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 5]
])

// now price is

/**
  {
    "banana": 1,
    "orange": 2,
    "meat": 5
  }
 */

console.log(price.banana)   // 1

let map = new Map()
map.set('banana', 1)
map.set('orange', 2)
map.set('meat', 4)

let obj = Object.fromEntries(map.entries())
```

甚至可以简写成 省略掉.entries()  
`let obj = Object.fromEntries(map)`

Object.fromEntries()期望得到的是一个可迭代对象作为参数，而不一定是数组  
对于map而言，标准迭代返回的也是键值对，和`map.entries()`一样  
因此可以省略，返回结果一样

### 应用场景
因为Map会保留所有元素的插入顺序，如果考虑到元素迭代或顺序保留或键值类型丰富的情况下都可以使用

## Set
ES6新增 

没有键，值的集合，类似于数组，成员值唯一，无重复值

Set本身是一个构造函数，生成Set数据结构

### 方法
- new Set(iterable)  iterable对象（通常是数组）
- set.add(value)
- set.delete(value)
- set.has(value)
- set.clear() 移除所有成员
- set.size

多次调用`set.add()`不会造成多次添加，因为Set的值是唯一的

`Array.find()`也可以去做判重处理，性能没有使用Set去重优  

### 遍历Set
- for...of
- forEach

```js
let set = new Set(["orange", "apples", "banana"])

for(let value of set) console.log(value)

set.forEach((value, valueAgain, set) => {
  console.log(value)
})
```

在set使用forEach的回调函数传了三个参数`(value, valueAgain, set)`，为了与Map兼容

Map的迭代方法在Set同样work：
- set.keys()
- set.values()
- set.entries()  返回所有的`[key, value]`键值对数组，与Map兼容

Map和Set都是使用的**插入顺序**，不能说集合无序，也不能对元素进行重新排序，也不能直接按编号获取元素

### Set应用场景
```js
// 去重
let arr = [1, 1, 2, 3]
let unique = [...new Set(arr)]

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = [...new Set([...a, ...b])]  // [1, 2, 3, 4]

// 交集
let intersect = [new Set([...a].filter(item => b.has(item)))]   // [2, 3]

// 差集
let difference = Array.from(new Set([...a].filter(item => !b.has(item)))) // [1]

```

## WeakMap
- ES6新增`WeakMap`新的集合类型，增强的键值对存储机制
- API是`WeakMap`的子集
- “weak”描述的是JavaScript垃圾回收程序对待`WeakMap`中键的方式【？？ 怎么理解】

### 设计目的
有时候想在一个对象上存放一些数据，但是会对这个对象形成引用，有可能导致内存泄漏
```js
const item1 = document.getElementById('foo')
const item2 = document.getElementById('bar')

// arr 对item1、item2的引用 对象作为键名
const arr = [
  [item1, 'is foo'],
  [item2, 'is bar']
]

// 需要手动释放对象
arr[0] = null
arr[1] = null
```

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。【from es6 ruanyifeng】


### 应用场景
键所对应的对象，可能会在将来消失，并且不希望打扰垃圾回收机制

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用
// john被从内存中清除
```

### 与Map的区别
- Map的键可以是任意类型，WeakMap只能是`Object`或者继承自`Object`的类型
- WeakMap 键名所指向的对象，不计入垃圾回收机制
- WeakMap 的属性跟操作方法与Map一致，但因为是弱引用，不支持迭代以及`keys()`, `values()`, `entries()`方法
  - 可用方法：
    - weakMap.get(key)
    - weakMap.set(key, value)
    - weakMap.delete(key)
    - weakMap.has(key)

> 为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 john），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道何时会被回收。
> 这些都是由 JavaScript 引擎决定的。JavaScript 引擎可能会选择立即执行内存清理，如果现在正在发生很多删除操作，那么 JavaScript 引擎可能就会选择等一等，稍后再进行内存清理。因此，从技术上讲，WeakMap 的当前元素的数量是未知的。JavaScript 引擎可能清理了其中的垃圾，可能没清理，也可能清理了一部分。因此，暂不支持访问 WeakMap 的所有键/值的方法。
> https://zh.javascript.info/weakmap-weakset

👆也就是弱引用随时消失，遍历机制无法保证成员的存在

## WeakSet
- 结构类似于Set，是对象值的集合
- 与WeakMap类似，只能添加Object，而不是原始值
- 主要解决弱引用对象存储的场景
- 同样不能使用迭代方法