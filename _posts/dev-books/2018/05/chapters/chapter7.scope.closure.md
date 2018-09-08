# 자바스크립트의 스코프

자바스크립트에서 스코프(scope)는 코드가 실행되는 컨텍스트이며 - "변수 영역", "실행 영역", "유효 범위" -, 전역 스코프, 지역스코프(함수스코프), eval 스코프 크게 세 종류로 구분된다.

...

전역 스코프는 스코프 체인의 최상위 수준 또는 최종 도착점이기 때문에 전역 스코프에서 정의된 변수는 어디서든 사용할 수 있다.


```js
//eval scope
eval('var foo = 3; console.log(foo);');
```

```
Note :
* 자바스크립트 환경에서 함수 스코프나 eval 스코프는 무한정 만들 수 있지만 사용할 수 있는 전역 스코프는 하나뿐이다.
* 함수를 포함한 함수는 서로 연결된 실행 스코프(execution scope)를 만들며, 이렇게 연결된 실행 스코프를 스코프 체인이라 부른다.
```

# 자바스크립트에는 블록 스코프가 없다.
자바 스크립트에서 조건문과 반복문은 스코프를 만들지 않으므로 조건문과 반복문 사이에도 변수를 서로 재정의할 수 있다.

```js
var foo = 1;

if(true) {
    for(var i = 3; i <= 5; i++) {
        var foo = i; // scope가 생기지 않으므로 상위 객체의 foo의 값을 변경한다.
        console.log(foo); // 3, 4, 5
    }
}

console.log('foo is ', foo); // 결과는 5

console.log('===========================');
foo = 1;
function doIt() {
    if(true) {
        for(var i = 3; i <= 5; i++) {
            var foo = i; // 함수 안에서는 scope가 생기므로 함수안의 foo 값만 변경된다.
            console.log(foo); // 3, 4, 5
        }
    }
}

doIt();
console.log('foo is ', foo); // 결과는 1
```

# 함수 내에서 변수 선언시 var를 사용해 스코프 문제 피하기
자바스크립트에서는 var 키워드 없이 변수를 선언하면 (설령 함수 스코프에서 선언했다 하더라도) 지역 스코프가 아닌 전역 스코프에 변수가 추가 된다.

```js
// 함수 안에서 var 선언하지 않으면 전역스코프에 추가
function foo() {
    varFoo = 'foo';
}

foo();
console.log(varFoo); // 'foo'


// 함수 안에서 var 선언
function bar() {
    var varBar = 'bar';
}

bar();
console.log(varBar); // undefined error
```

# 스코프 체인(문법적 스코프)

자바스크립트는 변수를 찾을 때 스코프의 계층 구조에 기반한 검색 체인을 거슬로 올라가며 추적한다.

```js
var name = 'doyoon';

var func1 = function() {
    var func2 = function() {
        console.log(name); // 'doyoon'
    }();
}();
```

func2 -> func1 -> 전역스코프 순으로 검색하고 없으면 undefined를 반환한다.

# 스코프 체인을 검색할 때는 가장 처음 발견한 값을 반환한다.

변수를 겁색할 때는 스코프체인에서 가장 가까운 스코프부터 검색하며, 값을 찾으면 상위 스코프에 같은 이름의 값이 있더라도 찾은 값을 반환하고 검색을 종료한다.

# 스코프는 함수를 정의할 때 결정된다.

스코프 체인은 함수를 실행한 위치가 아닌 정의한 위치에 의해 결정되기 때문에 유추하기 쉽다. 이를 가리켜 문법적 스코핑(lexical scoping)이라고도 한다. 오랫동안 열심히 생각해볼 문제이기는 하다. 자바스크립트 코드를 볼 때 대부분의 사람들이 어려워하는 곳이 바로 이 부분이기 때문이다.

스코프 체인은 함수를 호출하기 전에 이미 만들어지며, 이 덕분에 우리는 클로져를 만들 수 있따. 예를 들어 다른 함수 내부에 정의되어 있다가 전역 스코프로 반환된 함수가 있다고 가정해 볼때, **반환된 함수는 전역 스코프에 있더라도 스코프 체인을 통해 부모함수에 여전히 접근할 수 있다.**

다음 코드를 보자. 익명함수를 반환하여 변수에 담아 실행했을 때 여전히 `parentFunction`의 프로퍼티에 접근할 수 있다. 익명함수가 `parentFunction`내부에서 정의되었기 때문에 실행될 때 `parentFunction`의 스코프에 접근할 수 있다. 이를 가르켜 클로저라 부른다.

```js
var parentFunction = function() {
    var foo = 'foo';
    return function() {
        console.log(foo);
    }
}

var func = parentFunction();
func(); // 'foo'
```

**스코프 체인은 정의할 때, 문자 그대로 코드를 작성할 때 정해진다. 함수를 어느 곳에서 사용해도 스코프 체인은 변하지 않는다.**

# 스코프 체인이 클로저를 만든다.

```js
var countFunc = function parentCountFunc() {
    var count = 0;
    return function() {
        return ++count;
    }
}(); // 바로 익명함수를 반환한다.
console.log(countFunc()); // parentCountFunc에 있는 count에 접근한다.
console.log(countFunc());
console.log(countFunc());
```
클로저에 대해 더 자세히 알고 싶다면 [링크](jibbering.com/faq/notes/closures)