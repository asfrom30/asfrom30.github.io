# Intro
* 자료구조
    * 단순배열
    * 다차원배열
    * 단순 연결 리스트
    * 환형 연결 리스트
    * 이중 연결 리스트
    * 스택
    * 큐
    * 나무

# 3.1 자료구조란 무엇인가

자료구조가 복잡해져서 행위적 측면을 포함하고 있으면 알고리즘은 간단해지고, 자료 구조가 단순해지면 알고리즘은 복잡해져야 한다. 적당한 선에서 자료 구조와 알고리즘의 복잡함을 타협하는 지혜가 필요하다.

# 3.2 배열(array)
c에서 배열은 **연속된 메모리 공간을 차지하는 같은 데이터형들의 집합**이다. 배열은 정적인 데이터 형이다. 소스 코드 상에서 반드시 그 크기를 미리 정해두어야 한다는 말이다. 

```c
int arr[10]; // 정수형 배열 10개 선언
```

`arr`이라는 배열 이름의 의미는 10개의 정수가 저장된 공간의 선두번지를 의미하는 것이고. `sizeof(arr)`와 같이 하면 배열의 크기라는 값을 나타낼 뿐이다.

`arr[4]`와 `*(arr+4)`는 완전히 동일하다. 배열의 이름, 즉 메모리 공간의 선두번지는 포인터와 동일하게 취급해도 되지만 한 가지 주의점이 있다. 그것은 배열의 이름은 포인터가 아니라는 점이다. 포인터는 주소를 저장하는 '변수'이다. 하지만 배열 이름 `arr`은 주소 그 자체를 가리키는 상수에 불과하다.


# 3.4 연결리스트
* 장점
    * 재배열이 손쉽다는 것
        * 배열의 경우에는 당기고 미는 메모리 복사가 필요하지만 연결리스트의 경우에는 링크가 가리키는 방향만 바꾸어주면 된다.
* 구현
    * 첫번째 노드를 가르켜 줄사람이 없기 때문에 `head`를 만들게 된다. `head`는 일반적으로 전역변수로 선언되어 어떤 부분에서도 접근 가능하도록 개방되어 있고, 소멸되지 않는다. 
    * 제일 마지막 노드는 항상 무엇인가를 가리켜야 하는데 특별히 마지막을 나타내는 `tail` 노드를 만들어서 마지막 노드임을 표시하게 한다.
    * 이 방법은 머리와 꼬리 노드를 모두 정의해서 낭비가 있을것 같지만 일관성을 유지하고 코딩이 쉽다는 점에서 몇바이트 정도의 낭비는 무시할 수 있다.


# 3.7 스택
스택, 큐, 트리와 같은 자료 구조는 자신이 행위적 측면을 포함하고 있는 자료구조이다. 이런 자료구조는 제한된 접근방식을 규정하고 있다. **이러한 제한된 접근 방식의 행위적 측면을 부여받은 자료 구조를 추상적 자료구조(Abstract Data Structur)라고 한다.** 특히 스택은 아주 중요한 자료 구조이며 시스템 내부의 기본동작에서부터 고급 알고리즘까지 다양하게 활용되고 있다.