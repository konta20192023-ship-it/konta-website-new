// Design: Editorial Minimalism (3bl.jp style)
// UPDATED v5: New unique images, fully responsive balanced layout
// Layout: Heading top-full-width → then 2-col (image left, info right) at md+
// Images: Tokyo cityscape (hero) + office interior + lifestyle concept (unique, not duplicated from Business section)

import { useEffect, useRef } from "react";

const TOKYO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-about-tokyo-cityscape-fZe5qjbgtfUKDdVAW9ubH6.webp";
const OFFICE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-about-office-interior-kxRzHV3ToToacm8mUmwsum.webp";
const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/konta-about-lifestyle-concept-T24ye2MbtSXVZVh9h9KPzE.webp";

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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

export default function AboutSection() {
  const labelRef = useReveal(0);
  const headingRef = useReveal(80);
  const imgRef = useReveal(120);
  const infoRef = useReveal(160);

  return (
    <section id="about" className="bg-[#f5f5f3] py-16 md:py-24 overflow-hidden">
      {/* Section label */}
      <div ref={labelRef} className="px-6 md:px-10 lg:px-16 xl:px-20 mb-10 md:mb-14">
        <span className="font-['Montserrat'] text-[0.85rem] md:text-[0.95rem] tracking-[0.28em] text-[#1a1a1a]/50 uppercase font-semibold">
          About
        </span>
      </div>

      {/* Full-width heading */}
      <div ref={headingRef} className="px-6 md:px-10 lg:px-16 xl:px-20 mb-14 md:mb-20">
        <h2 className="font-['Cormorant_Garamond'] font-light text-[#1a1a1a] leading-[1.18]">
          <span className="block text-4xl md:text-5xl lg:text-6xl">ライフスタイルと価値を設計し、</span>
          <span className="block text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a]/55 mt-2">
            新しい可能性を創造する。
          </span>
        </h2>
      </div>

      {/* Main 2-col layout: images left, info right */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20">

        {/* Left: image collage — 40% width on desktop */}
        <div ref={imgRef} className="w-full lg:w-[42%] xl:w-[40%] shrink-0 flex flex-col gap-3">
          {/* Large top image: Tokyo cityscape */}
          <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
            <img
              src={TOKYO_IMG}
              alt="東京・神田神保町エリア"
              className="w-full aspect-[16/10] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          {/* Two smaller images side by side */}
          <div className="flex gap-3">
            <div className="flex-1 overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src={OFFICE_IMG}
                alt="オフィスインテリア"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="flex-1 overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src={LIFESTYLE_IMG}
                alt="ライフスタイル"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Right: body text + company info table — flex-1 */}
        <div ref={infoRef} className="flex-1 flex flex-col justify-start">
          <p className="font-['Noto_Sans_JP'] text-[0.95rem] md:text-[1rem] font-normal text-[#1a1a1a]/75 leading-[2.1] tracking-wide mb-10">
            株式会社權田は、不動産賃貸業を基盤に、民泊・旅館業、韓国化粧品コンサルティング、
            AIライブコマースプラットフォームなど、多様な事業を展開しています。
            東京都心・神田神保町を拠点に、地域に根ざしたサービスと革新的なビジネスモデルで、
            新しいライフスタイルの価値を創造し続けています。
          </p>

          {/* Company info table */}
          <div className="border-t border-[#e0ddd8]">
            {[
              { label: "社名", value: "株式会社權田" },
              { label: "英語名", value: "KONTA Co., Ltd." },
              { label: "設立", value: "2019年" },
              { label: "代表取締役", value: "權 容守" },
              { label: "所在地", value: "〒101-0051 東京都千代田区神田神保町2-12-3 L&Kビル 7階" },
              { label: "電話", value: "03-4400-1713" },
              { label: "メール", value: "konta20192023@gmail.com" },
            ].map(({ label, value }) => (
              <div key={label} className="flex border-b border-[#e0ddd8] py-4 gap-6">
                <span className="font-['Montserrat'] text-[0.62rem] tracking-[0.18em] text-[#1a1a1a]/50 uppercase w-24 shrink-0 pt-0.5 font-semibold">
                  {label}
                </span>
                <span className="font-['Noto_Sans_JP'] text-[0.92rem] font-normal text-[#1a1a1a]/85 leading-relaxed">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
