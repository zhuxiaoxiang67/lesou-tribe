export type CategorySlug =
  | 'legal'          // 法律答疑
  | 'business'       // 企业寻道
  | 'literature'     // 文史钩沉
  | 'music'          // 韶乐缭绕
  | 'dance'          // 舞动人生
  | 'calligraphy'    // 墨色氤氲
  | 'photography'    // 映像世界
  | 'writing';       // 笔墨春秋

export type MediaType = 'article' | 'image' | 'audio' | 'video';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;          // emoji 或图标名
  longDescription?: string;
  instruments?: string[]; // 音乐板块的乐器列表
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface Work {
  id: string;
  title: string;
  category: CategorySlug;
  type: MediaType;
  summary: string;
  content: string;
  coverImage?: string;
  mediaUrl?: string;        // 音频/视频URL或视频嵌入链接
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  comments: Comment[];
  tags?: string[];
}
