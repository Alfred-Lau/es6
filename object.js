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

    const merge = (target, ...sources) => Object.assign(target, ...sources);
    
        
    // 2. 如果希望合并后返回一个新对象， 可以改写上面函数， 对一个空对象合并。

    const merge = (...sources) => Object.assign({}, ...sources);
    

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

// 6.1 属性的可枚举性和遍历
{

}

// 7.1 Object.getOwnPropertyDescriptors()
{

}

// 8.1. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
{

}

// 9.1. super关键字
{

}

// 10.1 Object.keys()，Object.values()，Object.entries()
{

}

// 11.1 对象的扩展运算符
{

}
