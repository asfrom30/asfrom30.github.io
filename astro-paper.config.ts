import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://asfrom30.github.io/",
    title: "회사밖생존기",
    description: "김도윤의 글",
    author: "김도윤",
    profile: "https://github.com/asfrom30",
    ogImage: "default-og.jpg",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
    leftCompanyOn: "2024-10-31",
  },
  posts: {
    perPage: 10,
    perIndex: 10,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    // 동적 OG 이미지는 코드용 글꼴로 그려 한글이 깨져서 끄고 public/default-og.jpg를 쓴다
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/asfrom30" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});