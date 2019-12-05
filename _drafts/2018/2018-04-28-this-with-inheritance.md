---
layout: post
title:  "문맥상 this vs 메모리 this"
categories: [unclear-thinking] 
tags: [sw, java, oop]
---

문맥상 this는 부모클래스 안에서 선언된 것 처럼 보이지만 상속 이후에는 자식 객체의 메소드를 먼저 찾는다. this가 참조하는게 자신이 아니라 자식 객체일 수 있다.

```java
/* Parent Class */
public class Parent {
	
	public void print() {
		System.out.println("I'm parent");
	}
	
	public void hello() {
		this.print();
	}
}


/* Child Class */
public class Child extends Parent {

	@Override
	public void print() {
		System.out.println("I'm child");
	}

	@Override
	public void hello() {
		super.hello();
	}
}


/* Run main */
public static void main(String[] args) {
    Parent child = new Child();
    child.hello();
}
```

짧은 코드이므로 글을 읽기 전에 본인도 충분히 답을 생각해 보았으면 좋겠다.

`Main` 클래스 안에서 `child.hello()`는 무엇이 출력이 될까. 흐름을 따라가보면 `child.hello()`는 `super.hello()`를 호출하고 `Parent`에서 `hello()`는 `this.print()`를 호출한다. `Parent`에서 `this`를 쓰기 때문에 마치 `Parent`에 선언된 `print()`를 호출한다고 생각하여 "I'm parent"가 나온다고 생각 할 수 있으나 결과는 "I'm child"이다. 근거에 의해 정확히 답을 맞췄다면 더 이상 읽을 필요가 없다. 

child객체를 업캐스팅하여 `Parent`클래스에 담아서 그랬을 수도 있지만 그렇지 않다. `Parent child = new Child();`을 `Child child = new Child();`로 바꾸어도 결과값은 동일하다. 사실 이렇게 생각하는 것 자체가 무의미 하다. 캐스팅은 단지 껍데기일 뿐이며 생성된 객체는 변하지 않는다.

여기서 부터는 내 생각이다. 정확한 근거를 찾을 수 없어서 차츰 일단 이정도로 이해하고 넘어가기로 했다. 코드에서 보기에 `this.print()`를 호출하는 것처럼 보이지만 실제 런타임에서는 자식객체 메모리에서 모든 동작들이 이루어지고 있다. `this.print()`는 부모에서 선언되어있지만 런타임 호출은 자식에서 이루어지는 것 같다. 따라서 자식에 먼저 해당 `print()`메서드가 있는지 확인하고 있으면 실행하고 없으면 부모에 있는 `print()` 메서드를 실행한다.

당연한 것이지만 리마인드를 위해서 조금 더 언급하자면 
* 자식 `print()`에서 `super()`를 선언하면 자식과 부모의 `print()`를 각각 모두 호출하고
* 자식 `print()`를 삭제하여 오버라이딩하지 않으면 부모 `print()`만 출력된다.


여기서 이어지는 생각은 `super()`를 지우면 안되겠다.(`super()`를 지울때는 생각을 조금 깊게 할 필요가 있겠다.)아니면 상속받은 객체에서 `super()`를 사용할때 다른 메서드를 참조하고 있지는 않은지 확인해야 겠다.

### 같이 읽어보면 좋은 글들
* https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53#.ynnh8ze2h
* [상속의 실패]({{site.url}}/unclear-thinking/2018/04/28/java-inheritance-fail.html)

### 더 생각하면 좋을 것들
* 자바스크립트의 프로토타입 체인이랑 비슷한거 같은데..