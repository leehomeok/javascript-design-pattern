function createPromise(time) {
  return new Promise((resolve, reject) =>{
    setTimeout(()=> {
      resolve()
    }, time)
  })
}

let pOuter = createPromise(2000);
pOuter.then(()=> {
  let p1 = createPromise(2000);
  let p2 = createPromise(3000);
  let p3 = Promise.all([p1, p2]).then(()=> {
    return 'dd'
    /*执行到这里结束，返回dd */
  }).catch((v) =>{
    console.log('aa:' + v)
  })
  return p3
}).then((val)=> {
  console.log('cc' + val)
})