import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Image, Music, Video, FileText, Send as SendIcon, Eye, X } from 'lucide-react';
import type { Work, MediaType, CategorySlug } from '../types';
import { categories } from '../data/mockData';
import { useApp } from '../context/AppContext';

const emptyWork: Omit<Work, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'viewCount' | 'comments'> = {
  title: '',
  category: 'literature',
  type: 'article',
  summary: '',
  content: '',
  coverImage: undefined,
  mediaUrl: undefined,
  tags: [],
};

export default function UploadPage() {
  const navigate = useNavigate();
  const { addWork } = useApp();
  const [form, setForm] = useState(emptyWork);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<MediaType>('article');
  const [showPreview, setShowPreview] = useState(false);

  // 更新表单字段
  const updateForm = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key === 'type') setActiveTab(value as MediaType);
  };

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewImage(result);
      updateForm('coverImage', result);
    };
    reader.readAsDataURL(file);
  };

  // 处理音频文件
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateForm('mediaUrl', url);
  };

  // 提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) return;

    const newWork: Work = {
      ...form,
      id: `w${Date.now()}`,
      title: form.title.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      category: form.category,
      type: form.type,
      author: '朱小翔',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewCount: 0,
      comments: [],
      tags: form.tags,
    };

    addWork(newWork);
    navigate(`/work/${newWork.id}`);
  };

  const mediaTabs: { key: MediaType; icon: typeof FileText; label: string }[] = [
    { key: 'article', icon: FileText, label: '图文' },
    { key: 'image', icon: Image, label: '图片' },
    { key: 'audio', icon: Music, label: '音频' },
    { key: 'video', icon: Video, label: '视频' },
  ];

  return (
    <div className="min-h-screen bg-zen-bg-main py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1
            className="text-3xl font-kai text-zen-ink-deep mb-2"
            style={{ fontFamily: '"Ma Shan Zheng", cursive' }}
          >
            雅集台 · 发布作品
          </h1>
          <p className="text-sm text-zen-ink-muted">在此分享您的创作，与知音共赏</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ====== 左侧：编辑区 ====== */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              {/* 作品标题 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  作品名称 <span className="text-zinc-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  placeholder="请输入作品标题..."
                  maxLength={80}
                  required
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-zen-sand/60 text-sm text-zen-ink
                    focus:outline-none focus:border-zen-wood-dark/40 focus:ring-1 focus:ring-zen-wood-dark/15
                    transition-all placeholder:text-zen-ink-muted/40"
                />
                <p className="text-xs text-right mt-1 text-zen-ink-muted/50">{form.title.length}/80</p>
              </div>

              {/* 所属板块 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  所属板块 <span className="text-zinc-400">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => updateForm('category', e.target.value as CategorySlug)}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-zen-sand/60 text-sm text-zen-ink
                    focus:outline-none focus:border-zen-wood-dark/40 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 封面上传 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  封面图片
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="flex items-center justify-center gap-3 w-full h-32 rounded-lg border-2 border-dashed border-zen-sand/60
                      hover:border-zen-tan/50 hover:bg-zen-parchment/30 cursor-pointer transition-all duration-300"
                  >
                    {previewImage ? (
                      <>
                        <img src={previewImage} alt="预览" className="h-full object-cover rounded-md" />
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setPreviewImage(''); updateForm('coverImage', undefined); }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center
                            hover:bg-red-100 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-zen-ink-muted/50" />
                        <span className="text-sm text-zen-ink-muted/50">点击或拖拽上传封面图</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* 作品类型切换 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  作品类型
                </label>
                <div className="flex gap-2">
                  {mediaTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => { updateForm('type', tab.key); setActiveTab(tab.key); }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${
                        activeTab === tab.key
                          ? 'border-zen-wood-dark/40 bg-zen-cream text-zen-wood-dark'
                          : 'border-zen-sand/60 text-zen-ink-muted hover:border-zen-sand'
                      }`}
                    >
                      <tab.icon size={15} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 音频文件（仅音频类型显示） */}
              {(activeTab === 'audio') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                    音频文件
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-zen-sand/60 text-sm file:mr-3
                      file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium
                      file:bg-zen-cream file:text-zen-wood-dark hover:file:bg-zen-sand/40"
                  />
                </motion.div>
              )}

              {/* 视频外链（仅视频类型显示） */}
              {(activeTab === 'video') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                    视频嵌入链接（B站/腾讯视频等）
                  </label>
                  <textarea
                    value={form.mediaUrl || ''}
                    onChange={(e) => updateForm('mediaUrl', e.target.value)}
                    placeholder='粘贴 iframe 嵌入代码，如：&lt;iframe src="//player.bilibili.com/..."&gt;&lt;/iframe&gt;'
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-zen-sand/60 text-sm text-zen-ink
                      font-mono text-xs resize-none focus:outline-none focus:border-zen-wood-dark/40 transition-all
                      placeholder:text-zen-ink-muted/40"
                  />
                </motion.div>
              )}

              {/* 正文内容 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  正文内容 <span className="text-zinc-400">*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => updateForm('content', e.target.value)}
                  placeholder="在此撰写您的内容...&#10;&#10;支持使用 ## 作为二级标题&#10;空行分段"
                  rows={8}
                  required
                  maxLength={10000}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-zen-sand/60 text-sm text-zen-ink leading-relaxed
                    resize-y min-h-[160px] focus:outline-none focus:border-zen-wood-dark/40 focus:ring-1 focus:ring-zen-wood-dark/15
                    transition-all placeholder:text-zen-ink-muted/40"
                />
                <p className="text-xs text-right mt-1 text-zen-ink-muted/50">{form.content.length}/10000</p>
              </div>

              {/* 摘要 */}
              <div>
                <label className="block text-sm font-medium text-zen-ink-deep mb-1.5">
                  简短摘要
                </label>
                <input
                  type="text"
                  value={form.summary}
                  onChange={(e) => updateForm('summary', e.target.value)}
                  placeholder="一句话描述此作品..."
                  maxLength={150}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-zen-sand/60 text-sm text-zen-ink
                    focus:outline-none focus:border-zen-wood-dark/40 transition-all placeholder:text-zen-ink-muted/40"
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end gap-3 pt-4 pb-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-5 py-2.5 text-sm border border-zen-sand/60 rounded-lg text-zen-ink-light
                    hover:bg-zen-cream transition-colors flex items-center gap-1.5"
                >
                  <Eye size={14} />
                  预览
                </button>
                <button
                  type="submit"
                  disabled={!form.title.trim() || !form.content.trim()}
                  className="px-6 py-2.5 bg-zen-wood-dark text-white text-sm rounded-lg hover:bg-zen-wood-deep
                    disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all duration-300 shadow-zen"
                >
                  <SendIcon size={14} />
                  发布作品
                </button>
              </div>
            </motion.div>

            {/* ====== 右侧：实时预览区 ====== */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`${showPreview ? 'lg:block' : 'hidden lg:block'}`}
            >
              <div className="sticky top-24">
                <div className="bg-white rounded-xl border border-zen-sand/40 p-6 shadow-zen-card">
                  <h3 className="font-kai text-base text-zen-ink-deep mb-4 pb-3 border-b border-zen-sand/30">
                    实时预览
                  </h3>

                  {/* 预览封面 */}
                  {previewImage && (
                    <img src={previewImage} alt="预览" className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  {!previewImage && activeTab === 'image' && (
                    <div className="w-full h-40 bg-zen-parchment/60 rounded-lg mb-4 flex items-center justify-center text-zen-ink-muted/30">
                      <Image size={32} />
                    </div>
                  )}

                  {/* 预览标题 */}
                  <h4 className={`text-xl font-semibold text-zen-ink mb-2 ${!form.title ? 'text-zen-ink-muted/30' : ''}`}>
                    {form.title || '未命名作品'}
                  </h4>

                  {/* 预览元信息 */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 bg-zen-cream rounded text-zen-wood-dark">
                      {categories.find(c => c.slug === form.category)?.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-zen-parchment rounded text-zen-ink-muted capitalize">
                      {activeTab === 'article' ? '图文' :
                       activeTab === 'image' ? '图片' :
                       activeTab === 'audio' ? '音频' : '视频'}
                    </span>
                  </div>

                  {/* 预览摘要 */}
                  <p className={`text-sm text-zen-ink-light leading-relaxed ${!form.summary ? 'text-zen-ink-muted/30 italic' : ''}`}>
                    {form.summary || '暂无摘要...'}
                  </p>

                  {/* 预览正文截取 */}
                  {form.content && (
                    <div className="mt-4 pt-4 border-t border-zen-sand/20 max-h-[300px] overflow-hidden">
                      <p className="text-sm text-zen-ink-light/70 line-clamp-8 whitespace-pre-line">
                        {form.content.slice(0, 500)}{form.content.length > 500 ? '...' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
