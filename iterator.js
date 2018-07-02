// 1. Iterator 的概念：遍历器
{


  /* 
  JavaScript 原有的表示“ 集合” 的数据结构， 主要是数组（ Array） 和对象（ Object）， ES6 又添加了Map和Set。 这样就有了四种数据集合， 用户还可以组合使用它们， 定义自己的数据结构， 比如数组的成员是Map， Map的成员是对象。 这样就需要一种统一的接口机制， 来处理所有不同的数据结构。

  遍历器（ Iterator） 就是这样一种机制。 它是一种接口， 为各种不同的数据结构提供统一的访问机制。 任何数据结构只要部署 Iterator 接口， 就可以完成遍历操作（ 即依次处理该数据结构的所有成员）。

  Iterator 的作用有三个： 一是为各种数据结构， 提供一个统一的、 简便的访问接口； 二是使得数据结构的成员能够按某种次序排列； 三是 ES6 创造了一种新的遍历命令for...of循环， Iterator 接口主要供for...of消费。

  Iterator 的遍历过程是这样的。

  （ 1） 创建一个指针对象， 指向当前数据结构的起始位置。 也就是说， 遍历器对象本质上， 就是一个指针对象。

  （ 2） 第一次调用指针对象的next方法， 可以将指针指向数据结构的第一个成员。

  （ 3） 第二次调用指针对象的next方法， 指针就指向数据结构的第二个成员。

  （ 4） 不断调用指针对象的next方法， 直到它指向数据结构的结束位置。

  每一次调用next方法， 都会返回数据结构的当前成员的信息。 具体来说， 就是返回一个包含value和done两个属性的对象。 其中， value属性是当前成员的值， done属性是一个布尔值， 表示遍历是否结束。
  
  
  */

  var it = makeIterator(['a', 'b']);

  it.next() // { value: "a", done: false }
  it.next() // { value: "b", done: false }
  it.next() // { value: undefined, done: true }

  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function () {
        return nextIndex < array.length ? {
          value: array[nextIndex++],
          done: false
        } : {
          value: undefined,
          done: true
        };
      }
    };
  }

}

// 2. 默认Iterator接口
{

  /* 
  Iterator接口的目的就是为了所有的数据结构，提供一种统一的访问机制，也就是for...of...循环。当使用for...of...循环遍历某种数据结构的时候，该循环会自动去寻找Iterator接口。

  一种数据结构，只要部署了Iterator接口，我们就称这种数据结构是可遍历的

  ES6规定， 默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说， 一个数据结构只要具有Symbol.iterator属性， 就可以认为是“ 可遍历的”（ iterable）。 Symbol.iterator属性本身是一个函数， 就是当前数据结构默认的遍历器生成函数。 执行这个函数， 就会返回一个遍历器。 至于属性名Symbol.iterator， 它是一个表达式， 返回Symbol对象的iterator属性， 这是一个预定义好的、 类型为 Symbol 的特殊值， 所以要放在方括号内
  
  遍历器对象:  该对象的根本特征就是具有next方法。
  */
  
  {
    const obj = {
      // 设计自己的遍历器，必须next函数中返回{value，done}结构
      [Symbol.iterator]: () => {
        let index = 0;
        return {
          next: () => {
            if (index > 5) {
              return {
                value: undefined,
                done: true
              }
            } else {
              return {
                value: index++,
                done: false
              }
            }
          }
        }

      }
    }

    for (const iterator of obj) {
      console.log(iterator)
    }

    /* 
    上面代码中， 对象obj是可遍历的（ iterable）， 因为具有Symbol.iterator属性。 执行这个属性， 会返回一个遍历器对象。 该对象的根本特征就是具有next方法。 每次调用next方法， 都会返回一个代表当前成员的信息对象， 具有value和done两个属性。
    
    */
    

    /* 
    
    ES6 的有些数据结构原生具备 Iterator 接口（ 比如数组）， 即不用任何处理， 就可以被for...of循环遍历。 原因在于， 这些数据结构原生部署了Symbol.iterator属性（ 详见下文）， 另外一些数据结构没有（ 比如对象）。 凡是部署了Symbol.iterator属性的数据结构， 就称为部署了遍历器接口。 调用这个接口， 就会返回一个遍历器对象。

    原生具备 Iterator 接口的数据结构如下。

    Array
    Map
    Set
    String
    TypedArray
    函数的 arguments 对象
    NodeList 对象

    */
    
    /* 
    
    对于原生部署 Iterator 接口的数据结构， 不用自己写遍历器生成函数，
    for...of循环会自动遍历它们。 除此之外， 其他数据结构（ 主要是对象） 的 Iterator 接口， 都需要自己在Symbol.iterator属性上面部署， 这样才会被for...of循环遍历。

    对象（ Object） 之所以没有默认部署 Iterator 接口， 是因为对象的哪个属性先遍历， 哪个属性后遍历是不确定的， 需要开发者手动指定。 本质上， 遍历器是一种线性处理， 对于任何非线性的数据结构， 部署遍历器接口， 就等于部署一种线性转换。 不过， 严格地说， 对象部署遍历器接口并不是很必要， 因为这时对象实际上被当作 Map 结构使用， ES5 没有 Map 结构， 而 ES6 原生提供了。

    一个对象如果要具备可被for...of循环调用的 Iterator 接口， 就必须在Symbol.iterator的属性上部署遍历器生成方法（ 原型链上的对象具有该方法也可）。

    */
    

    // 类部署Iterator接口的写法
    {
      class RangeIterator{
        constructor(start, stop) {
          this.value = start;
          this.stop = stop
        }

        [Symbol.iterator]() {
          return this
        }

        next() {
          let val = this.value;
          if (val < this.stop) {
            this.value++;
            return {
              value: this.value,
              done: false
            }
          } else {
            return {
              value: undefined,
              done: true
            }
          }
        }
      }

      const gen = new RangeIterator(0, 10)

      for (const iterator of gen) {
        console.log(iterator)
      }
    }


    // 为对象添加Iterator接口的例子
    {
      let obj = {
        data: ['hello', 'world'],
        [Symbol.iterator]() {
          const self = this
          let index = 0
          return {
            next() {
              if (index < self.data.length) {
                return {
                  value: self.data[index++],
                  done: false
                }
              } else {
                return {
                  value: undefined,
                  done: true
                }
              }
            }
          }
        }
      }

      // test case
      for (const iterator of obj) {
        console.log(iterator)
        // hello world
      }
    }


    // 类数组对象部署Iterator接口
    {
      /* 
      对于类似数组的对象（ 存在数值键名和length属性）， 部署 Iterator 接口， 有一个简便方法， 就是Symbol.iterator方法直接引用数组的 Iterator 接口。

      NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
      // 或者
      NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

      [...document.querySelectorAll('div')] // 可以执行了
      NodeList 对象是类似数组的对象， 本来就具有遍历接口， 可以直接遍历。 上面代码中， 我们将它的遍历接口改成数组的Symbol.iterator属性， 可以看到没有任何影响。

      */
      // 下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子。

      let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
      };
      for (let item of iterable) {
        console.log(item); // 'a', 'b', 'c'
      }

      // 注意， 普通对象部署数组的Symbol.iterator方法， 并无效果。

      let iterable2 = {
        a: 'a',
        b: 'b',
        c: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
      };
      for (let item of iterable2) {
        console.log(item); // undefined, undefined, undefined
      }
    }
    // Iterator接口没有部署生成器函数
    {
      // 如果Symbol.iterator方法对应的不是遍历器生成函数（ 即会返回一个遍历器对象）， 解释引擎将会报错。

      var object = {};

      object[Symbol.iterator] = () => 1;

      // [...object] // TypeError: [] is not a function
      // 上面代码中，变量object的 Symbol.iterator方法对应的不是遍历器生成函数， 因此报错。
    }
  }

}

// 3. 调用Iterator接口的场合：除for...of...之外，还有其他场景会默认调用Iterator接口
{
  // 1. 解构赋值
  {
    
  }
  // 2. 扩展运算符
  {

    /* 
    实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

    let arr = [...iterable];
    */
    
  }

  // yield*: yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
  {
    let generator = function* () {
      yield 1;
      yield* [2, 3, 4];
      yield 5;
    };

    var iterator = generator();

    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }

  }

  // 其他场合
  {
    /* 
    由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

    for...of
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    Promise.all()
    Promise.race()
    */
  }

}

// 4. 字符串的Iterator接口
{
  /* 
  字符串是一个类似数组的对象，也原生具有 Iterator 接口。
  */
  
  console.log('------string');

  {
    let str = 'hi'
    console.log(typeof str[Symbol.iterator]);
    let iterator = str[Symbol.iterator]();

    console.log(iterator.next() ) // { value: "h", done: false }
    console.log(iterator.next() ) // { value: "i", done: false }
    console.log(iterator.next() ) // { value: undefined, done: true }
  }

  //  可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。
  {
    var str = new String("hi");

    console.log([...str]) // ["h", "i"]

    str[Symbol.iterator] = function () {
      return {
        next: function () {
          if (this._first) {
            this._first = false;
            return { value: "bye", done: false };
          } else {
            return { done: true };
          }
        },
        _first: true
      };
    };

    console.log([...str]) // ["bye"]
    console.log(str) // "hi"
  }

}

// 5. Iterator接口和Generator函数
{
// Symbol.iterator方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
  {
    let myIterator = {
      [Symbol.iterator]: function *() {
        yield 1;
        yield 2;
        yield 3;
      }
    }
    console.log([...myIterator]);
  }

  {
    let obj = {
      *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    }

    for (const x of obj) {
      console.log(x);
    }
  }

  /* 上面代码中，Symbol.iterator方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。 */

}

// 6. 遍历器对象的return(), throw()
{
  /* 
  遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
  
  */
  
  {
    /* 
    return方法的使用场合是，如果for ...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
    */
    
    const readLinesSync = file => {
      return {
        [Symbol.iterator]() {
          return {
            next(){
              return { done: false}
            },
            return() {
              file.close()
              return { done: true }
            }
          }
        }
      }
    }

    /* 
    上面代码中，函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next方法，还部署了return方法。下面的三种情况，都会触发执行return方法。

    // 情况一
    for (let line of readLinesSync(fileName)) {
      console.log(line);
      break;
    }

    // 情况二
    for (let line of readLinesSync(fileName)) {
      console.log(line);
      continue;
    }

    // 情况三
    for (let line of readLinesSync(fileName)) {
      console.log(line);
      throw new Error();
    }
    上面代码中，情况一输出文件的第一行以后，就会执行return方法，关闭这个文件；情况二输出所有行以后，执行return方法，关闭该文件；情况三会在执行return方法关闭文件之后，再抛出错误。

    注意，return方法必须返回一个对象，这是 Generator 规格决定的。

    throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。
    
    
    */
  }

}

// 7. for...of...循环
{
  /* 
  ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。

  一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

  for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
  
  */
  
  // 数组
  {
    const arr = ['red', 'green', 'silver', 'yellow']
    for (const x of arr) {
      console.log(x);
    }

    // for...of..循环可以代替数组实例的forEach方法

    // JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。
    
    for (let a in arr) {
      console.log(a);
    }

    for (const b of arr) {
      console.log(b);
    }

  /*   for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。 */

    let arr2 = [3, 5, 7];
    arr2.foo = 'hello';

    for (let i in arr2) {
      console.log(i); // "0", "1", "2", "foo"
    }

    for (let i of arr2) {
      console.log(i); //  "3", "5", "7"
    }
    // 上面代码中，for...of循环不会返回数组arr的foo属性。
    
  }

  // Set 和 Map 结构
  {

    // Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。

    var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
    for (var e of engines) {
      console.log(e);
    }
    // Gecko
    // Trident
    // Webkit

    var es6 = new Map();
    es6.set("edition", 6);
    es6.set("committee", "TC39");
    es6.set("standard", "ECMA-262");
    for (var [name, value] of es6) {
      console.log(name + ": " + value);
    }
    // edition: 6
    // committee: TC39
    // standard: ECMA-262
/*     上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。 */

    let map = new Map().set('a', 1).set('b', 2);
    for (let pair of map) {
      console.log(pair);
    }
    // ['a', 1]
    // ['b', 2]

    for (let [key, value] of map) {
      console.log(key + ' : ' + value);
    }
// a : 1
// b : 2

  }

  // 计算生成的数据结构
  {

    /*     
    有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。

    - entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
    - keys() 返回一个遍历器对象，用来遍历所有的键名。
    - values() 返回一个遍历器对象，用来遍历所有的键值。
    这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。 
    
    */

    let arr = ['a', 'b', 'c'];
    for (let pair of arr.entries()) {
      console.log(pair);
    }
    // [0, 'a']
    // [1, 'b']
    // [2, 'c']
  }

  // 类似数组的对象： DOM NodeList, arguments, 字符串
  {

    // 字符串
    let str = 'hello';
    for (const s of str) {
      console.log(s);
    }

    // DOM NodeList对象

    /* 
    let paras = document.querySelectorAll("p");

    for (let p of paras) {
      p.classList.add("test");
    } 
    */

    // arguments对象
    function printArgs() {
      for (let x of arguments) {
        console.log(x);
      }
    }
    printArgs('a', 'b');
    // 'a'
    // 'b'

    
    // 对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符

    for (const x of 'a\uD83D\uDC0A') {
      console.log(x);
    }


    /* 
    并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
    
    */
    
    let arrayLike = { length: 2, 0: 'a', 1: 'b' };

    // 报错: TypeError: arrayLike is not iterable
    /*     
    
    for (let x of arrayLike) {
      console.log(x);
    } 
    
    */

    // 正确
    for (let x of Array.from(arrayLike)) {
      console.log(x);
    }

  }

  // 对象
  {

    /* 
    对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
    */

    let es6 = {
      edition: 6,
      committee: "TC39",
      standard: "ECMA-262"
    };

    for (let e in es6) {
      console.log(e);
    }
    // edition
    // committee
    // standard

    /* 

    for (let e of es6) {
      console.log(e);
    } 

    */
    // TypeError: es6[Symbol.iterator] is not a function


    // 解决上述for...of...无法遍历对象问题的思路如下

    // 1. 使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组


    for (const key of Object.keys(es6)) {
      console.log(key, ':', es6[key]);
    }

    // 2. 使用 Generator 函数将对象重新包装一下。

    const entries = function *(obj) {
      for (const key of Object.keys(obj)) {
        yield [key, obj[key]]
      }
    }

    for (const [key, val] of entries(es6)) {
      console.log(key, '->', val);
    }
  }

  // 和其他遍历语法的比较： for, for...in... , forEach, for...of...
  {
    /* 
    以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是for循环。

    for (var index = 0; index < myArray.length; index++) {
      console.log(myArray[index]);
    }
    这种写法比较麻烦，因此数组提供内置的forEach方法。

    myArray.forEach(function (value) {
      console.log(value);
    });
    这种写法的问题在于，无法中途跳出forEach循环，break命令或return命令都不能奏效。

    for...in循环可以遍历数组的键名。

    for (var index in myArray) {
      console.log(myArray[index]);
    }
    for...in循环有几个缺点。

    数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。
    for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
    某些情况下，for...in循环会以任意顺序遍历键名。
    总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

    for...of循环相比上面几种做法，有一些显著的优点。

    for (let value of myArray) {
      console.log(value);
    }
    有着同for...in一样的简洁语法，但是没有for...in那些缺点。
    不同于forEach方法，它可以与break、continue和return配合使用。
    提供了遍历所有数据结构的统一操作接口。
    下面是一个使用 break 语句，跳出for...of循环的例子。

    for (var n of fibonacci) {
      if (n > 1000)
        break;
      console.log(n);
    }
    上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用break语句跳出for...of循环。
        
        
    
    */


  }
}