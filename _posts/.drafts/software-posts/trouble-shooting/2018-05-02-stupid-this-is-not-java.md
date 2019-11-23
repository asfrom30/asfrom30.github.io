---
layout: post
title:  "멍청아, 이건 자바가 아니야"
categories: [trouble-shooting] 
---

ES5에서 상속을 구현하는 도중. 자식 클래스에서 선언된 메서드가 `undefined`를 계속 알렸다. 이건 자바가 아니야.. 코드의 선언 위치도 중요하다. 아래와 같은 상속을 위한 코드가 뒤에 선언되면 자식클래스의 메서드가 삭제 되어 버린다. 먼저 상속을 선언하고, 그다음에 자식클래스의 메서드를 선언해야지. 스크립트는 순서가 항상 중요하다는 것을 왜 자꾸 까먹니

```js
WeatherStation.prototype = Object.create(Subject.prototype);
WeatherStation.prototype.constructor = WeatherStation;
```

와 선언 위치를 아래와 같이 변경해라.

```diff
var Subject = require('./subject');

function WeatherStation(temperature, humidity) {
    Subject.call(this);
    this.temperature = temperature;
    this.humidity = humidity;
}

+ WeatherStation.prototype = Object.create(Subject.prototype);
+ WeatherStation.prototype.constructor = WeatherStation;

WeatherStation.prototype.getTemperature = function() {
    return this.temperature;
}

WeatherStation.prototype.getHumidity = function() {
    return this.humidity;
}

WeatherStation.prototype.update = function() {
    console.log(this.observerList.length);
}

WeatherStation.prototype.toString = function() {
    return 'Circle > ' + Shape.prototype.toString.call(this);
};

- WeatherStation.prototype = Object.create(Subject.prototype);
- WeatherStation.prototype.constructor = WeatherStation;
```
