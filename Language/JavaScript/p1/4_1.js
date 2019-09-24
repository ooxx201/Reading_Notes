'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------create object-----------------------');
// 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，
// 如果没有找到，就到其原型对象上找，
// 如果还没有找到，就一直上溯到Object.prototype对象，
// 最后，如果还没有找到，就只能返回undefined。

// 创建一个Array对象：
var arr = [1, 2, 3];
// 其原型链是：
// arr ----> Array.prototype ----> Object.prototype ----> null
// Array.prototype定义了indexOf()、shift()等方法，因此你可以在所有的Array对象上直接调用这些方法。
log(arr.indexOf(2))