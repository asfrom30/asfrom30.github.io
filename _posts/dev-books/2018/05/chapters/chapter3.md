# Object() 객체 사용

...
 
Object() 생성자를 사용해 빈 객체를 만드는 방법은 물론 Object() 생성자 함수와 같은 객체의 클래스 - `Person()` - 을 만드는 방법도 숙지하고 있어야 한다.

# Object() 매개변수
한개의 인수를 전달한다. 매개변수가 없으면 null이나 undefined를 전달했다고 가정한다.

```js

// Object() 생성자를 사용해 문자열, 숫자, 배열, 함수, 불리언, 정규 표현식 객체를 만든다.

console.log(new Object('foo')); // String {'foo'}

// 실제로는 사용되지 않는 방법이다. 가능하다는 것만 참조
```

# Object 속성과 메서드
* Object() 객체의 속성은 다음과 같다.
    * 속성
        * prototype : `Object.prototype`
* Object() 객체 인스턴스의 속성과 메서드
    * 인스턴스 속성 : `var myObject = {}; myObject.toString();`
        * hasOwnProperty()
        * isPrototypeOf()
        * propertyIsEnumerable()
        * toLocaleString()
        * toString()
        * valueOf()
    * `Object.prototype` 안에 선언되어 있는 것들

# 객체 리터럴을 사용한 Object() 객체 생성

```js
var cody = {
    name : 'cody'
    age : 23,
}
```

# 모든 객체는 Object.prototype을 상속받는다.

프로토타입 체인의 가장 끝에는 Object() 생성자 함수의 prototype 속성이다.

```js
Object.prototype.foo = 'foo';

var myString = 'bar'
console.log(myString.foo); // 프로토타입 체인을 통해 Object.prototype.foo에서 가져왔다.
````