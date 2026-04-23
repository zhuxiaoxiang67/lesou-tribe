import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Heart, BookOpen } from 'lucide-react';
import { categories } from '../data/mockData';

export default function AboutPage() {
  return (
    <div>
      {/* ====== 个人形象区 ====== */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-zen-parchment via-zen-ivory to-zen-bg-main overflow-hidden">
        <motion.div
          className="absolute -left-20 top-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-zen-tan/8 to-transparent blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* 头像区域 */}
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-zen-wood-dark to-zen-gold/60
              flex items-center justify-center text-white text-4xl font-kai shadow-lg ring-4 ring-zen-cream"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>
              朱
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-zen-ink mb-2"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              朱小翔
            </h1>
            <p className="font-kai text-lg text-zen-wood-dark/80 mb-6 tracking-widest">
              乐叟 · 以文会友
            </p>

            <p className="text-base text-zen-ink-light leading-relaxed max-w-xl mx-auto">
              一位热爱法律、文学、音乐、舞蹈、书法、摄影与写作的终身学习者。
              在喧嚣的尘世中，愿以笔墨耕耘心田，用音乐洗涤灵魂，
              在这方小小的部落里，与志同道合者共赏文化之美。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ====== 各板块文化阐述 ====== */}
      <section className="py-16 px-6 bg-zen-bg-main">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl font-kai text-zen-ink-deep mb-2"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              八方雅趣
            </h2>
            <p className="text-sm text-zen-ink-muted">每一个板块都是一片精神花园</p>
            <div className="mt-4 divider-ice-crack max-w-xs mx-auto" />
          </motion.div>

          {/* 板块卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group p-6 bg-white rounded-xl border border-zen-sand/40 hover:border-zen-tan/30
                  hover:shadow-zen transition-all duration-400"
              >
                <Link to={`/category/${cat.slug}`} className="block">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-0.5">
                      {cat.icon}
                    </span>
                    <div>
                      <h3 className="font-kai text-lg font-semibold text-zen-ink-deep mb-1.5 group-hover:text-zen-wood-dark transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm font-medium text-zen-ink-muted/80 mb-2">{cat.description}</p>
                      {cat.longDescription && (
                        <p className="text-sm text-zen-ink-muted/60 leading-relaxed line-clamp-3">
                          {cat.longDescription}
                        </p>
                      )}
                      {cat.instruments && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cat.instruments.map((inst) => (
                            <span key={inst} className="px-2 py-0.5 bg-zen-parchment/80 rounded text-[11px] text-zen-ink-light">
                              {inst}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 联系 / 留言 ====== */}
      <section className="py-16 px-6 bg-gradient-to-b from-zen-bg-main to-zen-parchment/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart size={32} className="mx-auto mb-4 text-zinc-400" />
            <h2
              className="text-2xl font-kai text-zen-ink-deep mb-3"
              style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
            >
              愿与君相遇于此
            </h2>
            <p className="text-sm text-zen-ink-muted leading-relaxed max-w-md mx-auto mb-8">
              无论您是法律从业者、企业经营者、文史爱好者、音乐同好、舞者、书友、摄友还是文字爱好者，
              都欢迎在此留下足迹。期待与您的每一次交流。
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-zen-wood-dark text-white rounded-full text-sm
                  hover:bg-zen-wood-deep transition-all duration-300 shadow-zen hover:-translate-y-0.5"
              >
                <BookOpen size={15} />
                分享作品
              </Link>
              <a
                href="mailto:hello@lesou.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-zen-sand/60 rounded-full text-sm
                  hover:bg-zen-cream transition-all duration-300"
              >
                <Mail size={15} />
                联系我
              </a>
            </div>

            {/* 禅意引用 */}
            <p className="mt-12 font-kai text-sm text-zen-ink-muted/50 italic tracking-wide">
              「人生如逆旅，我亦是行人。」—— 苏轼
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
