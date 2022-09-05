// 可撤销代理

const target = {
  foo: 'bar',
};

const handler = {
  get() {
    return 'intercepted';
  },
};

// 使用new Proxy()创建普通代理的联系在代理对象的生命周期一直存在
const { proxy, revoke } = Proxy.revocable(target, handler); // 撤销函数和代理对象在实例化时同时生成

console.log(target.foo); // bar
console.log(proxy.foo); // intercepted

revoke();

console.log(proxy.foo); // TypeError
