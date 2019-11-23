

# 6장 함수
* return을 명시하지 않으면 `undefined`값을 반환합니다.

### 호출과 참조
함수 식별자 뒤에 괄호를 쓰면 자바스크립트는 함수를 호출하려 합니다. 괄호를 쓰지 않으면 참조하는 것이며 실행되지 않습니다.
```js
getGreeting(); // 호출하려 합니다.
getGreeting; // 참조하려 합니다.
```

함수를 호출하지 않고 다른 값과 마찬가지로 참조하기만 할 수 있다는 특징은 자바스크립트를 매우 유연한 언어로 만듭니다. 


```js

let o = {
    message : 'c';
}

function f(o){
    o.message = 'a'; // 바깥에 있는 o를  o가 서로 다른 메모리 주소를 가르킨다. 위 o와 아래 o는 주소가 다르다.
    o = { // 기존 o의 메모리 주소를 지우고 새 객체를 할당한다.
        message = 'b'
    };
    console.log(o.message);
}

console.log(o.message);  // c
f(o);                    // b 
console.log(o.message); // a <-- b가 나오지 않는다.
```

이 예제를 이해하는 핵심은 함수 내부의 매개변수 o와 바깥의 변수 o가 다르다는 겁니다. f를 호출하면 둘은 같은 객체를 가르키지만, f 내부에서 o에 할당한 객체는 새로운 전혀 다른 객체입니다. 함수 바깥의 o는 여전히 원래 객체를 가리키고 있습니다.

> 자바스크립트의 원시 값을 값 타입(value type)이라고 말합니다. 원시 값을 전달할 때 값이 복사되기 때문입니다. 객체는 참조 타입(reference type)이라 부릅니다. 객체를 전달할때 두 변수는 같은 객체를 가리키기 때문입니다.


### 매개변수가 함수를 결정하는가?
여러 언어에서 함수의 시그니처에는 매개변수가 포함됩니다.(오버로딩).

...

정해진 매개변수보다 적은 숫자를 할당하면 암시적으로 undefined가 할당 됩니다.

### 매개변수 해체
5장에서 해체 할당에 관해 배웠듯, 매개변수도 해체할 수 있습니다.

```js
function getSentence({subject, verb, object}) {
    return `${subject} ${verb} ${object}`;
}

const o = {
    subject = "I",
    verb = "love",
    object : "Javascript",
}

getSentence(o); // output : "I love javascript"

```

배열도 해체할 수 있습니다.

```js
function getSentence([subject, verb, object]) {
    return `${subject} ${verb} ${object}`;
}

const arr = ["I", "love", "Javascript"];

getSentence(arr); // output : "I love javascript"
```

> ES5에서는 함수 바디 안에서만 존재하는 특별한 변수 ARGUMENTS를 사용해서 확산과 비슷한 일을 할 수 있습니다. ES6에서는 확산 매개변수를 사용해 이런 약점을 해결했으므로 arguments보다 확산 매개변수 `...words`를 쓰는 것이 좋습니다.

### 매개변수 기본값
ES6에서는 기본값을 지정할 수 있습니다.

```js
function(a, b = "default", c=3) {
    return `${a} - ${b} - ${c}`
}

f(); // undefined - default - 3
```

### 객체의 프로퍼티인 함수
객체의 프러퍼티인 함수를 메서드라고 불러서 일반적인 함수와 구별합니다. 함수와 메서드 사이에는 다른 차이도 있는데 그건 나중에 다시 설명합니다.


```js
const o = {
    name : "Wallace", // 원시값 프로퍼티
    bark : function() { // 함수 프로퍼티(메서드)
        return 'woof!';
    }}
```

ES6에서는 간편하게 추가할 수 있습니다.

```js
const o = {
    name : "Wallace", // 원시값 프로퍼티
    bark() { return 'WOOF!';}
```

### this 키워드

this는 일반적으로 객체지향 프로그래밍 개념에 밀접한 연관이 있습니다. 

... 

일반적으로 this는 객체의 프로퍼티인 함수(메서드)에서 의미가 있습니다. 메서드 안에서 this는 호출한 메서드를 소유하는 객체가 됩니다.