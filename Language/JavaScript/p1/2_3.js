'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}


log('------------------方法----------------');
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
xiaoming.age; // function xiaoming.age()
log(xiaoming.age()); // 今年调用是25,明年调用就变成26了

// 要保证this指向正确，必须用obj.xxx()的形式调用！
// 不在对象中绑定的话，在strict模式下让函数的this指向undefined
// var fn = xiaoming.age;
// fn(); // Uncaught TypeError: Cannot read property 'birth' of undefined


// this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向undefined了！
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

// xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined

// 修复的办法，用一个that变量首先捕获this：
// 用var that = this;，就可以放心地在方法内部定义其他函数
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};

log(xiaoming.age()); // 25


log('------------------apply----------------');
// 指定函数的this指向哪个对象，可以用函数本身的apply方法。
// 它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

var age;
age = xiaoming.age(); // 25
log(age, 'Method')
age = getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
log(age, 'Apply ')


log('------------------call----------------');
// apply()把参数打包成Array再传入；
// call()把参数按顺序传入。
// 对普通函数调用，我们通常把this绑定为null。
var max;
max = Math.max.apply(null, [3, 5, 4]); // 5
log(max, 'Apply')
Math.max.call(null, 3, 5, 4); // 5
log(max, 'Call ')

log('-----------------装饰器----------------');
// JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。
// 统计一共调用了多少次parseInt()
var count = 0;
var oldParseInt = parseInt; // 保存原函数

parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};

parseInt('10');
parseInt('20');
parseInt('30');
log('count = ' + count); // 3
