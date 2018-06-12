// 1.1. 概述
var assert  = require('assert')
{

  /* 使用control+option+n可以直接运行命令 */

}

// 2.1 Proxy实例的方法
{
  /* 
  Proxy 支持的拦截操作一览，一共 13 种。

  - get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
  - set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  - has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
  - deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
  - ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for ...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。 
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
  - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。 
  - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。 
  - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
    
  
  */
 
  
  // 1.get拦截器
 
  {
      const target = {
        name: '张三'
      }

      const proxy = new Proxy(target, {
        // 劫持取值操作
        get: (target, property) => {
          if (property in target) {
            return `${target.name} is comming`;        
          } else {
            throw new ReferenceError(`Property ${property} does not exist`)
          }
        }
      })
      // 下面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。
      // console.log(proxy.name, proxy.age)


      // get方法可以继承

    const proto = new Proxy({
      name: 'xiaoxiang',
    }, {
      get: (target, property, receive) => {
        console.log('get', property)
        return target[property]
      }
    });

    let obj = Object.create(proto)
    console.log('get inherit', obj.name)

    // 1. 数组读取负数的索引

    const createArr = (...elements) => {
      // 使用箭头函数的禁忌：
      /* 
      （
      1） 函数体内的this对象， 就是定义时所在的对象， 而不是使用时所在的对象。

      （ 2） 不可以当作构造函数， 也就是说， 不可以使用new命令， 否则会抛出一个错误。

      （ 3） 不可以使用arguments对象， 该对象在函数体内不存在。 如果要用， 可以用 rest 参数代替。

      （ 4） 不可以使用yield命令， 因此箭头函数不能用作 Generator 函数。
      
      
      */
      let handler = {
        get: (target, property, receive) => {
          let index = parseInt(property, 10)
          if (index < 0) {
            return target[target.length + index];
          } else {
            return target[index];
          }
        }
      }
      return new Proxy(elements, handler);
    }
    const arr = createArr(1, 4, 7);
    
    console.log(arr[-1])//读取最后一个元素

    // 2. 实现属性的链式操作
    // 3. 实现“方法丢失”的钩子
    // 4. 隐藏所有属性的枚举方法
    /* 
    我们可以使用代理使一个对象中的所有属性完全隐藏， 除了获取值时。 下面是JavaScript中所有判断一个属性是否存在的方法：

    Reflect.has, Object.hasOwnProperty, Object.prototype.hasOwnProperty, 以及 in 操作符都是使用[[HasProperty]]。 Proxy可以has来实现。
    Object.keys / Object.getOwnPropertyNames都是使用[[OwnPropertyKeys]]。 Proxy可以使用ownKeys来实现。
    Object.entries(即将到来的ES2017特性), 同样使用[[OwnPropertyKeys]] - 同样 - 可以使用ownKeys来实现。
    Object.getOwnPropertyDescriptor 使用[[GetOwnProperty]]。 意外的惊喜， Proxy可以使用getOwnPropertyDescriptor来实现。
    
    */
/*    var example = new Proxy({ foo: 1, bar: 2 }, {
      has: function () { return false; },
      ownKeys: function () { return []; },
      getOwnPropertyDescriptor: function () { return false; },
    });
    assert(example.foo === 1);
    assert(example.bar === 2);
    assert('foo' in example === false);
    assert('bar' in example === false);
    assert(example.hasOwnProperty('foo') === false);
    assert(example.hasOwnProperty('bar') === false);
    assert.deepEqual(Object.keys(example), [ ]);
    assert.deepEqual(Object.getOwnPropertyNames(example), [ ]);  */

    // 5. 实现观察者模式

    function observe(object, observerCallback) {
      var observing = true;
      const proxyObject = new Proxy(object, {
        set: function (object, property, value) {
          var hadProperty = Reflect.has(object, property);
          var oldValue = hadProperty && Reflect.get(object, property);
          var returnValue = Reflect.set(object, property, value);
          if (observing && hadProperty) {
            observerCallback({
              object: proxyObject,
              type: 'update',
              name: property,
              oldValue: oldValue
            });
          } else if (observing) {
            observerCallback({
              object: proxyObject,
              type: 'add',
              name: property
            });
          }
          return returnValue;
        },
        deleteProperty: function (object, property) {
          var hadProperty = Reflect.has(object, property);
          var oldValue = hadProperty && Reflect.get(object, property);
          var returnValue = Reflect.deleteProperty(object, property);
          if (observing && hadProperty) {
            observerCallback({
              object: proxyObject,
              type: 'delete',
              name: property,
              oldValue: oldValue
            });
          }
          return returnValue;
        },
        defineProperty: function (object, property, descriptor) {
          var hadProperty = Reflect.has(object, property);
          var oldValue = hadProperty && Reflect.getOwnPropertyDescriptor(object, property);
          var returnValue = Reflect.defineProperty(object, property, descriptor);
          if (observing && hadProperty) {
            observerCallback({
              object: proxyObject,
              type: 'reconfigure',
              name: property,
              oldValue: oldValue
            });
          } else if (observing) {
            observerCallback({
              object: proxyObject,
              type: 'add',
              name: property
            });
          }
          return returnValue;
        },
        preventExtensions: function (object) {
          var returnValue = Reflect.preventExtensions(object);
          if (observing) {
            observerCallback({
              object: proxyObject,
              type: 'preventExtensions'
            })
          }
          return returnValue;
        },
      });
      return {
        object: proxyObject,
        unobserve: function () {
          observing = false
        }
      };
    }

    var changes = [];
    var observer = observe({
      id: 1
    }, (change) => changes.push(change));
    var object = observer.object;
    var unobserve = observer.unobserve;
    object.a = 'b';
    object.id++;
    Object.defineProperty(object, 'a', {
      enumerable: false
    });
    delete object.a;
    Object.preventExtensions(object);
    unobserve();
    object.id++;
    assert.equal(changes.length, 5);
    assert.equal(changes[0].object, object);
    assert.equal(changes[0].type, 'add');
    assert.equal(changes[0].name, 'a');
    assert.equal(changes[1].object, object);
    assert.equal(changes[1].type, 'update');
    assert.equal(changes[1].name, 'id');
    assert.equal(changes[1].oldValue, 1);
    assert.equal(changes[2].object, object);
    assert.equal(changes[2].type, 'reconfigure');
    assert.equal(changes[2].oldValue.enumerable, true);
    assert.equal(changes[3].object, object);
    assert.equal(changes[3].type, 'delete');
    assert.equal(changes[3].name, 'a');
    assert.equal(changes[4].object, object);
    assert.equal(changes[4].type, 'preventExtensions');
  }

  // 2. set拦截器

  {

    // 1. 数据验证
    let setValidator = {
      set: (target, property, value) => {
        if (property === 'age') {
          if (!Number.isInteger(value)) {
            throw new TypeError('the age is not an integer')
          }
          if (value > 200) {
            throw new RangeError('the age is invalid')
          }
        }
        target[property] = value
      }
    }

    let setProxy = new Proxy({}, setValidator)//给Proxy传一个空对象就行
    // setProxy.age = 201 //RangeError: the age is invalid

    // 2.结合get和set拦截器实现防止内部属性被外部读写
    {
      const handler = {
        get(target, key) {
          invariant(key, 'get');
          return target[key];
        },
        set(target, key, value) {
          invariant(key, 'set');
          target[key] = value;
          return true;
        }
      };

      function invariant(key, action) {
        if (key[0] === '_') {
          throw new Error(`Invalid attempt to ${action} private "${key}" property`);
        }
      }
      const target = {};
      const proxy = new Proxy(target, handler);
      // proxy._prop
      // Error: Invalid attempt to get private "_prop" property
      // proxy._prop = 'c'
      // Error: Invalid attempt to set private "_prop" property
    }


    // 3.如果目标对象自身的某个属性，不可写或不可配置，那么set方法将不起作用
    {
      const obj = {};
      Object.defineProperty(obj, 'foo', {
        value: 'bar',
        writable: false,
      });

      const handler = {
        set: function (obj, prop, value, receiver) {
          obj[prop] = 'baz';
        }
      };

      const proxy = new Proxy(obj, handler);
      proxy.foo = 'baz';
      proxy.foo // "bar"
    }

    // 4.set方法的第四个参数receiver，指的是操作行为所在的那个对象，一般情况下是proxy实例本身

    {
      const handler = {
        set: function (obj, prop, value, receiver) {
          obj[prop] = receiver;
        }
      };
      const proxy = new Proxy({}, handler);
      proxy.foo = 'bar';
      proxy.foo === proxy // true
      // 上面代码中， set方法的第四个参数receiver， 指的是操作行为所在的那个对象， 一般情况下是proxy实例本身， 请看下面的例子。

      const handler2 = {
        set: function (obj, prop, value, receiver) {
          obj[prop] = receiver;
        }
      };
      const proxy2 = new Proxy({}, handler2);
      const myObj = {};
      Object.setPrototypeOf(myObj, proxy2);

      myObj.foo = 'bar';
      myObj.foo === myObj // true
      // 上面代码中， 设置myObj.foo属性的值时， myObj并没有foo属性， 因此引擎会到myObj的原型链去找foo属性。 myObj的原型对象proxy是一个 Proxy 实例， 设置它的foo属性会触发set方法。 这时， 第四个参数receiver就指向原始赋值行为所在的对象myObj。
    }
  }

  // apply拦截器: apply方法拦截函数的调用，call和apply操作;它的三个参数分别是 目标对象，上下文对象(this)， 目标对象的参数数组
  {
    let target = () => 'I am the target'
    let handler = {
      apply:()=> 'i am the proxy'
    }

    const proxy = new Proxy(target, handler)

    console.log(proxy())
  }



}

// 3.1 Proxy.revocable()方法
{
  // Proxy.revocable方法返回一个可取消的 Proxy 实例。
  let target = {};
  let handler = {};

  let { proxy, revoke } = Proxy.revocable(target, handler);

  proxy.foo = 123;
  proxy.foo // 123

/*   revoke();
  proxy.foo // TypeError: Revoked */

  /* 
  Proxy.revocable方法返回一个对象，该对象的 proxy 属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。

  Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
  
  */
    
}

// 4.1. this问题
{
  const target = {
    m() {
        console.log(this === target)
    }
  }
  const handler = {}
  const proxy = new Proxy(target, handler)
  target.m()
  proxy.m()
  console.log(proxy instanceof Proxy)//Proxy目前还不支持原型链，所以instanceof无效
}

// 5.1 实例：web服务的客户端
{
    
}
