import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

type Post = CollectionEntry<"posts">;

// 글 아래 "인기 글 / 최근 글 / 관련 글" 목록 (lethain.com 구성).
// 모두 getSortedPosts()로 정렬·필터된(발행된, 최신순) 목록을 받는다.

/** 인기 글: frontmatter `featured: true`인 글 */
export function getPopularPosts(sorted: Post[], exclude?: Post, limit = 5) {
  return sorted
    .filter(post => post.data.featured && post.id !== exclude?.id)
    .slice(0, limit);
}

/** 최근 글: 최신순 */
export function getRecentPosts(sorted: Post[], exclude?: Post, limit = 5) {
  return sorted.filter(post => post.id !== exclude?.id).slice(0, limit);
}

/** 관련 글: 겹치는 태그가 많은 순, 같으면 최신순. 겹치는 태그가 없는 글은 뺀다 */
export function getRelatedPosts(sorted: Post[], current: Post, limit = 5) {
  const tags = new Set(current.data.tags.map(slugifyStr));
  return sorted
    .filter(post => post.id !== current.id)
    .map((post, index) => ({
      post,
      index,
      shared: post.data.tags.filter(tag => tags.has(slugifyStr(tag))).length,
    }))
    .filter(item => item.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, limit)
    .map(item => item.post);
}
