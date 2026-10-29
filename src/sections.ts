// 상단 메뉴와 푸터에 나오는 갈래. 주소(/journal 등)와 순서도 이 배열을 따른다.
// name은 메뉴·페이지 제목·브레드크럼에 그대로 쓴다.
// - journal: src/content/posts의 글 전부
// - service: src/content/services의 md 파일
// - role, proposal: src/pages/<slug>.astro에 코드로 직접 쓴다
export const SECTIONS = [
  { slug: "journal", name: "일지" },
  { slug: "service", name: "서비스" },
  { slug: "role", name: "역할" },
  { slug: "proposal", name: "제안서" },
] as const;

export const sectionName = (slug: (typeof SECTIONS)[number]["slug"]) =>
  SECTIONS.find(s => s.slug === slug)!.name;
