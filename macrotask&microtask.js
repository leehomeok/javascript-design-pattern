setImmediate(function(){
  console.log(1);
},0);
setTimeout(function(){
  console.log(2);
},0);
new Promise(function(resolve){
  console.log(3);
  resolve();
  console.log(4);
}).then(function(){
  console.log(5);
});
console.log(6);
process.nextTick(function(){
  console.log(7);
});
console.log(8);
//结果是：3 4 6 8 7 5 2 1
//事件的注册顺序:
//setImmediate - setTimeout - promise.then - process.nextTick

/* 
优先级关系
aync > process.nextTick > promise.then > setTimeout > setImmediate
*/
//V8实现中，两个队列各包含不同的任务：

/*
macrotasks: script(整体代码),setTimeout, setInterval, setImmediate, I/O, UI rendering

microtasks: process.nextTick, Promises, Object.observe, MutationObserver

执行过程如下：
JavaScript引擎首先从macrotask queue中取出第一个任务，
执行完毕后，将microtask queue中的所有任务取出，按顺序全部执行；
然后再从macrotask queue中取下一个，
执行完毕后，再次将microtask queue中的全部取出；
循环往复，直到两个queue中的任务都取完。

作者：何幻
链接：https://www.jianshu.com/p/3ed992529cfc
來源：简书
*/
