'use strict';

function log(val, msg = '') {
	if (msg === '') {
		console.log('LOG: ' + val);
	} else {
		console.log('LOG.' + msg + ': ' + val);
	}	
}

log('---------------------Date--------------------');
// 在JavaScript中，Date对象用来表示日期和时间。

var now = new Date();
log(now); // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
log(now.getFullYear()); // 2015, 年份
log(now.getMonth()); // 5, 月份，注意月份范围是0~11，5表示六月
log(now.getDate()); // 24, 表示24号
log(now.getDay()); // 3, 表示星期三
log(now.getHours()); // 19, 24小时制
log(now.getMinutes()); // 49, 分钟
log(now.getSeconds()); // 22, 秒
log(now.getMilliseconds()); // 875, 毫秒数
log(now.getTime()); // 1435146562875, 以number形式表示的时间戳

// 当前时间是浏览器从本机操作系统获取的时间，所以不一定准确，因为用户可以把当前时间设定为任何值。
// 如果要创建一个指定日期和时间的Date对象，可以用：
// JavaScript的月份范围用整数表示是0~11，0表示一月，1表示二月……，所以要表示6月，我们传入的是5！
var d = new Date(2015, 5, 19, 20, 15, 30, 123);
log(d); // Fri Jun 19 2015 20:15:30 GMT+0800 (CST)

// 第二种创建一个指定日期和时间的方法是解析一个符合ISO 8601格式的字符串：
var d = Date.parse('2015-06-24T19:49:22.875+08:00');
log(d); // 1435146562875
// 但它返回的不是Date对象，而是一个时间戳。不过有时间戳就可以很容易地把它转换为一个Date：
// 使用Date.parse()时传入的字符串使用实际月份01~12，转换为Date对象后getMonth()获取的月份值为0~11。
var d = new Date(1435146562875);
log(d); // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
log(d.getMonth()); // 5

log('----------------------时区---------------------');
// Date对象表示的时间总是按浏览器所在时区显示的，不过我们既可以显示本地时间，也可以显示调整后的UTC时间：
var d = new Date(1435146562875);
log(d.toLocaleString()); // '2015/6/24 下午7:49:22'，本地时间（太平洋时区-8:00），显示的字符串与操作系统设定的格式有关
log(d.toUTCString()); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时

// 只要我们传递的是一个number类型的时间戳，我们就不用关心时区转换。
// 任何浏览器都可以把一个时间戳正确转换为本地时间。

log('----------------------时间戳---------------------');
// 获取当前时间戳，可以用：
if (Date.now) {
    console.log(Date.now()); // 老版本IE没有now()方法
} else {
    console.log(new Date().getTime());
}

var today = new Date();
log(today);

