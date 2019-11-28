### Remove all element and child

```js
// Option 1 (much slower, see comments below):

var myNode = document.getElementById('foo');
myNode.innerHTML = '';

// Option 2 (much faster):
var myNode = document.getElementById('foo');
while (myNode.firstChild) {
  myNode.removeChild(myNode.firstChild);
}
```

### Create SVG element

```js
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
```
