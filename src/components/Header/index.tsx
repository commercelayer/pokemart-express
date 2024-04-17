"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useOrderContainer } from "@commercelayer/react-components";
import Basket from "@/components/Basket";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`mx-4 py-2 px-3 text-sm font-medium ${isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 hover:text-blue-500"}`}
    >
      {label}
    </Link>
  );
};
{
  /* <Image src="/images/logo.png" width={30} height={30} alt="Poké Mart" /> */
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { order } = useOrderContainer();

  console.log({ line: order?.cart_url });

  return (
    <header className="bg-white shadow py-4 relative overflow-hidden text-black">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={30}
              height={30}
              alt="Poké Mart"
            />
          </Link>
          <div className="font-bold">PokéMart Express</div>
        </div>
        <div className="flex flex-row gap-3">
          <div
            className={`absolute inset-0 z-20 bg-white p-5 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 sm:bg-transparent sm:p-0 sm:flex`}
          >
            <div className="absolute top-0 right-0 p-4 sm:hidden">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800"
              >
                {/* Icon for "X" */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <NavLink href="/" label="Home" />
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`text-gray-800 sm:hidden ${isMenuOpen ? "hidden" : "block"}`}
          >
            {/* Icon for burger menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div
            className={`fixed inset-0 z-10 bg-black opacity-50 ${isMenuOpen ? "block" : "hidden"} sm:hidden`}
          ></div>
          <Basket items={order?.skus_count || 0} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
