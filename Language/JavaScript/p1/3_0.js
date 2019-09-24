'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------标准对象--------------------');
// number、string、boolean、function和undefined有别于其他类型。
// null的类型是object，Array的类型也是object，如果我们用typeof将无法区分出null、Array和通常意义上的object——{}。

log(typeof 123); // 'number'
log(typeof NaN); // 'number'
log(typeof 'str'); // 'string'
log(typeof true); // 'boolean'
log(typeof undefined); // 'undefined'
log(typeof Math.abs); // 'function'
log(typeof null); // 'object'
log(typeof []); // 'object'
log(typeof {}); // 'object'

log('---------------------包装对象--------------------');
// number、boolean和string都有包装对象, 包装对象用new创建：
var n = new Number(123); // 123,生成了新的包装类型
var b = new Boolean(true); // true,生成了新的包装类型
var s = new String('str'); // 'str',生成了新的包装类型

// 虽然包装对象看上去和原来的值一模一样，显示出来也是一模一样，但他们的类型已经变为object了！
// 所以，包装对象和原始值用===比较会返回false：
// 所以闲的蛋疼也不要使用包装对象！尤其是针对string类型！！！
log(typeof new Number(123)); // 'object'
log(new Number(123) === 123); // false

log(typeof new Boolean(true)); // 'object'
log(new Boolean(true) === true); // false

log(typeof new String('str')); // 'object'
log(new String('str') === 'str'); // false

log('-------------------without new------------------');
// 如果我们在使用Number、Boolean和String时，没有写new会发生什么情况？
// Number()、Boolean() 和 String()被当做普通函数，把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型）：
var n = Number('123'); // 123，相当于parseInt()或parseFloat()
log(typeof n); // 'number'

var b = Boolean('true'); // true
log(typeof b); // 'boolean'

var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
var b3 = Boolean(''); // false
log(typeof b2);
log(typeof b3);

var s = String(123.45); // '123.45'
log(typeof s); // 'string'

// 不要使用new Number()、new Boolean()、new String()创建包装对象；
// 用parseInt()或parseFloat()来转换任意类型到number；
// 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
// 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
// typeof操作符可以判断出number、boolean、string、function和undefined；
// 判断Array要使用Array.isArray(arr)；
// 判断null请使用myVar === null；
// 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
// 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
// null和undefined没有toString()方法！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。

log('-------------------toString---------------------');
// number对象调用toString()报SyntaxError：
// 123.toString(); // SyntaxError
// 遇到这种情况，要特殊处理一下：
log(123..toString()); // '123', 注意是两个点！
log((123).toString()); // '123'