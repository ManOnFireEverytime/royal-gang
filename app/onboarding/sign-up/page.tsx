"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/app/_components/Button";
import InputGroupContainer from "@/app/_components/InputGroupContainer";

import royalImage2 from "../../../public/royalImage2.webp";

export default function SignUp() {
  async function handleSubmit() {}

  return (
    <main className="flex h-dvh items-center justify-between pt-20">
      <div className="mx-auto basis-[80%] px-4 lg:basis-1/2 lg:px-10">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-center text-2xl font-bold text-headerBlue lg:text-3xl">
              Create An Account
            </h2>

            <p className="text-center tracking-wide text-lightBlue">
              Get the best collections of our brands now!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <InputGroupContainer>
                <label className="input-label">Email</label>

                <input
                  name="email"
                  placeholder="you@email.com"
                  className="input-style"
                  required
                  type="email"
                />
              </InputGroupContainer>

              <InputGroupContainer>
                <label className="input-label">Password</label>

                <input
                  name="password"
                  className="input-style"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </InputGroupContainer>

              <InputGroupContainer>
                <label className="input-label">Confirm Password</label>

                <input
                  name="confirm-password"
                  className="input-style"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </InputGroupContainer>

              <Button
                onClick={() => {}}
                className={`w-full rounded-lg border bg-saddleBrown p-4 text-white`}
              >
                Sign Up
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p className="text-center text-sm">
              <span className="text-lightBlue">
                Already have an account?&nbsp;
              </span>

              <Link
                href={"/onboarding/sign-in"}
                className="text-saddleBrown underline duration-500 ease-linear hover:text-lightBlue"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full basis-1/2 lg:block">
        <Image alt="image" src={royalImage2} className="object-cover" fill />
      </div>
    </main>
  );
}
