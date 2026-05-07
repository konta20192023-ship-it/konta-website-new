// Design: Editorial Minimalism (3bl.jp style)
// Logo left, nav center text links, MENU right
// Monochrome, Montserrat labels, minimal border on scroll

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NEW_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/kontalogo-new_704ce0b7.png";

const navItems = [
  { label: "ABOUT", labelJp: "会社概要", href: "#about" },
  { label: "BUSINESS", labelJp: "事業内容", href: "#business" },
  { label: "MESSAGE", labelJp: "代表メッセージ", href: "#message" },
  { label: "CONTACT", labelJp: "お問い合わせ", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, menuOpen ? 300 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e0ddd8] shadow-sm"
          : "bg-white/70 backdrop-blur-sm border-b border-white/30"
          }`}
      >
        <div className="flex items-start justify-between px-6 md:px-10 lg:px-16 xl:px-20 h-[68px] md:h-[80px] pt-[18px] md:pt-[22px]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center shrink-0 ml-[5vw] md:ml-[10vw] lg:ml-[15vw]" /* 이 여백 값을 조절하여 끝선에 맞추세요 */
          >
            <img
              src={NEW_LOGO_URL}
              alt="株式会社權田"
              className="h-12 md:h-18 w-auto object-contain"
              style={{ filter: "none" }}
            />
          </a>

          {/* Desktop Nav — center/right aligned */}
          <nav className="hidden md:flex items-start gap-8 lg:gap-12 absolute left-[55%] lg:left-[58%] -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="group flex flex-col items-center gap-0.5"
              >
                <span className="font-['Montserrat'] text-[0.95rem] tracking-[0.18em] font-semibold text-[#1a1a1a] group-hover:text-[#1a1a1a]/60 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="font-['Noto_Sans_JP'] text-[0.85rem] tracking-wider text-[#1a1a1a]/70 group-hover:text-[#1a1a1a] transition-colors duration-300">
                  {item.labelJp}
                </span>
              </button>
            ))}
          </nav>

          {/* Mobile MENU button */}
          <button
            className="md:hidden flex items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            {menuOpen ? (
              <X size={16} className="text-[#1a1a1a]" />
            ) : (
              <span className="flex flex-col gap-[5px]">
                <span className="block w-5 h-[1px] bg-[#1a1a1a]" />
                <span className="block w-3.5 h-[1px] bg-[#1a1a1a]" />
              </span>
            )}
            <span className="font-['Montserrat'] text-[0.65rem] tracking-[0.2em] font-semibold text-[#1a1a1a]">
              MENU
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#f5f5f3] flex flex-col justify-center items-center transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <button
          className="absolute top-5 right-6 flex items-center gap-1.5"
          onClick={() => setMenuOpen(false)}
        >
          <X size={16} className="text-[#1a1a1a]" />
          <span className="font-['Montserrat'] text-[0.65rem] tracking-[0.2em] font-semibold text-[#1a1a1a]">CLOSE</span>
        </button>

        <nav className="flex flex-col items-center gap-10">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="flex flex-col items-center gap-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-['Cormorant_Garamond'] text-4xl font-light text-[#1a1a1a] tracking-wide">
                {item.label}
              </span>
              <span className="font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a]/60 tracking-widest">
                {item.labelJp}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-10 font-['Montserrat'] text-[0.6rem] tracking-[0.25em] text-[#1a1a1a]/40">
          KONTA Co., Ltd. © 2024
        </div>
      </div>
    </>
  );
}
