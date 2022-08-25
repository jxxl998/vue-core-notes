// 逻辑分离的数据格式验证器

const target = {
  id: '1024',
  name: 'vue',
}

// 对象属性校验规则
const validators = {
  name(val) {
    // name属性类型为string
    return typeof val === 'string'
  },
  id(val) {
    // id必须为number类型并且数值大于1024
    return typeof val === 'number' && val > 1024
  },
}

const createValidator = (target, validator) => {
  return new Proxy(target, {
    validators: validator, // 校验规则

    // set
    set(target, key, value, receiver) {
      let validator = this.validators[key](value)
      if (validator) {
        return Reflect.set(target, key, value, receiver)
      } else {
        throw Error(`Cannot set ${key} to ${value}. Invalid type.`)
      }
    },
  })
}

const proxy = createValidator(target, validators)

proxy.name = 'vue'
// proxy.name = 10086 // Cannot set name to 10086. Invalid type.
console.log('proxy.name', proxy.name)

proxy.id = 1025
// proxy.id = 22 // Error: Cannot set id to 22. Invalid type.
console.log('proxy.id', proxy.id)
