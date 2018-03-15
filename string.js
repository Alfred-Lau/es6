// TODO: 1.1 字符的Unicode表示法

{
    // js允许采用\uxxxx形式表示一个字符串,其中xxxx 表示字符的Unicode编码。但是，这种表示方法只能表示\u0000-\uffff之间的字符。超出这个范围的字符，必须使用两个双字节的形式表示
    console.log('\u0000', '- -', '\uffff');

    // es6的改进：将编码放到{}之间
    console.log('\u{20bb7}');
    // 竟然可以直接字符串中混写
    console.log('hell\u{6f}');
    console.log('\u{1F680}' === '\uD83D\uDE80');
    // true
    // 上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF - 16 编码是等价的。

}

// TODO: 2.1 codePointAt()的使用：
{
    // JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
    let s = '𠮷';
    console.log(s.length);

    // 取得字符
    console.log('ak'.charAt(0));
    // 取得字符编码
    console.log('ak'.charCodeAt(0));

    // --------------
    let s02 = '𠮷a';
    /* 
  codePointAt方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的20BB7）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt方法的结果与charCodeAt方法相同。 */
    console.log(s02.codePointAt(0).toString(16)); // "20bb7"
    console.log(s02.codePointAt(1)); // 57271
    console.log(s02.codePointAt(2).toString(16)); // "61"

    /* 
  你可能注意到了，codePointAt方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。
  
  */

    for (const val of s02) {
        console.log(val.codePointAt(0).toString(16));
    }

    // codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

    function is32Bit (c) {
        return c.codePointAt(0) > 0xFFFF;
    }

    is32Bit('𠮷'); // true
    is32Bit('a'); // false

}

// TODO: 3.1 String.fromCodePoint():改良了es5的String.fromCharCode(0x20BB7)

{
    // 注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。
    let s = '𠮷a';
    console.log(String.fromCodePoint(0x20bb7));

}

// TODO: 4.1 字符串的遍历器接口:可以被for...of循环遍历
{
    // 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
    let text = String.fromCodePoint(0x20BB7);

    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }
    // " "
    // " "

    for (let i of text) {
        console.log(i);
    }
// "𠮷"
}

// TODO: 5.1 at()的使用
{
    // 还是提案， 可以通过垫片库实现
}

// TODO: 6.1 normalize()的使用
{
    // Unicode正规化，有什么使用场景？

}

// TODO: 7.1 includes(), startsWith(), endsWith()
{
    /* 

  传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

  - includes()：返回布尔值，表示是否找到了参数字符串。
  - startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
  - endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
  
  这三个方法都支持第二个参数，表示开始搜索的位置。

  let s = 'Hello world!'

  s.startsWith('world', 6) // true
  s.endsWith('Hello', 5) // true
  s.includes('Hello', 6) // false
  
  上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

  */

}

// TODO: 8.1 repeat()的使用：返回一个全新的字符串
{
    /* 
  
  - 参数如果是小数，会被取整 
  - 参数如果是负数或者Infinity，会报错
  - 如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
  - 如果repeat的参数是字符串，则会先转换成数字。
  - 参数NaN等同于0
  
  */

    let seed = 'koa';
    console.log(seed.repeat(2));

}

// TODO: padStart(), padEnd()：均接受两个参数，第一个用来指定字符串的最小长度，第二个参数是用来补全的字符串
{
    /* 
  
  - 如果原字符串的长度等于或者大于指定的最小长度，则返回原字符串
  - 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
  - 如果省略第二个参数，默认使用空格补全长度
  
  */
    let s = 'world';
    // 头部补齐
    let res = s.padStart(10, 'a');
    console.log(res);
    // 尾部补齐
    console.log(s.padEnd(10, 'b'));

    /* 
  
  padStart的常见用途：为数值补全指定位数；提示字符串格式
  
  */

    let str01 = '1'.padStart(10, '0');

    let str02 = '09-12'.padStart(10, 'YYYY-MM-DD');

    console.log(str01, str02);

}

// TODO: matchAll()的使用
{

    // 返回一个正则表达式在当前字符串的所有匹配
    let target = 'hello,world!koa,hello';
    // let matchArr = target.matchAll(/hello/)
    // console.log(matchArr)

}

// TODO:模板字符串
{

    /* 
  
  - 当做普通字符串
  - 定义多行字符串
  - 在字符串中嵌入变量
  
  */

    let val = 100;
    let normalStr = `i am normal`;
    let multStr = `I am
    multible`;
    let usage = `this is general ${val} : the time is ${(new Date()).toDateString()}`;
    console.log(normalStr, multStr, usage);

    /* 

  - 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
  - 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
  
  */

    // 转义
    let greeting = `\`Yo\`,world`;
    console.log(greeting);

    // TODO: 
    /* 
  
  - 使用jsdom结合jQuery在nodejs之中使用jQuery操作html文件
  - trim方法处理掉空格和缩进:trim,trimLeft,trimRight,可以直接跟在模板字符串后面
  
  */
    const { JSDOM } = require('jsdom');

    JSDOM.fromFile('./index.html').then(dom => {
        let $ = require('jquery')(dom.window);

        // 注意：不太可能把jsom的内容写回到HTML之中
        $('.root').html(`
        <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
        </ul>
        `);
        console.log($('.root').html());
        $('.root').html(`
        <ul>
            <li>first</li>
            <li>second</li>
            <li>third</li>
        </ul>
        `.trim());
        console.log($('.root').html());
    });

    /* 
  
  模板字符串的变量大括号之中可以放入任意的JavaScript表达式：
  - 可以进行运算
  - 引用对象属性
  - 调用函数
  - 如果大括号之中的值不是字符串，将按照一般的规则转换为字符串。比如，大括号之中是一个对象，将默认调用对象的toString方法
  - 如果模板字符串中的变量没有声明，将报错
  - 如果大括号内部是一个字符串，将会原样输出
  - 模板字符串还可以嵌套
  - 如果需要引用模板字符串本身，需要这样处理
  
  */

    let x = 1;
    let y = 2;
    let obj = { a: 5, d: 5 };
    // 可以感觉出来console.log()的异步，下面的一句反而比较快执行结束
    console.log(`${x + 3}${y + obj.a}`);
    const fn = () => 'hello';
    console.log(`${fn()}`);
    console.log(`${{ s: 1 }}`);
    console.log(`${'he'}`);

    const tmpl = addrs => `
  <table>
  ${addrs
        .map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `)
        .join('')}
  </table>
`;
    // 上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。

    const data = [
        {
            first: '<Jane>',
            last: 'Bond'
        }, {
            first: 'Lars',
            last: '<Croft>'
        }
    ];

    console.log(tmpl(data));
    // <table>

    // 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。

    // 写法一
    let str = 'return `Hello ${name}!`';
    let func = new Function('name', str);
    console.log(func('Jack')); // "Hello Jack!"

    // 写法二
    let str02 = '(name) => `Hello ${name}!`';
    let func02 = eval.call(null, str02);
    console.log(func02('Jack')); // "Hello Jack!"

}

// TODO:标签模板
{
    /* 
  
  - 模板字符串的功能，不仅仅是上面那些。它可以跟在一个函数名后面，该函数将被用来处理这个模板字符串。
  - 标签模板其实不是模板， 而是函数调用的一种特殊形式。“ 标签” 指的就是函数， 紧跟在后面的模板字符串就是它的参数。
  - 如果模板字符里面有变量， 就不是简单的调用了， 而是会将模板字符串先处理成多个参数， 再调用函数。
  - 函数的第一个参数是一个数组， 该数组的成员是模板字符串中那些没有变量替换的部分， 也就是说， 变量替换只发生在数组的第一个成员与第二个成员之间、 第二个成员与第三个成员之间， 以此类推。

  
  */
    // 标签模板的作用

    /* 
  
  - 标签模板的一个重要作用就是过滤HTML字符串
  - 另一个应用是多语言转换（国际化处理）
  - 模板字符串本身并不能取代 Mustache 之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。

  */

    let sender = '<script>alert("abc")</script>'; // 恶意代码
    let target = SaferHTML`<p>${sender} has sent you a message.</p>`;

    function SaferHTML (templateData) {
        let s = templateData[0];
        for (let i = 1; i < arguments.length; i++) {
            let arg = String(arguments[i]);

            // Escape special characters in the substitution.
            s += arg.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            // Don't escape special characters in the template.
            s += templateData[i];
        }
        return s;
    }

    console.log(target);

    // 国际化处理

    //   i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
    // "欢迎访问xxx，您是第xxxx位访问者！"

}

// TODO:String.raw():原生String对象的方法
{
    /* 
  
  -String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
  
  */
    let raw = String.raw({ raw: 'test' }, 0, 1, 2);
    console.log(raw);

}

// TODO: 模板字符串的限制
{
    /* 

  前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。

  */
}
