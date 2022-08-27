// 在一个应用中不可能只有2个响应式对象
// 并且函数不可能绑定在响应式逻辑里面

// 因此，需要搞明白有多少个响应式对象，并且有哪些函数访问了响应式对象的属性
// 并在属性修改的时候运行所有依赖该属性的函数

// data structure如下：
// obj -> property -> [functions...]
// 需要一个对象存储所有具有响应式的属性 然后这些属性有对应的依赖函数
// weakmap表示外层结构 key为对象时不会影响垃圾回收 从而避免性能问题

// 源对象
let target = {
  a: 1,
  b: 2,
};

// trap
const handler = {
  get(target, property, receiver) {
    if (currentObserver) {
      let targetObserver = observers.get(target); // 从weakmap中拿键值对

      if (targetObserver.has(property)) {
        targetObserver.get(property).add(currentObserver); // 追加
      } else {
        // 创建新的set
        targetObserver.set(property, new Set([currentObserver]));
      }
    }
    return Reflect.get(...arguments);
  },

  set(target, property, value, receiver) {
    let observersForKey = observers.get(target).get(property);
    let result = Reflect.set(...arguments);

    // 遍历调用每个依赖函数
    observersForKey.forEach((fn) => fn());

    return result;
  },
};

const reactiveObj = new Proxy(target, handler);

// 依赖函数之一 求和
function sum() {
  console.log(reactiveObj.a + reactiveObj.b);
}

// 工具函数 类似于computed或者watch的概念
function observer(fn) {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

const observers = new WeakMap();
observers.set(target, new Map()); // Map存放新的对象属性值和依赖函数的键值对

let currentObserver = null; // 当前的依赖函数

observer(sum); // 包装sum函数

setTimeout(() => {
  reactiveObj.a = 5;
}, 1000);

setTimeout(() => {
  reactiveObj.b = 10;
}, 2000);
