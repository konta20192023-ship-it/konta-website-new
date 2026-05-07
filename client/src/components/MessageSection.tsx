// Design: Editorial Minimalism
// UPDATED v17: Mobile-optimized photo display with better text sizing
// Photo fills the left column fully, full-body visible, balanced with text

import { useEffect, useRef } from "react";

const CHAIRMAN_IMG = "/chairman_full_v3.png";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
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

export default function MessageSection() {
  const photoRef = useReveal(0);
  const textRef = useReveal(120);

  return (
    <section id="message" className="bg-[#f5f5f3] py-16 md:py-24 overflow-hidden flex items-center min-h-[90vh]">

      <div className="flex flex-col md:flex-row items-stretch px-6 md:px-10 lg:px-16 xl:px-24 max-w-[1600px] mx-auto gap-0 w-full">

        {/* ── Photo column (Left) - Hidden on mobile ── */}
        <div className="hidden md:flex md:w-[33%] lg:w-[30%] flex-col relative" ref={photoRef}>
          {/* Section label - Absolute to allow image to reach the top level */}
          <div className="absolute top-0 left-0 z-10">
            <span className="font-['Montserrat'] text-[0.85rem] md:text-[0.95rem] tracking-[0.28em] text-[#1a1a1a]/60 uppercase font-bold">
              Message
            </span>
          </div>

          {/* Image - 280% scale for desktop, full body for mobile */}
          <div className="w-full flex-1 flex items-end justify-center pt-10 md:pt-24">
            <img
              src={CHAIRMAN_IMG}
              alt="代表取締役 權容守"
              className="w-full h-auto max-h-[100%] object-contain object-bottom scale-100 md:scale-[2.80] origin-bottom transition-transform duration-700"
            />
          </div>
        </div>

        {/* ── Text column (Right) ── */}
        <div 
          ref={textRef} 
          className="flex-1 flex flex-col justify-center pb-8 md:pb-0 pt-0 md:pt-16 pl-0 md:pl-20 border-l-0 md:border-l border-[#1a1a1a]/10"
        >
          {/* Mobile Label */}
          <div className="md:hidden mb-8">
            <span className="font-['Montserrat'] text-[0.85rem] tracking-[0.28em] text-[#1a1a1a]/60 uppercase font-bold">
              Message
            </span>
          </div>
          {/* Main heading */}
          <div className="mb-6 md:mb-8 mt-12 md:mt-0">
            <p className="font-['Noto_Sans_JP'] font-bold text-[#1a1a1a] leading-[1.7] text-[1.05rem] md:text-[1.2rem] lg:text-[1.35rem] text-justify">
              株式会社權田は、モノを届ける企業ではなく、ライフスタイルと価値を創造する企業へと進化してまいりました。
            </p>
          </div>

          {/* Short divider */}
          <div className="w-12 h-[1px] bg-[#1a1a1a]/20 mb-6 md:mb-8" />

          {/* Body paragraphs */}
          <div className="space-y-8">
            <p className="font-['Noto_Sans_JP'] text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] font-normal text-[#1a1a1a]/60 leading-[1.9] tracking-wide text-justify">
              これまで、化粧品セレクトショップ「cos:mura」を通じて、K-Beautyを日本の生活の中に届けてきた経験は、単なる商品流通にとどまらず、人々の価値観やライフスタイルに影響を与えるものであったと考えています。
            </p>
            <p className="font-['Noto_Sans_JP'] text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] font-normal text-[#1a1a1a]/60 leading-[1.9] tracking-wide text-justify">
              これからの時代に求められるのは、モノの提供ではなく、体験やストーリー、そして共感です。株式会社權田は、ブランド、体験、そしてライフスタイルの価値を設計し、人と人、価値と価値をつなぐことで、新しい可能性を創造してまいります。
            </p>
            <p className="font-['Noto_Sans_JP'] text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] font-normal text-[#1a1a1a]/60 leading-[1.9] tracking-wide text-justify">
              これからも時代の変化を捉えながら、社会とともに、新しい価値のかたちを創り続けてまいります。
            </p>
          </div>

          {/* Signature Block */}
          <div className="mt-12 md:mt-20 flex justify-end">
            <div className="flex flex-col items-end text-right gap-1 md:gap-2">
              <span className="font-['Noto_Sans_JP'] font-black text-[#1a1a1a] tracking-widest text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem]">
                權容守
              </span>
              <span className="font-['Noto_Sans_JP'] text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] font-medium text-[#1a1a1a]/50 tracking-wider">
                株式会社權田 代表取締役 &nbsp;|&nbsp; 韓国化粧品協会 会長
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
