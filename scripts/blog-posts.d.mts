interface BlogText {
  en: string;
  sk: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  readMin: number;
  author: string;
  tag: BlogText;
  keywords: BlogText;
  title: BlogText;
  description: BlogText;
  excerpt: BlogText;
  body: BlogText;
}

export const POSTS: BlogPost[];
