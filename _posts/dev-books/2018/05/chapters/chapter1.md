- [객체 만들기](#%EA%B0%9D%EC%B2%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [자바스크립트 네이티브 / 내장 객체 생성자](#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C--%EB%82%B4%EC%9E%A5-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%9E%90)
- [사용자 정의 객체 생성자 함수](#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98)
- [new 연산자를 사용한 생성자 인스턴스 생성](#new-%EC%97%B0%EC%82%B0%EC%9E%90%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1)
- [리터럴을 사용한 값 생성하기](#%EB%A6%AC%ED%84%B0%EB%9F%B4%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%EA%B0%92-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)
- [원시값 (= 단순값)](#%EC%9B%90%EC%8B%9C%EA%B0%92--%EB%8B%A8%EC%88%9C%EA%B0%92)
- [원시값은 어떻게 저장 복사되는가](#%EC%9B%90%EC%8B%9C%EA%B0%92%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%80%EC%9E%A5-%EB%B3%B5%EC%82%AC%EB%90%98%EB%8A%94%EA%B0%80)
- [복합객체 (=합성객체)](#%EB%B3%B5%ED%95%A9%EA%B0%9D%EC%B2%B4-%ED%95%A9%EC%84%B1%EA%B0%9D%EC%B2%B4)
- [복합객체는 어떻게 저장 복사 되는 가](#%EB%B3%B5%ED%95%A9%EA%B0%9D%EC%B2%B4%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%80%EC%9E%A5-%EB%B3%B5%EC%82%AC-%EB%90%98%EB%8A%94-%EA%B0%80)
- [복합 객체는 참조를 비교한다.](#%EB%B3%B5%ED%95%A9-%EA%B0%9D%EC%B2%B4%EB%8A%94-%EC%B0%B8%EC%A1%B0%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%9C%EB%8B%A4)
- [복합 객체는 동적 속성을 포함한다.](#%EB%B3%B5%ED%95%A9-%EA%B0%9D%EC%B2%B4%EB%8A%94-%EB%8F%99%EC%A0%81-%EC%86%8D%EC%84%B1%EC%9D%84-%ED%8F%AC%ED%95%A8%ED%95%9C%EB%8B%A4)
- [typeof 연산자](#typeof-%EC%97%B0%EC%82%B0%EC%9E%90)
- [동적 속성 덕분에 객체 수정이 가능하다.](#%EB%8F%99%EC%A0%81-%EC%86%8D%EC%84%B1-%EB%8D%95%EB%B6%84%EC%97%90-%EA%B0%9D%EC%B2%B4-%EC%88%98%EC%A0%95%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%98%EB%8B%A4)
- [생성자 인스턴스에는 자신의 생성자 함수를 가리키는 속성이 있다.](#%EC%83%9D%EC%84%B1%EC%9E%90-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90%EB%8A%94-%EC%9E%90%EC%8B%A0%EC%9D%98-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98%EB%A5%BC-%EA%B0%80%EB%A6%AC%ED%82%A4%EB%8A%94-%EC%86%8D%EC%84%B1%EC%9D%B4-%EC%9E%88%EB%8B%A4)
- [객체가 특정 생성자 함수의 인스턴스인지 확인하기](#%EA%B0%9D%EC%B2%B4%EA%B0%80-%ED%8A%B9%EC%A0%95-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98%EC%9D%98-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%9D%B8%EC%A7%80-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0)
- [생성자를 통해 만든 인스턴스에 인스턴스 속성 추가하기](#%EC%83%9D%EC%84%B1%EC%9E%90%EB%A5%BC-%ED%86%B5%ED%95%B4-%EB%A7%8C%EB%93%A0-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%86%8D%EC%84%B1-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0)
- ["자바스크립트 객체"와 "Object() 객체"의 의미](#%22%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9D%EC%B2%B4%22%EC%99%80-%22object-%EA%B0%9D%EC%B2%B4%22%EC%9D%98-%EC%9D%98%EB%AF%B8)


# 객체 만들기
자바스크립트에서는 객체가 왕이다. 거의 모든 것들이 객체이거나 객체처럼 동작하기 때문이다. 그래서 객체를 이해한다는 것은 곧 자바스크립트를 이해한다는 것이 된다.

...

```js
var cody = new Object(); // Object() 생성자 함수를 호출
cody.living = true;
cody.age = 33;
```

cody 객체는 정적인 정보이고 메서드가 없으면 JSON과 유사한 데이터베이스일 뿐이다.

...


```js
var myObject = new Object();
var myString = new String('foo');
```
객체는 다른 자료형을 가질 수 있다. 자바스크립트는 객체를 사용해 값을 표현한다. String(), Object() 생성자 함수를 사용해 객체를 만들어낸다. 우리도 생성자 함수를 만들 수 있다. 

```js
var Person = function(living, age) {
    this.living = living;
    this.age = age;
}
```

### 자바스크립트 네이티브 / 내장 객체 생성자
* Number()
* String()
* Boolean()
* Object()
* Array()
* Function()
* Date()
* RegExp()
* Error()

```
Note : 

* Math는 예외다. Math는 생성자 함수가 아닌 정적 객체인데, 즉 var x = new Math();와 같이 사용할 수 없다는 뜻이다. Math.PI처럼 여러 수학 관련 함수들을 모아두기 위한 그릇으로서 자바스크립트가 정의한 객체 네임스페이스 일 뿐이다.

* 네이티브 객체는 어디서든 사용할 수 있도록 만들어주기 때문에 "전역 네이티브 객체" global objects라고 부르기도 한다. 이 용어는 스코프 체인의 제일 위에 있는, 예컨데 웹브라우저의 winodw와 같은 머리 전역 객체와는 다른 의미이므로 혼동해서는 안된다.

```

# 사용자 정의 객체 생성자 함수
* new 연산자와 함께 사용할 경우 자신만의 생성자 함수를 만들때는 첫글자를 대문자로
* 생성자 함수에서 어려운 부분중 하나는 함수 내에서 this를 사용하는 것이다. 6장 this 참조
* 아래와 같이 new를 사용하지 않고 함수에서 객체를 반환하게 할 수도 있다. 하지만 이 경우 프로토타입 상속을 사용할 수 없다.

```js
var myFunction = function() {
    return {prop : val};
}
```

# new 연산자를 사용한 생성자 인스턴스 생성

자바스크립트 언어에는 Number(), String() Boolean(), Object(), Array(), Date(), RegExp(), Error() 9개의 미리정의된 네이티브 생성자가 포함되어 있다. 이러한 생성자 함수와 new 연산자를 함께 사용하면 객체의 인스턴스를 얻을 수 있다.

```js
// new 키워드를 사용한 각 네이티브 생성자의 인스턴스 생성

var myNumber = new Number(23);
var myString = new String('male');
var myBoolean = new Boolean(false);
var myObject = new Object();
var myArray = new Array('foo','bar');
var myFunction = new Function("x", "y", "return x*y");
var myDate = new Date();
var myRegExp = new RegExp('\bt[a-z]+\b');
var myError = new Error('Crap!');

// 만들어진 객체의 생성자가 무엇인지 기록 및 확인
console.log(myNumber.constructor); // Number()가 기록된다
console.log(myString.constructor); // String()이 기록된다
console.log(myBoolean.constructor); // Boolean()이 기록된다
console.log(myObject.constructor); // Object()가 기록된다
console.log(myArray.constructor); // 최신 브라우저에서는 Array()가 기록된다
console.log(myFunction.constructor); // Function()이 기록된다
console.log(myDate.constructor); // Date()가 기록된다
console.log(myRegExp.constructor); // RegExp()가 기록된다
console.log(myError.constructor); // Error()가 기록된다
```

# 리터럴을 사용한 값 생성하기
자바스크립트에는 `new Foo()` 같은 방법을 사용하지 않아도 대부분의 네이티브 객체 값을 만들 수 있는 "리터럴(literal)"이라는 축약 표현이 있다. 

```js
var myNumber = new Number(23); // 객체
var myNumberLiteral = 23; // 원시 숫자값, 객체가 아님

var myString = new String('male'); // 객체
var myStringLiteral = 'male'; // 원시 문자열값, 객체가 아님

var myBoolean = new Boolean(false); // 객체
var myBooleanLiteral = false; // 원시 불리언값, 객체가 아님

var myObject = new Object(); // {}
var myObjectLiteral = {}; // {}

var myArray = new Array('foo', 'bar'); // [ 'foo', 'bar' ]
var myArrayLiteral = ['foo', 'bar'];  // [ 'foo', 'bar' ]

var myFunction = new Function("x", "y", "return x*y"); // [Function: anonymous] 
var myFunctionLiteral = function(x, y) {return x*y}; // [Function: myFunctionLiteral]

var myRegExp = new RegExp('\bt[a-z]+\b');
var myRegExpLiteral = /\bt[a-z]+\b/;
```

참고로 new를 사용하지 않으면 객체가 아니라 원시값이 반환된다. `var primitiveString = String('foo');`

```
Note : 문자열, 숫자, 불리언 자료형에 대해 리터럴 값을 사용하면 이 값을 객체처럼 다루기 전까지는 리터럴에 해당하는 복합 객체가 만들어지지 않는다. 리터럴의 메소드/속성에 접근하면 자바스크립트는 먼저 리터럴 값에 해당하는 래퍼 객체를 만들고 이를 통해 메소드나 속성에 접근한후 래퍼객체를 제거해 다시 값을 리터럴 형으로 되돌린다. 이 덕분에 문자열, 숫자 불리언 값은 원시(혹은 단순) 자료형으로 취급된다. 이런 특성이 있다는 것을 이해하여 "자바스크립트에서 모든 것은 객체처럼 동작한다"는 사실을 "자바스크립트에서 모든 것은 객체다"라는 말과 혼동하지 않았으면 좋겠다.
```

# 원시값 (= 단순값)

* 5, 'foo', true, false, null, undefined와 같은 값은 더이상 단순화 할 수 없기 때문에 원시적(primitive)이라 하며, 이러한 값을 가리켜 원시값이라한다.
* 원시값은 객체가 아니다.

# 원시값은 어떻게 저장 복사되는가
원시값은 액면가 그대로 저장되고 관리한다. 'foo' 자체가 메모리에 저장된다. 원시값은 복사된다.

...

객체는 저장된 참조가 같은가 이다.


# 복합객체 (=합성객체)
네이티브 객체 생성자들은 한 개 이상의 원시값이나 복합객체를 저장할 수 있기 때문에 복합적이라 볼 수 있다. 복합객체는 어떤 값이든 포함할 수 있기 때문에 복합객체가 메모리에서 차지하는 크기는 명확하지 않다고 말할 수있다.

* 복합객체 complex object
* 합성객체 composite objects 또는 참조 자료형 reference types로 표현하기도 한다. 

```js
var object = { // 복합객체, 합성객체
    myString : 'string'
}

var myString = 'string' // 원시값
```

# 복합객체는 어떻게 저장 복사 되는 가
메모리 주소만 복사한다.

# 복합 객체는 참조를 비교한다.
복합 객체를 비교할 때는 두 복합 객체가 같은 객체를 참조하고 있을 때만(즉, 같은 주소를 가지고 있는 경우에만) 같다고 판단한다.

# 복합 객체는 동적 속성을 포함한다.
복합객체를 가리켜 참조 객체라고 부르기도 한다. 복합 객체는 원한다면 얼마든지 참조를 가질 수 있다.

...

객체를 정의하고 참조를 만든후 객체를 갱신하면 해당 객체를 가르키는 모든 참조도 같이 갱신되므로 동적인 객체 속성도 가능해진다.


# typeof 연산자
typeof 연산자는 다루는 값의 자료형을 문자열로 반환할 때 사용한다. 하지만 반환되는 문자열은 정확하거나 논리적이라고 보기는 어렵다.

...

이 연산자를 사용할 때는 다루고 있는 값(원시값이든 복합 객체이든)이 반환할 문자열이 무엇일지 주의를 기울여야 한다.

# 동적 속성 덕분에 객체 수정이 가능하다.
네이티브 객체를 수정하지 말아야 한다고 생각한다. 그러나 수정 가능 여부와 개인적인 의견은 별개의 문제다.

```js
String.prototype.trimIT = function() {

}

var myString = 'trim me';
myString.trimIT();
```

# 생성자 인스턴스에는 자신의 생성자 함수를 가리키는 속성이 있다.
객체를 인스턴스로 만들면 이 객체/인스턴스에는 constructor라는 속성이 자동으로 추가되는데, 이 속성은 해당 객체를 만든 생성자 함수를 가르킨다.

```js
var foo = {};
console.log(foo.constructor) // Object() 생성자 함수를 가르킨다.
```

어떤 인스턴스를 다루고 있는데 인스턴스를 만든 생성자 함수를 알 수 없는 경우(특히 다른 사람이 작성한 코드일 때), 이 속성을 사용하면 간편하게 생성자 함수를 찾을 수 있다.

...

리터럴/원시값의 생성자도 올바르게 찾아낸다.

```js
var myNumber = new Number('23');
var myNumberL = 23;

console.log(myNumber.constructor); // Number
console.log(myNumberL.constructor); // Number
```

사용자 정의 생성자 함수와도 잘 동작하지만, `constructor`를 통해 생성자 함수의 실제 이름을 알고 싶다면 생성자 함수를 만들 때 함수표현식에 실제 이름을 표현 시켜야 한다.

# 객체가 특정 생성자 함수의 인스턴스인지 확인하기

`instanceof`

```
Note
* 자바스크립트의 모든 객체는 Object()생성자를 상속하므로 Object()의 인스턴스 인지를 물으면 항상 true를 반환한다
* 원시값이 래퍼 객체의 인스턴스를 물으면 false를 반환한다. 예) 'foo' instanceof String 은 false. 만약 new 연산자를 사용해 'foo' 문자열을 만들었으면 true이다.
```

# 생성자를 통해 만든 인스턴스에 인스턴스 속성 추가하기

```js
var myArray = new Array();
myArray.prop = "test";
```

인스턴스는 자신만의 고유한 속성은 물론 프로토타입 체인에서 상속받은 속성도 포함할 수 있으며, 인스턴스로 만든후에 속성을 추가할 수도 있다.

# "자바스크립트 객체"와 "Object() 객체"의 의미

자바스크립트 객체라는 용어는 자바스크립트의 모든 객체를 가르킬 때 사용됐다. -Array() 객체, Object() 객체 포함- Object() 객체는 Object()생성자로 만든 객체 인스턴스에만 해당하는 용어이다.


