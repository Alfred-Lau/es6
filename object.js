// 1.1. 属性的简洁表示法
{
    // ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。也就是说ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值。
    const foo = 'bar';
    const baz = { foo};
    // 等同于
    const baz02 = {foo: 'bar01'};
    console.log(baz, baz02);

    const f = (x, y) => {
        return { x, y};
    };

    console.log(f(...[1, 4])); // { x: 1, y: 4 }

    // 除了属性简写，方法也可以简写
    const o1 = {
        method() {
            return 'hello';
        }
    };
    // eq 
    const o2 = {
        method: function () {
            return 'world';
        }
    };
    console.log(o1.method(), o2.method());

    // practical case

    let birth = '2002/01/01';

    const pcase = {
        name: 'Joan',
        birth,
        hello() {
            console.log(`my name is :${this.name}, birthday is : ${this.birth}`);
        }
    };
    pcase.hello();

    // it is convenient using this way in the functions return value

    const returnVlaue = () => {
        const x = 10;
        const y = 20;

        return { x, y};
    };
    console.log(returnVlaue()); // { x: 10, y: 20 }

    // Commonjs module is fit for this

    {
        let ms = {};
        const getItem = (key) => {
            return key in ms ? ms[key] : null;
        };
        const setItem = (key, val) => {
            ms[key, val];
        };
        const clear = () => {
            ms = {};
        };

        module.exports = {
            getItem, setItem, clear};
        // eq
        module.exports = {
            getItem: getItem,
            setItem: setItem,
            clear: clear
        };

        console.log(module);
    }

    // the setter and getter of attr is taking this way: getter and setter is property ,not func

    {
        const cat = {
            _wheels: 4,

            get wheels() {
                console.log('getter is called');
                return this._wheels;
            },

            set wheels(val) {
                if (val < this._wheels) {
                    throw new Error('num is too small');
                }
                this._wheels = val;
                console.log('setter am called');
            }
        };
        console.log(cat.wheels, cat._wheels);
        cat.wheels = 10;
    }

    // 注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。

    const obj = {
        class() {}
    };

    // 等同于

    var obj02 = {
        'class': function () {}
    };
    // 上面代码中，class是字符串，所以不会因为它属于关键字，而导致语法解析报错。

    // 如果某个方法的值是一个 Generator 函数，前面需要加上星号。

    const obj03 = {
        * m() {
            yield 'hello world';
        }
    };
    const t = obj03.m();
    console.log(t.next());
    console.log(t.next());
}

// 2.1. 属性名表达式
{
    // js定义对象的属性，有两种方法：

}

// 3.1 方法的name属性：函数的name属性，返回函数名。对象方法也是函数，因此也有name属性
{

    const o = {
        nameMethod() {
            return;
        }
    };
    console.log(o.nameMethod.name); // nameMethod

    /* 如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。 */

    const o2 = {
        _name: 10,
        get name() {
            return this._name;
        },
        set name(name) {
            this._name = name;
        }
    };
    console.log(o2.name.name); // TypeError: Cannot read property 'name' of undefined

    const descriptor = Object.getOwnPropertyDescriptor(o2, 'name');
    console.log(descriptor.get.name, descriptor.set.name); // get name set name

    /* 
  
  有两种特殊情况：
  
  - bind方法创造的函数，name属性返回bound加上原函数的名字；
  - Function构造函数创造的函数，name属性返回anonymous。

  */

    console.log((new Function()).name); // anonymous
    console.log((function testBound () {}).bind().name); // bound testBound

    // 如果对象的方法名是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
    const k1 = Symbol('desc');
    const k2 = Symbol();
    const ot = {
        [k1]() {},
        [k2]() {}
    };
    console.log(ot[k1].name); // [desc]
    console.log(ot[k2].name); //

}

// 4.1 Object.is()
{
    /* 
  
  ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
  它们都有缺点，
  - 前者会自动转换数据类型，
  - 后者的NaN不等于自身，以及+0等于-0。
  
  */

    // 除了下面的两种情况之外，和===的行为一致
    console.log(Object.is(NaN, NaN)); // true
    console.log(Object.is(+0, -0)); // false

    // es5可以通过部署下面的方法，来实现Object.is()

    Object.defineProperty(Object, 'is', {
        value: function (x, y) {
            if (x === y) {
                // 针对+0-0
                return x !== 0 || 1 / x === 1 / y;
            }
            // 针对NaN 
            return x !== x && y !== y;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

}

// 5.1. Object.assign()：用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
{

    /* 
  
  - Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

  - 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
  
  - 如果只有一个参数，Object.assign会直接返回该参数。

  - 如果该参数不是对象，则会先转成对象，然后返回。

  - 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

  - 如果非对象参数出现在源对象的位置（ 即非首参数）， 那么处理规则有所不同。 首先， 这些参数都会转成对象， 如果无法转成对象， 就会跳过。 这意味着， 如果undefined和null不在首参数， 就不会报错。

  - 其他类型的值（ 即数值、 字符串和布尔值） 不在首参数， 也不会报错。 但是， 除了字符串会以数组形式， 拷贝入目标对象， 其他值都不会产生效果。 这是因为只有字符串的包装对象， 会产生可枚举属性。

  - Object.assign拷贝的属性是有限制的， 只拷贝源对象的自身属性（ 不拷贝继承属性）， 也不拷贝不可枚举的属性（ enumerable: false）。

  - 属性名为 Symbol 值的属性， 也会被Object.assign拷贝。

  
  */

    const target = {};  
    const source01 = { name:'al'};
    const source02 = {age:10};
    console.log(Object.assign(target, source01, source02));

    const target02 = {
        a:1
    };

    console.log(Object.assign(target02, undefined));//不报错，不产生影响
    console.log(Object.assign(target02, null));//不报错，不产生影响

    console.log(Object.assign(target02, 'name'));

    Object.assign({
        b: 'c'
    },
    Object.defineProperty({}, 'invisible', {
        enumerable: false,
        value: 'hello'
    })
    );
    // { b: 'c' }

    Object.assign({a: 'b'}, {[Symbol('c')]: 'd'});
    // { a: 'b', Symbol(c): 'd' }


    /* 
    
    注意点：

    1） 浅拷贝： Object.assign方法实行的是浅拷贝， 而不是深拷贝。 也就是说， 如果源对象某个属性的值是对象， 那么目标对象拷贝得到的是这个对象的引用。
    2）同名属性的替换
    3）数组的处理
    4）取值函数的处理
    
    */

    // 浅拷贝
    const obj01 = { a: { b: 1 }, c: 3 };
    const obj02 = Object.assign({}, obj01);
    obj01.a.b = 2;
    obj01.c = 4;
    console.log(obj02.a.b, obj02.c);//2 3
    
    // 同名属性替换:对于嵌套的对象，一旦遇到同名属性，处理方法是替换而不是添加,这通常不是开发者想要的，需要特别小心。一些函数库提供Object.assign的定制版本（ 比如 Lodash 的_.defaultsDeep方法）， 可以得到深拷贝的合并。
    const targetFinal = { a: { b: 'c', 'd': 2 } };
    const source = { a: { b: 'hello' } };
    console.log(Object.assign(targetFinal, source));

    // 数组的处理
    console.log(Object.assign([1, 2, 3], [4, 5])); //[ 4, 5, 3 ]
    
    // 取值函数的处理:Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
    const sourceFinal = {
        get foo(){return 1;}
    };
    console.log(Object.assign({}, sourceFinal)); //{ foo: 1 }
    //上面代码中，source对象的foo属性是一个取值函数，Object.assign不会复制这个取值函数，只会拿到值以后，将这个值复制过去。

    

    
    /* 
    
    常见用途：

    1）为对象添加属性
    2）为对象添加方法
    3）克隆对象
    4）合并多个对象
    5）为属性指定默认值
    
    
    */
   
    // 为对象添加属性
    
    // TODO: 像下面这样写不会把this指针替换掉吗？不会，同名属性才会被替换掉
    class Point {
        constructor(x, y) {
            Object.assign(this, { x, y });
        }
    }

    // 为对象添加方法

    class Test {}
    Object.assign(Test.prototype, {
        methodOne() { },
        metheodTwo(){}
    });

    // 等同于如下的写法
    Test.prototype.someMethod = function (arg1, arg2) {};
    Test.prototype.anotherMethod = function () {};


    // 克隆对象
    const clone = (origin) => {
        const _clone = Object.assign;
        return _clone({}, origin);
    };

    console.log(clone({a:'test clone'}));

    // 上述方法只能克隆对象自身的值，不能克隆它继承的值，如果想要保持继承链，可以采用下面的代码

 
    function Parent() {
        this.age = 21;
    }

    const p1 = new Parent();

    function Child() {
        this.name = 'dsds';
    }

    // 原型继承的基础方法
    Child.prototype = p1;

    const c1 = new Child();

    const cloneWithInherit= (origin) => {
        // 得到拷贝对象继承的属性
        let originProto = Object.getPrototypeOf(origin);
        console.log(originProto);
        // 使用Object的create方法，依据给定的特定原型对象和属性创建新的对象
        return Object.assign(Object.create(originProto), origin);
    };
    console.log(cloneWithInherit(c1));

    // 合并多个对象

    // 1. 将多个对象合并到某个对象。

    let merge = (target, ...sources) => Object.assign(target, ...sources);
    
        
    // 2. 如果希望合并后返回一个新对象， 可以改写上面函数， 对一个空对象合并。

    merge = (...sources) => Object.assign({}, ...sources);
    

    // 为属性指定默认值
    /* 
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };

    function processContent(options) {
        options = Object.assign({}, DEFAULTS, options);
        console.log(options);
        // ...
    }
    上面代码中， DEFAULTS对象是默认值， options对象是用户提供的参数。 Object.assign方法将DEFAULTS和options合并成一个新对象， 如果两者有同名属性， 则option的属性值会覆盖DEFAULTS的属性值。

    注意， 由于存在浅拷贝的问题， DEFAULTS对象和options对象的所有属性的值， 最好都是简单类型， 不要指向另一个对象。 否则， DEFAULTS对象的该属性很可能不起作用。

    const DEFAULTS = {
        url: {
            host: 'example.com',
            port: 7070
        },
    };

    processContent({
        url: {
            port: 8000
        }
    })
    // {
    //   url: {port: 8000}
    // }
    上面代码的原意是将url.port改成 8000， url.host不变。 实际结果却是options.url覆盖掉DEFAULTS.url， 所以url.host就不存在了。



*/
  

}

// 6.1 属性的可枚举性和遍历:!!! 对象的每一个属性都有一个描述对象，用来控制该属性的行为，Object.getOwnPropertyDescriptor方法可以获得该属性的描述对象
{
    const desc = { a: [1, 2, 3] };
    
    res = Object.getOwnPropertyDescriptor(desc, 'a');

    /* {
        value: [1, 2, 3],
        writable: true,
        enumerable: true,//可枚举性
        configurable: true
    }

    目前，有四个操作会忽略enumerable为false的属性

    1）for...in循环：只遍历对象自身的和继承的可枚举的属性 
    2）Object.keys()：返回对象自身的所有可枚举的属性的键名
    3）JSON.stirngify()：只串行化对象自身的可枚举的属性
    4）Object.assign()： 只拷贝对象自身的可枚举的属性。


    - 这四个操作之中， 前三个是 ES5 就有的， 最后一个Object.assign() 是 ES6 新增的。 
    - 只有for...in会返回继承的属性， 其他三个方法都会忽略继承的属性， 只处理对象自身的属性。 
    - 实际上， 引入“ 可枚举”（ enumerable） 这个概念的最初目的， 就是让某些属性可以规避掉for...in操作， 不然所有内部属性和方法都会被遍历到。 比如， 对象原型的toString方法， 以及数组的length属性， 就通过“ 可枚举性”， 从而避免被for...in遍历到。

    Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable// false

    Object.getOwnPropertyDescriptor([], 'length').enumerable// false

    上面代码中， toString和length属性的enumerable都是false， 因此for...in不会遍历到这两个继承自原型的属性。

    另外， ES6 规定， 所有 Class 的原型的方法都是不可枚举的。

    Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable// false
    
    总的来说， 操作中引入继承的属性会让问题复杂化， 大多数时候， 我们只关心对象自身的属性。 所以， 尽量不要用for...in循环， 而用Object.keys() 代替。

    */
    console.log(res);



    // 属性的遍历

    /* 
    
    es6一共有5种方法可以便利对象的属性

    1. for...in
    循环遍历对象自身的和继承的可枚举关系，不含Symbol属性
    2. Object.keys(obj)
    返回一个数组，
    3. Object.getOwnPropertyNames(obj)
    4. Object.getOwnPropertySymbols(obj)
    5. Reflect.ownKeys(obj)
    
    
    */

}

// 7.1 Object.getOwnPropertyDescriptors()
{
    const obj = {
        foo: 123,
        get bar() {
            return 'abc';
        }
    };

    // Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
    console.log(Object.getOwnPropertyDescriptors(obj));

    // Object.getOwnPropertyDescriptor方法会返回某个对象属性的描述对象（descriptor）
    console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

    // 模拟实现

    const getOwnPropertyDescriptorPollify = (obj) => {
        let result = {};
        for (const key of Reflect.ownKeys(obj)) {
            result[key] = Object.getOwnPropertyDescriptor(obj, key);
        }
        return result;
    };

    console.log('i am a pollify: ', getOwnPropertyDescriptorPollify(obj));

    // 上述方法引入原因是：解决Object.assign()无法正确拷贝get属性和set属性的问题

    const source = {
        set foo(val) {
            console.log(val);      
        }
    };

    const target1 = {};
    Object.assign(target1, source);

    console.log(Object.getOwnPropertyDescriptor(target1, 'foo'));
    /*   
    {
        value: undefined,
        writable: true,
        enumerable: true,
        configurable: true
    }

    上面代码中， source对象的foo属性的值是一个赋值函数， Object.assign方法将这个属性拷贝给target1对象， 结果该属性的值变成了undefined。 这是因为Object.assign方法总是拷贝一个属性的值， 而不会拷贝它背后的赋值方法或取值方法。

    这时， Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法， 就可以实现正确拷贝。
     */


    const target02 = {};

    // Object.defineProperties直接用来为一个对象新建或者修改属性。函数签名：Object.defineProperties(obj, props)
    Object.defineProperties(target02, Object.getOwnPropertyDescriptors(source));
    console.log(Object.getOwnPropertyDescriptor(target02, 'foo'));


    // Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。

    const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)); //克隆了obj

    // 另外，Object.getOwnPropertyDescriptors方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。

    const prot = {};

    const obj01 = {
        __proto__: prot,
        foo: 123,
    };

    // ES6 规定__proto__只有浏览器要部署， 其他环境不用部署。 如果去除__proto__， 上面代码就要改成下面这样。

    const obj02 = Object.create(prot);
    obj02.foo = 123;

    // 或者

    const obj03 = Object.assign(
        Object.create(prot), {
            foo: 123,
        }
    );

    // 有了Object.getOwnPropertyDescriptors， 我们就有了另一种写法。

    const obj04 = Object.create(
        prot,
        Object.getOwnPropertyDescriptors({
            foo: 123,
        })
    );




}

// 8.1. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
{

    // 该属性没有写入 ES6 的正文， 而是写入了附录， 原因是__proto__前后的双下划线， 说明它本质上是一个内部属性， 而不是一个正式的对外的 API， 只是由于浏览器广泛支持， 才被加入了 ES6。 标准明确规定， 只有浏览器必须部署这个属性， 其他运行环境不一定需要部署， 而且新的代码最好认为这个属性是不存在的。 因此， 无论从语义的角度， 还是从兼容性的角度， 都不要使用这个属性， 而是使用下面的Object.setPrototypeOf()（ 写操作）、 Object.getPrototypeOf()（ 读操作）、 Object.create()（ 生成操作） 代替。

    // 实现上， __proto__调用的是Object.prototype.__proto__， 具体实现如下。

    Object.defineProperty(Object.prototype, '__proto__', {
        get() {
            let _thisObj = Object(this);
            return Object.getPrototypeOf(_thisObj);
        },
        set(proto) {
            if (this === undefined || this === null) {
                throw new TypeError();
            }
            if (!isObject(this)) {
                return undefined;
            }
            if (!isObject(proto)) {
                return undefined;
            }
            let status = Reflect.setPrototypeOf(this, proto);
            if (!status) {
                throw new TypeError();
            }
        },
    });

    function isObject(value) {
        return Object(value) === value;
    }

    // 如果一个对象本身部署了__proto__属性， 该属性的值就是对象的原型。

    // es6推荐的正式设置原型对象的方法
    
    // 格式: Object.setPrototypeOf(object, prototype);

    // 如果第一个参数不是对象， 会自动转为对象。 但是由于返回的还是第一个参数， 所以这个操作不会产生任何效果。

    Object.setPrototypeOf(1, {}) === 1; // true
    Object.setPrototypeOf('foo', {}) === 'foo'; // true
    Object.setPrototypeOf(true, {}) === true; // true

    // 由于undefined和null无法转为对象， 所以如果第一个参数是undefined或null， 就会报错。

    // Object.setPrototypeOf(undefined, {})
    // TypeError: Object.setPrototypeOf called on null or undefined

    // Object.setPrototypeOf(null, {})
    // TypeError: Object.setPrototypeOf called on null or undefined

    // 用法
    const o = Object.setPrototypeOf({}, null);

    // 该方法等同于下面的函数。

    // function (obj, proto) {
    //     obj.__proto__ = proto;
    //     return obj;
    // }


    // Object.getProtptypeOf()

    // 该方法与Object.setPrototypeOf方法配套， 用于读取一个对象的原型对象。Object.getPrototypeOf(obj);
    // 下面是一个例子。

    function Rectangle() {
        // ...
    }

    const rec = new Rectangle();

    Object.getPrototypeOf(rec) === Rectangle.prototype;
    // true

    Object.setPrototypeOf(rec, Object.prototype);
    Object.getPrototypeOf(rec) === Rectangle.prototype;
    // false
    // 如果参数不是对象， 会被自动转为对象。

    // 等同于 Object.getPrototypeOf(Number(1))
    Object.getPrototypeOf(1);
    // Number {[[PrimitiveValue]]: 0}

    // 等同于 Object.getPrototypeOf(String('foo'))
    Object.getPrototypeOf('foo');
    // String {length: 0, [[PrimitiveValue]]: ""}

    // 等同于 Object.getPrototypeOf(Boolean(true))
    Object.getPrototypeOf(true);
    // Boolean {[[PrimitiveValue]]: false}

    Object.getPrototypeOf(1) === Number.prototype; // true
    Object.getPrototypeOf('foo') === String.prototype; // true
    Object.getPrototypeOf(true) === Boolean.prototype; // true
    // 如果参数是undefined或null， 它们无法转为对象， 所以会报错。

    // Object.getPrototypeOf(null)
    // TypeError: Cannot convert undefined or null to object

    // Object.getPrototypeOf(undefined)
    // TypeError: Cannot convert undefined or null to object

}

// 9.1. super关键字: 指向当前对象的原型对象.注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
{
    const proto = {
        foo: 'hello'
    };

    const obj = {
        foo: 'world',
        find() {
            return super.foo;
        }
    };
    console.log(obj.find()); // undefined
    Object.setPrototypeOf(obj, proto); 
    console.log(obj.find()); // 'hello'

}

// 10.1 Object.keys()，Object.values()，Object.entries()
{
    // 自己实现Object.entries方法， 非常简单。

    // Generator函数的版本
    function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

    // 非Generator函数的版本
    function entries2(obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            arr.push([key, obj[key]]);
        }
        return arr;
    }

}

// 11.1 对象的扩展运算符
{
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x, y, z);

    // 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

    let obj = { a: { b: 1 } };
    let { ...x } = obj;
    obj.a.b = 2;
    x.a.b; // 
    
    // 另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。

    // 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

    function baseFunction({ a, b }) {
        // ...
    }
    function wrapperFunction({ x, y, ...restConfig }) {
        // 使用 x 和 y 参数进行操作
        // 其余参数传给原始函数
        return baseFunction(restConfig);
    }
    // 上面代码中，原始函数baseFunction接受a和b作为参数，函数wrapperFunction在baseFunction的基础上进行了扩展，能够接受多余的参数，并且保留原始函数的行为。


    let aClone = { ...a };
    // 等同于
    let bClone = Object.assign({}, a);
    

}
