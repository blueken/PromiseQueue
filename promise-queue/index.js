

function promiseQueue(promiseArr, concurrentNum){
    //将所有的逻辑用promise封装起来
    return new Promise((res, rej) => {
        //排队中的promise waiting[]
        //也不用waiting了，直接用一个全局i来在promiseArr中遍历游走即可
        let i = 0;
        //运行中的promise running[]
        let running = [];
        //完成的promises的values finished[]
        let finished = [];
        //1.从promiseArr里拿 Math.min(concurrentNum, promiseArr.length) 个promise, 放进running[]
        //2.这些promise如果有结果，就放进finished[], 再从waiting里面取出一个，放进running
        for(; i<Math.min(concurrentNum, promiseArr.length); ){
            const promise = promiseArr[i++]
            .then(promiseSettled)
            .catch(promiseSettled)
            running.push(promise)
        }
        //3.循环2，直到finished跟promiseArr长度一致，放回finished
        function promiseSettled(v) {
            // if(i >= promiseArr.length) return; //这行有问题，所有的添加到running，不见得都运行完成了
            console.log(`promiseSettled: ${v}`)
            const [idx, result] = v

            // finished[idx] = result; 数组不连续，长度不准确
            finished.push({
                idx,
                result
            })
            //这里是所有promise都settled的地方
            if(finished.length >= promiseArr.length) {
                res(finished);
            } 
            //running 删除对应位置的promise， TODO： 对应位置怎么获取
            //running 的位置没有固定规则，考虑到running在初始化是最多concurrentNum个
            //后面是完成一个，进一个。一个萝卜一个坑，所以，running的长度不重要了
            //再放置一个进去 TODO：下一个位置怎么获取
            //从全局i可以获取下一个promise
    
            if(i >= promiseArr.length) return; //放这里就行了
            const promise = promiseArr[i++]
            .then(promiseSettled)
            .catch(promiseSettled)
            running.push(promise)
        }
    })
}

//test
function genPromise(n){
    return new Promise((res, rej) => {
        const rnd = Math.random();
        setTimeout(rnd > 0.5 ? res : rej, n*1000, [n, `url ${n} ${rnd > 0.5 ? 'successfully' : 'failed'}`]); // 此处改造 onFulfill 和 onReject方法的接受参数为数组
    }).catch(v => v)
}
var promiseArr = [
    genPromise(0),
    genPromise(10),
    genPromise(2),
    genPromise(7),
    genPromise(8),
    genPromise(12),
    genPromise(4)
]
let t = promiseQueue(promiseArr,2)
t.then(v => {
    for(let item of v){
        console.log(`${item.idx} -> ${item.result}`)
    }
})