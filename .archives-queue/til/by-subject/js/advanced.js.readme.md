### nested class es6

- https://stackoverflow.com/questions/28784375/nested-es6-classes

### `return` is not working in `forEach`

- https://stackoverflow.com/questions/34653612/what-does-return-keyword-mean-inside-foreach-function
  There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool.

```js
[1, 2, 3, 4, 5].forEach(function(n) {
  if (n == 3) {
    return false; // it should break out here and doesn't alert anything after
  }
});
```

### Key, Value iterate pattern

```js
for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}
```

### Array.prototype.some

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
