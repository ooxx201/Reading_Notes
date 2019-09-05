'use strict'
console.log('---------------数组---------------')

var arr = [1, 2, 3.14, 'Hello', null, true];
console.log(arr.length); // 6

console.log('# 直接给Array的length赋一个新的值会导致Array大小的变化');
var arr = [1, 2, 3];
console.log(arr);
arr.length; // 3
arr.length = 6;
arr[4] = 5
console.log(arr); // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
console.log(arr); // arr变为[1, 2]

console.log('# Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array');
var arr = ['A', 'B', 'C'];
arr[1] = 99;
console.log(arr); // arr现在变为['A', 99, 'C']

console.log('# 如果通过索引赋值时，索引超过了范围，同样会引起Array大小的变化')
var arr = [1, 2, 3];
arr[5] = 'x';
console.log(arr); // arr变为[1, 2, 3, undefined, undefined, 'x']

