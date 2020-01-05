팩토리 패턴은 객체를 생성하는 객체를 만드는 것이다. 왜 할까? 객체는 그냥 만들어도 되는데..

`blob`이미지를 `jpeg` 타입으로 저장하는 코드를 생각해보자. 객체를 `new`를 사용해서 만들면 아래와 같은 코드가 될 것이다.

```js
// 모델
class ImageManager {
  save(blob) {
    const jpegImage = new JpegImage(blob);
    const width = jpegImage.getWidth();
    ...
  }
}
```

저장하는데 있어서 `width`값이 꼭 필요하지는 않지만 `JpegImage` 객체의 메소드를 호출하는 것이 눈여겨봐야할 포인트이기 때문이다. 즉 `getWidth()` 뿐만 아니라 `JpegImage` 객체의 어떤 메소드를 호출하건 해당 객체에 대해서 의존적이 된 것이다. `ImageManager`는 상위수준의 정책이다. `JpegImage`는 하위 수준의 정책이다. 상위수준의 정책에서 하위수준을 의존하는 것은 나쁘다. 왜 나쁘냐면, `getWidth()` 메서드가 바뀜으로 인해서 우리는 `ImageManager`의 `save(blob)` 메서드까지 변경해야 하기 때문이다. (자바스크립트는 엄격하지 않기 때문에 일단 러닝은 되겠지만, 이는 객체들간의 약속을 깬것이다.)

그렇다면 `JpegImage`가 아니라 `GifImage`를 저장하는 경우에는 어떨까? 이 경우에는 위 코드를 아래와 같이 바꾸어 주어야 할 것이다.

```js
// 모델
class ImageManager {
  save(blob) {
    const gifImage = new GifImage(blob);
    const width = gifImage.getWidth();
    ...
  }
}
```

`ImageManager`는 이미지 파일을 저장하기 위해서 나는 `width`가 꼭 필요하는 내가 생각하는 `getWidth()`가 구현된 객체를 꼭 반환해 주세요 라고 하는 것이 `generic`이다. `GifImage`든 `JpegImage`든 `getWidth()` 메서드만 지원하면 `save(blob)` 메서드는 이상없이 실행 될 것이다.

그렇다면 팩터리는 왜 필요할까? 팩터리는 객체를 생성해주는 역할을 하는 것이 아니라 해당 `generic`에 맞는 객체를 반환하는 것이다.

```js
class ImageManager {
  save(blob) {
    const image = ImageFactory.createImage('gif');
    const width = image.getWidth();
    ...
  }
}

class ImageFactory {
  createImage(type, blob) {
    if(type === 'gif') return GifImage(blob);
    else if(type === 'jpeg') return JpegImage(blob);
  };
}
```

`createImage`팩토리라고 썼지만 여기서 `Image` 객체가 중요한 것이 아니라, 반환된 객체가 `getWidth()`를 호출 할 수 있는지가 중요한 것이다. 즉 팩토리에서는 `getWidth()`를 지원하는 객체를 생성하는 팩토리인 것이다.

호출측에서는 `getWidth()`외의 메서드를 호출해서도 안되고, 알아서도 안된다.(자바스크립트는 그게 안되겠지만.. 주의해서 사용해야 한다는 이야기다.)

이렇게 되면 의존성 역전이 일어난다.

하위수준에서 메서드를 만들었으니까 상위수준에게 너 이 메서드만 써라고 말하는 것이 아니라. 상위 수준에서 우리는 이 메서드가 구현된 객체가 꼭 필요하니까 팩토리를 통해서만 제공 받을꺼야라고 말하게 된다. 메서드 스펙과 기대값을 상위 정책에서 정하게 되는 것이다.

서론이 길었다.

`new`를 사용하게 되면 하위 수준의 메서드에 모두 접근가능하고, 하위수준에서 메서드 스펙을 강제하지만. `Factory Pattern`을 사용하게 되면 상위 수준(비즈니스 로직)에서 인터페이스를 정의하고 이를 만족하는 객체만 반환할 수 있게 강제하므로 `의존성 역전`을 통해 하위 객체의 구현체들을 통제한다.

# 덜 정리한 것.

- 사실 싱글턴 패턴에서나오는 `getInstance`도 객체를 생성하는 역할을 한다.

# 참고한 것

- Nodejs Design Patterns 2nd Edition
- 유튜브 클린코더스 강의에 따르면 Factory는 더러울 수 밖에 없다고 한다.
