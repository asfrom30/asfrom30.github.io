### How to make div not larger than its contents?

- https://stackoverflow.com/questions/450903/how-to-make-div-not-larger-than-its-contents

```css
display: inline-block;
```

# Css Flex

```html
<div style="border: 1px solid white; width: 100%; height : 400px; display:flex; flex-direction: column">
  <div style="height: 100px; border: 1px solid yellow"></div>
  <div style="flex: 1 1 auto; border: 1px solid cyan; overflow-y: scroll">
    <div style="height: 700px"></div>
  </div>
</div
```

# Flex And Text-ellipsis

- https://css-tricks.com/flexbox-truncated-text/

# Margin on child element moves parent element

```css
.parent {
  overflow: auto;
}
/* or: */

.parent {
  overflow: hidden;
}

/* or */
.parent {
  padding-top: 1px;
  margin-top: -1px;
}
```

- https://stackoverflow.com/questions/1762539/margin-on-child-element-moves-parent-element
