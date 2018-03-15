// 1.1. spread扩展运算符: 类似rest参数的逆运算，讲一个数组转为用逗号分隔的参数序列
{
    // 直接扩展数组
    console.log(...[1, 2, 3]);

    // 扩展函数返回值
    const returnArr = () => [4, 5, 6];
    console.log(...returnArr());

    /* 
  该运算符主要用与函数调用
  
  */

    const pushFake = (target, ...values) => {
    // Array.prototype.push方法可以接受一个或者多个参数
        target.push(...values);
    };

    const arr = [];
    pushFake(arr, 1, 2, 5, 67, 9, 10);
    console.log(arr);

    // 扩展运算符与正常的函数参数可以结合使用，非常灵活。

    // 扩展运算符后面还可以放置表达式。

    // const arr = [
    //     ...(x > 0 ? ['a'] : []),
    //     'b'
    // ]

    // 如果扩展运算符后面是一个空数组，则不产生任何效果。

    /* 
  
  替代函数的apply方法，将数组转为函数的参数
  
  */

    const f = (x, y, z) => void console.log(x, y, z);
    const args = [0, 1, 2];
    f(args); // [ 0, 1, 2 ] undefined undefined
    f.apply(null, args); // TODO:0,1,2
    f(...args);

    // 求数组最大元素的方法
    const tar = [1, 4, 2, 5, 6, 8];
    // Math.max方法不能直接求数组的最大值
    let max = Math.max.apply(null, tar);
    console.log(max);

    // es6的写法
    console.log(Math.max(...tar));

    console.log('-------------');
    // 将一个数组添加到另一个数组的尾部 :array.push的返回值是当前数组的元素个数;push函数的参数不能是数组
    let arr01 = [0, 1, 2];
    let arr02 = [3, 4, 5];
    Array.prototype.push.apply(arr01, arr02);
    console.log(arr01);

    let arr03 = [0, 1, 2];
    let arr04 = [3, 4, 5];
    arr03.push(...arr04);
    console.log(arr03);

    // 日期

    // ES5
    new (Date.bind.apply(Date, [null, 2015, 1, 1]));
    // ES6
    console.log(new Date(...[2015, 1, 1]));

    /* 
  
  扩展运算符的应用

  1. 复制数组
  2. 合并数组
  3. 和解构赋值结合
  4. 字符串
  5. 实现了Iterator接口的对象
  6. Map和Set结构，Generator函数
  
  */

    // 1. 复制数组

    // es5的方法:array.concat函数不改变原有数组，而是返回一个全新的数组
    const a1 = [1, 4];
    const a2 = a1.concat();
    console.log(a2);

    // es6的简便写法：有两种方式
    const a3 = [2, 3];
    const a3Copy01 = [...a3];
    const [...a3Copy02] = a3;
    console.log(a3Copy01, a3Copy02);

    // 2. 合并数组
    let arr1 = ['a', 'b'];
    let arr2 = ['c'];
    let arr3 = ['d', 'e'];

    // ES5的合并数组
    arr1.concat(arr2, arr3); // [ 'a', 'b', 'c', 'd', 'e' ] 

    // ES6的合并数组
    [...arr1, ...arr2, ...arr3]; // [ 'a', 'b', 'c', 'd', 'e' ]

    // 3. 和解构赋值结合：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

    // const [...butLast,last] = [1, 2, 3, 4, 5]
    // 报错

    // const [first,...middle,last] = [1, 2, 3, 4, 5]
    // 报错

    // 4. 字符串： 扩展运算符还可以将字符串转换为真正的数组
    console.log([...'string']); // [ 's', 't', 'r', 'i', 'n', 'g' ]

    // 正确返回字符串长度的函数，可以像下面这样写。
    function length (str) {
        return [...str].length;
    }

    length('x\uD83D\uDE80y'); // 3

    // 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

    let str = 'x\uD83D\uDE80y';

    str.split('').reverse().join(''); // 'y\uDE80\uD83Dx'

    // [...str].reverse().join('')// 'y\uD83D\uDE80x'

    // 上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。

    // 5. 实现了Iterator接口的对象

    // 实现了Iterator接口的对象，通过扩展运算符转化为数组

    const iteratorObj = function * () {
        const array = [1, 2, 32, 34, 5, 6, 7];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            yield element;
        }
    };

    // 生成器函数要执行一下才能变成遍历器对象
    const arrayIter = [...iteratorObj()];
    console.log(arrayIter);

    // 未实现Iterator接口的类数组对象，通过Array.from转换为数组:
    /* 

  何为类数组对象？
  - 拥有length属性，
  - 其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)不具有数组所具有的方法ps：
  -这是参考的定义，实际上，只要有length属性，且它的属性值为number类型就行了
  
  */
    const arrayLike = {
        '0': 'dd',
        '1': 'al',
        '2': 10,
        length: 3
    };
    const array = Array.from(arrayLike);
    console.log(array);

    // 6. Map，Set， Generator函数

}

// 2.1. Array.from():可接受三个参数：Array.from(arrayLike, x => x * x)

{

    /* 

  Array.from方法用于将两类对象转为真正的数组：
  - 类似数组的对象（array-like object） :常见的包括DOM操作返回的NodeList集合，函数内部的arguments对象
  - 可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
  
  */

    // 类数组对象转换为数组：es5

    // 如果缺少索引0的时候就会填充一个<1 empty item>
    let arrayLike = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };
    console.log([].slice.call(arrayLike));

    // 类数组对象转换为数组：es6
    console.log(Array.from(arrayLike));

    // 部署了Iterator接口的对象：字符串，Map，Set

    // 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
    const origin = [1, 2, 4];
    const copy = Array.from(origin);
    console.log(copy);

    function argumentsTest () {
        console.log([...arguments]);
    }

    argumentsTest('d', 's');

    /* 
  
  所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
  
  */

    /* 
  对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。

  const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
  )()
  
  */

    // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
    const arrayLike01 = {
        length: 3,
        0: 2,
        1: 3,
        2: 4
    };

    console.log(Array.from(arrayLike01, x => x * x));
    // 等同于
    Array.from(arrayLike01).map(x => x * x);

    Array.from([1, 2, 3], (x) => x * x); // [1, 4, 9]

    // Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。

    Array.from({
        length: 2
    }, () => 'jack');
    // ['jack', 'jack']
    // 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

}

// 3.1. Array.of()：用于将一组值转换为数组
{
    /* 
  
  这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。

  */

    Array(); // []
    Array(3); // [, , ,]
    Array(3, 11, 8); // [3, 11, 8]
    // 上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

    // Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

    Array.of(); // []
    Array.of(undefined); // [undefined]
    Array.of(1); // [1]
    Array.of(1, 2); // [1, 2]
    // Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

    // Array.of方法可以用下面的代码模拟实现。

    function ArrayOf () {
        return [].slice.call(arguments);
    }

}

// 4.1. 数组实例的 copyWithin()：会修改当前数组
{

    /* 
  
  数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

  Array.prototype.copyWithin(target, start = 0, end = this.length)
它接受三个参数。

  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

  这三个参数都应该是数值，如果不是，会自动转为数值。

  
  */

    console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]

    // 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5] 

    // - 2相当于3号位，-1相当于4号位
    ;[1, 2, 3, 4, 5].copyWithin(0, -2, -1); // [4, 2, 3, 4, 5] 

    // [].copyWithin.call({length: 5,3: 1}, 0, 3)// {0: 1, 3: 1, length: 5} 将2号位到数组结束，复制到0号位

    let i32a = new Int32Array([1, 2, 3, 4, 5]);
    i32a.copyWithin(0, 2); // Int32Array [3, 4, 5, 4, 5] 对于没有部署 TypedArray 的 copyWithin 方法的平台 需要采用下面的写法

    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4); // Int32Array [4, 2, 3, 4, 5]

}

// 5.1. 数组实例的find()和findIndex():这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
{
    /* 
  - 数组实例的find方法，用于找出第一个符合条件的数组成员。
  - 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
  -find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

  */

    console.log([1, 4, -5, 10].find(n => n < 0))

    ;[1, 5, 10, 15].find(function (value, index, arr) {
        return value > 9;
    }); // 10

    /* 
  
  数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
  
  */

    // 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

    function f (v) {
        return v > this.age;
    }
    let person = {
        name: 'John',
        age: 20
    };
    console.log([10, 12, 26, 15].find(f, person)) // 26

    // 另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。

    ;[NaN].indexOf(NaN) // -1

    ;[NaN].findIndex(y => Object.is(NaN, y)); // 0

    // 上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

}

// 6.1. 数组实例的fill():使用给定值，填充一个数组，fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。左开右闭
{

    // 方便的初始化一个数组：fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
    ['a', 'b', 'c'].fill(7);
    // [7, 7, 7]

    new Array(3).fill(7);
    // [7, 7, 7]
    console.log([1, 3, 5, 7, 9].fill('s', 1, 3));

    // 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

    let arr = new Array(3).fill({name: 'Mike'});
    arr[0].name = 'Ben';
    arr; // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

    arr = new Array(3).fill([]);
    arr[0].push(5);
    arr; // [[5], [5], [5]]

}

// 7.1. 数组实例的entries(), keys(), values(): values方法还不被支持
{

    /* 
  
  ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
  
  */

    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1

    // for (let elem of ['a', 'b'].values()) {
    //     console.log(elem)
    // }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"  

    // 如果不使用for ...of循环，可以手动调用遍历器对象的next方法，进行遍历。

    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']

}

// 8.1.数组实例的includes():返回一个布尔值，表示某个数组是否包含给定的值，和字符串的includes方法类似
{

    /* 
  
  该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
  
  */

    const val = [1, 2, 3].includes(4);
    console.log(val);

    const NanVal = [1, 2, NaN].includes(NaN); // true
    console.log(NanVal);

    // 和indexOf方法的比较：数组和字符串都有这个方法
    /* 

  indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

  [NaN].indexOf(NaN)
  // -1
  includes使用的是不一样的判断算法，就没有这个问题。

  [NaN].includes(NaN)
  // true

  */

    /* 

    下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。

    const contains = (() =>
    Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
    )()
    contains(['foo', 'bar'], 'baz'); // => false

    */


    /* 
    另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。

    Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
    Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。


    */
}

// 9.1. 数组的空位

{

// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。

    0 in[undefined,undefined,undefined]; // true
    0 in[,,]; // false
// 上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。


    /* ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

    forEach(),
    filter(),
    reduce(),
    every()和some()都会跳过空位。
    map()会跳过空位，但会保留这个值
    join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。 */
    // forEach方法
    // [, 'a'].forEach((x, i) => console.log(i)); // 1

    // // filter方法
    // ['a',, 'b'].filter(x => true) // ['a','b']

    // // every方法
    // [, 'a'].every(x => x === 'a') // true

    // // reduce方法
    // [1,, 2].reduce((x, y) => return x + y) // 3

    // // some方法
    // [, 'a'].some(x => x !== 'a') // false

    // // map方法
    // [, 'a'].map(x => 1) // [,1]

    // // join方法
    // [, 'a', undefined, null].join('#') // "#a##"

    // // toString方法
    // [, 'a', undefined, null].toString() // ",a,,"
    // ES6 则是明确将空位转为undefined。


    /* 
    .from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

    Array.from(['a',, 'b'])
    // [ "a", undefined, "b" ]
    扩展运算符（ ...）也会将空位转为undefined。

    [...['a',, 'b']]
    // [ "a", undefined, "b" ]
    copyWithin()会连空位一起拷贝。

    [, 'a', 'b',].copyWithin(2, 0) // [,"a",,"a"]
    fill()会将空位视为正常的数组位置。

    new Array(3).fill('a') // ["a","a","a"]
    for ...of循环也会遍历空位。

    let arr = [,];
    for (let i of arr) {
        console.log(1);
    }
    // 1 1
    上面代码中，数组arr有两个空位，for ...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。

    entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

    // entries()
    [...[, 'a'].entries()] // [[0,undefined], [1,"a"]]

    // keys()
    [...[, 'a'].keys()] // [0,1]

    // values()
    [...[, 'a'].values()] // [undefined,"a"]

    // find()
    [, 'a'].find(x => true) // undefined

    // findIndex()
    [, 'a'].findIndex(x => true) // 0
    由于空位的处理规则非常不统一，所以建议避免出现空位。 */

}
