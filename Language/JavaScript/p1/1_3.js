'use strict'
console.log('---------------字符串---------------');
// Escape
console.log('I\'m \"OK\"!');
// ASCII
console.log('\x41');
// Unicode
console.log('\u4e2d\u6587');

console.log('-------------多行字符串---------------');
// Multiline string, use '`'
var s1 = `这是一个
多行
字符串`;
console.log(s1);

console.log('-------------模板字符串---------------');
var name = '小明';
var age = 20;
var message1 = '你好, ' + name + ', 你今年' + age + '岁了!';
console.log(message1);

var message2 = `你好, ${name}, 你今年${age}岁了!`;
console.log(message2);


console.log('-------------字符串操作---------------');
var s = 'Hello, world!';
console.log(s.length);

var s = 'Hello, world!';

s[0]; // 'H'
s[6]; // ' '
s[7]; // 'w'
s[12]; // '!'
s[13]; // undefined 超出范围的索引不会报错，但一律返回undefined
console.log(s[7]);

//字符串是不可变的

var s = 'Hello';
console.log(s.toUpperCase()); // 返回'HELLO'
console.log(s.toLowerCase()); // 返回'hello'

var s = 'hello, world';
console.log(s.indexOf('world')); // 返回7
console.log(s.indexOf('World')); // 没有找到指定的子串，返回-1

var s = 'hello, world'
console.log(s.substring(0, 5)); // 从索引0开始到5（不包括5），返回'hello'
console.log(s.substring(7)); // 从索引7开始到结束，返回'world'