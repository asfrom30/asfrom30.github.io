# this의 사용

함수를 만들 때는 함수를 실행하는 객체와 연결되는 this라는 키워드도 같이 (자동으로) 만들어진다. 다시 말해 this는 함수의 스코프 안에서 사용할 수 있으며 함수를 속성 또는 메소드로 포함하고 있는 객체를 참조한다.

...

```js
var cody = {
    gender : 'male',
    getGender : function(){
        return cody.gender;
    }
}

console.log(cody.getGender())
```

*위와 같은 코드를 `getGender` 함수를 포함하고 있는 객체는 `cody`이므로 `this`를 써서 변환하면*

```js
var cody = {
    gender : 'male',
    getGender : function(){
        return this.gender;
    }
}

console.log(cody.getGender())
```

this는 일반적으로 함수 자체가 아닌 함수를 포함하고 있는 객체를 참조한다고 생각하면 된다. (new 키워드, call(), apply()를 사용하는 경우는 예외다.)


```
Note :
* this 키워드는 수정될 수 없다는 점만 제외하면 변수처럼 동작한다.
* arguments 또는 함수에 전달된 매개변수와 달리 this는 호출(call) 또는 활성 (activation) 객체다. -> 함수를 호출할때 자바스크립트가 자동으로 만들어 삽입하는 객체
```

# this의 값은 어떻게 정해지는가?

어떤 함수에서든 사용할 수 있는 this의 값은 함수가 호출될 때의 컨텍스트에 따라 달라진다. 

...

다음 코드에서 sayFoo라는 함수를 만들고 전역 스코프에서 호출하면 this는 윈도우 객체를 참조한다. 반면 이 함수를 myObject의 메소드로 바인딩하고 호출하면 this는 myObject를 참조한다.

```js
foo = 'foo in local' // var foo = 'foo'로 하면 nodesjs에서는 undefined가 나온다.

var myObject = {
    foo : 'foo in myObject'
};

var sayFoo = function() {
    console.log(this.foo);
}

sayFoo(); // 'foo in global'

myObject.sayFoo = sayFoo;
myObject.sayFoo(); // 'foo in myObject'

```

분명 this의 값은 함수가 호출되는 컨텍스트에 따라 달라지는 것을 볼 수 있다. 코드에서 보다시피 myObject.sayFoo와 sayFoo는 분명 같은 함수를 가리키고 있으나 sayFoo() 함수가 실행된 곳(=컨텍스트)에 따라 this의 값이 달라졌다.


**즉 함수를 여러 곳에서 사용하거나 하나의 함수에 참조가 여러 개 있을 경우, 함수를 호출하는 컨텍스트에 따라 this의 값이 달라질 수 있다.**

# 중첩된 함수의 this는 머리 객체를 참조한다.
함수 내에 있는 함수에서는 this의 값이 어떻게 달라질까? 나쁜 소식이 하나 있다. ECMA 3 명세에 따르면 중첩된 함수의 this는 함수가 정의된 객체가 아닌 머리 객체(브라우저에서는 window객체)를 참조한다.

```js
var myObject = {
    func1 = function() {
        console.log(this); // myObject가 기록된다.
        var func2 = function() {
            console.log(this); // window가 기록되며 여기서 부터는 this의 값이 계속 같다.
            var func3 = function() {
                console.log(this); // 머리 객체인 window가 기록된다.
            }();
        }();
    }
}

myObject.func1();
```

좋은 소식은 ECMA5에서는 이문제가 수정 된다고 한다. - *크롬 브라우저나 노드에서는 일단 수정되지 않았다.* -


전달된 익명함수가 중첩되어 있다면 마찬가지이다. *같은 console.log(this) 이지만 중첩되어 있는 경우 window 객체를 가르키고, 중첩되어 있지 않으면 myObject를 가르킨다.*

```js
var myObject = {
    func1 : function(callback) {
        console.log(this); // 이 곳의 this 키워드는 myObject를 가르킨다.
        callback(); // 여기서 this는 window를 가르킨다.
    }
}

myObject.func1(function(){
    console.log(this)
})
```

# 중첩된 함수 문제는 스코프 체인을 사용해 우회하라

스코프 체인을 사용해 부모 함수의 this에 대한 참조를 저장해두면 this 값이 사라지는 것을 막을 수 있다. 다음 코드는 that 변수와 이 변수의 스코프를 사용해 함수 컨텍스트가 변하는 와중에도 this 값을 유지하고 있다.

```js
var myObject = {
    myProperty : 'I can see the light',
    myMethod : function() {
        var that = this;
        var helperFunction = function() {
            console.log(that.myProperty); // that은 myObject 이다.
            // console.log(this); // that을 사용하지 않으면 window 객체가 기록된다.
        }();
    }
}

myObject.myMethod();
```

*`const self = this` 같은 것도 그런 이유였구나*

# call() 또는 apply()를 사용한 this 값 설정

this의 값은 함수가 호출된 컨텍스트에 따라 보통 달라진다.(new 키워드를 사용한 경우는 예외다. 이 부분은 뒤에서 설명하겠다.). 하지만 `apply()`나 `call()`을 사용해 함수를 호출할 때 this가 참조할 객체를 정해주는 식으로 this의 값을 조작할 수 있다. 말하자면 이 방식은 자바스크립트에 "이봐, X함수를 호출해. 하지만 X함수에는 this 값으로 Z 객체를 사용하라고 일러둬"라고 말하는 셈이다. 이 방식을 사용하면 바로 자바스크립트에서 설정한 this의 값을 재정의할 수 있다.

다음 코드는 하나의 객체와 하나의 함수를 정의한 후 `call()`을 사용해 함수를 호출하며, 함수 내부의 this 값으로 myObject를 사용하도록 했다. 이제 myFunction 함수 내부의 문장은 머리 객체가 아닌 myObject 속성을 설정할 수 있게 된다. 이와 같이 (myFunction 내부의) this가 참조하는 값을 다른 객체로 대체할 수 있다.

```js
var myObject = {};

var myFunction = function(param1, param2) {
    this.foo = param1;
    this.bar = param2;
}

myFunction.call(myObject, 'foo', 'bar');
console.log(myObject); // result : { foo: 'foo', bar: 'bar' }
```


내가 만든 예제
```js
var lowerObj = {
    a : 'a',
    b : 'b',
}

var upperObj = {
    a : 'A',
    b : 'B'
}

var print = function(){
    console.log(this.a, this.b);
}


print(); // undefined undefined
print.call(lowerObj); // a b
print.call(upperObj); // A B
```

위의 예제에서는 call()을 사용했지만 apply()를 사용할 수도 있다. call()과 apply()의 차이점은 함수에 매개변수를 전달하는 방식 뿐이다. call()을 사용할 때는 쉼표로 값을 넣어 구분해 매개변수를 전달해야 하지만, apply()를 사용할 때는 배열 안에 값을 집어 넣어 전달해야 한다.

# 사용자 정의 생성자 함수 내에서 this 키워드 사용하기
new 키워드를 사용해 함수를 실행할 때 생성자 함수 내에 코딩된 this의 값은 생성자의 인스턴스를 가르킨다. 다시 말해, 생성자 함수 내에서 우리는 실제로 객체가 만들어지기 전에도 this를 통해 인스턴스를 참조할 수 있따는 것이다. 이 때 this의 기본값이 변경되는 방식은 call() 또는 apply()를 사용한 것과 크게 다르지 않다.

다음 코드에서 우리는 `Person` 생성자 함수를 만들고, 생성자 내에서 `this`를 사용해 만들어질 객체를 참조했다. `Person`의 인스턴스가 만들어질 때 `this.name`은 새로 생성되는 객체 및 이 객체의 `name`이라는 속성을 참조한다. 결과적으로는 생성자 함수에 전달된 매개변수(name)의 값을 새로 생성되는 객체의 `name` 속성에 저장한다. 


```js
var Person = function(name) {
    this.name = name;
}

console.log(new Person()); // Person { name: undefined }

var cody = new Person('Cody Lindley');
console.log(cody); // Person { name: 'Cody Lindley' }
```




다시 한번 강조하지만 `new` 키워드를 사용해 생성자 함수를 호출하면 이때의 this는 "만들어질 객체"를 참조한다. 만약 우리가 new 키워드를 사용하지 않았다면 this의 값은 Person함수가 호출된 컨텍스트(브라우저에서는 window)가 되었을 것이다.

```js
var Person = function(name) {
    this.name = name;
}

var cody = Person('Cody Lindley');
console.log(cody); // 'undefined' return 값이 없으므로
console.log(global.name); // 'Cody Lindley'
```

# 프로토타입 메소드 안의 this는 생성자 인스턴스를 참조한다.

생성자의 `prototype` 속성에 추가한 함수를 사용할 때 `this`는 메소드를 실행한 인스턴스를 참조한다.

```js
var Person = function(name) {
    this.name = name;
}

Person.prototype.whatIsName = function() {
    return this.name; // `this`는 Person을 통해 만들어진 인스턴스를 참조한다.
}

var person = new Person('doyoon');

console.log(person.whatIsName());
```

this 키워드는 `prototype` 객체에 포함된 메소드 내에서 인스턴스를 참조할 때 사용한다. 찾는 속성이 인스턴스에 없으면 프로토타입 체인을 검색한다.

```js
Object.prototype.name = 'object name';

var Person = function(name) {
    if(name) this.name = name; // if문을 추가해서 name 값이 있을때만 프로퍼티에 할당한다.
}

Person.prototype.whatIsName = function() {
    return this.name;
}

var person = new Person();

console.log(person.whatIsName()); // Object.prototype.name 프로퍼티의 값이 출력된다.
```
