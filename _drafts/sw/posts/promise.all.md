```js
const Q = require("q");

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1 : resolve");
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p2: reejct");
  }, 1000);
});

// Promise.all([p1, p2])
//   .then((res) => {
//     console.log('then', res);
//   })
//   .catch((err) => {
//     console.log('catch', err);
//   });

// Chaining
// Promise.all([p1, p2].map());

Q.allSettled([p1, p2])
  .then(results => {
    results.forEach(res => {
      if (res.state === "fulfilled") {
        console.log("value", res.value);
      } else {
        console.log("reason", res.reason);
      }
    });
  })
  .catch(err => {
    console.log("catch", err);
  });
```
