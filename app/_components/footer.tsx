import Image from "next/image";
import Link from "next/link";

import image4 from "../../public/image4.png";

export default function Footer() {
  return (
    <footer className={`space-y-10 px-4 py-8 text-black lg:p-16`}>
      <div className="flex flex-col items-center justify-between gap-y-10 lg:flex-row">
        <div className="order-3 flex w-full justify-between gap-x-20 lg:order-1 lg:w-auto">
          <div className="space-y-5 lg:space-y-10">
            <h1 className="text-saddleBrown">Policies</h1>

            <ul className="space-y-8">
              <li>
                <Link href={"refund-policy"}>Refund Policy</Link>
              </li>

              <li>
                <Link href={"/exchange-policy"}>Exchange Policy</Link>
              </li>

              <li>
                <Link href={"/terms-and-conditions"}>Terms and Condition</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5 lg:space-y-10">
            <h1 className="text-saddleBrown">Support</h1>

            <ul className="space-y-8">
              <li>
                <Link href={"/faqs"}>FAQS</Link>
              </li>

              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative order-1 aspect-square min-h-[150px] self-start lg:order-2">
          <Image
            src={image4}
            className="h-full w-full object-contain"
            fill
            alt="brand logo"
          />
        </div>

        <div className="order-2 w-full space-y-5 self-baseline lg:order-2 lg:w-auto lg:space-y-10">
          <h1 className="text-saddleBrown">Newsletter</h1>

          <form className="flex flex-col gap-4 lg:flex-row">
            <div>
              <input
                type="email"
                className="w-full border-b py-1 capitalize lg:min-w-[200px]"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              className="self-start border-b border-saddleBrown py-1 uppercase text-saddleBrown"
              title="subscribe"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="h-[1px] w-full bg-stone-200"></div>

      <p className="text-saddleBrown">
        &copy;&nbsp;{new Date().getFullYear()} Royal Gang
      </p>
    </footer>
  );
}
