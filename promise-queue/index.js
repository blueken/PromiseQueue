
function promiseQueue(promiseArr, concurrentNum){
    //return allPromiseResults
    let result = [];
    result = Promise.allSettled(promiseArr)
    return result;
}

//test
function genPromise(n){
    return new Promise((res, rej) => {
        setTimeout(res, n*100, n);
    })
}
var promiseArr = [
    genPromise(2),
    genPromise(1),
    genPromise(3)
]
let t = promiseQueue(promiseArr)
console.dir(t)