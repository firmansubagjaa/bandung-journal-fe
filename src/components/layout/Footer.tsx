import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mt-24">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight border-b-2 border-black dark:border-gray-700 pb-2 mb-4 dark:text-white">
              Bandung Journal
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The independent voice of the creative city. Uncovering stories from the streets of Bandung to the world.
            </p>
          </div>

          {/* News Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-gray-500 dark:text-gray-400">
              News
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/articles" className="text-sm sm:text-base hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300 py-1">
                Latest Articles
              </Link>
              <Link to="/categories" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                Categories
              </Link>
              <Link to="/tags" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                Browse Tags
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Company
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                About Us
              </Link>
              <Link to="/contact" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                Contact
              </Link>
              <Link to="/terms" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sm hover:text-swiss-blue dark:hover:text-blue-400 transition-colors font-semibold dark:text-gray-300">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Connect
            </h4>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white transition-colors dark:text-gray-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white transition-colors dark:text-gray-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-black dark:border-gray-600 hover:bg-swiss-blue hover:border-swiss-blue hover:text-white transition-colors dark:text-gray-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Bandung Journal. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Built with ❤️ in Bandung, Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
