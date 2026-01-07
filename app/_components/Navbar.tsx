"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import HamburgerIcon from "./HamburgerIcon";

import localFont from "next/font/local";

import logo from "../../public/logo.png";

const generalSans = localFont({
  src: "../fonts/generalsans/GeneralSans-Variable.ttf",
});

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  function showDropdown() {
    setIsActive(true);
  }

  function closeDropdown() {
    setIsActive(false);
  }

  function toggleDrodpown() {
    setIsActive((c) => !c);
  }

  const currentPath = usePathname();

  return (
    <nav
      onMouseLeave={closeDropdown}
      className={`fixed left-0 top-0 z-20 flex h-20 w-full overflow-visible text-white`}
    >
      <div
        className={`${isActive ? "h-[600px] !bg-white" : "h-full"} w-full flex-col overflow-hidden bg-saddleBrown px-4 transition-all duration-500 lg:bg-transparent lg:px-10`}
      >
        <div className="grid h-20 w-full grid-cols-3 items-center justify-between">
          <ul
            className={`flex h-full items-center gap-x-8 justify-self-start text-base font-bold ${isActive ? "text-black" : currentPath === "/" ? "text-white" : "text-saddleBrown"} `}
          >
            <li className="hidden lg:flex">
              <Link href={"/"}>Home</Link>
            </li>

            <li className={`hidden lg:flex`}>
              <Link
                onMouseEnter={showDropdown}
                href={"/explore"}
                className="flex items-center gap-x-1"
              >
                Shop&nbsp;
                <ChevronDown
                  size={16}
                  className={`${isActive ? "rotate-180" : "rotate-0"} transition-transform duration-500`}
                />
              </Link>
            </li>

            {/* shown on mobile only */}
            <li className="block lg:hidden">
              <HamburgerIcon isActive={isActive} onClick={toggleDrodpown} />
            </li>
          </ul>

          <div className="justify-self-center">
            <Image src={logo} alt="logo" />
          </div>

          <ul
            className={`flex items-center justify-center gap-x-8 justify-self-end rounded-md bg-saddleBrown px-4 py-2 shadow-sm shadow-saddleBrown`}
          >
            <li>
              <Link
                className="relative flex items-center gap-x-3"
                href={"/cart"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0.599774C0 0.44064 0.0632161 0.288023 0.175741 0.175497C0.288267 0.0629719 0.440884 -0.000244141 0.600019 -0.000244141H2.40007C2.53392 -0.000207166 2.6639 0.0445781 2.76936 0.126989C2.87482 0.209401 2.9497 0.324707 2.98209 0.45457L3.46811 2.39983H17.4005C17.4886 2.39991 17.5756 2.41939 17.6554 2.45689C17.7351 2.49439 17.8056 2.54899 17.8618 2.6168C17.9181 2.68461 17.9587 2.76398 17.9808 2.84927C18.0029 2.93455 18.006 3.02365 17.9898 3.11025L16.1897 12.7105C16.164 12.848 16.091 12.9722 15.9834 13.0616C15.8758 13.151 15.7404 13.2 15.6005 13.2002H4.80015C4.66026 13.2 4.52482 13.151 4.41723 13.0616C4.30964 12.9722 4.23667 12.848 4.21093 12.7105L2.41207 3.12825L1.93206 1.19979H0.600019C0.440884 1.19979 0.288267 1.13658 0.175741 1.02405C0.0632161 0.911526 0 0.758909 0 0.599774ZM3.72252 3.59987L5.29816 12.0001H15.1025L16.6781 3.59987H3.72252ZM6.00019 13.2002C5.36365 13.2002 4.75318 13.453 4.30308 13.9031C3.85298 14.3532 3.60011 14.9637 3.60011 15.6002C3.60011 16.2368 3.85298 16.8472 4.30308 17.2973C4.75318 17.7474 5.36365 18.0003 6.00019 18.0003C6.63672 18.0003 7.24719 17.7474 7.69729 17.2973C8.1474 16.8472 8.40026 16.2368 8.40026 15.6002C8.40026 14.9637 8.1474 14.3532 7.69729 13.9031C7.24719 13.453 6.63672 13.2002 6.00019 13.2002ZM14.4004 13.2002C13.7639 13.2002 13.1534 13.453 12.7033 13.9031C12.2532 14.3532 12.0004 14.9637 12.0004 15.6002C12.0004 16.2368 12.2532 16.8472 12.7033 17.2973C13.1534 17.7474 13.7639 18.0003 14.4004 18.0003C15.037 18.0003 15.6475 17.7474 16.0976 17.2973C16.5477 16.8472 16.8005 16.2368 16.8005 15.6002C16.8005 14.9637 16.5477 14.3532 16.0976 13.9031C15.6475 13.453 15.037 13.2002 14.4004 13.2002ZM6.00019 14.4002C6.31846 14.4002 6.62369 14.5266 6.84874 14.7517C7.07379 14.9767 7.20022 15.282 7.20022 15.6002C7.20022 15.9185 7.07379 16.2237 6.84874 16.4488C6.62369 16.6738 6.31846 16.8003 6.00019 16.8003C5.68192 16.8003 5.37668 16.6738 5.15163 16.4488C4.92658 16.2237 4.80015 15.9185 4.80015 15.6002C4.80015 15.282 4.92658 14.9767 5.15163 14.7517C5.37668 14.5266 5.68192 14.4002 6.00019 14.4002ZM14.4004 14.4002C14.7187 14.4002 15.0239 14.5266 15.249 14.7517C15.4741 14.9767 15.6005 15.282 15.6005 15.6002C15.6005 15.9185 15.4741 16.2237 15.249 16.4488C15.0239 16.6738 14.7187 16.8003 14.4004 16.8003C14.0822 16.8003 13.7769 16.6738 13.5519 16.4488C13.3268 16.2237 13.2004 15.9185 13.2004 15.6002C13.2004 15.282 13.3268 14.9767 13.5519 14.7517C13.7769 14.5266 14.0822 14.4002 14.4004 14.4002Z"
                    fill="white"
                  />
                </svg>

                <span className="hidden text-sm tracking-wide lg:block">
                  Cart
                </span>
              </Link>
            </li>

            <li
              className={`relative flex items-center gap-x-2.5 ${generalSans.className}`}
            >
              <Link
                className="relative flex items-center gap-x-3"
                href={"/onboarding/sign-in"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9ZM12 4.5C12 5.29565 11.6839 6.05871 11.1213 6.62132C10.5587 7.18393 9.79565 7.5 9 7.5C8.20435 7.5 7.44129 7.18393 6.87868 6.62132C6.31607 6.05871 6 5.29565 6 4.5C6 3.70435 6.31607 2.94129 6.87868 2.37868C7.44129 1.81607 8.20435 1.5 9 1.5C9.79565 1.5 10.5587 1.81607 11.1213 2.37868C11.6839 2.94129 12 3.70435 12 4.5ZM18 16.5C18 18 16.5 18 16.5 18H1.5C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5ZM16.5 16.494C16.4985 16.125 16.269 15.015 15.252 13.998C14.274 13.02 12.4335 12 9 12C5.565 12 3.726 13.02 2.748 13.998C1.731 15.015 1.503 16.125 1.5 16.494H16.5Z"
                    fill="#fff"
                  />
                </svg>

                <span className="hidden text-sm tracking-wide lg:block">
                  Login
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`left-0 top-20 w-full justify-between py-10 text-black lg:py-16`}
        >
          <div className="hidden w-full justify-between text-center lg:flex">
            <ul>
              <li>
                <Link href={"/explore"}>Shop All</Link>
              </li>
            </ul>

            <ul className="space-y-4 text-right">
              <li>
                <p>Categories</p>
              </li>
              <li>
                <Link href={"/t-shirts"}>T-Shirts</Link>
              </li>
              <li>
                <Link href={"/essentials"}>Essentials</Link>
              </li>
              <li>
                <Link href={"/denim"}>Denim</Link>
              </li>
            </ul>
          </div>

          {/**shown only on mobile */}
          <div className="w-full text-center lg:hidden">
            <ul className="space-y-6 border-b-2 pb-12 text-3xl text-customGrey">
              <li>
                <Link
                  className={`${currentPath === "/" && "text-customBlue"} transition-colors duration-500 hover:text-customBlue active:text-customBlue`}
                  href={"/"}
                >
                  HOME
                </Link>
              </li>

              <li>
                <Link
                  className={`${currentPath === "/shop" && "text-customBlue"} transition-colors duration-500 hover:text-customBlue active:text-customBlue`}
                  href={"/"}
                >
                  SHOP
                </Link>
              </li>

              <li>
                <Link
                  className={`${currentPath === "/about" && "text-customBlue"} transition-colors duration-500 hover:text-customBlue active:text-customBlue`}
                  href={"/about"}
                >
                  ABOUT US
                </Link>
              </li>

              <li>
                <Link
                  className={`${currentPath === "/contact" && "text-customBlue"} transition-colors duration-500 hover:text-customBlue active:text-customBlue`}
                  href={"/contact"}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
