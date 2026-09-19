import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Image as ImageIcon, Video, Type, Sparkles, ExternalLink, HelpCircle, Eye } from 'lucide-react';

interface EditGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditGuideModal: React.FC<EditGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'videos' | 'text' | 'tester'>('overview');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Live tester states
  const [testImgUrl, setTestImgUrl] = useState('https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80');
  const [testVideoUrl, setTestVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const projectSnippet = `// ফাইলের অবস্থান: /src/data/portfolioData.ts
{
  id: "my-custom-project",
  title: "আপনার প্রজেক্টের নাম (Project Title)",
  category: "motion-ads", // অপশন: 'motion-ads' | 'reels-shorts' | 'commercials' | 'documentary' | 'motion-graphics'
  categoryLabel: "Motion Ad",
  client: "ক্লায়েন্টের নাম (Client Name)",
  clientIndustry: "ইন্ডাস্ট্রি (e.g. E-Commerce / Creator)",
  
  // 🖼️ ১. থাম্বনেইল ছবি পরিবর্তন:
  thumbnail: "https://your-image-url.com/photo.jpg",
  
  // 🎥 ২. ভিডিও লিংক পরিবর্তন:
  videoUrl: "https://your-video-url.com/video.mp4", // অথবা YouTube Embed: "https://www.youtube.com/embed/VIDEO_ID"
  videoType: "mp4", // 'mp4' অথবা 'youtube'
  isVertical: false, // রিলস বা শর্টস হলে true করুন (9:16 vertical ratio)
  
  duration: "0:45",
  stats: {
    views: "1.2M",
    roas: "4.5x",
    retention: "85%"
  },
  tags: ["Direct Response", "Typography", "Color Grading"],
  description: "প্রজেক্টের বিস্তারিত বর্ণনা...",
  deliverables: ["16:9 Master Video", "Vertical Story Cut"],
  software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
  year: "2024"
}`;

  return (
    <div
      id="edit-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0d0f17] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121420]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                কন্টেন্ট পরিবর্তনের সহজ নির্দেশিকা (Editing Guide)
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  Step-by-Step
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                এই ওয়েবসাইটটির প্রতিটি ছবি, ভিডিও ও লেখার অংশ পরিবর্তন করার নিয়ম
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-[#0e1019] overflow-x-auto">
          {[
            { id: 'overview', label: '📌 মূল ফাইল ও ওভারভিউ', icon: HelpCircle },
            { id: 'images', label: '🖼️ ছবি (Thumbnail)', icon: ImageIcon },
            { id: 'videos', label: '🎥 ভিডিও (Video Links)', icon: Video },
            { id: 'text', label: '✍️ টেক্সট ও কন্টাক্ট', icon: Type },
            { id: 'tester', label: '🧪 লাইভ টেস্ট টুল', icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-neutral-300 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <h4 className="font-bold text-sm text-amber-300 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  সমস্ত ডেটা একটি মাত্র ফাইলে সাজানো রয়েছে!
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  আপনাকে জটিল কোড ঘাঁটতে হবে না। সাইটের সমস্ত টাইটেল, ছবি, ভিডিও লিংক, সোশ্যাল লিংক এবং পরিসংখ্যান 
                  <code className="mx-1 px-1.5 py-0.5 rounded bg-black/40 font-mono text-amber-300">
                    /src/data/portfolioData.ts
                  </code>
                  ফাইলটিতে খুব সুন্দরভাবে সাজিয়ে রাখা হয়েছে।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    📁 ১. সাইটের টেক্সট ও ইনফো
                  </span>
                  <p className="text-xs text-neutral-400">
                    ফাইল: <code className="text-amber-400 font-mono">/src/data/portfolioData.ts</code>
                  </p>
                  <p className="text-xs text-neutral-300">
                    লাইনের শুরুতে <code className="text-white font-mono">siteConfig</code> অবজেক্টে নাম, হেডলাইন, হোয়াটসঅ্যাপ, এবং ইমেইল দেওয়া আছে।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    🎬 ২. প্রজেক্টের লিস্ট ও ভিডিও
                  </span>
                  <p className="text-xs text-neutral-400">
                    ফাইল: <code className="text-amber-400 font-mono">/src/data/portfolioData.ts</code>
                  </p>
                  <p className="text-xs text-neutral-300">
                    <code className="text-white font-mono">projectsData</code> অ্যারেতে প্রতিটি ভিডিওর থাম্বনেইল, ভিডিও লিংক, ও ক্লায়েন্ট নাম আছে।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141724] border border-amber-500/20 space-y-2 md:col-span-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    🎨 ৩. গ্রাফিক্স ডিজাইন ও থাম্বনেইল ক্যারোসেল (GRAPHICS DESIGN)
                  </span>
                  <p className="text-xs text-neutral-400">
                    ফাইল: <code className="text-amber-400 font-mono">/src/data/portfolioData.ts</code>
                  </p>
                  <p className="text-xs text-neutral-300">
                    ফাইলের শেষভাগে <code className="text-amber-300 font-mono">graphicsDesignData</code> অ্যারেতে আপনার YouTube থাম্বনেইল, পোস্টার এবং ব্যানার ইমেজের লিংক দিয়ে সরাসরি স্লাইডারে শো করতে পারবেন।
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-300">
                    একটি প্রজেক্টের কোড ফরম্যাট (নমুনা):
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(projectSnippet, 'overview-code')}
                    className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                  >
                    {copiedSnippet === 'overview-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'overview-code' ? 'কপি হয়েছে' : 'কোড কপি করুন'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#07080d] border border-white/10 text-[11px] font-mono text-neutral-300 overflow-x-auto leading-relaxed">
                  {projectSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: IMAGES */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <h4 className="font-heading text-base font-bold text-white">
                🖼️ ছবি ও প্রোফাইল লোগো কীভাবে পরিবর্তন করবেন?
              </h4>
              
              {/* Profile / Brand Logo */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="font-bold text-xs text-amber-300">👤 বোরহান উদ্দিন-এর প্রোফাইল ছবি / লোগো (Header & Footer):</div>
                <p className="text-xs text-neutral-300">
                  নেভিগেশন বার ও ফুটারে নামের পাশে যে ছবি রয়েছে, সেটি <code className="text-amber-300 font-mono">src/data/portfolioData.ts</code> এর <code className="text-white font-mono">siteConfig.avatarUrl</code> থেকে আসে:
                </p>
                <div className="p-2.5 bg-[#08090f] rounded-lg border border-white/10 font-mono text-xs text-amber-300">
                  avatarUrl: "/borhan-dp.jpg" // অথবা যেকোনো অনলাইন ইমেজ লিংক
                </div>
              </div>

              <p className="text-xs text-neutral-300">
                প্রতিটি প্রজেক্টে <code className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-mono">thumbnail</code> ফিল্ড রয়েছে।
                এখানে আপনার ছবির লিংক দিন।
              </p>

              <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-3">
                <div className="font-bold text-xs text-white">ছবির লিংকের ধরন:</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-neutral-300">
                  <li>
                    <strong>ইন্টারনেট লিংক (Direct Image URL):</strong> Unsplash, Imgur, ImgBB বা আপনার ড্রাইভ থেকে সরাসরি লিংক (যেমন: <code className="text-amber-300 font-mono">https://i.imgur.com/example.jpg</code>)
                  </li>
                  <li>
                    <strong>লোকাল ইমেজ ফাইল:</strong> আপনার প্রজেক্টের <code className="text-amber-300 font-mono">/public</code> ফোল্ডারে ছবি রেখে যেমন: <code className="text-amber-300 font-mono">/my-thumbnail.jpg</code> দিতে পারেন।
                  </li>
                  <li>
                    <strong>সাইজ রেকমেন্ডেশন:</strong> ল্যান্ডস্কেপ প্রজেক্টের জন্য <strong>16:9 (1920x1080)</strong> এবং রিলস/শর্টস প্রজেক্টের জন্য <strong>9:16 (1080x1920)</strong>।
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-[#08090f] rounded-lg border border-white/10 font-mono text-xs text-amber-300">
                thumbnail: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
              </div>

              {/* 8 Serial Graphics Pictures Guide */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="font-bold text-xs text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>🎨 গ্রাফিক্সের ৮টি ছবি সিরিয়াল অনুযায়ী বসানোর নিয়ম (1 to 8 Pictures):</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <code className="text-amber-300 font-mono">/src/data/portfolioData.ts</code> ফাইলের 
                  <code className="text-white font-mono"> graphicsDesignData</code> অ্যারেতে ১ থেকে ৮ নম্বর সিরিয়াল অনুযায়ী অবজেক্ট দেওয়া আছে।
                  আপনি শুধু আপনার ৮টি ছবির ইউআরএল <code className="text-amber-300 font-mono">imageUrl</code> ফিল্ডে বসিয়ে দিন:
                </p>
                <div className="p-3 bg-[#08090f] rounded-lg border border-white/10 text-[11px] font-mono text-neutral-300 space-y-1 overflow-x-auto">
                  <div className="text-amber-400 font-bold">// graphicsDesignData অ্যারেতে graphic1.jpg থেকে graphic8.jpg সেট করা আছে:</div>
                  <div>{"// ১নং ছবি: { id: 'graphic-1', imageUrl: 'graphic1.jpg' }"}</div>
                  <div>{"// ২নং ছবি: { id: 'graphic-2', imageUrl: 'graphic2.jpg' }"}</div>
                  <div>{"// ৩নং ছবি: { id: 'graphic-3', imageUrl: 'graphic3.jpg' }"}</div>
                  <div>{"// ... এভাবে graphic8.jpg পর্যন্ত ৮টি ছবি আপলোড করা যাবে"}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <h4 className="font-heading text-base font-bold text-white">
                🎥 ভিডিও লিঙ্ক কীভাবে বসাবেন?
              </h4>
              <p className="text-xs text-neutral-300">
                ওয়েবসাইটে ভিডিও প্লে করার জন্য আপনি <strong>Direct MP4 Video</strong> অথবা <strong>YouTube Embed Video</strong> উভয়ই ব্যবহার করতে পারবেন:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* MP4 */}
                <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-2">
                  <div className="font-bold text-xs text-emerald-400">১. MP4 ভিডিও ব্যবহার করতে চাইলে:</div>
                  <pre className="p-3 bg-[#08090f] rounded-lg text-[11px] font-mono text-neutral-200">
{`videoUrl: "https://your-domain.com/video.mp4",
videoType: "mp4",`}
                  </pre>
                  <p className="text-[11px] text-neutral-400">
                    ব্রাউজারের বিল্ট-ইন প্লেয়ারে হাই কোয়ালিটিতে চলবে।
                  </p>
                </div>

                {/* YouTube */}
                <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-2">
                  <div className="font-bold text-xs text-rose-400">২. YouTube ভিডিও ব্যবহার করতে চাইলে:</div>
                  <pre className="p-3 bg-[#08090f] rounded-lg text-[11px] font-mono text-neutral-200">
{`videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
videoType: "youtube",`}
                  </pre>
                  <p className="text-[11px] text-neutral-400">
                    ইউটিউব লিঙ্ক দেওয়ার সময় <code className="text-amber-300">embed/</code> ফরম্যাট ব্যবহার করুন।
                  </p>
                </div>
              </div>

              {/* Showreel Note */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 space-y-2">
                <div className="font-bold text-xs text-amber-300">
                  🎬 প্রধান শোরিল ভিডিও (Hero Showreel) পরিবর্তন করার নিয়ম:
                </div>
                <p className="text-xs text-amber-200/90">
                  হোমপেজের হেডলাইনের নিচে থাকা শোরিল ভিডিও পরিবর্তন করতে <code className="mx-1 px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono">/src/data/portfolioData.ts</code> ফাইলের <code className="text-white font-mono">siteConfig.showreel</code> অবজেক্টে এডিট করুন:
                </p>
                <pre className="p-2.5 bg-[#08090f] rounded text-[11px] text-amber-300 font-mono">
{`showreel: {
  title: "Showreel",
  badge: "FEATURED WORK",
  videoUrl: "/showreel.mp4", // অথবা YouTube: "https://www.youtube.com/embed/YOUR_ID"
  videoType: "mp4",
}`}
                </pre>
              </div>

              {/* Vertical Reels Note */}
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 space-y-1">
                <div className="font-bold text-xs text-purple-300">
                  📱 রিলস বা শর্টস (9:16 Vertical Video) সেট করার নিয়ম:
                </div>
                <p className="text-xs text-purple-200/90">
                  TikTok, Instagram Reels বা YouTube Shorts এর মতো খাড়া ভিডিও দেখাতে চাইলে প্রজেক্টে 
                  <code className="mx-1 px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono">isVertical: true</code> 
                  লিখে দিন। কার্ড ও ভিডিও প্লেয়ার স্বয়ংক্রিয়ভাবে মোবাইল ফোনের শেপে প্রদর্শিত হবে!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TEXT & CONTACT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <h4 className="font-heading text-base font-bold text-white">
                ✍️ টেক্সট, টাইটেল ও যোগাযোগ তথ্য পরিবর্তন
              </h4>
              <p className="text-xs text-neutral-300">
                <code className="text-amber-400 font-mono">/src/data/portfolioData.ts</code> ফাইলের উপরের 
                <code className="text-white font-mono"> siteConfig</code> অংশে নিচের তথ্যগুলো আপনার পছন্দমতো এডিট করুন:
              </p>

              <div className="p-4 rounded-xl bg-[#08090f] border border-white/10 font-mono text-xs text-neutral-200 space-y-2">
                <div><span className="text-neutral-500">// এজেন্সির নাম</span></div>
                <div>agencyName: <span className="text-amber-300">"SABRLY MEDIA"</span>,</div>
                
                <div><span className="text-neutral-500">// মূল হেডলাইন</span></div>
                <div>headline: <span className="text-amber-300">"Transforming raw footage into"</span>,</div>
                <div>highlightedText: <span className="text-amber-300">"high-converting visual stories."</span>,</div>

                <div><span className="text-neutral-500">// যোগাযোগ ও ইমেইল</span></div>
                <div>email: <span className="text-amber-300">"borohanxzone@gmail.com"</span>,</div>
                <div>whatsapp: <span className="text-amber-300">"+880 1811-263668"</span>,</div>
                <div>location: <span className="text-amber-300">"Dhaka, Bangladesh • Serving Worldwide"</span>,</div>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE TESTER */}
          {activeTab === 'tester' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                💡 <strong>লাইভ টেস্ট:</strong> আপনি কোডে বসানোর আগে আপনার ইমেজ বা ভিডিও লিঙ্কটি এখানে পেস্ট করে সরাসরি চেক করে নিতে পারেন।
              </div>

              {/* Image Tester */}
              <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-3">
                <label className="block text-xs font-bold text-white">
                  টেস্ট ইমেজ ইউআরএল (Image URL):
                </label>
                <input
                  type="text"
                  value={testImgUrl}
                  onChange={(e) => setTestImgUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-[#0a0b10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
                <div className="mt-2 w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                  <img
                    src={testImgUrl}
                    alt="Test Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80');
                    }}
                  />
                </div>
              </div>

              {/* Video Tester */}
              <div className="p-4 rounded-xl bg-[#141724] border border-white/5 space-y-3">
                <label className="block text-xs font-bold text-white">
                  টেস্ট ভিডিও ইউআরএল (MP4 Video URL):
                </label>
                <input
                  type="text"
                  value={testVideoUrl}
                  onChange={(e) => setTestVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-[#0a0b10] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
                <div className="mt-2 w-full max-w-sm aspect-video rounded-lg overflow-hidden border border-white/10 bg-neutral-900">
                  <video
                    src={testVideoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121420] flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            ফাইলটি পাবেন: <code className="text-amber-400 font-mono">src/data/portfolioData.ts</code>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
          >
            বুঝেছি, বন্ধ করুন (Got it)
          </button>
        </div>

      </div>
    </div>
  );
};
