// Design: Editorial Minimalism — User-provided office image with logo & slogan on wall
// Image already contains KONTA logo and English slogan — display as-is, no overlay text

const HERO_IMG = "/main_hero_new.jpg";

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-[#f0efed] min-h-screen flex items-center justify-center">
      
      <div className="flex flex-col lg:flex-row w-full max-w-[1920px] min-h-[100vh] pt-[80px] lg:pt-0">
        
        {/* Left Side: Typography */}
        <div className="flex-1 flex justify-center items-center py-16 lg:py-0 relative z-10 px-4 md:px-6">
          {/* Container for vertical texts - items-start so they align top, or items-center to center vertically */}
          <div className="flex gap-6 md:gap-12 lg:gap-16 items-center justify-center h-auto">
            
            {/* Sub English Text */}
            <div 
              className="font-['Montserrat'] text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] tracking-[0.25em] leading-[1.4] lg:leading-[1.5] text-[#1a1a1a]/50" 
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              Experiences and stories inspire people,<br />
              Creating and expanding new value.
            </div>

            {/* Main Japanese Text */}
            <div 
              className="font-['Noto_Serif_JP'] text-2xl md:text-3xl lg:text-[2.5rem] font-medium leading-[1.3] lg:leading-[1.4] tracking-[0.35em] text-[#1a1a1a]" 
              style={{ writingMode: "vertical-rl" }}
            >
              モノを超える。<br />
              ライフスタイルを創る。<br />
              新しい価値を広げる。
            </div>

          </div>
        </div>

        {/* Right Side: 3 Image Panels - Hidden on mobile for minimalism */}
        <div className="hidden lg:flex lg:flex-[1.2] flex-row gap-[2px] p-4 lg:p-12 lg:pl-0 h-[50vh] lg:h-[100vh] items-center justify-center relative z-10">
          
          <div className="relative w-1/3 h-full max-h-[80vh] overflow-hidden shadow-sm group">
            <img 
              src="/hero_panel_1.jpg" 
              alt="Lifestyle Room" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110" 
            />
          </div>
          
          <div className="relative w-1/3 h-full max-h-[80vh] overflow-hidden shadow-sm group">
            <img 
              src="/hero_panel_2.png" 
              alt="Cosmetics Product" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110" 
            />
          </div>
          
          <div className="relative w-1/3 h-full max-h-[80vh] overflow-hidden shadow-sm group">
            <img 
              src="/hero_panel_3.png" 
              alt="Live Commerce" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110" 
            />
          </div>

        </div>

      </div>


    </section>
  );
}
