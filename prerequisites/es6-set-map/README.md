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

## Set
ES6新增
类似于数组，成员值唯一，无重复值，

Set本身是一个构造函数，生成Set数据结构