// Design: Editorial Minimalism (3bl.jp style)
// UPDATED: Heading sizes reduced, body text darker and larger for readability
// Large watermark text, alternating left/right image+text layout

import { useEffect, useRef } from "react";

const REALESTATE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-realestate-editorial-fHaAxkvbd39avbnHSf5EaE.webp";
const HOSPITALITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-hospitality-editorial-4wC3aSwmLwSM2om7nQVQfL.webp";
const BEAUTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-beauty-editorial-kALFyiGMGcLjuRFkEg4qag.webp";
const ECOMMERCE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-ecommerce-editorial-jL6ZEA7UeKRXjbsCnEkgXJ.webp";

const businesses = [
  {
    num: "01",
    en: "REAL ESTATE",
    jp: "不動産賃貸業",
    desc: "東京都心を中心に、オフィス、店舗、住居など多様な不動産の賃貸事業を展開。神田神保町のL&Kビルを拠点に、地域に根ざした不動産サービスを提供しています。",
    services: ["オフィス・店舗賃貸", "住居賃貸", "物件管理・運営", "不動産コンサルティング"],
    img: REALESTATE_IMG,
  },
  {
    num: "02",
    en: "HOSPITALITY",
    jp: "民泊・旅館業",
    desc: "日本の伝統とモダンデザインが融合した、心地よい宿泊体験を提供。インバウンド観光客から国内旅行者まで、幅広いお客様にご利用いただいています。",
    services: ["民泊施設運営", "旅館業", "宿泊施設プロモーション", "インバウンド対応"],
    img: HOSPITALITY_IMG,
  },
  {
    num: "03",
    en: "K-BEAUTY",
    jp: "韓国化粧品コンサルティング",
    desc: "「cos:mura」を通じてK-Beautyを日本市場に届けてきた経験を活かし、韓国コスメブランドの日本市場参入から販路開拓まで、トータルサポートを提供します。",
    services: ["市場調査・分析", "ブランド戦略立案", "商品企画・開発", "販路開拓支援"],
    img: BEAUTY_IMG,
  },
  {
    num: "04",
    en: "E-COMMERCE",
    jp: "Eコマース・ライブコマース",
    desc: "AIライブコマースプラットフォームを活用した次世代の販売体験を創造。体験と購買を融合させた新しいショッピングスタイルを提案します。",
    services: ["ライブコマース運営", "AIプラットフォーム活用", "EC販売支援", "コンテンツ制作"],
    img: ECOMMERCE_IMG,
  },
];

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function BusinessCard({ biz, reverse }: { biz: typeof businesses[0]; reverse: boolean }) {
  const ref = useReveal(0);
  return (
    <div
      ref={ref}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} border-t border-[#e0ddd8]`}
    >
      {/* Image */}
      <div className="img-overlay md:w-[48%] lg:w-[45%] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
        <img src={biz.img} alt={biz.jp} className="w-full h-full object-cover" />
      </div>

      {/* Text */}
      <div className={`flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-14 py-10 md:py-14 bg-[#f0efed] ${reverse ? 'md:items-end md:text-right' : ''}`}>
        {/* Large number watermark — slightly more visible */}
        {/* Number + label row */}
        <div className="flex items-baseline gap-3 mb-4">
          <span
            className="font-['Cormorant_Garamond'] font-light leading-none text-[#1a1a1a]/20 select-none"
            style={{ fontSize: "3.5rem" }}
          >
            {biz.num}
          </span>
          <span className="font-['Montserrat'] text-[0.65rem] tracking-[0.25em] text-[#1a1a1a]/55 uppercase font-semibold">
            {biz.en}
          </span>
        </div>

        {/* Japanese heading — reduced size */}
        <h3 className="font-['Noto_Serif_JP'] font-medium text-[#1a1a1a] leading-tight mb-4 text-lg sm:text-xl md:text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
          {biz.jp}
        </h3>

        {/* Thin line */}
        <div className={`w-8 h-[1px] bg-[#1a1a1a]/25 mb-5 ${reverse ? "md:ml-auto" : ""}`} />

        {/* Description — larger and darker */}
        <p className="font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a]/75 leading-[2.0] tracking-wide mb-7 max-w-sm">
          {biz.desc}
        </p>

        {/* Services */}
        <div className={`flex flex-wrap gap-2 ${reverse ? "md:justify-end" : ""}`}>
          {biz.services.map((s) => (
            <span
              key={s}
              className="font-['Noto_Sans_JP'] text-[0.65rem] font-normal text-[#1a1a1a]/65 border border-[#c8c5c0] px-3 py-1.5 tracking-wide"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusinessSection() {
  const titleRef = useReveal(0);

  return (
    <section id="business" className="bg-[#f0efed] pb-16 md:pb-24 overflow-hidden">

      {/* Section header */}
      <div ref={titleRef} className="px-6 md:px-10 lg:px-16 xl:px-20 pt-16 md:pt-24 pb-12 md:pb-16 relative overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-['Cormorant_Garamond'] font-light leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(8rem, 35vw, 16rem)", color: "rgba(26,26,26,0.04)" }}
          aria-hidden="true"
        >
          BUSINESS
        </div>

        <span className="font-['Montserrat'] text-[0.85rem] md:text-[0.95rem] tracking-[0.28em] text-[#1a1a1a]/50 uppercase block mb-3 md:mb-4 relative z-10 font-semibold">
          Business
        </span>
        <h2 className="font-['Noto_Serif_JP'] font-medium text-[#1a1a1a] leading-tight relative z-10">
          <span className="block text-2xl md:text-4xl lg:text-5xl">事業内容</span>
          <span className="block text-[#1a1a1a]/50 mt-1.5 md:mt-2 text-xs md:text-base lg:text-lg">Our Business Areas</span>
        </h2>
      </div>

      {/* Business cards — alternating layout */}
      <div className="flex flex-col">
        {businesses.map((biz, i) => (
          <BusinessCard key={biz.num} biz={biz} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
