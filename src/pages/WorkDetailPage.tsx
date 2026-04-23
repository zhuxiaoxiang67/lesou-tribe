import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Eye, Tag, ArrowLeft, ChevronRight } from 'lucide-react';
import AudioPlayer from '../components/common/AudioPlayer';
import VideoEmbed from '../components/common/VideoEmbed';
import CommentSection from '../components/common/CommentSection';
import { getWorkById, getCategoryBySlug } from '../data/mockData';

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const work = id ? getWorkById(id) : undefined;

  if (!work) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-kai text-zen-ink-muted mb-4">作品未找到</p>
          <Link to="/" className="text-zen-wood-dark hover:underline text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(work.category);

  // 渲染正文内容：将 \n 转为段落
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-semibold text-zen-ink-deep mt-8 mb-3 font-kai">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.match(/^\d+\.\s/)) {
        return paragraph.split('\n').map((line, lineIdx) =>
          line.trim() && (
            <p key={`${idx}-${lineIdx}`} className="text-zen-ink-light leading-loose ml-4">
              {line.replace(/^\d+\.\s/, '').replace(/^(–|—|-)\s/, '• ')}
            </p>
          )
        );
      }
      return (
        <p key={idx} className="text-zen-ink-light leading-loose mb-4 text-[15px]">
          {paragraph.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line.replace(/^(\d+)\.\s/, '$1. ').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}
            </span>
          ))}
        </p>
      );
    });
  };

  return (
    <div>
      {/* ====== 导航栏 + 面包屑 ====== */}
      <section className="bg-gradient-to-b from-zen-parchment/60 to-transparent pt-6 pb-3 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-zen-ink-muted mb-6">
            <Link to="/" className="hover:text-zen-wood-dark transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              首页
            </Link>
            <ChevronRight size={12} />
            {category && (
              <Link
                to={`/category/${category.slug}`}
                className="hover:text-zen-wood-dark transition-colors"
              >
                {category.name}
              </Link>
            )}
            <ChevronRight size={12} />
            <span className="text-zen-ink-light truncate max-w-[200px]">{work.title}</span>
          </nav>

          {/* 标题区 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-zen-ink mb-4 leading-snug">
              {work.title}
            </h1>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-zen-ink-muted/70 pb-5 border-b border-zen-sand/40">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {work.createdAt}
              </span>
              {category && (
                <Link
                  to={`/category/${category.slug}`}
                  className="flex items-center gap-1 px-2.5 py-0.5 bg-zen-cream rounded-md text-zen-wood-dark text-xs
                    hover:bg-zen-parchment transition-colors"
                >
                  <Tag size={11} />
                  {category.name}
                </Link>
              )}
              <span className="flex items-center gap-1">
                <Eye size={13} />
                {work.viewCount}
              </span>
              <span className="text-xs">{work.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 作品内容主体 ====== */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* 封面图（图片类） */}
            {(work.type === 'image' || work.coverImage) && work.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-zen">
                <img
                  src={work.coverImage}
                  alt={work.title}
                  className="w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* 音频播放器 */}
            {work.type === 'audio' && work.mediaUrl && (
              <div className="mb-8">
                <AudioPlayer src={work.mediaUrl} title={work.title} />
              </div>
            )}

            {/* 视频嵌入 */}
            {work.type === 'video' && work.mediaUrl && (
              <div className="mb-8">
                <VideoEmbed embedCode={work.mediaUrl} title={work.title} />
              </div>
            )}

            {/* 正文内容 */}
            <article className="max-w-3xl mx-auto prose-zen">
              {renderContent(work.content)}
            </article>

            {/* 标签 */}
            {work.tags && work.tags.length > 0 && (
              <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-zen-sand/30 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zen-cream/80 rounded-full text-xs text-zen-ink-muted border border-zen-sand/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* 评论区 */}
          <CommentSection workId={work.id} comments={work.comments} />
        </div>
      </section>
    </div>
  );
}
