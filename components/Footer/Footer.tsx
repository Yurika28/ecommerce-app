import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { mainCats } from '../UI/Categories';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand & Socials */}
          <div>
            <h3 className="text-xl font-bold mb-4">WHOLSALE</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs. From fashion to electronics, we deliver quality and satisfaction.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-gray-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {mainCats.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white text-sm"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Shipping Information', href: '/shipping' },
                { label: 'Returns & Exchanges', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h3 className="text-xl font-bold mb-4">Download Our App</h3>
            <div className="space-y-4">
              {/* App Store */}
              <a
                href="#"
                className="flex items-center bg-black px-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.65 1.29-1.51 2.58-2.25 4.05zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex items-center bg-black px-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186c-.2.2-.3.4-.3.7v.3c0 .3.1.5.3.7l1.4 1.4c.2.2.4.3.7.3.3 0 .5-.1.7-.3L17.792 12 6.409.614c-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-1.4 1.4c-.2.2-.3.4-.3.7v.3c0 .3.1.5.3.7z" />
                </svg>
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} WHOLSALE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
