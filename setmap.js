// 1.1 Set
{
    /* 
  Set类似于数组,但是成员的值都是唯一的，没有重复的值。

  Set本身是一个构造函数，用来生成Set数据结构

  Set结构添加元素使用add方法

  Set函数可以接受一个数组（或者具有Iterator接口的其他数据结构）作为参数，用来初始化
  */

    const s = new Set()
  ;[2, 3, 4, 2, 5].forEach(x => s.add(x));

    console.log(s);

    // 例1
    const set1 = new Set([1, 2, 3, 4, 4]);
    console.log(set1.size, set1);

    // 例2
    // const items = new Set(document.querySelectorAll('div'))

    // 数组去重
    console.log('数组去重', [...new Set([1, 2, 3, 4, 5, 6, 74, 3, 1, 10])]);

    /* 
  向 Set 加入值的时候， 不会发生类型转换， 所以5和 "5"
  是两个不同的值。 Set 内部判断两个值是否不同， 使用的算法叫做“ Same - value - zero equality”， 它类似于精确相等运算符（ === ），主要的区别是NaN等于自身， 而精确相等运算符认为NaN不等于自身。
  
  */

    // 另外， 两个对象总是不相等的。

    let set = new Set();

    set.add({});
    set.size; // 1

    set.add({});
    set.size; // 2
    // 上面代码表示， 由于两个空对象不相等， 所以它们被视为两个值。

    /*  
  Set实例的方法和属性：

  Set.prototype.constructor 构造函数，默认就是Set函数。
  Set.prototype.size 返回Set实例的成员总数

  Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）

  实例的操作方法：
  - add(value) : 添加某个值，返回Set结构本身
  - delete(value) : 删除某个值，返回一个布尔值，表示删除是否成功
  - has(value) : 返回一个布尔值，表示该值是否为Set的成员
  - clear() : 清除所有成员，没有返回值

  TODO:实例的遍历方法： 遍历顺序就是插入顺序, 这个特性有时非常有用， 比如使用 Set 保存一个回调函数列表， 调用时就能保证按照添加顺序调用。
  - keys() : 返回键名的遍历器
  - values() : 返回键值的遍历器
  - entries() : 返回键值对的遍历器
  - forEach() : 使用回调函数遍历每个成员
  */

    // s.add(1).add(2).add(2)
    // // 注意2被加入了两次

    // s.size // 2

    // s.has(1) // true
    // s.has(2) // true
    // s.has(3) // false

    // s.delete(2)
    // s.has(2) // false

    // Object结构和Set结构的对比

    // Array.from方法可以将Set结构转为数组
    const sets = new Set([1, 2, 3, 4, 5]);
    const array = Array.from(sets);

    console.log('array from set', array);

    // 数组去重的另一种方法
    function dedupe (array) {
        return Array.from(new Set(array));
    }
    console.log('second dedupe', dedupe([1, 1, 1, 3, 2, 1, 2, 7]));

    // 遍历：由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
    let set3 = new Set(['red', 'green', 'blue']);

    for (let item of set3.keys()) {
        console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set3.values()) {
        console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set3.entries()) {
        console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]

    // Set结构的实例默认可以遍历，它的默认遍历生成函数就是它的values方法
    console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true

    // 这意味着， 可以省略values方法， 直接用for...of循环遍历 Set。

    let set4 = new Set(['red', 'green', 'blue']);

    for (let x of set4) {
        console.log(x);
    }
    // red
    // green
    // blue

    // forEach

    /* 
  Set 结构的实例与数组一样， 也拥有forEach方法， 用于对每个成员执行某种操作， 没有返回值。

  set = new Set([1, 4, 9])
  set.forEach((value, key) => console.log(key + ' : ' + value))
  // 1 : 1
  // 4 : 4
  // 9 : 9
  上面代码说明， forEach方法的参数就是一个处理函数。 该函数的参数与数组的forEach一致， 依次为键值、 键名、 集合本身（ 上例省略了该参数）。 这里需要注意， Set 结构的键名就是键值（ 两者是同一个值）， 因此第一个参数与第二个参数的值永远都是一样的。
  */

    // 此外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

    /* 
  遍历的应用：

  1. 扩展运算符内部使用for...of...循环，所以也可以用于Set结构
  2. 扩展运算符和Set结构相结合，就可以去除数组的重复成员
  3. 数组的map和filter方法也能够间接用于Set
  4. 可以使用Set实现并集，交集和差集
  5. 在遍历操作中， 同步改变原来的Set结构， 目前没有直接的方法， 但有两种变通方法。 一种是利用原 Set 结构映射出一个新的结构， 然后赋值给原来的 Set 结构； 另一种是利用Array.from方法。
  */

    // 1. 遍历的应用1：

}

// 2.1 WeakSet
{

}

// 3.1 Map
{
    /* 
  传统Object存在的问题：js的对象Object， 本质上是键值对的集合（ Hash结构）， 但是传统上只能用字符串当做键。 这给它的使用带来了很大限制。 
  
  为了解决这个问题， es6引入了Map结构。 它类似于对象， 也是键值对的集合， 但是“ 键” 的范围不限于字符串， 各种类型的值（ 包括对象） 都可以当作键。 也就是说， Object 结构提供了“ 字符串— 值” 的对应， Map 结构提供了“ 值— 值” 的对应， 是一种更完善的 Hash 结构实现。 如果你需要“ 键值对” 的数据结构， Map 比 Object 更合适。
  */

    const m = new Map();
    const o = {
        p: 'hello world'
    };
    console.log(o['p']); // hello world
    // console.log(o[p]); //ReferenceError: p is not defined

    m.set(o, 'content');
    m.get(o);
    console.log(m); // Map { { p: 'hello world' } => 'content' }

    m.has(o); // true
    m.delete(o); // true
    m.has(o); // false

    // 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    const map = new Map([
        ['name', '张三'],
        ['title', 'Author']
    ]);

    console.log(map.size); // 2
    console.log(map.has('name')); // true
    console.log(map.get('name')); // "张三"
    console.log(map.has('title')); // true
    console.log(map.get('title')); // "Author"

    // 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。

    const set = new Set([
        ['foo', 1],
        ['bar', 2]
    ]);
    const m1 = new Map(set);
    console.log(m1.get('foo')); // 1

    const m2 = new Map([
        ['baz', 3]
    ]);
    const m3 = new Map(m2);
    console.log(m3.get('baz')); // 3

    // 如果对同一个键多次赋值，后面的值将覆盖前面的值。
    const map3 = new Map();
    map3.set(1, 'add').set(1, 'minus');
    console.log(map3);

    // 如果读取一个未知的键， 则返回undefined。

    new Map().get('unknown');
    // undefined

    /* 
  注意， 只有对同一个对象的引用， Map 结构才将其视为同一个键。 这一点要非常小心。

  const map = new Map()

  map.set(['a'], 555)
  map.get(['a']) // undefined
  上面代码的set和get方法， 表面是针对同一个键， 但实际上这是两个值， 内存地址是不一样的， 因此get方法无法读取该键， 返回undefined。

  同理， 同样的值的两个实例， 在 Map 结构中被视为两个键。

  const map = new Map()

  const k1 = ['a']
  const k2 = ['a']

  map
  .set(k1, 111)
  .set(k2, 222)

  map.get(k1) // 111
  map.get(k2) // 222
  上面代码中， 变量k1和k2的值是一样的， 但是它们在 Map 结构中被视为两个键。

  由上可知， Map 的键实际上是跟内存地址绑定的， 只要内存地址不一样， 就视为两个键。 这就解决了同名属性碰撞（ clash） 的问题， 我们扩展别人的库的时候， 如果使用对象作为键名， 就不用担心自己的属性与原作者的属性同名。

  如果 Map 的键是一个简单类型的值（ 数字、 字符串、 布尔值）， 则只要两个值严格相等， Map 将其视为一个键， 比如0和 - 0 就是一个键， 布尔值true和字符串true则是两个不同的键。 另外， undefined和null也是两个不同的键。 虽然NaN不严格相等于自身， 但 Map 将其视为同一个键。

  let map = new Map()

  map.set(-0, 123)
  map.get(+0) // 123

  map.set(true, 1)
  map.set('true', 2)
  map.get(true) // 1

  map.set(undefined, 3)
  map.set(null, 4)
  map.get(undefined) // 3

  map.set(NaN, 123)
  map.get(NaN) // 123
  
  
  */

    /* 
  Map实例的属性和操作方法

  - size属性
  - set(key, value)
  - get(key)
  - has(key)
  - delete(key)
  - clear()

  Map实例的遍历方法: 
  
  *  3个遍历器生成函数， 1 个遍历方法.
  *  Map 的遍历顺序就是插入顺序。
  
  - keys() : 返回键名的遍历器
  - values() : 返回键值的遍历器
  - entries() : 返回所有成员的遍历器
  - forEach() : 遍历Map的所有成员

  */

    const map4 = new Map([
        ['F', 'no'],
        ['T', 'yes']
    ]);

    for (const key of map4.keys()) {
        console.log(key);
    }

    for (const value of map4.values()) {
        console.log(value);
    }

    for (const item of map4.entries()) {
        console.log(item[0], item[1]);
    }

    // map4[Symbol.iterator]()
    for (const [key, value] of map4) {
        console.log(key, value);
    }

    //  Map 结构的默认遍历器接口（ Symbol.iterator属性）， 就是entries方法。

    console.log('Map 结构的默认遍历器接口就是entries', map[Symbol.iterator] === map.entries); // true

    const map5 = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
    ]);
    console.log(map5); // Map { 1 => 'one', 2 => 'two', 3 => 'three' }

    // map结构转换为数组结构：，使用扩展运算符

    console.log([...map5.keys()]); // [ 1, 2, 3 ]
    console.log([...map5.entries()]); // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]
    console.log([...map5.values()]); // [ 'one', 'two', 'three' ]
    console.log([...map5]); // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

    // 结合数组的map方法和filter方法，可以实现Map的遍历和过滤，Map本身没有map和filter方法

    const map6 = new Map([...map5].filter(([k, v]) => k > 2)); // 注意解构数据的时候只能使用数组不能使用对象

    const map7 = new Map([...map5].map(([k, v]) => [k * 2, '_' + v]));

    console.log('map6 && map7', map6, map7); // map6 && map7 Map { 3 => 'three' } Map { 2 => '_one', 4 => '_two', 6 => '_three' }

    // Map的遍历方法： forEach，和数组的forEach方法类似

    map5.forEach((value, key, map) => {
    /*         
        forEach:  one 1 Map { 1 => 'one', 2 => 'two', 3 => 'three' }
        forEach:  two 2 Map { 1 => 'one', 2 => 'two', 3 => 'three' }
        forEach:  three 3 Map { 1 => 'one', 2 => 'two', 3 => 'three' }
    */
        console.log('forEach: ', value, key, map);
    });

    // forEach方法还可以接受第二个参数，用来绑定this

    const reporter = {
        report: function (key, value) {
            console.log(key, value);
        }
    };
    map5.forEach(function (value, key, map) {
        this.report(key, value);
    }, reporter);

    // 上面的代码中，forEach方法的回调函数this，就指向reporter

    /* 
  和其他数据结构的互相转换

  - Map 转换为 数组
  - 数组 转化为 Map
  - Map 转化为 对象
  - 对象 转化为 Map
  - Map 转化为 JSON
  - JSON 转化为 Map
  
  */

    // 1. Map转换为数组

    const myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
    console.log('map 转换为数组', [...myMap]); // map 转换为数组 [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

    // 2. 数组转换为Map
    console.log('数组转换为Map', new Map([ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ])); // 数组转换为Map Map { true => 7, { foo: 3 } => [ 'abc' ] }

    // 3. Map转化为对象
    const setMapToObject = (setMap) => {
        let obj = Object.create(null);
        // 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
        for (const [k, v] of setMap) {
            obj[k] = v;
        }
        return obj;
    };
    const myobjMap = new Map().set('yes', true).set('no', false);
    console.log('Map转换为对象', setMapToObject(myobjMap)); // Map转换为对象 { yes: true, no: false }

    // 4. 对象转换为Map

    const objToMap = (obj) => {
        let map = new Map();
        for (const k of Object.keys(obj)) {
            map.set(k, obj[k]);
        }
        return map;
    };
    const mymapObj = { yes: true, no: false };
    console.log('对象转为Map', objToMap(mymapObj)); // 对象转为Map Map { 'yes' => true, 'no' => false }

    // 5. Map转换为JSON

    /* 
  Map转为JSON要分为两种情况:

  一种情况是，Map的键名都是字符串，这时可以选择转为对象JSON；
  另一种情况是，Map的键名有非字符串，这时可以选择转为数组JSON

  */
    function strMapToJson (strMap) {
        return JSON.stringify(setMapToObject(strMap));
    }

    let myJsonMap = new Map().set('yes', true).set('no', false);
    console.log('Map转化为JSON', strMapToJson(myJsonMap));
    // '{"yes":true,"no":false}' 

    function mapToArrayJson (map) {
        return JSON.stringify([...map]);
    }

    let myJsonMap2 = new Map().set(true, 7).set({foo: 3}, ['abc']);
    console.log('Map转换为JSON：', mapToArrayJson(myJsonMap2));
    // '[[true,7],[{"foo":3},["abc"]]]'

    // 6. JSON转换为Map

    // JSON 转为 Map，正常情况下，所有键名都是字符串。

    function jsonToStrMap (jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
    }

    jsonToStrMap('{"yes": true, "no": false}');
    // Map {'yes' => true, 'no' => false}

    // 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

    function jsonToMap (jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }

    jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
    // Map {true => 7, Object {foo: 3} => ['abc']}

}

// 4.1 WeakMap
{

    /* 
    WeakMap结构和Map结构区别有两点：

    1. 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
    2. 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
  
  */

}
