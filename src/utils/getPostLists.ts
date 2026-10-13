import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

// 글 아래 "인기 글 / 최근 글" 목록 (lethain.com 구성).
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
