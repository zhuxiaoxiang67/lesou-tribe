import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { categories } from '../../data/mockData';
import type { CategorySlug } from '../../types';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? 'glass-nav shadow-zen'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / 网站名 */}
        <Link
          to="/"
          className="font-kai text-xl md:text-2xl font-semibold text-zen-ink-deep tracking-wide hover:text-zen-wood-dark transition-colors duration-300"
          style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
        >
          乐叟部落
        </Link>

        {/* 桌面导航 */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${
              location.pathname === '/'
                ? 'text-zen-wood-dark font-medium bg-zen-parchment/60'
                : 'text-zen-ink-light hover:text-zen-wood-dark hover:bg-zen-parchment/40'
            }`}
          >
            首页
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`px-3 py-2 text-sm rounded-md transition-all duration-300 flex items-center gap-1.5 ${
                location.pathname === `/category/${cat.slug}`
                  ? 'text-zen-wood-dark font-medium bg-zen-parchment/60'
                  : 'text-zen-ink-light hover:text-zen-wood-dark hover:bg-zen-parchement/40'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link
            to="/upload"
            className="ml-2 px-4 py-2 text-sm rounded-md bg-zen-wood-deep/90 text-white hover:bg-zen-wood-deep transition-all duration-300"
          >
            发布作品
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zen-ink-light hover:text-zen-wood-dark transition-colors"
          aria-label="菜单"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 移动端下拉菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zen-ivory/98 backdrop-blur-xl border-t border-zen-sand/50 shadow-lg animate-fade-in-up">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            <Link
              to="/"
              className={`block px-4 py-2.5 rounded-lg text-base transition-colors ${
                location.pathname === '/'
                  ? 'bg-zen-parchment/70 text-zen-wood-dark font-medium'
                  : 'text-zen-ink-light hover:bg-zen-parchment/40'
              }`}
            >
              🏠 首页
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={`block px-4 py-2.5 rounded-lg text-base transition-colors ${
                  location.pathname === `/category/${cat.slug}`
                    ? 'bg-zen-parchment/70 text-zen-wood-dark font-medium'
                    : 'text-zen-ink-light hover:bg-zen-parchment/40'
                }`}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <hr className="border-zen-sand my-2" />
            <Link
              to="/upload"
              className="block px-4 py-2.5 rounded-lg text-base bg-zen-wood-deep/90 text-white text-center"
            >
              ✏️ 发布作品
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
