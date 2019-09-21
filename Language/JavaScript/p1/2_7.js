'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------generator--------------------');

function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

var f1 = foo(10);
log([...f1], 'gen1');



function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}

// 测试:
log(fib(5), 'fib(5) '); // [0, 1, 1, 2, 3]
log(fib(10), 'fib(10)'); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// 函数只能返回一次，所以必须返回一个Array。
// 但是，如果换成generator，就可以一次返回一个数，不断返回多次。
function* fib_gen(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}

var fg = fib_gen(5);
log(fg, 'fg(5)'); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}

// 直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它。

// 调用generator对象有两个方法:
//		一是不断地调用generator对象的next()方法：
var f = fib_gen(5);
console.log(f.next()); // {value: 0, done: false}
console.log(f.next()); // {value: 1, done: false}
console.log(f.next()); // {value: 1, done: false}
console.log(f.next()); // {value: 2, done: false}
console.log(f.next()); // {value: 3, done: false}
console.log(f.next()); // {value: undefined, done: true}

// next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。
// 返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
// 当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。

//		第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：
for (var x of fib_gen(10)) {
    log(x, 'fg'); // 依次输出0, 1, 1, 2, 3, ...
}

// generator就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态
function* next_id() {
    var current_id = 0;
    while (true) {
        current_id++;
        yield current_id;
    }
}

// 测试:
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
}


