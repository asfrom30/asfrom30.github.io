# Scroll padding

```css
/* Trick */
::-webkit-scrollbar {
  width: var(--scrol-width);
  height: 8px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: rgb(139, 139, 139);
  border: 2px solid var(--tg-bg-grey-2); /* padding trick */
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3b3b3b;
}
::-webkit-scrollbar-thumb:active {
  background: #3b3b3b;
}
::-webkit-scrollbar-track {
  background: transparent;
  border: 0px solid red; /* padding trick */
  border-radius: 10px;
  scroll-padding: 20px;
  scroll-margin: 20px;
}
::-webkit-scrollbar-track:hover {
  background: transparent;
}
::-webkit-scrollbar-track:active {
  background: transparent;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
```
