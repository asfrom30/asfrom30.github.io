import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

type Tag = {
  tag: string;
  tagName: string;
  /** 이 태그가 붙은 (발행된) 글 수 */
  count: number;
};

/**
 * Builds a de-duplicated, sorted tag list from posts.
 *
 * - Drafts and scheduled posts are excluded via `postFilter()`
 * - `tag` is the slug used in URLs; `tagName` is the original label for display
 * - Uniqueness is based on the slug (so differently-cased labels collapse)
 */
export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
  const published = posts.filter(postFilter);
  const counts = new Map<string, number>();
  for (const post of published) {
    for (const slug of new Set(post.data.tags.map(slugifyStr))) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }
  const tags: Tag[] = published
    .flatMap(post => post.data.tags)
    .map(tag => ({
      tag: slugifyStr(tag),
      tagName: tag,
      count: counts.get(slugifyStr(tag)) ?? 0,
    }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
}
