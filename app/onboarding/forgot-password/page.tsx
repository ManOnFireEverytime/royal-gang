"use client";

import Link from "next/link";

import Button from "@/app/_components/Button";
import InputGroupContainer from "@/app/_components/InputGroupContainer";

export default function ForgotPassword() {
  //handle the password reset
  async function handleSubmit() {}

  return (
    <main className="flex h-dvh items-center justify-center px-4 pt-20">
      <div className="mx-auto w-full md:w-[50%]">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-left text-2xl font-bold text-headerBlue lg:text-3xl">
              Forgot Password
            </h2>

            <p className="text-left tracking-wide text-lightBlue">
              Enter your mail to receive a password reset link
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

              <Button
                onClick={() => {}}
                className={`w-full rounded-lg border bg-saddleBrown p-4 text-white`}
              >
                Send Reset Link
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p className="text-center text-sm">
              <Link
                href={"/onboarding/sign-in"}
                className="text-customBlue underline duration-500 ease-linear hover:text-lightBlue"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
