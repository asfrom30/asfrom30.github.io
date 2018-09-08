> 자바스크립트를 깨우치다에서 8장 함수의 프로토타입만 발췌

# 프로토 타입 체이닝 
자바스크립트는 Function() 인스턴스에 자동으로 prototype이라는 속성을 만든다. 구체적으로 말하자면 prototype 속성은 **new 키워드와 생성자 함수를 같이 사용해서 만든 객체에 연결된다.** 인스턴스들은 생성자 함수의 prototype 속성을 통해 공통의 메소드와 속성을 공유하고 상속한다. 

```js
var myArray = new Array('foo', 'bar');
console.log(myArray.join());
```

`myArray`객체 인스턴스에는 `join()` 메소드가 없기 때문에 자바스크립트는 프로토타입 체인에서 `join()`메서드가 있는지 검색한다.

왜 이런 식으로 동작하도록 만들었을까? 사실 이는 효율성과 재사용성에 대한 문제다.<sup>[1](#think-1)</sup>


# 프로토타입 속성이 왜 중요한가?
1. 네이티브 생성자 함수(Object(), Array(), Function() 등)는 prototype 속성을 사용해 생성자 인스턴스가 메소드와 속성을 상속받도록 하고 있기 때문이다. 자바스크립트를 잘 이해하려면 prototype이 어떻게 사용하는지 잘 알아야 한다.
2. 사용자 정의 생성자 함수를 만들 때 자바스크립트 네이티브 객체와 동일한 방식을 통해 프로토타입 상속을 구현할 수 있기 때문이다. 그러나 **상속이 이루어지는 방식에 대한 이해가 반드시 수반되어야 한다.**
3. 프로토타입 상속을 정말 싫어하거나 다른 상속 패턴을 더 좋아할 수도 있지만<sup>[2](#think-2)</sup> 현실적으로 생각해 볼 때 아마도 누군가 프로토타입 상속을 사용해 구현해놓은 코드를 수정하거나 조작해야 할 일이 있을 것이다. 이 때 프로토타입 상속이 어떻게 동작하는지 알아야 다른 개발자가 만든 생성자 함수의 기능을 그대로 복제할 수 있을 것이다.
4. **프로토타입 상속을 사용하면 동일한 메소드를 공유하는 여러 개의 효율적인 객체 인스턴스를 만들 수 있다.**

# 모든 Function() 인스턴스에는 prototype 속성이 있다.
`Function()`으로 만들든 리터럴 표기법을 사용해 만들던 예외없이 모두 `Function()` 생성자로부터 만들어진다. 함수 인스턴스를 만들면 항상 prototype 속성이 추가된다. 이 때, prototype 속성은 그 자체로는 빈객체와 같다. 

```js
function myFunction() {};
console.log(myFunction.prototype); // Object{}가 기록된다.
console.log(typeof myFunction.prototype); // 'object'가 기록된다.
```

Function() 생성자를 사용할 때면 언제나 자동으로 설정되는 prototype 속성은 중요한만큼 완벽히 이해해야 한다.

# prototype 속성은 Object() 객체다.
`Function()` 인스턴스를 만들 때 자바스크립트가 인스턴스에 부여하는, 이름이 "prototype"이고 기본값이 빈 객체인 속성일 뿐이다.

# 생성자 함수를 통해 만든 인스턴스는 생성자 함수의 prototype 속성과 연결되어 있다.
new키워드와 생성자 함수를 사용해 객체를 만들면 생성자 함수의 prototype 속성과 새롭게 만들어진 객체 인스턴스 사이에는 일종의 숨겨진 연결고리가 생긴다. 일부 브라우저에서는 이 연결고리가 `__proto__` 속성으로 나타나기도 한다.

...

이러한 연결덕분에 프로토타입 체인이 생성된다.

...

사실 `__proto__` 속성은 ECMA 공식 표준이 아니기 때문에 객체 인스턴스에서 constructor 속성을 사용하면 생성자를 구할 수 있고 이를 통해 인스턴스가 상속받은 프로토타입 객체도 구할 수 있다.

```js
Array.prototype.foo = 'foo';
var myArray = new Array();

console.log(myArray.__proto__.foo) // foo가 출력되지만 표준이 아니다.
console.log(myArray.constructor.prototype.foo) // foo가 출력된다.
console.log(myArray.foo) // 마찬가지로 foo가 출력되지만 프로토타입 체인에 의한 것이다.
```

즉 간단히 말해서 `myArray.__proto__`와 `myArray.constructor.prototype`는 `Array.prototype`을 참조한다.

# 프로토타입 체인의 끝은 Object.prototype이다.
prototype 속성은 객체이기 때문에 프로토타입 체인 또는 프로토타입 검색의 종점은 Object.prototype이다.

예시를 하나 들자면

```js
var myArray = [];
console.log(myArray.foo);

// 1. myArray 배열 객체에서 먼저 foo라는 프로퍼티를 찾는다.
// 2. 없으므로 Array.prototype에서 다시 foo 프로퍼티를 찾는다.
// 3. 없으므로 Object.prototype에서 다시 foo 프로퍼티를 찾고
// 4. 없으므로 undefined를 반환한다.
```

# 프로토타입 체인은 체인에서 제일 먼저 찾은 속성을 반환한다.

```js
Object.prototype.foo = 'object-foo'
Array.rptotype.foo = 'array-foo';
var myArray = [];

console.log(myArray.foo); // 'array-foo' 반환
```

# prototype 속성을 새 객체로 대체하면 기본 constructor 속성이 삭제된다.

```js
var Foo = function(){};
var foo = new Foo();
console.log(foo.constructor); // Foo()

// prototype 속성 대체
Foo.prototype = {}; // 자바스크립트가 설정한 prototype 속성을 대체하는 일은 객체지향 패턴에서 종종 일어난다.
var changedFoo = new Foo();
console.log(changedFoo.constructor); // Object()

// constructor 복원
Foo.prototype = {constructor : Foo};
var restoredFoo = new Foo();
console.log(restoredFoo.constructor); // Foo()
```

# 프로토타입에서 상속한 속성은 가장 최근의 값을 사용한다.

```js
var Foo = function(){};
var foo = new Foo();

Foo.prototype.x = 1;
console.log(foo.x); // 1

Foo.prototype.x = 2;
console.log(foo.x); //2
```

위 코드에서 주의할 점이 있는데 `prototype` 프러퍼티를 언제든 완전히 다른 것으로 대체할 수 있다고 생각하면 안된다는 것이다. 이미 생성된 객체는 위와 같은 방법으로 프러퍼티를 변경할 수 있지만 `prototype`에 새 객체를 생성해버리면 인스턴스와 새로운 객체간의 `prototype`간의 연결이 끊어져 버린다. **즉, 새 객체로 대체해버리면 같은 생성자에서 만든 인스턴스라고 해도 서로 다른 prototype을 참조하게 될것이다.**

# 상속체인 만들기
프로토타입 상속은 전통적인 객체 지향 프로그래밍 언어에서 볼 수 있던 상속 패턴을 흉내 내기 위해 만들어졌다. 아래 코드를 보자

```js
var Person = function(){
    this.bar = 'bar'
};
Person.prototype.foo = 'foo';

var Chef = function(){
    this.goo = 'goo';
}

Chef.prototype = new Person();
var chef = new Chef();

console.log(chef.foo, chef.goo, chef.bar); // 'foo', 'goo', 'bar'
```

# 참고한 것
* 자바스크립트를 깨우치다 - 책

# 각주
<a name="think-1">1</a>: 여기에 맞춰서 자바스크립트에서는 프로토타입적 상속모델을 사용하는 것인가? 객체지향에서 추구하는 재사용성 방향이 자바스크립트에 도입하기 위해서 프로토타입을 사용하는 것일까?
<br><a name="think-2">2</a>: 다른 방식의 상속이 가능하다는 말인가? 무엇이 있을까??