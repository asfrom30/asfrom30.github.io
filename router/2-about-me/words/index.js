$(document).ready(function() {
  init();
  initForDev(false);
});

function init() {
  addListenerToSelector();
  clickWordsAllSelector();
}

function initForDev(flag) {
  if(!flag) return; 
  $('.category-selector input')[1].click();
}

function addListenerToSelector() {
  $('.category-selector input').click(function(event) {
    const key = event.target.id;
    const posts = getSelectedPosts(key);
    inflatePostElements(posts);
  });
}

function clickWordsAllSelector() {
  $('.category-selector input')[0].click();
}

function inflatePostElements(posts) {
  const $_postContainer = getPostContainer_$();
  cleanJqueryElem($_postContainer);
  for (let post of posts) {
    const html = inflateOnePostHtml(post);
    $_postContainer.append(html);
  }
}

function inflateOnePostHtml(post) {
  const title = post.title;
  const author = post.author || '-';
  const url = post.url;
  const html =
  `
  <a class="card-item" href="${url}">
    <div class="card-item__title">${title}</div>
    <div class="card-item__author">${author}</div>
  </a>
  `;
  return html;
}

function getSelectedPosts(key) {
  return words[key];
}

function getPostContainer_$() {
  return $('.post-container');
}

function cleanJqueryElem($) {
  $.empty();
}
