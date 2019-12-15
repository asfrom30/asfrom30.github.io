const Q = require("q");

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1-resolve"), 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("p2-reejct"), 1000);
});

Q.allSettled([p2, p2])
  .then(results => console.log("resolve", results))
  .catch(err => console.log("reject", err));

// results.forEach(res => {
//   if (res.state === "fulfilled") {
//     console.log("value", res.value);
//   } else {
//     console.log("reason", res.reason);
//   }
// });
