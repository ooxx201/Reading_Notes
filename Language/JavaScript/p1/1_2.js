'use strict'
console.log('---------------字符---------------')
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity
console.log(1.2345e3)

1 + 2; // 3
(1 + 2) * 5 / 2; // 7.5
2 / 0; // Infinity
0 / 0; // NaN
10 % 3; // 1
10.5 % 3; // 1.5
console.log(10.5 % 3)

/*
第一种是==比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是===比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。

由于JavaScript这个设计缺陷，不要使用==比较，始终坚持使用===比较。
*/
false == 0; // true
false === 0; // false

//	另一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己：
//	唯一能判断NaN的方法是通过isNaN()函数：
NaN === NaN; // false
isNaN(NaN); // true

console.log(NaN === NaN)
console.log(isNaN(NaN))

//	浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。
//	要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：
1 / 3 === (1 - 2 / 3); // false
Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true

//	null表示一个“空”的值
//	undefined，表示“未定义”
// 	大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。

console.log('---------------数组---------------')

//	出于代码的可读性考虑，强烈建议直接使用[]
new Array(1, 2, 3); // 创建了数组[1, 2, 3]

var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined

console.log(arr)
console.log(arr[0])
console.log(arr[5])
console.log(arr[6])

console.log('---------------对象---------------')
//	JavaScript的对象是一组由键-值组成的无序集合
//	JavaScript对象的键都是字符串类型，值可以是任意数据类型
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
    city: 'Beijing',
    hasCar: true,
    zipcode: null
};

// 要获取一个对象的属性，我们用对象变量.属性名的方式：
person.name; // 'Bob'
person.zipcode; // null
console.log('Name: ' + person.name)
console.log('Zipcode: ' + person.zipcode)

console.log('---------------变量---------------')
var a; // 申明了变量a，此时a的值为undefined
var $b = 1; // 申明了变量$b，同时给$b赋值，此时$b的值为1
var s_007 = '007'; // s_007是一个字符串
var Answer = true; // Answer是一个布尔值true
var t = null; // t的值是null

var a = 123; // a的值是整数123
a = 'ABC'; // a变为字符串
console.log(a)

console.log('------------strict模式-------------')
// 强制通过var申明变量，未使用var申明变量就使用的，将导致运行错误。
// aaa = 10 error
console.log(aaa)