"use client";

import PageWrapper from "../_components/PageWrapper";

export default function Page() {
  return (
    <PageWrapper>
      <div className="flex h-dvh flex-col space-y-10 overflow-auto py-5">
        <div className="space-y-8">
          <h2 className="text-center text-4xl font-bold uppercase text-saddleBrown">
            CONTACT US
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-center">
            Share information about your brand with your customers. Describe a
            product, make announcements, or welcome customers to your store.
          </p>
        </div>

        <form className="mx-auto w-full flex-grow space-y-6 px-4 lg:w-1/2">
          <div className="flex gap-x-6">
            <input
              className="flex-grow border px-2 py-4 outline-none"
              placeholder="Name"
              name="customerName"
              type="text"
            />

            <input
              className="flex-grow border px-2 py-4 outline-none"
              placeholder="Email"
              name="customerEmail"
              type="email"
            />
          </div>

          <input
            className="w-full flex-grow border px-2 py-4 outline-none"
            placeholder="Phone Number"
            name="customerPhone"
            type="tel"
          />

          <textarea
            className="min-h-96 w-full flex-grow border px-2 py-4 outline-none"
            placeholder="Comment"
            name="customerComment"
          />

          <button
            type="button"
            className="w-full border border-black bg-saddleBrown p-2 text-sm uppercase text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
