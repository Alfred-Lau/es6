// 1.1 概述
{
    /* 
    Reflect的设计目的

    1. 将Object对象的一些明显属于语言内部的方法（ 比如Object.defineProperty）， 放到Reflect对象上。 现阶段， 某些方法同时在Object和Reflect对象上部署， 未来的新方法将只部署在Reflect对象上。 也就是说， 从Reflect对象上可以拿到语言内部的方法。

    2. 修改某些Object方法的返回结果， 让其变得更合理。 比如， Object.defineProperty(obj, name, desc) 在无法定义属性时， 会抛出一个错误， 而Reflect.defineProperty(obj, name, desc) 则会返回false。

    3. 让Object操作都变成函数行为。 某些Object操作是命令式， 比如name in obj和delete obj[name]， 而Reflect.has(obj, name) 和Reflect.deleteProperty(obj, name) 让它们变成了函数行为。

    // 老写法
    'assign' in Object // true

    // 新写法
    Reflect.has(Object, 'assign') // true

    4. Reflect对象的方法与Proxy对象的方法一一对应， 只要是Proxy对象的方法， 就能在Reflect对象上找到对应的方法。 这就让Proxy对象可以方便地调用对应的Reflect方法， 完成默认行为， 作为修改行为的基础。 也就是说， 不管Proxy怎么修改默认行为， 你总可以在Reflect上获取默认行为。
    
    Proxy(target, {
      set: function (target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
          log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
      }
    });
    上面代码中， Proxy方法拦截target对象的属性赋值行为。 它采用Reflect.set方法将值赋值给对象的属性， 确保完成原有的行为， 然后再部署额外的功能。

    下面是另一个例子。

    var loggedObj = new Proxy(obj, {
      get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
      },
      deleteProperty(target, name) {
        console.log('delete' + name);
        return Reflect.deleteProperty(target, name);
      },
      has(target, name) {
        console.log('has' + name);
        return Reflect.has(target, name);
      }
    });
    上面代码中， 每一个Proxy对象的拦截操作（ get、 delete、 has）， 内部都调用对应的Reflect方法， 保证原生行为能够正常执行。 添加的工作， 就是将每一个操作输出一行日志。

    有了Reflect对象以后， 很多操作会更易读。

    // 老写法
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

    // 新写法
    Reflect.apply(Math.floor, undefined, [1.75]) // 1


    */
  
  
    /*  
    
    // 老写法
    try {
      Object.defineProperty(target, property, attributes);
      // success
    } catch (e) {
      // failure
    }

    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
      // success
    } else {
      // failure
    } 
    
    */
}

// 2.1 静态方法： Reflect对象 共 13个静态方法
{

  /* 
  Reflect.apply(target, thisArg, args)
  Reflect.construct(target, args)
  Reflect.get(target, name, receiver)
  Reflect.set(target, name, value, receiver)
  Reflect.defineProperty(target, name, desc)
  Reflect.deleteProperty(target, name)
  Reflect.has(target, name)
  Reflect.ownKeys(target)
  Reflect.isExtensible(target)
  Reflect.preventExtensions(target)
  Reflect.getOwnPropertyDescriptor(target, name)
  Reflect.getPrototypeOf(target)
  Reflect.setPrototypeOf(target, prototype)
  上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。下面是对它们的解释。
  
  */
  
  // Reflect.get(target, name, receiver)

  {
    /* 
    - Reflect.get 方法查找并返回 target 对象的 name 属性， 如果没有该属性， 则返回undefined。
    - 如果name属性部署了读取函数（ getter）， 则读取函数的this绑定receiver。
    - 如果第一个参数不是对象， Reflect.get方法会报错。
    */
    let obj = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar
      }
    }

    // name参数必须为字符串
    console.log(Reflect.get(obj, 'foo'))
    console.log(Reflect.get(obj, 'bar'))
    console.log(Reflect.get(obj, 'baz'))

    let obj2 = {
      foo: 1,
      bar: 2,
      get baz() {
        return this.foo + this.bar
      }
    }

    let receiverObj = {
      foo: 4,
      bar: 4
    }

    console.log(Reflect.get(obj2, 'baz', receiverObj));
  }

  // Reflect.set(target, name, value, receiver)
  {
    /* 
    - Reflect.set方法设置target对象的name属性等于value。
    - 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
    - 注意， 如果 Proxy 对象和 Reflect 对象联合使用， 前者拦截赋值操作， 后者完成赋值的默认行为， 而且传入了receiver， 那么Reflect.set会触发Proxy.defineProperty拦截。

    let p = {
      a: 'a'
    };

    let handler = {
      set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
      },
      defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
      }
    };

    let obj = new Proxy(p, handler);
    obj.a = 'A';
    // set
    // defineProperty
    上面代码中， Proxy.set拦截里面使用了Reflect.set， 而且传入了receiver， 导致触发Proxy.defineProperty拦截。 这是因为Proxy.set的receiver参数总是指向当前的 Proxy 实例（ 即上例的obj）， 而Reflect.set一旦传入receiver， 就会将属性赋值到receiver上面（ 即obj）， 导致触发defineProperty拦截。 如果Reflect.set没有传入receiver， 那么就不会触发defineProperty拦截。

    let p = {
      a: 'a'
    };

    let handler = {
      set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value)
      },
      defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
      }
    };

    let obj = new Proxy(p, handler);
    obj.a = 'A';
    // set
    如果第一个参数不是对象， Reflect.set会报错。

    Reflect.set(1, 'foo', {}) // 报错
    Reflect.set(false, 'foo', {}) // 报错
    
    */
  }

  // Reflect.has(obj, name): 对应 name in obj 里面的 in 运算符
  {
    let obj = {
      foo: 2
    }
    // 旧版本
    console.log('foo' in obj)  //注意：需要属性传递字符串

    // 新版本
    console.log(Reflect.has(obj, 'foo'))
  }

  // Reflect.deleteProperty(target, name):boolean  等同于 delete obj[name], 用于删除对象的属性
  {
    /* 
    该方法返回一个布尔值。 如果删除成功， 或者被删除的属性不存在， 返回true； 删除失败， 被删除的属性依然存在， 返回false。
    */
    
    let obj = {
      foo: 1,
      bar: 2
    }

    // 旧版本
    delete obj['foo']  //属性名称必须是字符串
    console.log(obj)
    // 新版本

    Reflect.deleteProperty(obj, 'bar')
    console.log(obj)
  }

  // Reflect.construct(target, argsArr, [newTarget]) :等同于 new target(...args),这个方法提供的了一种不使用new来调用构造函数的方法
  {
    function Greeting(name) {
      this.name = name
    }

    // 使用 new
    const instance = new Greeting('潇湘')
    console.log(instance)

    // 使用Reflect.construct
    const instance02 = Reflect.construct(Greeting, ['潇湘'])
    console.log(instance02)
  }

  // Reflect.getPrototypeOf(target): 用于读取对象的__proto__属性，对应于Object.getPrototypeOf(obj)
  {
    function FancyThings() {
    
    }

    const obj = new FancyThings()

    // 旧版本
    console.log(Object.getPrototypeOf(obj) === FancyThings.prototype)
    
    // 新版本
    console.log(Reflect.getPrototypeOf(obj) === FancyThings.prototype)
    
    
    /* Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是， 如果参数不是对象， Object.getPrototypeOf会将这个参数转为对象， 然后再运行， 而Reflect.getPrototypeOf会报错。 */

    Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
    // Reflect.getPrototypeOf(1) // 报错
  }

  // Reflect.setPrototypeOf(target, prototype)  设置目标对象的原型，对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。

  {
    const myObj = {};

    // 旧写法
    Object.setPrototypeOf(myObj, Array.prototype);

    // 新写法
    Reflect.setPrototypeOf(myObj, Array.prototype);

    myObj.length // 0
/*     如果无法设置目标对象的原型（ 比如， 目标对象禁止扩展）， Reflect.setPrototypeOf方法返回false。 */

    Reflect.setPrototypeOf({}, null)
    // true
    Reflect.setPrototypeOf(Object.freeze({}), null)
    // false
/*     如果第一个参数不是对象， Object.setPrototypeOf会返回第一个参数本身， 而Reflect.setPrototypeOf会报错。 */

    Object.setPrototypeOf(1, {})
    // 1

    // Reflect.setPrototypeOf(1, {})
    // TypeError: Reflect.setPrototypeOf called on non-object
/*     如果第一个参数是undefined或null， Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。 */

    // Object.setPrototypeOf(null, {})
    // TypeError: Object.setPrototypeOf called on null or undefined

    // Reflect.setPrototypeOf(null, {})
    // TypeError: Reflect.setPrototypeOf called on non-object
  }

  // Reflect.apply(target, thisArg, args) 等同于Function.prototype.apply.call(func, thisArg, args),用于绑定this对象后执行给定函数

  {

    /* 一般来说， 如果要绑定一个函数的this对象， 可以这样写fn.apply(obj, args)， 但是如果函数定义了自己的apply方法， 就只能写成Function.prototype.apply.call(fn, obj, args)， 采用Reflect对象可以简化这种操作。 */

    const ages = [11, 33, 12, 54, 18, 96];

    // 旧写法
    const youngest = Math.min.apply(Math, ages);
    const oldest = Math.max.apply(Math, ages);
    const type = Object.prototype.toString.call(youngest);

    // 新写法
    const youngest02 = Reflect.apply(Math.min, Math, ages);
    const oldest02 = Reflect.apply(Math.max, Math, ages);
    const type02 = Reflect.apply(Object.prototype.toString, youngest02, []);
  }

  // Reflect.defineProperty(target, propertyKey, attrs)  Reflect.defineProperty 方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
  {
    function MyDate() {
      
    }

    // 旧版本
    Object.defineProperty(MyDate, 'now', {
      value: ()=> Date.now()
    })

    // 新版本
    Reflect.defineProperty(MyDate, 'now', {
      value: () => Date.now()
    })

/*     如果Reflect.defineProperty的第一个参数不是对象， 就会抛出错误， 比如Reflect.defineProperty(1, 'foo')。

    这个方法可以与Proxy.defineProperty配合使用。 */

    const p = new Proxy({}, {
      defineProperty(target, prop, descriptor) {
        console.log(descriptor);
        return Reflect.defineProperty(target, prop, descriptor);
      }
    });

    p.foo = 'bar';
    // {value: "bar", writable: true, enumerable: true, configurable: true}

    p.foo // "bar"
/*     上面代码中， Proxy.defineProperty对属性赋值设置了拦截， 然后使用Reflect.defineProperty完成了赋值。 */
  }

  // Reflect.getOwnPropertyDescriptor(target, propertyKey) 等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。
  {
    let obj = {}
    Object.defineProperty(obj, 'hidden', {
      value: true,
      enumerable: false
    })

    // 旧版本
    let oldDescriptor = Object.getOwnPropertyDescriptor(obj, 'hidden')
    console.log(oldDescriptor)
    
    // 新版本
    let newDescriptor = Reflect.getOwnPropertyDescriptor(obj, 'hidden')
    console.log(newDescriptor)

    /* 
    Reflect.getOwnPropertyDescriptor 和 Object.getOwnPropertyDescriptor的一个区别是， 如果第一个参数不是对象， Object.getOwnPropertyDescriptor(1, 'foo') 不报错， 返回undefined， 而Reflect.getOwnPropertyDescriptor(1, 'foo') 会抛出错误， 表示参数非法。
    
    */

  }

  // Reflect.isExtensible(target)  方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
  {
    const obj = {}

    // 旧版本
    console.log(Object.isExtensible(obj))
    // 新版本
    console.log(Reflect.isExtensible(obj))

    /* 
    如果参数不是对象， Object.isExtensible 会返回 false， 因为非对象本来就是不可扩展的， 而Reflect.isExtensible会报错。

    Object.isExtensible(1) // false
    Reflect.isExtensible(1) // 报错
    */
  }

  // Reflect.preventExtensions(target) 对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
  {
    let obj = {}
    
    // 旧写法
    Object.preventExtensions(obj) // Object {}

    // 新写法
    Reflect.preventExtensions(obj) // true


    /* 
    如果参数不是对象， Object.preventExtensions在 ES5 环境报错， 在 ES6 环境返回传入的参数， 而Reflect.preventExtensions会报错。

    // ES5 环境
    Object.preventExtensions(1) // 报错

    // ES6 环境
    Object.preventExtensions(1) // 1

    // 新写法
    Reflect.preventExtensions(1) // 报错
    
    
    */
  }

  // Reflect.ownKeys(target) 方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols之和
  {
    let obj = {
      foo: 1,
      bar: 2,
      [Symbol.for('baz')]: 3,
      [Symbol.for('bingo')]: 4
    }

    // 旧版本
    console.log(Object.getOwnPropertyNames(obj))
    console.log(Object.getOwnPropertySymbols(obj))

    // 新版本
    console.log(Reflect.ownKeys(obj))
  }
}

// 3.1 实例: 使用Proxy实现观察者模式
{
  // code core
  const queuedObservers = new Set()

  const observe = fn=> queuedObservers.add(fn)
  const observable = obj => new Proxy(obj, { set })
  
  const set = (target, key, val, receiver) => {
    const result = Reflect.set(target, key, val, receiver)
    queuedObservers.forEach(observe=>observe())
    return result
  }

  // test case
  const person = observable({
    name: '潇湘',
    age: 20
  })

  const print = ()=>console.log(`${person.name}, ${person.age}`)

  observe(print);
  person.name = '大神'


  /* 
  
  观察者模式（ Observer mode） 指的是函数自动观察数据对象， 一旦对象有变化， 函数就会自动执行。
  
  上面代码中， 数据对象person是观察目标， 函数print是观察者。 一旦数据对象发生变化， print就会自动执行。

  下面， 使用 Proxy 写一个观察者模式的最简单实现， 即实现observable和observe这两个函数。 思路是observable函数返回一个原始对象的 Proxy 代理， 拦截赋值操作， 触发充当观察者的各个函数。
  
  
  上面代码中， 先定义了一个Set集合， 所有观察者函数都放进这个集合。 然后， observable函数返回原始对象的代理， 拦截赋值操作。 拦截函数set之中， 会自动执行所有观察者。
  */
}