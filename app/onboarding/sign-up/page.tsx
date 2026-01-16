"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/app/_components/Button";
import GoogleIcon from "@/app/_components/GoogleIcon";
import InputGroupContainer from "@/app/_components/InputGroupContainer";
import { useAuth } from "@/app/Context/AuthContext";

import royalImage2 from "../../../public/royalImage2.webp";

export default function SignUp() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleSignUpWithGmail = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "513931588844-2rjk6ukt0gc84gsho7f4epuu90p7o6up.apps.googleusercontent.com",
        callback: handleGoogleLoginSuccess,
        ux_mode: "popup", // Use popup mode instead of one-tap
      });

      // Use renderButton for custom button or prompt for popup
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If one-tap doesn't work, fall back to popup
          window.google.accounts.oauth2.initTokenClient({
            client_id: "513931588844-2rjk6ukt0gc84gsho7f4epuu90p7o6up.apps.googleusercontent.com",
            scope: "email profile",
            callback: handleGoogleTokenResponse,
          }).requestAccessToken();
        }
      });
    }
  };

  const handleGoogleTokenResponse = async (tokenResponse: any) => {
    if (tokenResponse && tokenResponse.access_token) {
      // Get user info from Google
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const userInfo = await userInfoResponse.json();
      
      // Send to your backend
      const userData = { 
        token: tokenResponse.access_token,
        email: userInfo.email,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
      };

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch("https://backend.royalgangchamber.com/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        router.push("/onboarding/sign-in");
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
          <div className="space-y-1">
            <h2 className="text-center text-2xl font-bold text-headerBlue lg:text-3xl">
              Create An Account
            </h2>

            <p className="text-center tracking-wide text-lightBlue">
              Get the best collections of our brands now!
            </p>
          </div>

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
            <Button
              onClick={handleSignUpWithGmail}
              className={`flex w-full items-center justify-center gap-x-4 rounded-lg border px-4 py-3 font-semibold tracking-wide text-lightBlue shadow-sm shadow-slate-200 transition-colors duration-300 hover:bg-customBlue hover:text-white`}
            >
              <GoogleIcon />
              <span>Sign Up With Gmail</span>
            </Button>
          </div>

          <div className="relative flex justify-center text-sm">
            <div className="border-border-strong absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-t"></div>

            <span className="z-5 relative bg-white px-2 text-lg uppercase text-lightBlue dark:bg-white">
              or
            </span>
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

              <InputGroupContainer>
                <label className="input-label">Confirm Password</label>

                <input
                  name="confirm-password"
                  className="input-style"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputGroupContainer>

              <Button
                type="submit"
                className={`w-full rounded-lg border bg-saddleBrown p-4 text-white transition-colors duration-300 hover:bg-goldenRod`}
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