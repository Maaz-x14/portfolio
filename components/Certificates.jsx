import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules' // NEW PATH

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const certs = [
  {title: 'Generative AI Developer', org: 'HEC & ULEF', date: 'Dec 2025'},
  {title: 'Machine Learning Specialization', org: 'DeepLearning.AI', date: '2025'},
  {title: 'React Development', org: 'IBM', date: '2024'},
  {title: 'Linux Fundamentals', org: 'Learn Quest', date: '2024'}
]

export default function Certificates(){
  return (
    <section className="max-content px-6 py-20" aria-label="Certificates">
      <h2 className="text-4xl font-display mb-12 text-[#0B2545] border-b border-[#8DA9C4]/20 pb-4">
        CREDENTIALS // EXHIBIT_03
      </h2>
      
      <Swiper
        modules={[EffectCoverflow, Autoplay]} // Inject modules here
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{ 
          rotate: 35, 
          stretch: 0, 
          depth: 100, 
          modifier: 1, 
          slideShadows: true 
        }}
        className="certificate-swiper py-12"
      >
        {certs.map((c, i)=> (
          <SwiperSlide key={i} style={{width: 400, height: 280}} className="shadow-xl">
            <div className="bg-[#13315C] text-[#EEF4ED] h-full p-8 flex flex-col justify-between border-1px border-[#8DA9C4]/30">
               <div>
                  <h3 className="text-2xl font-bold leading-tight mb-2">{c.title}</h3>
                  <p className="text-[#8DA9C4] uppercase tracking-widest text-[10px]">{c.org}</p>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono opacity-50">{c.date}</span>
                  <button className="text-[10px] tracking-widest border border-[#EEF4ED]/20 px-3 py-1 hover:bg-[#EEF4ED] hover:text-[#13315C] transition-all">
                    VIEW_CERT
                  </button>
               </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}