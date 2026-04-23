import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Eye } from 'lucide-react';
import type { Work } from '../../types';
import { getCategoryBySlug } from '../../data/mockData';

interface WorkCardProps {
  work: Work;
}

const typeLabels: Record<string, string> = {
  article: '图文',
  image: '图片',
  audio: '音频',
  video: '视频'
};

export default function WorkCard({ work }: WorkCardProps) {
  const category = getCategoryBySlug(work.category);

  return (
    <Link
      to={`/work/${work.id}`}
      className="group block bg-white rounded-xl border border-zen-sand/50 overflow-hidden
        card-zen-hover hover:border-zen-tan/40"
    >
      {/* 封面区 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zen-parchment/60">
        {work.coverImage ? (
          <img
            src={work.coverImage}
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-5xl
            ${work.type === 'audio' ? 'bg-gradient-to-br from-zen-wood-deep/20 to-zen-gold/15' :
              work.type === 'video' ? 'bg-gradient-to-br from-zen-ink-light/15 to-zen-jade/10' :
              'bg-gradient-to-br from-zen-parchment to-zen-sand/30'}`}
          >
            <span className={work.type === 'audio' ? 'group-hover:scale-110 transition-transform duration-300' : ''}>
              {category?.icon}
            </span>
          </div>
        )}
        {/* 类型标签 */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-sm
          bg-white/85 text-zen-wood-dark">
          {typeLabels[work.type]}
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-4">
        <h3 className="font-medium text-base text-zen-ink line-clamp-1 mb-2 group-hover:text-zen-wood-dark transition-colors duration-300">
          {work.title}
        </h3>
        <p className="text-sm text-zen-ink-muted leading-relaxed line-clamp-2 mb-3">
          {work.summary}
        </p>

        {/* 元信息栏 */}
        <div className="flex items-center gap-3 text-xs text-zen-ink-muted/70 pt-3 border-t border-zen-sand/30">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {work.createdAt}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {work.viewCount}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <MessageCircle size={12} />
            {work.comments.length}
          </span>
        </div>
      </div>
    </Link>
  );
}
