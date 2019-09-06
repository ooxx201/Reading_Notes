console.log('-----------------Definition---------------');
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

console.log(abs(-3));

// 按照完整语法需要在函数体末尾加一个;，表示赋值语句结束
var abs1 = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};

console.log(abs1(-3));

// 由于JavaScript允许传入任意个参数而不影响调用，
// 因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数
console.log(abs(10, 'blablabla')); // 返回10
console.log(abs(-9, 'haha', 'hehe', null)); // 返回9

// 传入的参数比定义的少也没有问题
console.log(abs()); // 返回NaN

// 此时abs(x)函数的参数x将收到undefined，计算结果为NaN
// 要避免收到undefined，可以对参数进行检查
function abs2(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

try {
	abs2();
}
catch(e) {
  console.log(e);
  // expected output: "Not a number"
}

console.log('-----------------Arguments----------------');

// 关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。
// arguments类似Array但它不是一个Array
function foo(x) {
    console.log('x = ' + x); // 10
    for (var i=0; i<arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);

// 利用arguments，你可以获得调用者传入的所有参数。
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

console.log(abs()); // 0
console.log(abs(10)); // 10
console.log(abs(-9)); // 9

// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo1(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}


console.log('-----------------Rest---------------------');
// rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest
function foo2(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
foo2(1, 2, 3, 4, 5);
foo2(1);

console.log('\n');
function foo3(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo3(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo3(1);
// 结果:
// a = 1
// b = undefined
// Array []

console.log('-----------------Return-------------------');
// JavaScript引擎有一个在行末自动添加分号的机制, 
function foo4() {
    return { name: 'foo4' };
}
console.log(foo4()); // { name: 'foo' }

function foo5() {
    return
        { name: 'foo5' };
}
console.log(foo5()); // undefined

// JavaScript引擎在行末自动添加分号的机制，上面的代码实际上变成了：
function foo6() {
    return; // 自动添加了分号，相当于return undefined;
        { name: 'foo6' }; // 这行语句已经没法执行到了
}
console.log(foo6());

// 正确的多行写法
function foo7() {
    return { // 这里不会自动加分号，因为{表示语句尚未结束
        name: 'foo7'
    };
}
console.log(foo7());
