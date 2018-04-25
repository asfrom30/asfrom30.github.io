# Frontfomatter
* http://jekyllrb-ko.github.io/docs/frontmatter/

```YAML
---
layout
permalink
published
category
categories
tags
---
```
### Permalink
```YAML
---
layout: page
permalink: /categories/
title: Categories
---
```

# Assign
```
{%-  assign category_name = 'books' -%}
{% for post in site.categories.books %} // 제어문
{{}} // 변수
```

# Pattern
### 모든 페이지 display
```html
{%- for path in page_paths -%}
    {%- assign my_page = site.pages | where: "path", path | first -%}
    {%- if my_page.title -%}
    <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
    {%- endif -%}
{%- endfor -%}
```