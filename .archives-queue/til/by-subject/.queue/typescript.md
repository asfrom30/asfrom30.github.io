# Tricky part

### Example 1
```js
const currentTimebar = new CurrentTimebar(rootSelection) // it won't construct 
const currentTimebar = new CurrentTimebar(rootSelection, null) // it won't construct 
const currentTimebar = new CurrentTimebar(rootSelection, undefined) // it won't construct 

export default class CurrentTimebar {
  constructor(rootSelection, { translateX = 0, translateY = 0 }) {
    console.log(translateX, translateY);
  }
}
```

```js
const currentTimebar = new CurrentTimebar(rootSelection) // it will construct
const currentTimebar = new CurrentTimebar(rootSelection, null) // it will construct
const currentTimebar = new CurrentTimebar(rootSelection, undefined) // it will construct

export default class CurrentTimebar {
  constructor(rootSelection, { translateX = 0, translateY = 0 } = {}) {
    console.log(translateX, translateY); // will print 0, 0
  }
}
```