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
