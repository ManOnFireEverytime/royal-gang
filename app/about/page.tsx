import Link from "next/link";
import Footer from "../_components/footer";

export default function Page() {
  return (
    <>
      <main className="mt-20">
        <section className="h-dvh w-full border-y border-black"></section>

        <section className="overflow-hidden px-4 pb-8 pt-2 lg:px-10">
          <h2 className="header">Pursuit of self belief.</h2>

          <div className="mt-6 space-y-2">
            <p>
              Honor the Gift, which was founded by Russell Westbrook in 2016, is
              rooted in creativity, in fashion, and in self-belief. It is rooted
              in the concept that no matter where you come from you can reach
              wherever you want to go. 
            </p>

            <p>
              HTG, as many have come to call it, releases curated collections of
              accessories, men’s clothing, and women’s clothing every season.
              Every single collection is based on an idea that comes from the
              mind of Russell Westbrook, an idea that comes from his experiences
              growing up in the inner city. 
            </p>

            <p>
              Wherever you are, you can proudly wear Honor the Gift. Wherever
              you are going, you can honor your gift.
            </p>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <p className="text-xl text-saddleBrown">@royalgang</p>

            <Link href={"/"} className="linked-button">
              Follow Us
            </Link>
          </div>

          <div className="flex-s scrollbar mt-6 flex justify-between gap-x-10 overflow-auto">
            <div className="h-[244px] w-full flex-shrink-0 border border-black lg:h-[430px] lg:w-[312px]"></div>
            <div className="h-[244px] w-full flex-shrink-0 border border-black lg:h-[430px] lg:w-[312px]"></div>
            <div className="h-[244px] w-full flex-shrink-0 border border-black lg:h-[430px] lg:w-[312px]"></div>
            <div className="h-[244px] w-full flex-shrink-0 border border-black lg:h-[430px] lg:w-[312px]"></div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
