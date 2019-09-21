'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('--------------------Arrow Function-------------------');
x => x * x;
// 上面的箭头函数相当于：
(function (x) {
    return x * x;
})(3)

// 只包含一个表达式，连{ ... }和return都省略掉了。
x => x * x;

// 包含多条语句，这时候就不能省略{ ... }和return：
x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}

// 如果参数不是一个，就需要用括号()括起来：
// 两个参数:
var f1 = (x, y) => x * x + y * y
log(f1(2,3), 'f1')

// 无参数:
var f2 = () => 3.14
log(f2(), 'f2')

// 可变参数:
var f3 = (x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
log(f3(1,2,3,4,5,6,7,8,9,10), 'f3')

// 如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：
// SyntaxError:
// x => { foo: x }

// 因为和函数体的{ ... }有语法冲突，所以要改为：
// ok:
var f4 = x => ({ foo: x })
log(f4(10), 'f4')

log('-------------------------this------------------------');
// 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：
// 箭头函数内部的this是词法作用域，由上下文确定。
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
// log(obj.getAge())
// 现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj：
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
log(obj.getAge()); // 25

// 由于this在箭头函数中已经按照词法作用域绑定了，所以，
// 用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
log(obj.getAge(2015), 'arrow_call'); // 25


var arr = [10, 20, 1, 2];
arr.sort((x, y) => {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
log(arr, 'arrow_sort'); // [1, 2, 10, 20]
