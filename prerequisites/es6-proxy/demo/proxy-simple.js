let obj = {
  a: 1,
  b: 2,
};

function sum() {
  console.log(obj.a + obj.b);
}

sum();

obj.a = 5;

sum();

// 最简单的手动式实现响应式 需要调用sum()才可以

// 改造 实现自动更新
// 使用Proxy对源对象进行代理包装 拦截属性的赋值操作并自动调用函数更新结果

console.log('使用Proxy改造');

let newObj = {
  a: 2,
  b: 4,
};

function sumReactive() {
  console.log(reactiveObj.a + reactiveObj.b);
}

let reactiveObj = new Proxy(newObj, {
  // 拦截set操作
  set(target, key, value, receiver) {
    let result = Reflect.set(target, key, value, receiver); // 修改对象的值 这里直接反应到源对象的属性 保存修改结果
    sumReactive();
    return result;
  },
});

// 测试结果
sumReactive(); // 6

setTimeout(() => {
  reactiveObj.a = 5;
}, 1000);

setTimeout(() => {
  reactiveObj.b = 10;
}, 2000);
