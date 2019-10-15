



### object has property check

```js
const obj = {
  a: 'hello'
}

obj.hasOwnProperty('a');

```


### Object and Array copy
* deep copy
```js

```
* shallow copy
```js
Object.assign()
```

* ref more (https://scotch.io/bar-talk/copying-objects-in-javascript)

### Array.prototype.splice

* insert one item
```js
[].splice(1, 0, {item})
```
* remove and insert
```js
[].splice({index}, {length}, {item});
```

### Array.prototype.forEach


### Chaingin Object's type in js
* [ref](https://stackoverflow.com/questions/3167211/changing-an-objects-type-in-javascript)

```js
obj.__proto__ = CustomType.prototype;
obj.constructor.call(obj);
```