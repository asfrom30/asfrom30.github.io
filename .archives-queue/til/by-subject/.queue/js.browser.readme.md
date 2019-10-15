### how to fire event on file select
* [ref](https://stackoverflow.com/questions/5942821/how-to-fire-event-on-file-select)

```js
$("#file").change(function(){
         //submit the form here
});
```

```js
document.getElementById('file').onchange = function() {
    // fire the upload here
};
```


### how to clear `<input type='file'/>`

```html
document.getElementById("#mcontrol").value = "";
```



# File handling in Browser JS
* Keyword : File, Blob, Image, Canvas, Base64, ArrayBuffer, ObjectUrl

### what is base 64
* [ref](http://arabiannight.tistory.com/entry/IT%EC%9A%A9%EC%96%B4-Base64-%EB%9E%80)

* 8비트 바이너리 데이터를 6비트로 표현하는 것(ASCII만 쓰기 위해서, 특수문자 때문에)
* 3바이트가 4바이트로 변환되어 크기가 늘어나지만 표준성을 유지할 수 있다.
* base64 data의 예시
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA~~
```
### `Blob`
```
Blob.size
Blob.type
```
### `File`
* file is based on `Blob`
* get file object from `input type='file'` form
```js
const file = document.getElementsById('input').files[0];
```

### `FileReader`
* filereader는 file과 blob타입 두개를 변환 할 수 있따.
* api
```js
FileReader.readAsDataUrl() // for convert base64, see pattern
FileReader.readAsArrayBuffer()
```

* add event [ref](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload)
```js
const fileReader = new FileReader();
fileReader.onloaded = function (event) {
    event.target.result; // <-- this is what we care about
}
```
### `File` and `Blob`

### Image and Canvas
* image and canvas object is dom, you can use `appendChild` for browser rendering

### Image src
```html
<!-- object Url -->
<img src="blob:http://localhost:3000/72dc1422-285e-4d2e-b988-cc0685c1b492">
<!-- base64 -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA~~">
```

### Pattern : `file` to `base64`
```js
const fileReader = new FileReader();
fileReader.readAsDataURL(file);
fileReader.onloadend = function (event) {
    const base64 = event.target.result;
}
```
### Pattern : 'canvas' to `base64`
```js
canvas.toDataURL("image/jpg")
```




