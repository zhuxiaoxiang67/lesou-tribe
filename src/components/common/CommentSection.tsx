import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CommentSectionProps {
  workId: string;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}

export default function CommentSection({ workId, comments }: CommentSectionProps) {
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const { addComment } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    addComment(workId, authorName.trim(), commentText.trim());
    setAuthorName('');
    setCommentText('');
  };

  return (
    <div className="mt-12 pt-8 border-t border-zen-sand/60">
      {/* 标题 */}
      <h3 className="font-kai text-xl text-zen-ink mb-6 flex items-center gap-2">
        <MessageCircle size={20} className="text-zen-wood-dark" />
        知音共赏（{comments.length}条评语）
      </h3>

      {/* 评论输入区 */}
      <form onSubmit={handleSubmit} className="mb-8 p-5 bg-zen-cream/50 rounded-xl border border-zen-sand/40">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="您的昵称"
            maxLength={20}
            className="flex-shrink-0 w-36 px-3 py-2 bg-white rounded-lg border border-zen-sand text-sm text-zen-ink
              focus:outline-none focus:border-zen-wood-dark/40 focus:ring-1 focus:ring-zen-wood-dark/20 transition-all"
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写下您的感悟与见解..."
            rows={2}
            maxLength={500}
            required
            className="flex-1 px-3 py-2 bg-white rounded-lg border border-zen-sand text-sm text-zen-ink resize-none
              focus:outline-none focus:border-zen-wood-dark/40 focus:ring-1 focus:ring-zen-wood-dark/20 transition-all"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-zen-ink-muted">{commentText.length}/500</span>
          <button
            type="submit"
            disabled={!authorName.trim() || !commentText.trim()}
            className="px-5 py-2 bg-zen-wood-dark text-white text-sm rounded-lg hover:bg-zen-wood-deep
              disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all duration-300"
          >
            <Send size={14} />
            发表评论
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-10 text-zen-ink-muted">
            <p className="font-kai text-lg mb-1">尚无评论</p>
            <p className="text-sm">做第一个留下足迹的人吧</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="group p-4 bg-white rounded-lg border border-zen-sand/30 hover:border-zen-tan/30
                transition-all duration-300 hover:shadow-zen-card"
            >
              <div className="flex items-start gap-3">
                {/* 头像 */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zen-wood to-zen-gold/60 flex items-center justify-center
                  text-white text-sm font-medium flex-shrink-0">
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-zen-ink-deep">{comment.author}</span>
                    <span className="text-xs text-zen-ink-muted">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-zen-ink-light leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
