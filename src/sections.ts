// 상단 메뉴와 푸터에 나오는 세 갈래. 주소(/journal 등)와 순서도 이 배열을 따른다.
// - journal: src/content/posts의 글 전부
// - service: src/content/services의 md 파일
// - role: src/pages/role.astro에 코드로 직접 쓴다
export const SECTIONS = [
  { slug: "journal", name: "Journal" },
  { slug: "service", name: "Service" },
  { slug: "role", name: "Role" },
] as const;
