# 4장 Function()

`Function()` 생성자는 매개변수를 무한정 가질 수 있지만 마지막 매개변수는 항상 함수의 몸체를 구성할 코드를 나타내는 문자열이여야 한다.

```js
var addFunction = new Function('num1', 'num2', 'return num1 + num2');
```

* Note
    * Function() 생성자를 사용하는 방식은 eval()을 이용해 변수를 해석하기 때문에 그리 추천할 방법은 아니다. eval()은 불필요한 부하만 증가시킨다.
    * Function()생성자를 사용할때는 new키워드가 있으나 없으나 결과가 같다.
        ```js
        new Function('x', 'return X');  
        Function('x', 'return X'); // 두개는 동일하다.
        ```
    * Function() 생성자를 직접 호출하면 클로저가 생기지 않는다.

실제로는 아래와 같은 방법이 더 많이 쓰이고, 익숙할 것이다.

```js
var addFunction = function(num1, num2) {
    return num1 + num2;
}

function addFunction(num1, num2) {
    return num1 + num2;
}
```

    

### 함수를 정의하는 세 가지 방법
```js
// 함수 생성자
var addConstructor = new Function('x', 'y', 'return x + t');

// 함수 선언문
function addStatement(x, y) {
    return x + y;
}

// 함수 표현식
var addExpression = function(x, y){
    return x + y;
}

// 일부에서는 named function express이라는 네번째 방법도 있다고 주장한다.
var add = function add(x, y){
    return x + y;
}
```

### 함수를 호출하는 네 가지 패턴

```js
// 함수 패턴
var myFunction = function() {

}
myFunction();

// 메소드 패턴
var myObject = { myFunction : function() {

}}
myObject.myFunction();

// 생성자패턴
var Human = function() {
    this.age = 33;
}
var human = new Human();

// apply()와 call() 패턴
var greet = {
    runGreet : function() {
        console.log(this.anme, arguments[0], arguments[1]);
    }
}

var cody = {name : 'cody'};
var lisa = {name : 'lisa'};

// runGreet 함수가 마치 cody 객체의 메소드인 것처럼 호출한다. this를 호출할 수 있다.
greet.runGreet.call(cody, 'foo', 'bar'); // 실행된다 'cody foo bar'가 기록된다.
greet.runGreet.apply(lisa, ['foo', 'bar']); // 실행된다 'lisa foo bar'가 기록된다.
```


코드에서 자주 보게 될 패턴이니만큼 네 개의 호출 패턴을 충분히 숙지하고 사용하자.

