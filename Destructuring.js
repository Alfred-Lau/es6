// TODO: 1.1 数组的解构赋值:注重的是模式匹配，分为完全解构和不完全解构
{
    // 完全解构
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c);
    let [,, d] = [4, 5, 6];
    console.log(d);
    let [e, ...f] = [7, 8, 9];
    console.log(e, f);

    // 不完全解构
    let [x, y] = [1, 2, 3];
    console.log(x, y);
    let [g, [z], w] = [1, [2, 3, 4], 6];
    console.log(g, z, w);

}
{
    // 对于Set数据结构的解构
    let [x, y, z] = new Set(['a', 'b', 'c']);
    console.log(x);; // "a"
    // 对于Generator函数的解构
    function * fibs () {
        let a = 0;
        let b = 1;
        while (a < 100) {
            yield a
            ;[a, b] = [b, a + b];
        }
    }

    let res = fibs();
    console.log(...res); // 0 1 1 2 3 5 8 13 21 34 55 89
}

// TODO: 1.2 解构的默认值
{
    // 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
    let [x, y = 'b', z = 'c'] = ['a', undefined]; // x='a', y='b'
    console.log(x, y, z);

}
{
    // 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

    // function f () {
    //     console.log('aaa')
    // }

    // let [x = f()] = [1]
    // // 上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

    // let x
    // if ([1][0] === undefined) {
    //     x = f()
    // } else {
    //     x = [1][0]
    // }
}

{
    // 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

    // let [x = 1, y = x] = []; // x=1; y=1
    // let [x = 1, y = x] = [2]; // x=2; y=2
    // let [x = 1, y = x] = [1, 2]; // x=1; y=2
    // let [x = y, y = 1] = []; // ReferenceError: y is not defined
    // 上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
}

// TODO: 2.1 对象的解构赋值
{
    // 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
    let { bar, foo } = { bar: 'bar', foo: 'foo' };
    console.log(bar, foo);
}

{
    // 对象解构赋值的内部机制：先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
    let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz; // "aaa"
    // foo; // error: foo is not defined

/* 

如果变量名与属性名不一致，必须写成下面这样。

let { foo: baz } = { foo: 'aaa', bar: 'bbb' }
baz // "aaa"

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // 'hello'
l // 'world'
这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。

let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };*/
}

{
    // 解构嵌套结构的对象

    let obj = {
        p: [
            'Hello',
            { y: 'World' }
        ]
    };

    // ?这种方式的解构？
    let { p, p: [x, { y }] } = obj;
    x; // "Hello"
    y; // "World"
    p; // ["Hello", {y: "World"}]
    console.log(x, y, p);

    const node = {
        loc: {
            start: {
                line: 1,
                column: 5
            }
        }
    };

    let {loc, loc: {start}, loc: {start: {line}}} = node;
    console.log(line, start, loc);
    line; // 1
    loc; // Object {start: Object}
    start; // Object {line: 1, column: 5}
    // 上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。

    let obj02 = {};
    let arr = [];
    ({ foo: obj02.prop, bar: arr[0] } = { foo: 123, bar: true });

    obj02; // {prop:123}
    arr; // [true]    
}
{
    // 对象的解构也可以指定默认值:指定默认值的时候使用的是“=”，而不是“：”；默认值生效的条件是，对象的属性值严格等于undefined
    let { attr = 'attr' } = {};
    console.log(attr);
}
{
    // 使用一个已经声明的变量来进行解构
    // 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

    // 错误的写法

    // let x
    // { x } = { x: 1 }

    // SyntaxError: syntax error
    // 上面代码的写法会报错，因为 JavaScript 引擎会将 {x} 理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

    // 正确的写法
    let x
  ;({x} = {x: 1});
// 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。
}

{
    // 古怪的对象解构赋值
    // 解构赋值允许等号左边的模式之中， 不放置任何变量名。 因此， 可以写出非常古怪的赋值表达式。

    ({} = [true, false])
    ;({} = 'abc')
    ;({} = []);
    // 上面的表达式虽然毫无意义， 但是语法是合法的， 可以执行。

    // 对象的解构赋值， 可以很方便地将现有对象的方法， 赋值到某个变量。

    let {log, sin, cos} = Math;
    // 上面代码将Math对象的对数、 正弦、 余弦三个方法， 赋值到对应的变量上， 使用起来就会方便很多。

    // 由于数组本质是特殊的对象， 因此可以对数组进行对象属性的解构。！！！把数组解构给对象

// let arr = [1, 2, 3]
// let {
//     0: first,
//     [arr.length - 1]: last
// } = arr
// first // 1
// last // 3
// 上面代码对数组进行对象解构。 数组arr的0键对应的值是1，[arr.length - 1] 就是2键， 对应的值是3。 方括号这种写法， 属于“ 属性名表达式”（ 参见《 对象的扩展》 一章）。
}

// TODO:3.1 字符串的解构赋值

{
    // 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
    let [a, b, c, d, e] = 'hello';
    console.log(a, b, c, d, e);
    let { length } = 'hello';
    console.log(length);

}

// TODO:4.1 数值和布尔值的解构赋值
{
    // 当把简单数据结构往对象解构赋值的时候，则会先转换为对应简单类型的包装对象
    let { toString:n } = 123;
    console.log(n === Number.prototype.toString);
    let { toString:b } = true;
    console.log(b === Boolean.prototype.toString);
    let { toString:s } = 'hello';
    console.log(s === String.prototype.toString);

    // 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
    // let {prop: x} = undefined
    // let { prop: y } = null
    // console.log(x,y)

}

// TODO: 5.1 函数参数的解构赋值

{
    // case one :注意箭头函数的参数只有当是简单类型的时候才能直接不套在“（）”里面
    let res = [[1, 2], [3, 4]].map(([a, b]) => a + b);
    console.log(res);

}
{
    // 函数参数的解构也可以使用默认值
    // ！！！注意下面两种写法的本质差别
    function move ({ x = 0, y = 0 } = {}) {
        return [x, y];
    }

    move({x: 3,y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]

    // 上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。

    // 注意， 下面的写法会得到不一样的结果
    function move ({x, y} = {x: 0,y: 0}) {
        return [x, y];
    }

    move({x: 3,y: 8}); // [3, 8]
    move({x: 3}); // [3, undefined]
    move({}); // [undefined, undefined]
    console.log(move({}));
    move(); // [0, 0]

// 上面代码是为函数move的参数指定默认值， 而不是为变量x和y指定默认值， 所以会得到与前一种写法不同的结果。
}

{
    // undefined 会触发函数参数的默认值,null不行
    const res = [1, undefined, 3].map((x = 'yes') => x);
    console.log(res);
}
// TODO: 6.1 圆括号问题:
{
    // 有三种情况不得使用圆括号
    // 1） 变量声明语句

    // 全部报错
    /*     let [(a)] = [1]

    let {x: (c)} = {}
    let ({x: c}) = {}
    let {(x: c)} = {}
    let {(x): c} = {}

    let {o: ({p: p})} = {o: {p: 2}}; */
    // 上面 6 个语句都会报错， 因为它们都是变量声明语句， 模式不能使用圆括号。

    // （ 2） 函数参数

    // 函数参数也属于变量声明， 因此不能带有圆括号。

    // 报错
    /*     function f([(z)]) {
        return z
    }
    // 报错
    function f([z, (x)]) {
        return x
    } */
    // 3） 赋值语句的模式

    // 全部报错
    /*     ({p: a}) = {p: 42}
    ([a]) = [5]; */
    // 上面代码将整个模式放在圆括号之中， 导致报错。

    // 报错
    // [({p: a}), {x: c}] = [{}, {}]
    // 上面代码将一部分模式放在圆括号之中， 导致报错。

    // 可以使用圆括号的情况只有一种：赋值语句的非模式部分
    [(b)] = [3]; // 正确
    ({p: (d)} = {}); // 正确
    [(parseInt.prop)] = [3]; // 正确
    // 上面三行语句都可以正确执行， 因为首先它们都是赋值语句， 而不是声明语句； 其次它们的圆括号都不属于模式的一部分。 第一行语句中， 模式是取数组的第一个成员， 跟圆括号无关； 第二行语句中， 模式是p， 而不是d； 第三行语句与第一行语句的性质一致。

}

// TODO: 7.1 用途
{
    /* 
  变量解构赋值的用途很多
  
  */
    // 1.交换变量的值

    let x = 1;
    let y = 2;

    console.log('1.交换变量的值');

    const exchange = ([x, y]) => [y, x];
    console.log(...exchange([x, y]));

    console.log(...(([x, y]) => [y, x])([x, y]));

    // 2.从函数返回多个值

    console.log('return multible values');

    // @2.1 返回一个数组

    const returnArray = () => {
        return [
            1, 2, 3
        ];
    };

    let [bo, zhong, shu] = returnArray();
    console.log(bo, zhong, shu);

    // @2.2 返回一个对象

    const returnClass = () => {
    // 直接使用let或者var的区别是块级作用域的区别
        let state = {
            msg: 'what is the matter with you'
        };
        // 直接使用this声明变量，也有上下文

        /* 
    this是Javascript语言的一个关键字。
    它代表函数运行时， 自动生成的一个内部对象， 只能在函数内部使用。 比如，
    function test() {
    this.x = 1
    }
    随着函数使用场合的不同， this的值会发生变化。 但是有一个总的原则， 那就是this指的是， 调用函数的那个对象。
    下面分四种情况， 详细讨论this的用法。
    情况一： 纯粹的函数调用
    这是函数的最通常用法， 属于全局性调用， 因此this就代表全局对象Global。
    请看下面这段代码， 它的运行结果是1。
    function test() {
    this.x = 1
    alert(this.x)
    }
    test() // 1
    为了证明this就是全局对象， 我对代码做一些改变：
    var x = 1
    function test() {
    alert(this.x)
    }
    test() // 1
    运行结果还是1。 再变一下：
    var x = 1
    function test() {
    this.x = 0
    }
    test()
    alert(x) //0
    情况二： 作为对象方法的调用
    函数还可以作为某个对象的方法调用， 这时this就指这个上级对象。
    function test() {
    alert(this.x)
    }
    var o = {}
    o.x = 1
    o.m = test
    o.m() // 1
    情况三 作为构造函数调用
    所谓构造函数， 就是通过这个函数生成一个新对象（ object）。 这时， this就指这个新对象。
    function test() {
    this.x = 1
    }
    var o = new test()
    alert(o.x) // 1
    运行结果为1。 为了表明这时this不是全局对象， 我对代码做一些改变：
    var x = 2
    function test() {
    this.x = 1
    }
    var o = new test()
    alert(x) //2
    运行结果为2， 表明全局变量x的值根本没变。
    情况四 apply调用
    apply() 是函数对象的一个方法， 它的作用是改变函数的调用对象， 它的第一个参数就表示改变后的调用这个函数的对象。 因此， this指的就是这第一个参数。
    var x = 0
    function test() {
    alert(this.x)
    }
    var o = {}
    o.x = 1
    o.m = test
    o.m.apply() //0
    apply() 的参数为空时， 默认调用全局对象。 因此， 这时的运行结果为0， 证明this指的是全局对象。
    如果把最后一行代码修改为
    　　 o.m.apply(o) //1
    运行结果就变成了1， 证明了这时this代表的是对象o。
*/
        this.owner = 'lj';
        const func1 = () => {
            console.log(`func1 is called and ${state.msg} && ${this.owner}`);
        };
        const func2 = () => console.log('func2 is called');
        return {
            func1,
            func2};
    };
    let { func1: child01, func2: child02 } = returnClass();
    child01();

    child02();
    var name = 'x';

    function testThis () {
    // alert(this.name)
    }
    testThis();

    // 3.函数参数的定义：将一组参数和变量名对应起来

    // @3.1 参数是一组有次序的值
    const orderParamFunc = ([x, y, z]) => {
        return `${x}:${y}:${z}`;
    };
    console.log(orderParamFunc(['hello', 'world', '!']));

    // @3.2 参数是一组无次序的值

    const unOrderParamFunc = ({ x, y, z }) => {
        return `${x}-${y}-${z}`;
    };
    console.log(unOrderParamFunc({
        x: 'hello',
        z: '!',
        y: 'again'
    }));

    // 4.提取json数据
    console.log('提取json数据');
    // require命令属于Nodejs的范畴，不属于JavaScript基本，前端无法直接使用，需要通过webpack之类的Nodejs编译工具进行编译
    let source = require('./data.json');
    let { type, data } = source;
    data.map(({id, avatar}) => {
        console.log(id, avatar);
    });

    // 5.函数参数的默认值

    // 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

    /*     jQuery.ajax = function (url,
          {
              async = true,
              beforeSend = function () { },
              cache = true,
              complete = function () { },
              crossDomain = false,
              global = true,
              // ... more config
          }) {
      // ... do stuff
      }; */

    // 6. 遍历Map解构
    // 任何部署了Iterator接口的对象，都可以使用for...of循环遍历。Map解构原生支持Iterator接口，配合变量的解构赋值，可以方便的获取键名和键值

    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    
    for (const [key,val] of map) {
        console.log(`${key} is : ${val}`);
    }

    // 如果只想获取键名，或者只想获取键值，可以写成下面这样。

    // 获取键名
    for (let [key] of map) {
    // ...
    }

    // 获取键值
    for (let [,value]of map) {
    // ...
    }

    // 7.输入模块的指定方法
    // const {SourceMapConsumer,SourceNode} = require("source-map")

}


{
    // 使用es5的方法实现一个生成器函数:要实现生成器函数模拟，只需要部署了[Symbol.iterator] 和 next接口即可

    function generator() {
        let index = 0;
        return {
            [Symbol.iterator]:function () {
                return this;
            },
            next:function () {
                if (index++ < 10) {
                    return {
                        value: index,
                        done:false
                    };
                } else {
                    return {
                        value: index,
                        done:true
                    };
                }

            }
        };
    }

    const geneFunc = generator();
    for (const val of geneFunc) {
        console.log(val);
    }
}