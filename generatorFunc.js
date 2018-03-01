// const gen = function* (name) {
// 	yield 'hello'
// 	yield 'world'
// 	return 'ending'
// }

// console.log(gen())
// console.log(gen().next())

// function name(params) {
// 	'he'
// 	console.log('ds')
// }

// name()

// ?生成器函数结合箭头函数怎么写
// const getObjectEntries = function *(obj){
//     const propsKeys = Reflect.ownKeys(obj)
//     for (const propsKey of propsKeys) {
//         yield [propsKey, obj[propsKey]]
//     }
// }

// const jane = {
//     first: 'Jane',
//     second: 'Dne'
// }

// for (const [key,val] of getObjectEntries(jane)) {
//     console.log(`${key}:${val}`)
// }

// yield && yield*

function * bar () {
    yield 'a';
    yield 'b';
}

function * foo () {
    yield 'x';
    yield* bar();
    yield 'y';
}

console.log(...foo());

// yield* works roughly as follows

function * bar2 () {
    yield 'a';
    yield 'b';
}

function * foo2 () {
    yield 'x';
    // Scenario one 
    for (const iter of bar2()) {
        yield iter;
    }
    // Scenario two
    yield* ['of', 'yield'];
    yield 'y';
    console.log('dsds');
}

console.log(...foo2());

// yield* considers end-of-iteration values

function* getFucWithReturn() {
    yield 'a';
    yield 'b';
    return 'the result';
}

function* logReturned(genObj) {
    const result = yield* genObj;
    console.log(result);
}

console.log([...logReturned(getFucWithReturn()),'c','d']);
