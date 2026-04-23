import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import WorkCard from '../components/common/WorkCard';
import { getWorksByCategory, getCategoryBySlug, categories } from '../data/mockData';
import type { CategorySlug } from '../types';

const categoryBgColors: Record<string, string> = {
  legal: 'from-zinc-100 to-stone-200/60',
  business: 'from-amber-50 to-yellow-100/40',
  literature: 'from-stone-100 to-amber-50/40',
  music: 'from-purple-50 to-indigo-100/30',
  dance: 'from-rose-50 to-pink-100/30',
  calligraphy: 'from-gray-100 to-slate-200/40',
  photography: 'from-blue-50 to-cyan-100/20',
  writing: 'from-green-50 to-emerald-100/20',
};

const categoryAccentColors: Record<string, string> = {
  legal: 'text-zinc-600',
  business: 'text-amber-700',
  literature: 'text-stone-600',
  music: 'text-purple-600',
  dance: 'text-rose-600',
  calligraphy: 'text-gray-700',
  photography: 'text-blue-600',
  writing: 'text-green-700',
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const works = slug ? getWorksByCategory(slug) : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorks = works.filter(w =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-kai text-zen-ink-muted mb-4">板块未找到</p>
          <Link to="/" className="text-zen-wood-dark hover:underline text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ====== 板块英雄头部 ====== */}
      <section className={`relative py-24 px-6 overflow-hidden bg-gradient-to-br ${categoryBgColors[slug || '']}`}>
        <motion.div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-zen-ink-muted hover:text-zen-wood-dark
              transition-colors mb-6 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            返回首页
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-5xl mb-4 block">{category.icon}</span>
            <h1
              className="text-3xl md:text-4xl font-bold text-zen-ink mb-3"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              {category.name}
            </h1>
            <p className={`${categoryAccentColors[slug || '']} text-lg mb-3`}>
              {category.description}
            </p>
            {category.longDescription && (
              <p className="text-sm text-zen-ink-muted leading-relaxed max-w-2xl">
                {category.longDescription}
              </p>
            )}
            {category.instruments && (
              <div className="mt-4 flex flex-wrap gap-2">
                {category.instruments.map((inst) => (
                  <span key={inst} className="px-3 py-1 bg-white/70 rounded-full text-xs text-zen-ink-light border border-zen-sand/40">
                    {inst}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <div className="mt-6 text-sm text-zen-ink-muted/60">
            共 {filteredWorks.length} 件作品
          </div>
        </div>
      </section>

      {/* ====== 筛选工具栏 ====== */}
      <div className="sticky top-16 z-30 bg-zen-ivory/95 backdrop-blur-md border-b border-zen-sand/40 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zen-ink-muted/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`搜索${category.name}板块...`}
              className="w-full pl-9 pr-4 py-2 bg-zen-cream/60 rounded-lg border border-zen-sand/50 text-sm
                focus:outline-none focus:border-zen-wood-dark/30 focus:bg-white focus:ring-1 focus:ring-zen-wood-dark/10
                transition-all placeholder:text-zen-ink-muted/40"
            />
          </div>

          {/* 视图切换 */}
          <div className="flex items-center gap-1 bg-zen-cream/60 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-zen-wood-dark' : 'text-zen-ink-muted hover:text-zen-ink-light'} transition-colors`}
              aria-label="网格视图"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-zen-wood-dark' : 'text-zen-ink-muted hover:text-zen-ink-light'} transition-colors`}
              aria-label="列表视图"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ====== 作品网格主体 ====== */}
      <section className="py-12 px-6 min-h-[50vh]">
        <div className="max-w-5xl mx-auto">
          {filteredWorks.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorks.map((work, idx) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <WorkCard work={work} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredWorks.map((work) => (
                  <WorkCard key={work.id} work={work} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4 opacity-20">{category.icon}</p>
              <p className="font-kai text-xl text-zen-ink-muted mb-2">尚无作品</p>
              <p className="text-sm text-zen-ink-muted/60 mb-6">
                静待花开，期待您的第一件作品
              </p>
              <Link
                to="/upload"
                className="inline-block px-6 py-2.5 bg-zen-wood-dark text-white rounded-full text-sm
                  hover:bg-zen-wood-deep transition-all duration-300"
              >
                发布第一件作品
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
