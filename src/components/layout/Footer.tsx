import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zen-ink text-zen-sand/80">
      {/* 装饰线 */}
      <div className="h-px bg-gradient-to-r from-transparent via-zen-wood-dark/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 上部：印章 + 网站信息 */}
        <div className="flex flex-col items-center mb-10">
          {/* 印章式 Logo */}
          <div className="seal-stamp w-14 h-14 text-xl mb-4">
            乐
          </div>
          <p className="font-kai text-lg text-zen-ivory/90 mb-2">朱小翔的乐叟部落</p>
          <p className="text-sm text-zen-ink-muted/60 max-w-md text-center leading-relaxed font-light">
            以文会友，以乐修身。在喧嚣世界中，寻一方心灵净土。
          </p>
        </div>

        {/* 中部：板块链接 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 pb-8 border-b border-white/10">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-base group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-sm group-hover:text-zen-tan transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* 下部：版权与备案 */}
        <div className="flex flex-col items-center space-y-2 text-xs text-zen-ink-muted/50">
          <p>乐叟部落 &copy; {currentYear} 朱小翔</p>
          <p className="flex items-center gap-3">
            <span>以笔墨耕耘心田</span>
            <span>·</span>
            <span>用音乐洗涤灵魂</span>
            <span>·</span>
            <span>让文化生生不息</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
