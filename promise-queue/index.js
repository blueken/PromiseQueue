
function promiseQueue(promiseArr, concurrentNum){
    
    //排队中的promise waiting[]
    //也不用waiting了，直接用一个全局i来在promiseArr中遍历游走即可
    let i = 0;
    //运行中的promise running[]
    let running = [];
    //完成的promises的values finished[]
    let finished = [];
    //1.从promiseArr里拿 Math.min(concurrentNum, promiseArr.length) 个promise, 放进running[]
    //2.这些promise如果有结果，就放进finished[], 再从waiting里面取出一个，放进running
    for(; i<Math.min(concurrentNum, promiseArr.length); i++){
        const promise = promiseArr[i]
        .then(v => {
            const [idx, result] = v
            finished[idx] = result;
            //running 删除对应位置的promise， TODO： 对应位置怎么获取
            //running 的位置没有固定规则，考虑到running在初始化是最多concurrentNum个
            //后面是完成一个，进一个。一个萝卜一个坑，所以，running的长度不重要了
            //再放置一个进去 TODO：下一个位置怎么获取
            //从全局i可以获取下一个promise
            running.push(promiseArr[i++])
        })
        .catch(v => {
            const [idx, result] = v
            finished[idx] = result; 
            //running 删除对应位置的promise， TODO： 对应位置怎么获取
            //running 的位置没有固定规则，考虑到running在初始化是最多concurrentNum个
            //后面是完成一个，进一个。一个萝卜一个坑，所以，running的长度不重要了
            //再放置一个进去 TODO：下一个位置怎么获取
            //从全局i可以获取下一个promise
            running.push(promiseArr[i++])
        })
        running.push(promise)
    }
    //3.循环2，直到finished跟promiseArr长度一致，放回finished

    return finished;
}

//test
function genPromise(n){
    return new Promise((res, rej) => {
        const rnd = Math.random();
        setTimeout(rnd > 0.5 ? res : rej, n*100, [n, `url${n}`]); // 此处改造 onFulfill 和 onReject方法的接受参数为数组
    })
}
var promiseArr = [
    genPromise(0),
    genPromise(1),
    genPromise(2)
]
let t = promiseQueue(promiseArr)
console.dir(t)