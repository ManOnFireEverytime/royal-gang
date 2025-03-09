"use client";

import Link from "next/link";
import Image from "next/image";

import Button from "@/app/_components/Button";
import GoogleIcon from "@/app/_components/GoogleIcon";
import InputGroupContainer from "@/app/_components/InputGroupContainer";

import royalImage2 from "../../../public/royalImage2.webp";

export default function SignIn() {
  async function handleSignInWithGmail() {}

  async function handleSignIn() {}

  return (
    <main className="flex h-dvh items-center justify-between pt-20">
      <div className="mx-auto basis-[80%] px-4 lg:basis-1/2 lg:px-10">
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-semibold text-lightBlue lg:text-3xl">
            Sign In
          </h2>

          <div className="flex flex-col justify-between gap-y-5">
            <Button
              onClick={handleSignInWithGmail}
              className={`flex w-full items-center justify-center gap-x-4 rounded-lg border px-4 py-3 font-semibold tracking-wide text-lightBlue shadow-sm shadow-slate-200 transition-colors duration-300 hover:bg-customBlue hover:text-white`}
            >
              <GoogleIcon />

              <span> Sign In With Gmail</span>
            </Button>
          </div>

          <div className="relative flex justify-center text-sm">
            <div className="border-border-strong absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-t"></div>

            <span className="z-5 relative bg-white px-2 text-lg uppercase text-lightBlue dark:bg-white">
              or
            </span>
          </div>

          <div>
            <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
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

              <Button
                onClick={() => {}}
                className={`w-full rounded-lg border bg-saddleBrown p-4 text-white transition-colors duration-300 hover:bg-goldenRod`}
              >
                Login with Password
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p className="text-center text-sm">
              <span className="text-lightBlue">
                Dont&apos;t have an account?&nbsp;
              </span>

              <Link
                href={"/onboarding/sign-up"}
                className="text-saddleBrown underline duration-500 ease-linear hover:text-lightBlue"
              >
                Sign Up Now
              </Link>
            </p>

            <Link
              href={"/onboarding/forgot-password"}
              className="text-center text-sm text-lightBlue underline duration-500 ease-linear hover:text-customBlue"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full basis-1/2 lg:block">
        <Image alt="image" src={royalImage2} className="object-cover" fill />
      </div>
    </main>
  );
}
