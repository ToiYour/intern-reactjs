import { ChevronRight } from "lucide-react";
import ListFeature from "../../components/(clients)/ListFeature";
import TestimonialSlider from "../../components/(clients)/Testimonial";
import { motion } from "framer-motion";
const HomePage = () => {
  return  <div>
      <div className="container  mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center mb-12 h-screen">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "linear" }}
            className="md:w-1/2 mb-8 md:mb-0 space-y-12"
          >
            <h1 className="text-4xl max-sm:text-center md:text-6xl font-bold mb-4 text-[#212353] ">
              Save your data storage here.
            </h1>
            <p className="text-gray-600 mb-6 max-sm:text-center">
              Data Warehouse is a data storage area that has been tested for
              security, so you can store your data here safely but not be afraid
              of being stolen by others.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-[50px] flex items-center max-md:mx-auto">
              Learn more <ChevronRight className="ml-2" size={20} />
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
         
            transition={{ duration: 1, ease: "linear" }}  className="md:w-3/4">
            <img
              src="/banner.png"
              alt="Data storage illustration"
              className="w-full"
            />
          </motion.div>
        </div>

        <section className="mb-12">
          <motion.div initial={{opacity:0, y:-50}} whileInView={{opacity:1,y:0}}  transition={{duration:1,delay:0.5}} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#212353] ">Features</h2>
            <p className="text-lg text-[#4B5D68] mt-12">
              Some of the features and advantages that we provide for those of
              you who store data in this Data Warehouse.
            </p>
          </motion.div>

          <ListFeature />
        </section>

        <section className="">
          <TestimonialSlider />
        </section>
      </div>
    </div>
  
};

export default HomePage;
