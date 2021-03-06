---
layout: book
title:  "Functional programming"
date:   2018-04-21 14:30:43 +0900
categories: [books]
tags: [sw, book, javascript, functional programming]
---

# 1장 - 왜
자바가 메모리 관리를 쉽게 해줬다면 함수형 프로그래밍 언어는 다른 빌딩블록들을 고수준 추상적 개념으로 대체해준다.

... 

> **객체지향 프로그래밍은 움직이는 부분을 캡슐화하여 코드 이해를 돕고, 함수형 프로그래밍은 움직이는 부분을 최소화하여 코드 이해를 돕는다.** - 마이클 페더스

객체지향 프로그래밍 구조에 대해 생각해보라. 캡슐화, 스코핑, 가시성등 메커니즘은 상태 변화를 누가 볼 수 있는지에 대한 세밀한 제어를 위해 존재한다. 상태에 스레드까지 곁들이면 골칫덩이는 더욱 커진다. 이러한 메커니즘이 바로 페더스가 말하는 '움직이는 부분'이다. 함수형 언어는 이런 가변 상태를 제어하는 메커니즘을 구축하기보다. 그런 '움직이는 부분'을 아예 제거하는데 주력한다. 언어가 오류가 발생하기 쉬운 기능을 적게 노출하면 개발자가 오류를 만들 가능성이 줄어든다는 이론에 따른 것이다. 

...

함수형 개발자는 적은 수의 자료구조와 그것들을 잘 이해하기 위한 최적화된 방법을 만들기를 선호한다. 객체지향형 개발자는 항상 새로운 자료구조와 그것에 부착된 메서드를 만든다. 클래스와 통신 메시지를 만드는 것이 지배적인 객체지향 패러다임이다. 모든 자료구조를 캡슐화하면 메서드 수준의 재사용보다는 큰 프레임워크 스타일의 재사용을 선호하게 된다. 함수형 프로그래밍 구조는 세부적인 단계에서 쉽게 코드를 재사용할 수 있게 한다.

# 2장 전환


# Insights
> 나 역시 더는 가비지 컬렉션이 없는 언어로 코딩하고 싶지 않다. 이제는 고수준의 추상화를 통해 복잡한 비즈니스 문제를 풀 궁리를 하지, 까다로운 저수준 문제는 더 이상 생각하고 싶지 않다. 자바는 메모리 관리에 대한 어려운을 줄여주었고 나는 이를 향유하고 있다. -`malloc`에 시달리기엔 인생은 너무 짧다. ... 시간이 갈수록 개발자는 지루한 일들을 언어나 런타임에 점점 더 맡기게 된다. 애플리케이션을 만들면서 직접 메모리를 제어하지 않는다는 것을 조금도 후회하지 않는다. 그런 일에 무관심 해졌기 때문에 좀 더 중요한 문제들에 집중할 수 있다. 

나는 이런것들이 기술이라고 생각했는데, 다른 문제에 집중해야하는 것. 비즈니스 로직, 도메인 영역에 집중하는 통찰력이 더 중요한 것 같다.


