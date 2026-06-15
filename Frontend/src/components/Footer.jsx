import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Youtube,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-8 ">
      {/*Main Container*/}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left py-5">
        {/*Section 1: Contact*/}
        <div className="flex-1 min-w-62.5">
          <h3 className="text-xl font-semibold mb-4 text-white">Contact US</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2">
            <Phone size={16} /> Phone: +91 8807296649
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2">
            <Mail size={16} />
            Email : palanikumar0508@gmail.com
          </p>
        </div>
        {/*Section 2: SocialMedia Links*/}
        <div className="flex-1 min-w-62.5 items-center gap-4 ">
          <h3 className="text-xl font-semibold mb-4 text-white">Follow Me</h3>
          <div className="flex gap-4 items-center justify-center md:justify-start">
            <a href="#">
              <Github
                target="blank"
                className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-gray-500 "
              />
            </a>
            <a href="#">
              <Linkedin
                target="blank"
                className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-blue-500"
              />
            </a>
            <a href="#">
              <Youtube
                target="blank"
                className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-red-500"
              />
            </a>
            <a href="#">
              <Instagram
                target="blank"
                className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:scale-110 hover:text-pink-500"
              />
            </a>
          </div>
        </div>

        {/*Section 3: About*/}
        <div className="flex-1 min-w-62.5">
          <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
          <p className="text-gray-400 leading-relaxed">
            Providing Professional e-commerce solutions to help you grow your
            online business
          </p>
        </div>
      </div>
      {/*Bottom*/}
      <div className="border-t border-gray-700 py-4 text-center font-semibold text-gray-400 text-sm">
        © 2026 E-Commerce Platform. All Right reserved.
      </div>
    </footer>
  );
};

export default Footer;
