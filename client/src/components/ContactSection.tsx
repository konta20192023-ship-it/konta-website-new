// Design: Editorial Minimalism (3bl.jp style)
// UPDATED: Heading sizes balanced, body text darker and larger for readability
// Contact: large serif heading + minimal form
// Footer: monochrome dark, logo + company info + copyright

import { useEffect, useRef, useState } from "react";

const FOOTER_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/kontalogo22_99c54fc6.png";

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

export default function ContactSection() {
  const titleRef = useReveal(0);
  const formRef = useReveal(150);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <section id="contact" className="bg-[#f0efed] overflow-hidden">

        {/* Section label */}
        <div className="px-6 md:px-10 lg:px-16 xl:px-20 pt-16 md:pt-24 pb-8 md:pb-12">
          <span className="font-['Montserrat'] text-[0.85rem] md:text-[0.95rem] tracking-[0.28em] text-[#1a1a1a]/50 uppercase font-semibold">
            Contact
          </span>
        </div>

        {/* Main: asymmetric heading + form */}
          <div className="px-6 md:px-10 lg:px-16 xl:px-20 pb-16 md:pb-20 flex flex-col md:flex-row md:gap-16 lg:gap-20">

          {/* Left: heading + info */}
          <div ref={titleRef} className="md:w-[42%] lg:w-[40%] shrink-0 mb-12 md:mb-0">
            <h2 className="font-['Noto_Serif_JP'] font-medium text-[#1a1a1a] leading-[1.1] mb-8">
              <span className="block text-3xl md:text-4xl lg:text-5xl">お問い合わせ</span>
              <span className="block text-[#1a1a1a]/50 mt-2 text-sm md:text-base lg:text-lg">Get in Touch</span>
            </h2>

            <div className="w-8 h-[1px] bg-[#1a1a1a]/25 mb-8" />

            <p className="font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a]/75 leading-[2.1] tracking-wide mb-10">
              事業に関するご相談、物件のお問い合わせ、<br />
              その他ご不明な点がございましたら、<br />
              お気軽にご連絡ください。
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              {[
                { label: "ADDRESS", value: "〒101-0051\n東京都千代田区神田神保町2-12-3\nL&Kビル 7階" },
                { label: "PHONE", value: "03-4400-1713" },
                { label: "EMAIL", value: "konta20192023@gmail.com" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-5">
                  <span className="font-['Montserrat'] text-[0.62rem] tracking-[0.2em] text-[#1a1a1a]/50 uppercase w-18 shrink-0 pt-0.5 font-semibold">
                    {label}
                  </span>
                  <span className="font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a]/75 leading-[1.9] whitespace-pre-line">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef} className="flex-1">
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-16">
                <span className="font-['Cormorant_Garamond'] text-4xl font-light text-[#1a1a1a]">
                  ありがとうございます
                </span>
                <div className="w-8 h-[1px] bg-[#1a1a1a]/25" />
                <p className="font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a]/70 leading-relaxed">
                  お問い合わせを受け付けました。<br />
                  担当者より折り返しご連絡いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                {/* Name */}
                <div className="border-t border-[#d8d5d0] py-5">
                  <label className="font-['Montserrat'] text-[0.62rem] tracking-[0.2em] text-[#1a1a1a]/50 uppercase block mb-3 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="お名前"
                    className="w-full bg-transparent font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 outline-none border-b border-[#d8d5d0] pb-2 focus:border-[#1a1a1a] transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div className="border-t border-[#d8d5d0] py-5">
                  <label className="font-['Montserrat'] text-[0.62rem] tracking-[0.2em] text-[#1a1a1a]/50 uppercase block mb-3 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="メールアドレス"
                    className="w-full bg-transparent font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 outline-none border-b border-[#d8d5d0] pb-2 focus:border-[#1a1a1a] transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="border-t border-[#d8d5d0] py-5">
                  <label className="font-['Montserrat'] text-[0.62rem] tracking-[0.2em] text-[#1a1a1a]/50 uppercase block mb-3 font-semibold">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="お問い合わせ内容"
                    className="w-full bg-transparent font-['Noto_Sans_JP'] text-sm font-normal text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 outline-none border-b border-[#d8d5d0] pb-2 focus:border-[#1a1a1a] transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="border-t border-[#d8d5d0] pt-7">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-10 py-4 bg-[#1a1a1a] text-white font-['Montserrat'] text-[0.7rem] tracking-[0.25em] uppercase hover:bg-transparent hover:text-[#1a1a1a] border border-[#1a1a1a] transition-all duration-300 font-bold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4 md:max-w-[260px]">
            <div className="flex items-center">
              <img
                src={FOOTER_LOGO_URL}
                alt="株式会社權田"
                className="h-12 md:h-18 w-auto object-contain"
                style={{ filter: "none" }}
              />
            </div>
            <p className="font-['Cormorant_Garamond'] text-base font-light text-white/50 italic leading-relaxed">
              "モノを超える。<br />ライフスタイルを創る。"
            </p>
          </div>

          {/* Company info */}
          <div className="flex flex-col gap-2">
            <span className="font-['Montserrat'] text-[0.6rem] tracking-[0.25em] text-white/40 uppercase mb-2 font-semibold">
              Company
            </span>
            <span className="font-['Noto_Sans_JP'] text-sm font-normal text-white/60 leading-[1.9]">
              〒101-0051 東京都千代田区神田神保町2-12-3<br />
              L&Kビル 7階
            </span>
            <a href="tel:0344001713" className="font-['Noto_Sans_JP'] text-sm font-normal text-white/50 hover:text-white/80 transition-colors">
              03-4400-1713
            </a>
            <a href="mailto:konta20192023@gmail.com" className="font-['Noto_Sans_JP'] text-sm font-normal text-white/50 hover:text-white/80 transition-colors">
              konta20192023@gmail.com
            </a>
          </div>

          {/* Business areas */}
          <div className="flex flex-col gap-2">
            <span className="font-['Montserrat'] text-[0.6rem] tracking-[0.25em] text-white/40 uppercase mb-2 font-semibold">
              Business
            </span>
            {["不動産賃貸業", "民泊・旅館業", "韓国化粧品コンサルティング", "Eコマース・ライブコマース"].map((b) => (
              <span key={b} className="font-['Noto_Sans_JP'] text-sm font-normal text-white/50 leading-relaxed">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="font-['Montserrat'] text-[0.55rem] tracking-[0.2em] text-white/30 uppercase">
            © 2024 KONTA Co., Ltd. All Rights Reserved.
          </span>
          <span className="font-['Noto_Sans_JP'] text-xs font-normal text-white/30">
            株式会社權田
          </span>
        </div>
      </footer>
    </>
  );
}
