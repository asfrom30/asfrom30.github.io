# `_docs`

`index.yml` is not working this tag. only folder trees effect `data` object property

* case 1
```
// folder tree
.
|-- nav-list.yml
|-- tag-sorter
        |-- sw.yml/
        |-- mech.yml/
        |-- index.yml/
```

* above case you 
```
site.data.nav-list.{prop}
site.data.tag-sorter.sw.{prop}
site.data.tag-sorter.mech.{prop}
site.data.tag-sorter.index.{prop}
```

# How `category` attribute affect `url` path

* case 1
```
// filename : 2018-07-22-title
---
title:  "Mocha Test Framework Basic - 1/3"
categories: [a,b,c]
---
```
above post will have url which is `/a/b/c/2018/07/22/title`

* case 2

```
// filename : 2018-07-22-title
---
title:  "Mocha Test Framework Basic - 1/3"
categories: []
---
```
above post will have url which is `/2018/07/22/title`