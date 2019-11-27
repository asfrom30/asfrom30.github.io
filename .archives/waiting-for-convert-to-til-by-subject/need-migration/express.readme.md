
### Multer upload multiple files
```js
TODO: consider about uploading multiple files
router.post('/single', upload.single('file'), (req, res) => {
  const file = req.file; // req.originalname
  const body = req.body;
});

router.post('/multiple', upload.array('file', 10), (req, res) => {
  const files = req.files; // files[0].originalname, files[0].mimetype, files[0].buffer
  const body = req.body; // key and value
});
```