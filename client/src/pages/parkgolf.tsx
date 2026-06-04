import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Calendar, Plane, CheckCircle2, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
} as const;

export default function ParkGolf() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden font-sans">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333770398/ZgHnYJz9Mp4Eb2ccWUmBVo/kontalogo-new_704ce0b7.png"
              alt="株式会社權田"
              className="h-12 md:h-18 w-auto object-contain"
              style={{ filter: "none" }}
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 relative -top-[2px] md:-top-[4px]">
            <button onClick={() => scrollToSection("intro")} className="text-sm font-medium hover:text-accent transition-colors">투어소개</button>
            <button onClick={() => scrollToSection("courses")} className="text-sm font-medium hover:text-accent transition-colors">코스안내</button>
            <button onClick={() => scrollToSection("itinerary")} className="text-sm font-medium hover:text-accent transition-colors">일정</button>
            <button onClick={() => scrollToSection("info")} className="text-sm font-medium hover:text-accent transition-colors">상세정보</button>
          </div>
          <Button onClick={() => scrollToSection("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 relative -top-[2px] md:-top-[4px]">
            문의하기
          </Button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: y1 }} className="h-full w-full">
            <img
              src="/images/hero.jpg"
              alt="Beautiful park golf course at sunrise"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center text-white mt-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className="text-sm md:text-lg tracking-widest uppercase font-medium text-white/90">
              세대를 넘어 함께 즐기는 프리미엄 레저여행
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
              한·일 파크골프<br className="md:hidden" /> 친선교류 투어 <br/>
              <span className="text-3xl md:text-5xl lg:text-6xl text-white/90 font-sans font-light mt-4 inline-block">in TOKYO</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto pt-4">
              도시의 설렘과 여유로운 플레이를 함께.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-12">
              <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-left">
                    <p className="text-xs text-white/70 uppercase">출발일</p>
                    <p className="font-semibold">9월 13일 (일) ~ 16일 (수)</p>
                  </span>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/20" />
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-left">
                    <p className="text-xs text-white/70 uppercase">장소</p>
                    <p className="font-semibold">일본 도쿄 · 치바현 일대</p>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={() => scrollToSection("intro")}
        >
          <span className="text-xs text-white/60 uppercase tracking-widest font-medium">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="text-white/80" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Intro / Product Identity */}
      <section id="intro" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-8">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif text-primary leading-tight">
              여유와 힐링이 공존하는<br />특별한 여정의 시작
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-16 h-1 bg-accent mx-auto rounded-full" />
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              일본의 아름다운 자연과 도시를 따라 파크골프, 온천, 관광을 함께 즐기는 새로운 스타일의 프리미엄 여행. <br className="hidden md:block" />가족, 친구, 동호회 누구나 함께 여유롭고 특별한 시간을 경험할 수 있습니다.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 3. Why Park Golf? (5 Points) */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary/50 uppercase mb-3">Why This Tour</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-primary">투어 스페셜 포인트 5</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "01",
                title: "천연잔디 코스의 여유",
                desc: (
                  <>
                    전략적인 코스 구성과 완벽하게 관리된
                    <br />
                    천연잔디에서의 라운드
                  </>
                )
              },
              {
                id: "02",
                title: "다양한 지형의 색다른 재미",
                desc: (
                  <>
                    사계절 내내 플레이가 가능한 흥미로운
                    <br />
                    지형과 코스
                  </>
                )
              },
              {
                id: "03",
                title: "계절이 빚어낸 아름다움",
                desc: <>일본의 자연 속에서 계절마다 다른 매력의 플레이 경험</>
              },
              {
                id: "04",
                title: "온천 · 관광 · 미식",
                desc: (
                  <>
                    플레이 후 이어지는 고품격 온천 휴식과
                    <br />
                    도쿄 미식 탐방
                  </>
                )
              },
              {
                id: "05",
                title: "편안하고 안전한 진행",
                desc: <>전용차량과 한국인 가이드 동행으로 오직 여행에만 집중</>
              },
            ].map((point, i) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card className="h-full bg-background border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="text-4xl font-serif text-secondary-foreground/20 font-bold mb-4">{point.id}</div>
                    <h4 className="text-xl font-semibold text-primary mb-3">{point.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{point.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Courses */}
      <section id="courses" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary/50 uppercase mb-3">The Courses</h2>
              <h3 className="text-3xl md:text-5xl font-serif text-primary leading-tight">엄선된 파크골프 코스</h3>
            </div>
            <p className="text-muted-foreground max-w-md text-lg">
              일본 관동 지역 최고 수준의 NPGA 공인 코스에서 잊지 못할 라운드를 경험하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-7">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/course.jpg" alt="Lush park golf course" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-12">
              {[
                {
                  title: <>① 하스누마 해변공원 파크골프장</>,
                  className: "text-[18px] xs:text-[20px] sm:text-xl md:text-2xl",
                  tags: ["36홀", "Par 132", "리조트형"],
                  desc: "구주쿠리 해변 옆에 위치하여 바다와 자연이 어우러진 리조트형 구장. 노기쿠, 키쿄, 히마와리, 야마유리 4개 코스 보유."
                },
                {
                  title: <>② 타케에이 에코파크골프 오키도</>,
                  className: "text-[18px] xs:text-[20px] sm:text-xl md:text-2xl",
                  tags: ["36홀", "관동 최대급", "친환경"],
                  desc: "관동 최대 규모를 자랑하며 대형 연못이 있는 매력적인 4개 코스(하다마리, 와카바, 소요카제, 세세라기) 운영."
                },
                {
                  title: (
                    <>
                      ③ 나리타 에어포트 시노노메 파크
                      <br className="md:hidden" />
                      골프장
                    </>
                  ),
                  className: "text-[18px] xs:text-[20px] sm:text-xl md:text-2xl",
                  tags: ["36홀", "친선경기", "공항 인접"],
                  desc: "비행기 이착륙을 보며 플레이하는 독특한 경험. 중·상급자를 위한 4개 코스로 구성된 국제대회 규격 구장."
                }
              ].map((course, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="space-y-3"
                >
                  <h4 className={`${course.className} font-serif text-primary font-bold leading-tight`}>{course.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{course.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Itinerary */}
      <section id="itinerary" className="py-24 bg-primary text-primary-foreground relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Itinerary</h2>
            <h3 className="text-3xl md:text-5xl font-serif mb-6">여정 안내 (3박 4일)</h3>
            <p className="text-primary-foreground/80 text-lg">9월 13일 (일) ~ 9월 16일 (수)</p>
          </div>

          <div className="space-y-8">
            {[
              {
                day: "DAY 1", date: "9월 13일 (일)",
                events: ["인천공항 출발 → 나리타 공항 도착 및 점심식사", "하스누마 해변공원 파크골프장 라운드", "가든하우스 마리노 호텔 체크인", "호텔 연회식 저녁식사 및 휴식"]
              },
              {
                day: "DAY 2", date: "9월 14일 (월)",
                events: ["호텔 조식 후 체크아웃", "타케에이에코 파크골프장 라운드 및 점심식사", "동경 시내 관광 (우에노, 아사쿠사 추천)", "저녁식사 후 동경 시내 호텔 체크인"]
              },
              {
                day: "DAY 3", date: "9월 15일 (화)",
                events: ["호텔 조식 후 동경 시내 쇼핑 및 관광 (긴자, 오다이바 추천)", "점심식사", "인터내셔널 리조트 호텔 유락성 체크인", "대욕장 온천욕 및 저녁 뷔페 후 휴식"]
              },
              {
                day: "DAY 4", date: "9월 16일 (수)",
                events: ["호텔 조식 후 한·일 교류 파크골프장으로 이동", "나리타 에어포트 시노노메 파크골프장 라운드", "친선경기 시상식 및 기념품 전달", "점심식사 및 신쇼지 관광 후 귀국"]
              }
            ].map((day) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 bg-white/5 p-8 rounded-2xl border border-white/10"
              >
                <div className="md:w-1/3 shrink-0">
                  <h4 className="text-3xl font-serif text-accent mb-2">{day.day}</h4>
                  <p className="text-primary-foreground/70">{day.date}</p>
                </div>
                <div className="md:w-2/3 space-y-4">
                  {day.events.map((event, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <p className="text-lg leading-relaxed">{event}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Hotels & Tokyo */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-primary/50 uppercase mb-3">Accommodation</h2>
                <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">편안한 휴식을 위한 호텔</h3>
              </div>
              <Accordion type="single" collapsible defaultValue="hotel-1" className="w-full">
                <AccordionItem value="hotel-1" className="border-b-border">
                  <AccordionTrigger className="text-xl font-serif hover:text-primary/60 transition-colors">하스누마 가든하우스 마리노 리조트</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <p>구주쿠리 해변 중심부에 위치하며 파크골프장과 인접해 있습니다. 라듐 온천 대욕장과 넓은 연회장을 갖추고 있어 플레이 후 완벽한 피로 회복을 선사합니다. (조식·석식 포함)</p>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      <img src="/images/marino_exterior.jpg" alt="호텔 외관" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/marino_room.jpg" alt="객실" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/marino_bath.jpg" alt="온천 대욕장" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/marino_food.jpg" alt="석식 가이세키" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/marino_golf_view.jpg" alt="파크골프 코스 전경" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="hotel-2" className="border-b-border">
                  <AccordionTrigger className="text-xl font-serif hover:text-primary/60 transition-colors">인터내셔널 리조트 호텔 유락성</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    <p>나리타 공항 인근의 490개 객실을 보유한 대형 리조트. 일본 최대급 온천시설인 '유락성'을 비롯해 실내수영장, 피트니스 등 다채로운 부대시설을 즐길 수 있습니다. (조식·석식 포함)</p>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      <img src="/images/yurakujo_hotel_exterior.jpg" alt="호텔 외관" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/yurakujo_room.jpg" alt="객실" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/yurakujo_spa_indoor.jpg" alt="유락성 내부" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/yurakujo_spa_outdoor.jpg" alt="노천 온천" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      <img src="/images/yurakujo_buffet.jpg" alt="뷔페" className="rounded-lg aspect-[4/3] object-cover w-full h-auto border border-border hover:scale-105 transition-transform duration-300 cursor-pointer" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="hotel-3" className="border-none">
                  <AccordionTrigger className="text-xl font-serif hover:text-primary/60 transition-colors">동경 시내 4성급 호텔</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    도쿄 도심의 야경과 편리한 접근성을 자랑하는 4성급 프리미엄 호텔에서 편안한 밤을 제공합니다. (조식 포함)
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/onsen.jpg" alt="Luxurious Japanese Onsen" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-xl max-w-[280px] hidden md:block">
                <p className="font-serif text-lg text-primary italic">"라운드 후 즐기는 따뜻한 온천욕은 일본 투어만의 특별한 힐링입니다."</p>
              </div>
            </div>
          </div>

          <Separator className="mb-24" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <img src="/images/tokyo.jpg" alt="Tokyo Sightseeing" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-primary/50 uppercase mb-3">Sightseeing</h2>
                <h3 className="text-3xl md:text-4xl font-serif text-primary mb-6">도쿄의 매력 탐방</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  현대적인 도시의 화려함과 전통의 아름다움이 공존하는 도쿄의 핵심 명소들을 여유롭게 둘러봅니다.
                </p>
                <ul className="space-y-4">
                  {[
                    { name: "아사쿠사", desc: "센소지, 가미나리몬, 전통 상점가 나카미세 거리" },
                    { name: "우에노", desc: "우에노 공원, 아메요코시장" },
                    { name: "긴자", desc: "럭셔리 쇼핑의 중심, 긴자식스, 미츠코시 백화점" },
                    { name: "오다이바", desc: "도쿄만 뷰의 레인보우 브릿지와 다이버시티" }
                  ].map(place => (
                    <li key={place.name} className="flex gap-4 items-start">
                      <div className="mt-1 bg-secondary p-1.5 rounded-full text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="text-lg font-medium text-primary block">{place.name}</strong>
                        <span className="text-muted-foreground">{place.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Information & Pricing */}
      <section id="info" className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-background rounded-3xl p-8 md:p-16 shadow-lg border border-border">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif text-primary mb-4">투어 상세 안내</h3>
              <div className="inline-block bg-primary/5 text-primary px-6 py-2 rounded-full font-bold text-2xl">
                1인당 999,000원~ <span className="text-sm font-normal text-muted-foreground ml-2">(30명 출발 기준)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <h4 className="flex items-center gap-2 text-xl font-bold text-primary border-b border-border pb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary/60" /> 포함 내역
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 대형 전용버스 (통행료, 유류대, 기사 팁 포함)</li>
                  <li>• 한국인 전문 가이드 동행 (경비 포함)</li>
                  <li>• 파크골프장 3곳 입장료 및 장비 렌트비</li>
                  <li>• 한·일 친선경기 참가비</li>
                  <li>• 3박 호텔 숙박비 (2인 1실 기준)</li>
                  <li>• 일정표상의 식사비 (조식, 중식, 석식)</li>
                  <li>• 여행자 보험 가입</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="flex items-center gap-2 text-xl font-bold text-primary border-b border-border pb-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-muted-foreground text-muted-foreground text-xs font-bold shrink-0">-</span>
                  불포함 내역
                </h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 왕복 항공권 (개별 발권 또는 대행 문의)</li>
                  <li>• 개인 경비 및 매너 팁</li>
                  <li className="pt-4 mt-4 border-t border-border/50">
                    <strong className="text-primary block mb-2">추천 항공편 (아시아나항공)</strong>
                    <div className="text-sm bg-secondary p-3 rounded-lg flex items-start gap-3">
                      <Plane className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <div>
                        가는편: OZ102 인천(ICN) 08:25 → 나리타 10:50<br/>
                        오는편: OZ105 나리타(NRT) 19:45 → 인천 22:15
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-xl text-center text-primary">
              <p className="font-medium">본 상품은 기획 여행 상품으로, 현지 사정에 따라 일정이 일부 변경될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact CTA */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif mb-6">당신의 특별한 여정을 준비합니다</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
              궁금한 점이 있으시거나 예약을 원하신다면 언제든 연락주세요.<br/>전문 상담원이 친절하게 안내해 드립니다.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-none text-primary-foreground backdrop-blur-sm hover:bg-white/15 transition-colors">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-widest">Phone</p>
                  <p className="text-xl font-medium tracking-wider">+81 3-4400-1713</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-none text-primary-foreground backdrop-blur-sm hover:bg-white/15 transition-colors">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-widest">Email</p>
                  <a href="mailto:konta.tokyo@gmail.com" className="text-lg font-medium hover:text-accent transition-colors">konta.tokyo@gmail.com</a>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-none text-primary-foreground backdrop-blur-sm hover:bg-white/15 transition-colors">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-widest">Website</p>
                  <a href="http://www.konta-tokyo.jp" target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-accent transition-colors">www.konta-tokyo.jp</a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-12">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-white hover:text-primary rounded-full px-8 py-6 h-auto text-lg group">
                상담 문의하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 text-primary-foreground/60 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} KONTA TOKYO. All rights reserved.</p>
      </footer>
    </div>
  );
}
