// 1.1  概述
{
    // 它是js的第七种数据类型：number，string，boolean，null， undefined， Object，Symbol
    var s = Symbol();//不使用new，但是Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
    console.log(typeof s);

    // Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。


    // Symbol 值不能与其他类型的值进行运算，会报错。但是，Symbol 值可以显式转为字符串。
    let sym = Symbol('My symbol');

    String(sym); // 'Symbol(My symbol)'
    sym.toString(); // 'Symbol(My symbol)'

    // 另外，Symbol 值也可以转为布尔值，但是不能转为数值。

    let sym2 = Symbol();
    Boolean(sym2); // true
    !sym2;  // false

    if (sym2) {
        // ...
    }

    // Number(sym2); // TypeError
    // sym2 + 2; // TypeError
    
}

// 2.1 作为属性名的Symbol
{

    // 对象的属性名都是字符串的形式保存的

    var a = {name: 'aaa'};

    //console.log(a[name]);//name is not defined
    console.log(a['name']);//aaa

    // 使用Symbol作为对象属性的几种写法

    let mySymbol = Symbol();
    // 1. 写法一
    let b1 = {};
    b1[mySymbol] = 'hello';

    // 2. 写法二
    let b2 = {
        [mySymbol]: ','
    };

    // 3.写法三
    let b3 = {};
    Object.defineProperty(b3, mySymbol, {
        value: 'world',
    });

    console.log(b1[mySymbol], b2[mySymbol], b3[mySymbol]);//hello , world

    // Symbol 值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。

    // 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

/* 
常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。

还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

*/


}

// 3.1. 实例：消除魔术字符串
{

    // 常用的消除魔术字符串的方法，就是把它写成一个变量。

    // 如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

    const shapeType = {
        triangle: Symbol()
    };
    // 上面代码中，除了将shapeType.triangle的值设为一个 Symbol，其他地方都不用修改。

}

// 4.1 属性名的遍历
{
    
}

// 5.1 Symbol.for(), Symbol.keyFor()
{
    
}

// 6.1. 实例： 模块的Singleton模式
{
    
}

// 7.1. 内置的Symbol值
{
    
}