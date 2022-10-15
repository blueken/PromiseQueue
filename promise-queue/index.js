
function promiseQueue(promiseArr, concurrentNum){
    
    let result = [];
    //排队中的promise waiting[]
    //运行中的promise running[]
    //完成的promises的values finished[]
    //1.从promiseArr里拿 Math.min(concurrentNum, promiseArr.length) 个promise, 放进running[]
    //2.这些promise如果有结果，就放进finished[], 再从waiting里面取出一个，放进running
    //3.循环2，直到finished跟promiseArr长度一致，放回finished

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