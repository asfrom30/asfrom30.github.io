# Do not sepearte code with index.js

웹팩에서 우선순위를 `index.js`로 잡아서 `index.vue`를 build하지 않는다. 

```html
<script src="./ctrl.js"></script> // right
<script src="./index.js"></script> // do not use this pattern
```

### init value when trip around

- 페이지를 이동했다가 다시 돌아오면 tempSumd 은 기억되서 계속해서 증가한다. 그렇게 하지 않고 싶으면.

```js
let tempSum = 0;

export default {
  created: function() {
    tempSum++;
  },
};
```

아래와 같이 변경해야 한다.

```js
export default {
  data: function() {
    return {
      tempSum = 0,
    }
  },
  created: function() {
    tempSum ++;
  }
}
```

### Important where to be declared.

아래와 같이 선언하면 다른 페이지로 라우팅 하더라도 setInterval 이 살아 있게 된다.

```js
export default {
  mounted: function() {
    runTimeService();
  },
};

function runTimeService() {
  const mSecPerFrame = 16.6666666667;
  const GazeLinechartContainer = getGazeLinechartContainer();
  const TimelineSeekbar = getTimelineSeekbar();

  vue.interval = setInterval(function() {
    if (vue.onPlayFlag) {
      GazeLinechartContainer.notifyEvent('updateCurrentTime', vue.sum);
      TimelineSeekbar.notifyEvent('updateCurrentTime', vue.sum);
      vue.sum += mSecPerFrame;
    }
  }, mSecPerFrame);
}
```

interval 인스턴스를 지우려면 아래와 같이 선언하던가

```js
export default {
  mounted: function () {
    runTimeService();
  }
  methods: {
    runTimeService: function() {
      const mSecPerFrame = 16.6666666667;
      const GazeLinechartContainer = getGazeLinechartContainer();
      const TimelineSeekbar = getTimelineSeekbar();
      const that = this;
      this.interval = setInterval(function() {
        if (vue.onPlayFlag) {
          GazeLinechartContainer.notifyEvent('updateCurrentTime', that.sum);
          TimelineSeekbar.notifyEvent('updateCurrentTime', that.sum);
          that.sum += mSecPerFrame;
        }
      }, mSecPerFrame);
    },
  }
}
```

detroy 되기 전에 인스턴스를 파괴하도록 한다.

```js
beforeDestroy: function() {
  clearInterval(this.interval);
},
```


### Why v-model does not work with a vuejs filter 
* [ref](Why v-model does not work with a vuejs filter)

