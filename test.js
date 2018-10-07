const Fruits = {
    apple: {
        color: 'red',
        taste: 'sour'
    },
    pear: {
        color: 'yello',
        taste: 'sweet'
    },
    citrus: {
        color: 'orange',
        taste: 'sour'
    },
    persimmon: {
        color: 'brown',
        taste: 'sweet'
    },
    grape: {
        color: 'purple',
        taste: 'sweet'
    }
};

const storeA = {
    fruits: {
        apple: {
            nature: Fruits.apple,
            stock: 10,
            price: 1000
        }
    },
    location: [100, 10],
    name: 'a_store',
    size: 10
};

const storeB = {
    fruits: {
        pear: {
            nature: Fruits.apple,
            stock: 10,
            price: 1000
        },
        grape: {
            nature: Fruits.grape,
            stock: 20,
            price: 500
        },
        persimmon: {
            nature: Fruits.persimmon,
            stock: 15,
            price: 2000
        }
    },
    location: [1, 2],
    name: 'b_store',
    size: 40
};

const storeC = {
    fruits: {
        pear: {
            nature: Fruits.apple,
            stock: 10,
            price: 10000
        },
        citrus: {
            nature: Fruits.citrus,
            stock: 20,
            price: 5000
        },
        persimmon: {
            nature: Fruits.persimmon,
            stock: 15,
            price: 20000
        }
    },
    location: [50, 30],
    name: 'c_store',
    size: 105
};

// 생각 나는 대로 코딩
let buyFruit = function (fruit, store) {
    if (store.fruits[fruit]) {
        if (store.fruits[fruit].stock !== 0) {
            store.fruits[fruit].stock -= 1;
            console.log(fruit + '을 구매하였습니다.');
        } else {
            console.log('해당 상점에 충분한 재고가 없습니다');
        }
    } else {
        console.log('해당 상점에는' + fruit + '을 팔지 않습니다');
    }
};

// 문제는 단순히 구매하는 동작인데 읽기가 너무 어렵다
// 먼저 인덴트가 너무 많이 들어가고, else 문이 뒤에 있어서 읽기 힘들다
// if 문이 중첩 되면서 else 가 어디에 연결되는 건지도 확인하기 힘들다

// 따라서 여러가지를 조정할 수 있다.
// 우리의 요구사항에서는 특정 조건이 갖추어지지 않으면 실행하지 않거나, 해당하는 메세지를 보여주기만 하면 된다.
// if else 로 하지말고, if ( 거절 조건 ) 일 경우에 console.log 를 띄우고 return 을 해줘서 함수를 끝내준다
// 함수는 return 문을 만나면 내부 코드를 다 실행하지 않아도 함수가 종료된다
// 따라서 함수의 맨 앞에서는 본래 동작을 하기 전에 체크하려는 비즈니스 로직을 앞에서 체크해주고 본래 로직을 뒤에서 진행하는 것이 좋다.

buyFruit = function (fruit, store) {
    if (!store.fruits[fruit]) {
        return console.log('해당 상점에는' + fruit + '을 팔지 않습니다');
    }
    if (store.fruits[fruit].stock === 0) {
        return console.log('해당 상점에 충분한 재고가 없습니다');
    }

    store.fruits[fruit].stock -= 1;
    console.log(fruit + '을 구매하였습니다.');
};

// 여러개를 사게 될때로 확장한 함수이다
// 체크해야 하는 부분과 stock 을 줄이는 부분이 달라졌다



// 동작 확인 - store a 에서 apple 을 2개 구매

// console.log('store A apple stock', storeA.fruits.apple);
// console.log('');
// buyFruit('apple', 2, storeA);
// console.log('');

// 과제 - 
// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================

// 1. 과일 중에서 신맛 나는 것만 찾는 함수 만들기
const sour_flavor = function() {
    let result = []
    Object.entries(Fruits).forEach(function(fruit,i){
        if (fruit[1].taste == 'sour'){
            result.push(fruit[0])
        }

    }
    )
    console.log(result)
};


// 2. 해당 상점의 평균 과일 가격 구하는 함수 만들기
const avg_price = function(store){
    
    let prices = Object.entries(store.fruits).map(function(fruit) {
        return fruit[1].price
    })
    let total = 0;
    for(let i = 0; i < prices.length; i++) {
        total += prices[i];
    }
    let avg = total / prices.length;
    return avg
}

// 3. 사용자의 현재 위치 (임의값, [x, y]) 를 넣으면 그와 가장 가까이에 있는 상점 알려주는 함수
// 4. 3번에 확장해서 원하는 과일을 넣으면 해당 과일을 파는 가장 가까운 상점 알려주기
// 5. 4번에서 원하는 과일을 넣을 수도 있고, 안넣을 수도 있게 만들기. 즉, 원하는 과일이 있는 경우는 그걸 고려해서 알려주고 원하는 과일이 없으면 그냥 가까운 곳 알려주기
const finder = function(x,y,fruit = 'no') {
    let stores = [storeA,storeB,storeC]
    let infos = stores.map(function(store) {
        store_location = store.location
        distance = Math.sqrt(Math.pow((store_location[0] - x),2) + Math.pow((store_location[1] - y),2))
        return [store, distance]
        
    })
    infos.sort(function(a,b){
        return a[1] - b[1]
    })
    if (fruit == 'no'){
        closest = infos[0][0].name
    }else{
        infos.forEach(function(info){
            if(info[0].fruits[fruit]){
                closest = info[0].name
                return 
            }
        })
    }
    return closest
}
// console.log(finder(1,2,'pear'))



// 6. buy 함수 더 발전시켜서 과일을 하나만 사는게 아니라 과일을 여러개 살 수 있게 만들기, 그리고 과일별로 갯수도 다르게 살 수 있어야 함
// 7. 6번에서 만든 함수에서 총 구매한 가격 리턴해주기
buyFruit = function (order, store) {
    let total = 0
    orders = Object.entries(order)
    orders.forEach(function(each_order){
            if (!store.fruits[each_order[0]]){
                return console.log('해당 상점에는' + each_order[0] + '을 팔지 않습니다');
            }
            if (store.fruits[each_order[0]].stock < each_order[1]) {
                return console.log('해당 상점에 충분한 재고가 없습니다');
            }
            store.fruits[each_order[0]].stock -= each_order[1];
            console.log(each_order[0] + '을 ' + each_order[1] + '개 구매하였습니다.');
            console.log('남은 재고:: ' + store.fruits[each_order[0]].stock + '개 남았습니다'); 
            total +=  store.fruits[each_order[0]].price * each_order[1]
    })
    console.log('총 금액은' + total + '원 입니다.')
};
buyFruit({apple: 1, pear: 2, grape: 3}, storeB)


// object 를 순회하는 방법
// const obj = {
//     a: 1,
//     b: 2,
//     c: 3
// };

// console.log(
//     Object.values(obj), // [1, 2, 3]
//     Object.keys(obj), // ['a', 'b', 'c']
//     Object.entries(obj) // [['a', 1], ['b', 2], ['c', 3]]
// );
