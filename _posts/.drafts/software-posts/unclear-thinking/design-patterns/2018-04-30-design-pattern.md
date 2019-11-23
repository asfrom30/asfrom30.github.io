---
layout: post
title:  "옵저버 패턴"
categories: [unclear-thinking] 
tags: [sw, js vs java, design pattern]
---

# 정의
* [위키피디아 의역](https://en.wikipedia.org/wiki/Observer_pattern)
    * 정의
        * 옵저버 패턴은 subject와 subject dependents(observers)로 이루어진다. 
        * 상태변화를 자동으로 알린다.
        * 보통 옵저버의 메서드 하나를 호출한다.
    * 용도
        * 보통 이벤트 드리븐 소프트웨어 안에서 분산 이벤트 핸들링 시스템을 구현한다.
        * 옵저버 패턴은 MVC 패턴의 핵심 부분이다.



* Headfirst design pattern book
    * one-to-many


# UML
![Observer Pattern UML](resources/observer-pattern-uml.png)

# 실습 - 기상스테이션
![Weather Station UML](resources/weather-station-uml.png)

# 자바

### java.util.observerble
직접 구현하든 `java.util.observerble`를 사용하든 옵저버 패턴만 잘 이해가고 있으면 된다.
* `java.util.observerble`은 인터페이스가 아닌 클래스이기 때문에 재사용성에 제약이 생긴다.
* `java.util.observerble`은 인터페이스가 없기 때문에 자바에 내장된 Observer API하고 잘 맞는 클래스를 직접 구현하는 것이 불가능하다.
    * 예를 들어 멀티스레드로 구현한다거나 하는 일이 아예 불가능하다.


# 자바스크립트

> 자바 스크립트는 느슨한 타입을 사용하고 어디서든 객체를 쓸 수 있으므로(정확한 결과가 보장되진 않지만), 어떤 면에서는 자바스크립트의 객체는 모두 다형성을 갖고 있다고 할 수 있습니다. - 러닝 자바스크립트





# 생각한 것들

pull 방식이 훨씬 나은것 같다. push 방식으로 짜게 되면 주고 싶은 데이터를 추가하려면 각 메서드들을 또 계속해서 변경해야 하므로 `Weather` 객체를 직접 줌으로써 가져가고 싶은 데이터를 `Observer`에서 직접 선택하게 하는게 더 좋을 것 같다. 데이터 메시지 객체를 만들어도 되지만 처음부터 그럴 필요는 없고 `Weather`객체를 먼저 던지는 걸로 프로그래밍 하고, 필요에 의해 새 객체를 만들지 판단하면 좋을 것 같다.

```java
public void pushData(int temperature, int humidity) {
		// TODO Auto-generated method stub
}
```

# 더 생각해보기
* 내생각 : 함수형 사고 책에서 읽었던 구문과 관련이 있나? 객체지향이 발전하게 된 이유는 GUI의 버튼을 각각 제어하기 위해서.

