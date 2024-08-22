import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
type Props = {
  title: string;
  desc: string;
  image: string;
  background: string;
};
const Feature = ({ title, desc, image, background }: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y:0
      }}
      transition={{duration:1.5,ease:'linear'}}
      className="w-full max-w-[530px] h-[358px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto"
      data-aos="zoom-in"
      data-aos-offset="100"
      data-aos-delay="700"
    >
      <div className="hidden xl:flex absolute top-0 right-0 -z-10">
        <img src={background} alt="" />
      </div>
      <div
        className="max-w-[120px] xl:mr-7 xl:max-w-[232px]"
        data-aos="zoom-in-right"
        data-aos-delay="700"
      >
        <img src={image} alt={title} />
      </div>
      <div className="max-w-[220px]">
        <h3 className="h3 mb-4">{title}</h3>
        <p className="font-light italic mb-4">{desc}</p>
        <div className="flex items-center gap-x-2 group">
          <a className="text-primary font-bold" href="#">
            Learn more
          </a>
          <ArrowRight
            className="text-xl text-accent-primary group-hover:ml-[5px] transition-all"
            color="#9c69e2"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
