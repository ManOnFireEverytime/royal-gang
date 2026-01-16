"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/app/_components/Button";
import InputGroupContainer from "@/app/_components/InputGroupContainer";
import { useAuth } from "@/app/Context/AuthContext";

import royalImage2 from "../../../public/royalImage2.webp";


export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleButton;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeGoogleButton = () => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id:
          "513931588844-2rjk6ukt0gc84gsho7f4epuu90p7o6up.apps.googleusercontent.com",
        callback: handleGoogleLoginSuccess,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: googleButtonRef.current.offsetWidth,
        }
      );
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential;

    const userData = { token: token };

    try {
      const res = await fetch(
        "https://backend.royalgangchamber.com/getGoogleUser.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();

      if (data.success) {
        login({
          email: data.email || "",
          first_name: data.first_name,
          last_name: data.last_name || "",
        });
        setSuccessMessage(data.message);
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
  };

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData = { email: email, password: password };

    try {
      const res = await fetch("https://backend.royalgangchamber.com/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.success) {
        login({
          email: email,
          first_name: data.first_name,
          last_name: data.last_name || "",
        });
        setSuccessMessage(data.message);
        setErrorMessage("");
        router.push("/");
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
  }

  return (
    <main className="flex h-dvh items-center justify-between pt-20">
      <div className="mx-auto basis-[80%] px-4 lg:basis-1/2 lg:px-10">
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-semibold text-lightBlue lg:text-3xl">
            Sign In
          </h2>

          {successMessage && (
            <div className="rounded-lg bg-green-100 p-3 text-center text-sm text-green-700">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col justify-between gap-y-5">
            <div ref={googleButtonRef} className="w-full"></div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroupContainer>

              <Button
                type="submit"
                className={`w-full rounded-lg border bg-saddleBrown p-4 text-white transition-colors duration-300 hover:bg-goldenRod`}
              >
                Login with Password
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p className="text-center text-sm">
              <span className="text-lightBlue">
                Don&apos;t have an account?&nbsp;
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