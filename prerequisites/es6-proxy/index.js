let obj = {
  a: 1,
  b: 2,
};

let objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`访问了${target}的${key}, 值是${target[key]}`);

    // return target[key];
    return 10; // 其实在这里可以返回任何想返回的业务逻辑 只要一访问到该属性 就特定返回
  },
});

let objProxyUsingReflect = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },

  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  },
});

objProxyUsingReflect.a = 100; // 修改 调用set

console.log(objProxyUsingReflect.a); // 访问 会调用get方法
console.log(obj.a);
