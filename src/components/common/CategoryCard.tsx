import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CategorySlug } from '../../types';
import { categories } from '../../data/mockData';

interface CategoryCardProps {
  slug: CategorySlug;
  index: number;
}

export default function CategoryCard({ slug, index }: CategoryCardProps) {
  const category = categories.find(c => c.slug === slug);
  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/category/${slug}`}
        className="group block bg-white/80 backdrop-blur-sm rounded-xl border border-zen-sand/50 p-6
          card-zen-hover hover:border-zen-tan/50 relative overflow-hidden"
      >
        {/* 背景装饰 */}
        <div className="absolute -right-6 -top-6 text-[80px] text-zen-sand/30 group-hover:text-zen-tan/15
          transition-colors duration-500 select-none pointer-events-none">
          {category.icon}
        </div>

        {/* 图标 */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-parchment to-zen-sand/60
          flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:from-zen-cream
          transition-all duration-400 shadow-sm">
          {category.icon}
        </div>

        {/* 名称 */}
        <h3 className="font-kai text-lg font-semibold text-zen-ink-deep mb-2 group-hover:text-zen-wood-dark transition-colors">
          {category.name}
        </h3>

        {/* 描述 */}
        <p className="text-sm text-zen-ink-muted leading-relaxed">
          {category.description}
        </p>

        {/* 底部箭头指示 */}
        <div className="mt-4 flex items-center text-xs text-zen-tan/70 font-medium opacity-0 group-hover:opacity-100
          translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
          探索板块
          <span className="ml-1">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
