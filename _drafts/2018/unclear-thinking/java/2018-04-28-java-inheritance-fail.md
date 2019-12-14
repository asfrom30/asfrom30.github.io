---
layout: post
title:  "상속의 실패"
categories: [unclear-thinking] 
tags: [sw, java, oop]
---

# 요약
* 이 생각은 [미디엄의 이 글](https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53)에 대한 공부이다.
* 부모 클래스의 코드 변경이 자식 클래스에 미치는 영향이 있다.

# 본문
아래 코드는 아주 간단한 코드이다. 부모 클래스에서는 객체를 담아두는 역할만 하고, 부모 클래스를 상속 받은 자식 클래스는 몇개가 담겨있는지 `count` 변수에 저장하는 코드이다.

```java
public class Parent {
	
	private List objectList = new ArrayList<Object>();

	public void add(Object object) {
		objectList.add(object);
	}
	
	public void addAll(Object[] objects) {
		for(int i=0; i < objects.length; i++) {
			Object object = objects[i];
			objectList.add(object); // 나중에 이 코드를 변경하는데, 자식객체에 까지 영향을 미친다.
		}
	}
	
}

public class Child extends Parent{

	public int count = 0;
	
	@Override
	public void add(Object object) {
		super.add(object);
		count++;
	}

	@Override
	public void addAll(Object[] objects) {
		super.addAll(objects);
		count += objects.length;
	}
}


public static void main(String[] args) {
    
    ChildObjectListCounter objectListCounter = new ChildObjectListCounter();
    Object[] objects = new Object[10];
    
    objectListCounter.addAll(objects);
    System.out.println(objectListCounter.count);
    
}
```

10개의 배열객체를 선언하여 더했으니 `count`변수에 담긴 값은 10이다. 문제는 `objectList.add(object);` 코드를 `this.add(object);`와 같이 변경할 때 일어난다. 나 역시도 함수의 재사용을 위해서 분명 코드를 `this.add(object);`으로 고쳤을 것이다. [this가 참조하는게 자신이 아니라 자식 객체일 수 있다.] 즉, 상속을 받음과 동시에 자식 객체의 메소드 오버라이드된 `add()`를 또 호출하면서 결과적으로 `count++`가 실행되고 `addAll()`의 `count += objects.length;`도 실행되어 두번 더해지는 결과가 나오게 된다. 결과값은 20

코드는 부모 클래스에서만 변경이 일어났지만, 오버라이드 된 자식객체의 메소드에 의해서 예측 불가능한 결과가 나오게 된다.

글쓴이는 이렇게 쓴 코드는 좋지 못하다고 해서 솔루션으로 `Contain`과 `Delegate`를 제시한다. 아래와 같은 걸 의미하는데 그렇다면 다른 객체를 참조, 소유하기 때문에 더 안좋은 것 아닌가?

```java
Class PoweredDevice {
}
Class Scanner inherits from PoweredDevice {
  function start() {
  }
}
Class Printer inherits from PoweredDevice {
  function start() {
  }
}
Class Copier {
  Scanner scanner
  Printer printer
  function start() {
    printer.start()
  }
}
```

물론 인터페이스를 사용해서 상위 모듈에 의존하면 된다고는 하지만. 글쓴이는 또 이렇게도 말하는데

> Object Oriented languages don’t make Containand Delegate easy to do. They were designed to make Inheritance easy.

아마 자바스크립트 였으면 인터페이스 없이 콜백 함수를 던져서 실행하면 되는 것을 상속과 인터페이스, 정적 형타입을 생각해서 작성해야 되서 번거로운 것을 걱정했나?


아무튼 글과 생각은 계속 수정할 것이다.


# 더 생각하면 좋을 것들
* 이펙티브 자바에 왠지 이런 케이스가 있을 것 같은데
* 자바 안티패턴에는 이런 케이스가 존재하나?
