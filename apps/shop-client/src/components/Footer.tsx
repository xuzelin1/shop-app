import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
              <span className="font-semibold">off.store</span>
            </div>
            <p className="text-sm text-gray-600">
              Digital meets fashion. High-quality products from trusted brands.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products?category=men" className="hover:text-black transition">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="hover:text-black transition">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products?category=children" className="hover:text-black transition">
                  Children
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-black transition">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Help</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black transition">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Stay in touch</h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex space-x-3 mb-4">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition"
              />
              <button className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
                Join
              </button>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 hover:bg-gray-200 rounded-full transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 hover:bg-gray-200 rounded-full transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 hover:bg-gray-200 rounded-full transition">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2026 off.store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-black transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-black transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

