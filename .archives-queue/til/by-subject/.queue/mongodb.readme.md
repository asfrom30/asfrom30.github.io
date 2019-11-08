### Drop all databases

```js
var dbs = db.getMongo().getDBNames();
for (var i in dbs) {
  db = db.getMongo().getDB(dbs[i]);
  print('dropping db ' + db.getName());
  db.dropDatabase();
}
```

# CRUD

### update and return document is not new

- [ref](https://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findAndModify)
  Set to true if you want to return the modified object rather than the original. Ignored for remove.

```js
const options = { new: true };
findAndModify(obj, obj, obj, options);
```

# in options

- upsert : upsert the document if it does not exist

### operators in query

##### $set

- [ref](https://docs.mongodb.com/manual/reference/operator/update/set/);
- override field and If the field does not exist, $set will add a new field with the specified value.
