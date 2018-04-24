// 1.1  概述
{

}

// 2.1 作为属性名的Symbol
{

}

// 3.1. 实例：消除魔术字符串
{

}

// 4.1 属性名的遍历
{
    /* 
  Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

  Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
  */

    // 下面是另一个例子，Object.getOwnPropertySymbols方法与for ...in循环、Object.getOwnPropertyNames方法进行对比的例子。

    const obj = {};

    let foo = Symbol('foo');

    Object.defineProperty(obj, foo, {value: 'foobar'});

    for (let i in obj) {
        console.log(i); // 无输出
    }

    Object.getOwnPropertyNames(obj);
    // []

    Object.getOwnPropertySymbols(obj);

    // Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

    let obj2 = {
        [Symbol('my_key')]: 1,
        enum: 2,
        nonEnum: 3
    };

    Reflect.ownKeys(obj2);
//  ["enum", "nonEnum", Symbol(my_key)]
}

// 5.1 Symbol.for(), Symbol.keyFor()
{
    /* 

  Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

  */

    // Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。

    let s1 = Symbol.for('foo');
    console.log(Symbol.keyFor(s1)); // foo

/** 
 需要注意的是，Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。

iframe = document.createElement('iframe')
iframe.src = String(window.location)
document.body.appendChild(iframe)

console.log(iframe.contentWindow.Symbol.for ('foo') === Symbol.for ('foo')) 
// true
 上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。

*/
}

// 6.1. 实例： 模块的Singleton模式
{
    // Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例

    // 对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

    // 很容易想到，可以把实例放到顶层对象global。

    // mod.js
    // function A () {
    //     this.foo = 'hello'
    // }

    // if (!global._foo) {
    //     global._foo = new A()
    // }

    // module.exports = global._foo
    // // 然后，加载上面的mod.js。

    // const a = require('./mod.js')
    // console.log(a.foo)
    // 上面代码中，变量a任何时候加载的都是A的同一个实例。

    // 但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。

    // global._foo = {
    //     foo: 'world'
    // }

    // const a = require('./mod.js')
    // console.log(a.foo)
    // 上面的代码，会使得加载mod.js的脚本都失真。

    // 为了防止这种情况出现，我们就可以使用 Symbol。

    // mod.js
    // const FOO_KEY = Symbol.for('foo')

    // function A () {
    //     this.foo = 'hello'
    // }

    // if (!global[FOO_KEY]) {
    //     global[FOO_KEY] = new A()
    // }

    // module.exports = global[FOO_KEY]
    // 上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。

    // global[Symbol.for('foo') ] = {foo: 'world'}

    // const a = require('./mod.js')
    // // 如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。

    // // mod.js
    // const FOO_KEY = Symbol('foo')

    // 后面代码相同 ……
    // 上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。
}

// 7.1. 内置的Symbol值
{
    // 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

    // 1. Symbol.hasInstance:

    // 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo) 。
    class MyClass {
        [ Symbol.hasInstance ](val) {
            return val instanceof Array;
        }
    }
    console.log([1, 2, 3] instanceof new MyClass());

    // 静态方法

    class Even {
        static [Symbol.hasInstance ](obj) {
            return Number(obj) % 2 === 0;
        }
    }

    const Even2 = {
        [Symbol.hasInstance](obj) {
            return Number(obj) % 2 === 0;
        }
    };

    console.log(1 instanceof Even);
    console.log(1144 instanceof Even);
    console.log(1 instanceof Even2);
    console.log(1144 instanceof Even2);

    // 2. Symbol.isConcatSpreadable

    // 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。

    /* 
  
  let arr1 = ['c', 'd']
  ['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
  arr1[Symbol.isConcatSpreadable] // undefined

  let arr2 = ['c', 'd']
  arr2[Symbol.isConcatSpreadable] = false
  ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
  上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable默认等于undefined。该属性等于true时，也有展开的效果。

  类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。

  let obj = {length: 2, 0: 'c', 1: 'd'}
  ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

  obj[Symbol.isConcatSpreadable] = true
  ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
  Symbol.isConcatSpreadable属性也可以定义在类里面。

  class A1 extends Array {
  constructor(args) {
  super(args)
  this[Symbol.isConcatSpreadable] = true
  }
  }
  class A2 extends Array {
  constructor(args) {
  super(args)
  }
  get [Symbol.isConcatSpreadable] () {
  return false
  }
  }
  let a1 = new A1()
  a1[0] = 3
  a1[1] = 4
  let a2 = new A2()
  a2[0] = 5
  a2[1] = 6
  [1, 2].concat(a1).concat(a2)
  // [1, 2, 3, 4, [5, 6]]
  上面代码中，类A1是可展开的，类A2是不可展开的，所以使用concat时有不一样的结果。

  注意，Symbol.isConcatSpreadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同。*/

    // 3. Symbol.species：对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。

    /* 
  作用在于：实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例
  
  */

    /* 
  class MyArray extends Array {
  }

  const a = new MyArray(1, 2, 3)
  const b = a.map(x => x)
  const c = a.filter(x => x > 1)

  b instanceof MyArray // true
  c instanceof MyArray // true
  上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。

  Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。

  class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
  }
  上面代码中，由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。默认的Symbol.species属性等同于下面的写法。

  static get [Symbol.species]() {
  return this
  }
  现在，再来看前面的例子。

  class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
  }

  const a = new MyArray()
  const b = a.map(x => x)

  b instanceof MyArray // false
  b instanceof Array // true
  上面代码中，a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。

  再看一个例子。

  class T1 extends Promise {
  }

  class T2 extends Promise {
  static get [Symbol.species]() {
  return Promise
  }
  }

  new T1(r => r()).then(v => v) instanceof T1 // true
  new T2(r => r()).then(v => v) instanceof T2 // false
  上面代码中，T2定义了Symbol.species属性，T1没有。结果就导致了创建衍生对象时（then方法），T1调用的是自身的构造方法，而T2调用的是Promise的构造方法。
  */

    // 4. Symbol.match
    /* 
  对象的Symbol.match属性，指向一个函数，当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值,也就是说
  
  String.prototype.match(regexp);  等同于  regexp[Symbol.match](this)
  
  */

    class MyMatcher {
        [ Symbol.match ](val) {
            return 'hello, world'.indexOf(val);
        }
    }
    console.log('o'.match(new MyMatcher())); // 4

    // 5. Symbol.replace

    /* 
  对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用的时候，会返回该方法的返回值

  String.prototype.replace(searchVal, replaceVal)
  等同于
  searchVal[Symbol.replace](this, replaceVal)

  */
    const x = {};
    x[Symbol.replace] = (...a) => console.log(a); // 此处的a 代表 {this， replaceVal}，所以是 { 'hello', 'world' }

    'hello'.replace(x , 'world');

    // 6. Symbol.search

    /* 
  对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用的时候，会返回该方法的返回值。
  
  String.prototype.search(regexp)
  等同于
  regexp[Symbol.search](this)
  */

    class MySearch {
        constructor (value) {
            this.value = value;
        }
        [ Symbol.search ](string) {
            return string.indexOf(this.value);
        }
    }
    console.log('barfoobar'.search(new MySearch('foo'))); // 3

    // 7. Symbol.split

    /* 
  对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用的时候，会返回该方法的返回值

  String.prototype.split(separator, limit)
  等同于
  separator[Symbol.split](this, limit)

  */
    class MySplitter {
        constructor (value) {
            this.value = value;
        }
        [ Symbol.split ](string) {
            let index = string.indexOf(this.value);
            if (index === -1) {
                return string;
            }
            return [
                string.substr(0, index),
                string.substr(index + this.value.length)
            ];
        }
    }

    console.log('foobar'.split(new MySplitter('foo')));
    // ['', 'bar']

    console.log('foobar'.split(new MySplitter('bar')));
    // ['foo', '']

    console.log('foobar'.split(new MySplitter('baz')));
    // 'foobar'

    // 8. Symbol.iterator

    /* 
      对象的Symbol.iterator属性，指向该对象的默认遍历器方法
  */

    const myIterable = {};
    myIterable[Symbol.iterator] = function * () {
        yield 1;
        yield 2;
        yield 3;
    };
    console.log(...myIterable); // 1 2 3

    // 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器

    class Collection{
        *[Symbol.iterator]() {
            let i = 0;
            while (this[i] !== undefined) {
                yield this[i];
                ++i;
            }
        }
    }
    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;

    // 1 2
    for (const iterator of myCollection) {
        console.log(iterator);
    }

    // 9. Symbol.toPrimitive

    /* 
        对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值的时候，会调用这个方法,返回该对象对应的原始类型值。

        Symbol.toPrimitive被调用的时候，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

        - Number：该场合需要转换成数值
        - String：该场合需要转换成字符串
        - Default：该场合可以转成数值，也可以转成字符串
    */
   
    let obj2 = {
        [Symbol.toPrimitive](hint) {
            switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';        
            default:
                throw new Error('msg');
            }
        }
    };

    console.log(4 * obj2);
    console.log(3 + obj2);
    console.log(String( obj2 ));

    // 10. Symbol.toStringTag

    /* 
        对象的Symbol.toStringTag属性，指向一个方法。在该对象上调用
    */

    // 11. Symbol.unscopables

}
