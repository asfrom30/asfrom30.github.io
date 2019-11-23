---
layout: post
title:  "자바스크립트 oop"
categories: [unclear-thinking] 
tags: [sw, javascript, oop]
---

# 키워드
* 프로토타입적 상속모델

# Function, 생성자 함수, new 연산자의 관계

> Function은 1급 클래스이다. 이걸로 함수 인스턴스를 생성할 수 있는데 함수 인스턴스를 생성하는 방법은 `new Function(...)`, `var hello = function() {}`, `function hello(){}` 모두 동일하다.

* function expression
```js
var getRectArea = function(width, height) {
    return width * height;
}
```
* function declaration
```js
function calcRectArea(width, height) {
  return width * height;
}
```

중요한 것은 1급 클래스인 Function으로 함수 인스턴스를 만드는데 이 함수 인스턴스들은 자동으로 `prototype`이 생성된다. 위에서 언급한 어떤 방식으로 만들던지 `prototype`이 생성된다.

```js
function hello() {}
console.log(hello); // 파이어폭스 : function hello(), 크롬 : f hello()
```

`prototype`이 없는 것처럼 보이지만 아래와 같이 프로퍼티에 접근하면 결과를 볼 수 있다.

```js
function hello() {}
console.log(hello.prototype); 

// 결과
// {constructor : f hello(), __proto__ : Object}
```

> 함수는 모두 `prototype` 객체를 포함하고 있다. 심지어 생성자 함수로 사용할 생각이 전혀 없는 함수도 `prototype` 객체를 자동으로 포함한다.

생성자 함수는 `new`연산자와 함께 사용하여 객체 인스턴스를 얻기 위한 함수를 말한다.

> 생성자 함수와 new 연산자를 함께 사용하면 객체 인스턴스를 얻을 수 있다.

`new`연산자와 함께 사용하면 객체 인스턴스를 반환하는데, 이 객체는 생성자 함수의 `prototype`과 연결고리가 생기고 일부 브라우저에서는 이것이 `__proto__`로 나타난다.


### 요약하자면

```js
function Hello() {} // 함수 인스턴스 생성

var hello = new Hello(); // 함수 인스턴스를 생성자 함수로 사용. hello는 객체가 된다.
console.log(hello.__proto__); // 객체에서는 연결고리 __proto__가 나타난다.
console.log(hello.prototype); // undefined : 생성된 객체에서는 prototype이 존재하지 않는다.
console.log(hello.constructor); // 해당 객체에는 존재하지 않지만 __prototype__에 정의 되어 있어 체이닝으로 인해 프러퍼티에 접근한다.

```

### 일반 함수 vs 생성자 함수

위와 같은 사실 - 함수는 1급 클래스이기 때문에- 로 함수 인스턴스는 언제든지 new와 결합해서 객체 인스턴스를 만들 수 있다.

생성자 함수로 사용할 때는  `Hello`로 명시하고, 일반 함수로 사용할때는 `hello`로 명시한다.

```js
// 일반 함수로 쓰겠다.
function hello() {
    console.log('a');
}

// 생성자 함수로 쓰겠다.
function Hello() {
    this.a = 'a'
    this.hello = function() {
        console.log(this.a);
    }
}

hello(); // a
(new Hello).hello(); //a
```
# 함수를 생성자 함수로 사용 - ES5

### 함수 안에 선언
```js
function Shape(name) {
    this.name = name;
    this.print = function() {
        console.log(this.name);
    }
}

var shape = new Shape('asfrom30');
console.log(shape);
```

### `prototype`에 선언
```js
function Shape(name) {
    this.name = name;
}

Shape.prototype.print = function() {
    console.log(this.name);
}

var shape = new Shape('asfrom30');
console.log(shape);
```

### 두 코드의 차이
`print()`함수를 생성자 함수 안에서 `this`를 사용해 선언을 하면 생성된 객체 프로퍼티에 생기고, `prototype`을 사용하면 `__proto__` 안에 생성이 된다.
```js
// 함수 안에 선언하여 생성된 Object
{
    name : "asfrom30"
    print : function print()
    __proto__ : Object { ... }
}
```

```js
// `prototype`으로 생성된 Object
{
    name : "asfrom30"
    __proto__ : {
        print : function print();
    }
}
```

### 여담으로 class는 hoisting되지 않는다.
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
* https://developer.mozilla.org/en-US/docs/Glossary/Hoisting


An important difference between `function declarations` and `class declarations` is that function declarations are hoisted and class declarations are not. You first need to declare your class and then access it, otherwise code like the following will throw a `ReferenceError`

```javascript
var p = new Rectangle(); // ReferenceError
class Rectangle {}
```

# ES6에서 class 선언

class 문법이 훨씬 더 직관적이고 단순하긴 하지만 사실 단축 문법일 뿐이며 자바스크립트의 클래스 자체가 바뀐것은 압니다.

### Class declarations
```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

### Class expressions
```js
// unnamed
var Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
var Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```

### `prototype` 사용
function과 마찬가지로 `prototype`을 이용해서 Class를 선언할 수 있다. 하지만 프로퍼티가 선언되는 위치가 다르기 때문에 권장하지 않는다. 권장하지 않는 이유는 뒤 상속에서 다룬다.

```js
class Rectangle {
  constructor() {
    this.height = 'height'; // 객체에 선언
  }
}

Rectangle.prototype.width = 'width'; // __proto__에 선언

console.log(new Rectnagle());
```


# ES5 vs ES6 Class

ES6에서도 똑같이 할 수 있습니다. 결과는 완전히 동일합니다.

```js
class Es6Car {}
function Es5Car {}

> typeof Es6Car // "function"
> typeof Es5Car // "function"
```

# 자바스크립트에서 상속

### 다형성
> 자바 스크립트는 느슨한 타입을 사용하고 어디서든 객체를 쓸 수 있으므로(정확한 결과가 보장되진 않지만), 어떤 면에서는 자바스크립트의 객체는 모두 다형성을 갖고 있다고 할 수 있습니다.

> 자바스크립트에는 객체가 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있습니다. prototype과 __proto__에 손대지 않았다면 정확한 결과를 기대할 수 있습니다.

# 상속 ES5
### 상속패턴
```js
// https://jsfiddle.net/9xtvz8v8/

function Shape(name) {   
  this.parentVar = 'parentVar';
  this.name = name;
}

Shape.prototype.print = function() {
	console.log(this.name);
}

function ShapeChild(name) {
	Shape.call(this, name);
    this.childVar = 'childVar';
}

ShapeChild.prototype = Object.create(Shape.prototype);
ShapeChild.prototype.constructor = ShapeChild;

var shapeChild = new ShapeChild('asfrom30');
console.log(shapeChild);
shapeChild.print();
```
`ShapeChild.prototype`과 `ShapeChild.prototype.constructor` 두 코드에 주목하자. 해당 코드를 두개 주석처리하면 `console.log(shapeChild)`의 프로퍼티는 동일하게 나오지만 `print()`는 실행되지 않는다. -TypeError: shapeChild.print is not a function` 에러 -

주석처리하게 되면 달라진점은 `__proto__`안에 `constructor`와 `print()`가 선언되어 있지 않다는 점이다. 객체 프로퍼티는 모두 동일하다.

```js
// https://jsfiddle.net/ukz0o1k2/
function Shape(name) {   
  this.parentVar = 'parentVar';
  this.name = name;
}

Shape.prototype.print = function() {
	console.log(this.name);
}

function ShapeChild(name) {
	Shape.call(this, name);
  this.childVar = 'childVar';
}

/* ShapeChild.prototype = Object.create(Shape.prototype); */
/* ShapeChild.prototype.constructor = ShapeChild; */

var shapeChild = new ShapeChild('asfrom30');
console.log(shapeChild);
shapeChild.print();
```

`new`로 객체를 만들때 `prototype`을 이용하게 되는데 이때 `ShapeChild`의 `prototype`과 `Shape`의 prototype의 연결고리가 없으므로 이를 이어주는 것이다. `ShapeChild.prototype = Object.create(Shape.prototype);`로 인해서 고리를 만들어서 `__proto__`로 보낸다. 그래서 print를 사용할 수 있다. `Shape`의 `print`메서드는 prototype에 정의 되어 있으므로.

결과적으로 ES5에서 상속을 구현하기 위해서는
* __proto__에 `constructor`가 있어야 한다.
* __proto__에 부모 메서드가 들어있어야 한다.


# 상속 ES6
### 상속에서 생성자함수 vs `prototype`
```js
// https://jsfiddle.net/qtn6sbsp/

// Shape : 생성자함수 사용, 그리고 상속
class Shape {
    constructor(name) {
        this.parentVar = 'parentVar';
        this.name = name;
    }

    print() {
        console.log(this.name);
    }
}

class ShapeChild extends Shape {
    constructor(name) {
        super(name);
        this.childVar = 'childVar';
    }
}

// Circle : prototype을 사용, 그리고 상속
class Circle {
    constructor(name) {
        this.name = name;
    }
}

Circle.prototype.parentVar = 'parentVar';

Circle.prototype.print = function() {
    console.log(this.name);
}

class CircleChild extends Circle {
    constructor(name) {
        super(name);
        this.childVar = 'childVar';
    }
}

console.log(new Shape('asfrom30'));
console.log(new Circle('asfrom30'));

console.log(new ShapeChild('asfrom30'));
console.log(new CircleChild('asfrom30'));
```

위에서 많이 봤던 것처럼 `Circle`에는 `parentVar` 프로퍼티가 `__proto__`에 정의 되어 있다. `Shape`는 객체 안에 정의 되어 있다. `print()`메서드는 생성자 안에 정의 되어 있지 않으므로 `Shape`와 `Circle` 모두 `__proto__`에 정의 되어 있다.

상속을 받은 `ShapeChild`는 `CircleChild는` 모두 부모 프로퍼티를 유지하면서 `childVar` 프로퍼티가 추가되어 선언되어 있다.

```
// 결과 : ShapeChild
{
    name : "asfrom30"
    parentVar: "parentVar",
    childVar: "childVar",
    __proto__ :{

    }
}

// 결과 CircleChild
{
    name: "asfrom30"
    childVar: "childVar"
    __proto__ : {
        parentVar: "parentVar",
    }
}
```

### `prototype` 사용 주의

> ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 합니다.<sup>[1](#think-1)</sup> 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 확실히 확인하려면 항상 hasOwnProperty 사용하는 편이 좋습니다.

`Object.keys(object)`를 했을 때 `__proto__`에 정의된 프로퍼티 키는 나오지 않는다. 오직 객체에 선언된 프로퍼티 키만 출력된다.

예제를 보십시오. 


```js
// https://jsfiddle.net/hu2vrqcj/1/
class Super {
    constructor(name) {
        this.name = name;
    }
}

// 유효하지만 권장하지는 않습니다.
Super.prototype.age = 34;

class Sub extends Super {
    constructor(name) {
        super(name);
    }
}

console.log(new Sub('asfrom30'));
// 결과
// {
//     name : undefined
//     __proto__ : {
//         constructor : function Sub() {
//             ...
//         }
//         __proto__ : Object { 
//             age: 34
//             ...
//         }
//     }
// }

console.log(Object.keys(new Sub()));
// 결과
// ["name"]
```

`prototype`에 선언한 후 상속한 것은 객체 인스턴스 프로퍼티에 정의 되는 것이 아니라 __proto__ 연결고리에 생성된다. 이해를 더 돕기 위해 아래 예제를 보자

```js
// https://jsfiddle.net/bo8jh9ud/
class Super {
    constructor() {
        this.name = 'Super';
        this.isSuper = true;
    }
}

// 유효하지만 권장하지는 않습니다.
Super.prototype.sneaky = 'not recommend!';

class Sub extends Super {
    constructor() {
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj) {
    console.log(`${p} : ${obj[p]}` + (obj.hasOwnProperty(p) ? '' : '(inherited)'));
}

// 결과
// name: Sub
// isSuper: true
// isSub: true
// sneaky: not recommended! (inherited)

```

### `hasOwnProperty`란

> 객체 obj와 프로퍼티 x에서 obj.hasOwnProperty(x)는 obj에 프로퍼티 x가 있다면 true를 반환하며, 프로퍼티 x가 obj에 정의되지 않았거나 프로토타입 체인에만 정의되었다면 false를 반환합니다. <br/> ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 합니다. 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 확실히 확인하려면 항상 hasOwnProperty 사용하는 편이 좋습니다. 예제를 보십시오. - 러닝자바스크립트 9장

### `hasOwnProperty`를 쓰는 이유

> `hasOwnProperty`는 상속된 프로퍼티가 `for ...in`에 나타날 위험을 제거하기 위해 사용합니다. 아래 예제에서는 `hasOwnProperty`를 생략하더라도 아무 차이도 없습니다. 하지만 다른 타입의 객체, 특히 다른 사람이 만든 객체의 프로퍼티를 나열하다 보면 예상치 못한 상황이 생길 수 있으므로 `hasOwnProperty`를 쓰는 습관을 들이길 권합니다. `hasOwnProperty`가 왜 중요한지 생략해도 안전할 때는 언제인지 곧 알게 됩니다. `for ... in` 루프에는 키가 심볼인 프로퍼티는 포함되지 않습니다.

```js
const o = {a:1, b:2, c:3, [SYM]: 4};

for(let property in o) {
    if(!o.hasOwnProperty(prop)) continue;
    console.log(o[property]);
}
```


### 메서드와 프로퍼티의 위치
각각 상속을 했을때는 어떻게 변하는지 알아보자. 함수를 상속받아 사용하는 것을 ES5와 ES6을 혼용해서 사용했지만 - 이렇게 쓸일이 없지만 어떻게 변하는지만 알아보자.

```js
function Shape(name) {
    this.name = name;
    this.print = function() {
        console.log(this.name);
    }
}

class ShapeChild extends Shape {
    constructor(name) {
        super(name);
    }
}

console.log(new ShapeChild());
// 결과
// ShapeChild {name: undefined, print: ƒ} // print가 마치 자식 객체에 선언되어 있는 것처럼 보인다. 
```

위와 같이 사용하면 내가 `print()`함수를 부모 클래스에서 선언했다고 하더라도 자식 클래스에서 `print()`가 존재하는 것처럼 보인다. 따라서 아래와 같은 방법이 더 낫겠다.

```js
function Shape(name) {
    this.name = name;
}

Shape.prototype.print = function() {
    console.log(this.name);
}

class ShapeChild extends Shape {
    constructor(name) {
        super(name);
    }
}

console.log(new ShapeChild());
// 결과
// ShapeChild {name: undefined} // print 함수는 부모쪽에 감추어져 있다.
// Shape __proto__ 안 Object __proto__에 정의 되어 있음
```

* 내생각
    * 어느위치에 적절히 선언할 것인가. 메서드는 `__proto__`에 있는게 더 낫고, 프로퍼티는 객체 안에 있는게 더 나은 것인가?


# 더 추가할 주제들
### extends
### mixin

# Extras
### 참조
* [Doc Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* https://dzone.com/articles/classical-inheritance-0
* [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

### 각주
<a name="think-1">1</a> : 예제에 의거하면 상속된 프로퍼티라고 하더라도 `__proto__`가 아닌 객체 자신에 정의 되어있어야 한다. `prototype`으로 선언하고 상속했을 때는 객체 자신이 아니라 `__proto__`에 선언되어 있는데 프로토타입 체이닝에 의해 접근은 되지만, 권장하지 않는 것 같다. 특히나 `hasOwnProperty`를 사용하게 되면 `__proto__`에 있는 것들은 걸리지 않게 되므로.
<br><a name="think-2">2</a> : 

### Study more