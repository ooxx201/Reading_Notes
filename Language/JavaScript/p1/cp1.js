if((typeof alert) === 'undefined') {
    global.alert = function(message) {
        console.log('Alert: ' + message);
    }
}
//------------------------------------
var x = 1;

'Hello, world';

var x = 1; var y = 2; // 不建议一行写多个语句!

if (2 > 1) {
    x = 1;
    y = 2;
    z = 3;
}

if (2 > 1) {
    x = 1;
    y = 2;
    z = 3;
    if (x < y) {
        z = 4;
    }
    if (x > y) {
        z = 5;
    }
}

// 这是一行注释
alert('hello'); // 这也是注释


/* 从这里开始是块注释
仍然是注释
仍然是注释
注释结束 */