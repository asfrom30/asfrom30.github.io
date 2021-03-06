const baseUrl = '/api/posts/dev/'
const domSelector = {

  categoryFilter: '.category-filter',
  tagsFilterMech: '.tags-filter--mech',
  tagsFilterSw: '.tags-filter--sw',
  tagsFilterElec: '.tags-filter--elec'
}
let posts = [];

$(document).ready(function() {
  init();
  initForDev();
});

function initForDev() {
  setTimeout(() => {
    inflatePosts(posts);
  }, 500);
}

function init() {
  fetchAllPosts();
  addListenerToAllCategoryFilterInputElems();

  // url query parser

}

/* Controller */
function fetchAllPosts() {
  $.ajax(baseUrl).done(function(data) {
    const res = JSON.parse(data);
    setGlobalPosts(res);
  });
}

function addListenerToAllCategoryFilterInputElems() {
  $('.category-and-tag-filter input').click(function() {
    const selects = getSelectsObjFromFilter();
    const filteredPosts = filterPosts(selects);
    inflatePosts(filteredPosts);
  });
}

function getSelectsObjFromFilter() {
  const category = getSelectedCategory();
  
  if(category === undefined) return;
  const tags = getSelectedTagsDependOnCategory(category);

  return { category: category, tags: tags };
}

function filterPosts(selects) {

  // TODO:  posts array check
  const filteredPosts = [];
  const option = 'and';
  // const option = 'or';
  var selectedDevCategory = selects.category;
  if(selectedDevCategory === 'all') return posts;

  for(let post of posts) {
    const categoryInPost = getCategoryFromPost(post);
    const tagsInPost = getTagsFromPost(post);
    if(selectedDevCategory !== 'all' && categoryInPost !== selectedDevCategory) {
      continue;
    }
    // and condition
    let flag = true;
    for (let selectedTag of selects.tags) {
      if(!tagsInPost.includes(selectedTag)){
        flag = false;
        break;
      }
    }
    if(flag) filteredPosts.push(post);
  }
  return filteredPosts;
}

function inflatePosts(posts) {
  const dom = getPostInflateTarget();
  const $dom = $(dom);
  $dom.empty();
  for (let post of posts) {
    const html = makePostHtml(post);
    $dom.append(html);
  }
}

/* View */
function makePostHtml(post) {
  let date = new Date(post.date);

  let html =
  `<a href="${post.url}">`
    + `<div class="filtered-post">`
    // + `<div class="filtered-post__child-post-count">${post.childPost}</div>`
    + `<div class="filtered-post__title text-ellipsis">${post.title}</div>`
    + `<div class="filtered-post__date">${date.getFullYear()}/${date.getMonth()}/${date.getDay()}</div>`
    + `<div class="filtered-post__tags-container">`;

  // append tags
  const devTags = post['dev-tags'];
  for (let tag of devTags) {
    html += `<img class="filtered-post__tags" alt="${tag}" src="/assets/images/tech-stack/${tag}.png">`;
  }

  html += `</div>`;
  + `</div></a>`;
  return html;
}

function getPostInflateTarget() {
  return $('.filtered-posts-container')[0];
}

function setGlobalPosts(_posts) {
  posts = _posts;
}

function getCategoryFromPost (post) {
  return post['dev-category'];
}

function getTagsFromPost (post) {
  return post['dev-tags'];
}

function getSelectedCategory () {
  const $inputDoms = $(domSelector.categoryFilter + ' input');
  for(let $dom of $inputDoms) {
    if($dom.checked === true) return $dom.value;
  }
}

function getSelectedTagsDependOnCategory(category) {
  let $inputDoms;
  const selectedTags = [];
  if(category === 'sw') {
    $inputDoms = $(domSelector.tagsFilterSw + ' input');
  } else if (category === 'mech') {
    $inputDoms = $(domSelector.tagsFilterMech + ' input')
  } else if (category === 'elec') {
    $inputDoms = $(domSelector.tagsFilterElec + ' input')
  }

  if($inputDoms === undefined) return null;

  for(let $dom of $inputDoms) {
    if($dom.checked === true) selectedTags.push($dom.value);
  }

  return selectedTags;
}