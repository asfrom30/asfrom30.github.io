const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1-resolve");
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p2-reejct");
  }, 1000);
});

Promise.all([p, p2])
  .then(() => console.log("resolved"))
  .catch(() => console.log("rejected"));
