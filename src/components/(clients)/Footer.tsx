import { motion } from "framer-motion";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-white mt-12 py-8 pt-24 border-t border-gray-300">
      <div className="container mx-auto px-4 max-sm:space-y-7">
        <motion.div initial={{opacity:0, y: 50}} whileInView={{opacity:1, y:0}} transition={{duration:1}} className="flex max-sm:flex-col  items-center md:items-start justify-between text-[#212353]">
          <div className="max-sm:flex max-sm:flex-col max-sm:items-center md:w-1/2">
            <div className="flex items-end gap-5 mb-16">
              <Logo />
              <h2 className=" text-xl font-semibold">DataWarehouse</h2>
            </div>

            <div className="space-y-2 mb-5">
              <p className="text-sm max-w-44 font-normal">
                Warehouse Society, 234 Bahagia Ave Street PRBW 29281
              </p>
              <p className="text-sm max-w-36 font-light">
                info@warehouse.project 1-232-3434 (Main)
              </p>
            </div>
            
          </div>
          <div className="flex-1 flex max-sm:mt-10 max-sm:flex-col items-center justify-between gap-5">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="text-gray-600 text-sm">
                <li className="mb-2">Profile</li>
                <li className="mb-2">Features</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Help</h3>
              <ul className="text-gray-600 text-sm">
                <li className="mb-2">Support</li>
                <li className="mb-2">Sign up</li>
                <li>Guide</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 max-sm:text-center">Social Media</h3>
              <ul className="*:bg-gray-200  *:size-12 *:rounded-full flex items-center gap-5">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0, y: 50}} whileInView={{opacity:1, y:0}} transition={{duration:1}} className="flex max-sm:flex-col max-sm:gap-5 max-sm:mt-20 items-center justify-between">
        <p className="text-xs  font-light text-center max-sm:order-2">
              © Datawarehouse™, 2020. All rights reserved. Company Registration
              Number: 21479524.
            </p>
            <div className="max-sm:order-1 p-3 rounded-full bg-[#9C69E2]/20 flex items-center justify-center"><img src="message.png" alt="" className="size-7" /></div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
