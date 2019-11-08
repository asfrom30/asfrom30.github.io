```js
if (err instanceof multer.MulterError) {
  // A Multer error occurred when uploading.
} else if (err) {
  // An unknown error occurred when uploading.
}
```
