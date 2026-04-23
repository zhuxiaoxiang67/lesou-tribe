import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, BookOpen, Clock } from 'lucide-react';
import CategoryCard from '../components/common/CategoryCard';
import { categories, getRecentWorks } from '../data/mockData';

export default function HomePage() {
  const recentWorks = getRecentWorks(6);

  return (
    <div>
      {/* ====== Hero 英雄首屏区 ====== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* 背景层 */}
        <div className="absolute inset-0 bg-ink-gradient" />
        <div className="absolute inset-0 bg-rice-paper opacity-40" />

        {/* 水墨晕染装饰圆 */}
        <motion.div
          className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-zen-tan/8 to-transparent blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[15%] left-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-zen-wood/6 to-transparent blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* 内容 */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* 印章装饰 */}
            <div className="inline-block mb-6 seal-stamp text-xl animate-float-slow">乐</div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-zen-ink mb-5 leading-tight"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              朱小翔的乐叟部落
            </h1>

            <p className="font-kai text-lg md:text-xl text-zen-ink-muted/80 mb-3 tracking-widest">
              以文会友 · 以乐修身
            </p>
            <p className="text-base text-zen-ink-muted/60 max-w-md mx-auto leading-relaxed mb-10">
              在喧嚣世界中，寻一方心灵净土，与志同道合者共赏文化之美
            </p>

            <Link
              to="/category/literature"
              className="inline-block px-7 py-3 bg-zen-wood-dark/90 text-white rounded-full text-sm
                hover:bg-zen-wood-deep transition-all duration-300 shadow-zen hover:shadow-zen-hover hover:-translate-y-0.5"
            >
              开始探索 →
            </Link>
          </motion.div>
        </div>

        {/* 向下箭头动画 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zen-ink-muted/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* ====== 八大板块卡片矩阵 ====== */}
      <section className="py-20 px-6 bg-zen-bg-main relative">
        <div className="max-w-5xl mx-auto">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl font-kai text-zen-ink-deep mb-3"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              八方雅集
            </h2>
            <p className="text-sm text-zen-ink-muted tracking-wide">八大板块 · 各具风韵 · 随心徜徉</p>
            {/* 装饰线 */}
            <div className="mt-4 divider-ice-crack max-w-xs mx-auto" />
          </motion.div>

          {/* 卡片网格：2列4行 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(categories as Array<{ slug: import('../types').CategorySlug }>).map((cat, index) => (
              <CategoryCard key={cat.slug} slug={cat.slug} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== 装饰分隔带 ====== */}
      <div className="py-10 bg-gradient-to-b from-zen-bg-main via-zen-parchment/50 to-zen-bg-main">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="divider-ice-crack" />
          <p className="font-kai text-zen-ink-muted/60 mt-4 text-sm tracking-widest">
            ◇ 品茗论道 · 抚琴听涛 ◇
          </p>
        </div>
      </div>

      {/* ====== 最新动态精选 ====== */}
      <section className="py-20 px-6 bg-zen-bg-main">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-kai text-zen-ink-deep mb-3"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              近期雅集
            </h2>
            <p className="text-sm text-zen-ink-muted">最新作品更新 · 精彩不容错过</p>
          </motion.div>

          {/* 时间线式列表 */}
          <div className="space-y-4">
            {recentWorks.map((work, idx) => {
              const cat = categories.find(c => c.slug === work.category);
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <Link
                    to={`/work/${work.id}`}
                    className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-zen-sand/30
                      hover:border-zen-tan/30 hover:shadow-zen transition-all duration-300"
                  >
                    {/* 左侧彩色标记 */}
                    <div className={`w-1.5 h-12 rounded-full mt-1 flex-shrink-0 group-hover:h-16 transition-all duration-300 ${
                      work.category === 'legal' ? 'bg-zinc-400' :
                      work.category === 'business' ? 'bg-amber-600' :
                      work.category === 'literature' ? 'bg-stone-500' :
                      work.category === 'music' ? 'bg-purple-400' :
                      work.category === 'dance' ? 'bg-rose-400' :
                      work.category === 'calligraphy' ? 'bg-gray-600' :
                      work.category === 'photography' ? 'bg-blue-400' :
                      'bg-green-600'
                    }`} />

                    {/* 图标 */}
                    <span className="text-xl mt-0.5">{cat?.icon}</span>

                    {/* 文字内容 */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-zen-ink group-hover:text-zen-wood-dark transition-colors line-clamp-1">
                        {work.title}
                      </h4>
                      <p className="text-sm text-zen-ink-muted line-clamp-1 mt-1">{work.summary}</p>
                    </div>

                    {/* 右侧元信息 */}
                    <div className="flex-shrink-0 text-right text-xs text-zen-ink-muted/60 space-y-1 hidden sm:block">
                      <span className="flex items-center justify-end gap-1">
                        <Clock size={11} />{work.createdAt}
                      </span>
                      <span>{cat?.name}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* 查看更多 */}
          <div className="text-center mt-10">
            <Link
              to="/category/literature"
              className="inline-flex items-center gap-2 text-sm text-zen-wood-dark hover:text-zen-wood-deep
                transition-colors group"
            >
              查阅全部板块
              <BookOpen size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
