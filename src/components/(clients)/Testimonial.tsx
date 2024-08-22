import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getAllGalleries } from "../../services/galleries";
import { motion } from "framer-motion";

interface ITestimonial {
  id: string;
  desctiption: string;
  imageUrl: string;
}
export default function TestimonialSlider() {
  const swiperRef = useRef<SwiperType>();
  const [testimonials, setTestimonials] = useState<ITestimonial[]>();
  useEffect(() => {
    (async () => {
      const { data } = await getAllGalleries();
      setTestimonials(data);
    })();
  }, []);
  if (!testimonials) {
    return <h2>Loading...</h2>;
  }
  return (
    <motion.section initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}}  transition={{duration:2,ease:'easeIn'}} className="bg-purple-500  pt-0 rounded-3xl  w-full md:pb-16">
      <h2 className="text-white text-3xl font-bold py-5 px-7 md:py-20 md:px-24">
        Testimonials
      </h2>
      <div className="relative">
        <Swiper
          cssMode={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper h-auto"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial?.id} >
              <div className="px-2 md:px-24">
                <div className=" bg-white rounded-2xl p-6 relative h-auto md:h-80 flex items-center justify-center md:px-24 md:pt-16 md:pb-12 shadow-[0px_20px_1px_rgba(156,_105,_226,_1),_0_10px_20px_rgba(204,_204,_204,_204)]">
                  <div className="flex max-sm:flex-col items-start gap-5 md:gap-11">
                  <div className="min-w-[130px] min-h-[90px] " >
                      <img
                        src={'https://i.pinimg.com/564x/e1/55/0f/e1550f7dbad964eca0e4c91406e86783.jpg'}
                        alt={testimonial.desctiption}
                        style={{clipPath:'ellipse(closest-side farthest-side)'}}
                        className="w-full aspect-[4/3] object-cover [clip-path:ellipse(50%_40%_at_50%_50%)]"
                      />
                      </div>
                    <div className="flex flex-col items-start gap-5">
                      <div>
                        <h3 className="font-bold text-lg">John Fang</h3>
                        <a className="text-purple-500">wordfaang.com</a>
                      </div>

                      <p className="text-gray-600">
                        {testimonial?.desctiption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => {
            swiperRef?.current?.slidePrev();
          }}
          className="absolute z-30 left-1 md:left-14 top-1/2 transform -translate-y-1/2 text-purple-500 md:text-white"
        >
          <ArrowLeft size={24} />
        </button>

        <button
          onClick={() => swiperRef?.current?.slideNext()}
          className="absolute z-30 right-1 md:right-14 top-1/2 transform -translate-y-1/2 text-purple-500 md:text-white"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </motion.section>
  );
}
