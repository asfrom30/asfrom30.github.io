


### query id must be converted to Object.id
```js
const query = { _id: mongoose.Types.ObjectId(id) };
```


### return new value

mongodb version 3.6
* [ref](https://docs.mongodb.com/v3.6/reference/method/db.collection.findOneAndUpdate/)
* `returnNewDocument`
```
db.collection.findOneAndUpdate(
   <filter>,
   <update>,
   {
     projection: <document>,
     sort: <document>,
     maxTimeMS: <number>,
     upsert: <boolean>,
     returnNewDocument: <boolean>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ]
   }
)
```