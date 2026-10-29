import type { UIStrings } from "../types";

export default {
  nav: {
    home: "홈",
    posts: "글",
    about: "소개",
    archives: "보관함",
    search: "검색",
  },
  post: {
    publishedAt: "발행",
    updatedAt: "수정",
    sharePostIntro: "공유하기:",
    sharePostOn: "{{platform}}에 공유",
    sharePostViaEmail: "이메일로 공유",
    backToTop: "맨 위로",
    goBack: "뒤로",
    editPage: "이 글 고치기",
    previousPost: "이전 글",
    nextPost: "다음 글",
    popular: "인기 글",
    recent: "최근 글",
    aboutAuthorIntro: "안녕하세요, {{author}}입니다.",
    aboutAuthorLink: "저에 대해 더 보기",
    followIntro: "새 글은",
    followRss: "RSS",
    followOutro: "로 받아 볼 수 있어요.",
  },
  pagination: {
    prev: "이전",
    next: "다음",
    page: "페이지",
  },
  home: {
    socialLinks: "링크",
    featured: "인기 글",
    recentPosts: "최근 글",
    allPosts: "모든 글",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    postsTitle: "글",
    postsDesc: "지금까지 쓴 모든 글",

    archivesTitle: "보관함",
    archivesDesc: "모든 글을 날짜별로",

    searchTitle: "검색",
    searchDesc: "글 검색",
  },
  a11y: {
    skipToContent: "본문으로 건너뛰기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    toggleTheme: "밝은/어두운 화면 전환",
    searchPlaceholder: "글 검색...",
    noResults: "검색 결과가 없어요",
    goToPreviousPage: "이전 페이지로",
    goToNextPage: "다음 페이지로",
  },
  notFound: {
    title: "404",
    message: "페이지를 찾을 수 없어요",
    goHome: "홈으로",
  },
} satisfies UIStrings;
