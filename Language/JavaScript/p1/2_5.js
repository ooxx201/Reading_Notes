'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('----------------------闭包-------------------');
function sum(arr) {
    return arr.reduce(function (x, y) {
        return x + y;
    });
}

log(sum([1, 2, 3, 4, 5]), 'sum     '); // 15

// 但是，如果不需要立刻求和，而是在后面的代码中，根据需要再计算怎么办？可以不返回求和的结果，而是返回求和的函数！
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}

// 当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：
var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()

// 调用函数f时，才真正计算求和的结果：
log(f(), 'lazy_sum');

// 在这个例子中，我们在函数lazy_sum中又定义了函数sum，
// 并且，内部函数sum可以引用外部函数lazy_sum的参数和局部变量，
// 当lazy_sum返回函数sum时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”
// 当我们调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数：
var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
log(f1 === f2, 'Closure'); // false

// 注意到返回的函数在其定义内部引用了局部变量arr，
// 所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用
// 返回的函数并没有立刻执行，而是直到调用了f()才执行。
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
log(f1(), 'f1'); // 16
log(f2(), 'f2'); // 16
log(f3(), 'f3'); // 16

// 全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。
// 等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。
// 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

// 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，
// 无论该循环变量后续如何更改，已绑定到函数参数的值不变：
function count1() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var results = count1();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

log(f1(), 'f1'); // 1
log(f2(), 'f2'); // 4
log(f3(), 'f3'); // 9

// 这里用了一个“创建一个匿名函数并立刻执行”的语法：
var f = (function (x) {
    return x * x;
})(3); // 9
log(f, 'Anonymous function')

// 理论上讲，创建一个匿名函数并立刻执行可以这么写：
// function (x) { return x * x } (3);
// 但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：
f = (function (x) { return x * x }) (3);
log(f, 'Anonymous function')

// 利用闭包封装一个私有变量
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
log(c1.inc(), 'c1'); // 1
log(c1.inc(), 'c1'); // 2
log(c1.inc(), 'c1'); // 3

var c2 = create_counter(10);
log(c2.inc(), 'c2'); // 11
log(c2.inc(), 'c2'); // 12
log(c2.inc(), 'c2'); // 13

// 在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，并且，从外部代码根本无法访问到变量x。
// 换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。
// 闭包还可以把多参数的函数变成单参数的函数。
// 例如，要计算xy可以用Math.pow(x, y)函数，不过考虑到经常计算x2或x3，我们可以利用闭包创建新的函数pow2和pow3：

function make_pow(n) {
    return function (x) {
        return Math.pow(x, n);
    }
}

// 创建两个新函数:
var pow2 = make_pow(2);
var pow3 = make_pow(3);

log(pow2(5), 'pow2(5)'); // 25
log(pow3(7), 'pow3(7)'); // 343




log('---------------------算术运算-------------------');
// 定义数字0:
var zero = function (f) {
    return function (x) {
        return x;
    }
};

// 定义数字1:
var one = function (f) {
    return function (x) {
        return f(x);
    }
};

// 定义加法:
function add(n, m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
}

// 计算数字2 = 1 + 1:
var two = add(one, one);

// 计算数字3 = 1 + 2:
var three = add(one, two);

// 计算数字5 = 2 + 3:
var five = add(two, three);

// 你说它是3就是3，你说它是5就是5，你怎么证明？

// 呵呵，看这里:

// 给3传一个函数,会打印3次:
(three(function () {
    console.log('print 3 times');
}))();

// 给5传一个函数,会打印5次:
(five(function () {
    console.log('print 5 times');
}))();





