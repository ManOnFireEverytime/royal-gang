"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Inputs } from "../cart/page";

export default function Payments({
  setProceed,
  register,
  errors,
}: {
  setProceed: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}) {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="space-y-0.5">
        <h1 className="text-lg font-bold">Payment</h1>

        <p className="text-sm">All transactions are secure and encrypted.</p>
      </div>

      <div className="mx-auto w-full rounded-lg">
        <div className="border border-gray-200 pb-4">
          <div className="mb-4 flex items-center justify-between bg-[#F5F5F5] px-4 py-2">
            <h2 className="font-medium">Billing Details</h2>
          </div>

          <div className="space-y-4 px-4">
            <div className="grid items-end gap-4 lg:grid-cols-2">
              <InputGroup>
                {errors?.billingFirstName ? (
                  <ErrorGroup>{errors.billingFirstName.message}</ErrorGroup>
                ) : null}

                <input
                  type="text"
                  placeholder="First Name"
                  className="rounded border border-gray-300 p-2"
                  {...register("billingFirstName", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>

              <InputGroup>
                {errors?.billingLastName ? (
                  <ErrorGroup>{errors.billingLastName.message}</ErrorGroup>
                ) : null}

                <input
                  type="text"
                  placeholder="Last Name"
                  className="rounded border border-gray-300 p-2"
                  {...register("billingLastName", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>
            </div>

            <InputGroup>
              {errors?.billingAddress ? (
                <ErrorGroup>{errors.billingAddress.message}</ErrorGroup>
              ) : null}

              <input
                type="text"
                placeholder="Address"
                className="w-full rounded border border-gray-300 p-2"
                {...register("billingAddress", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                })}
              />
            </InputGroup>

            <div className="grid items-end gap-4 lg:grid-cols-3">
              <InputGroup>
                {errors?.billingTown ? (
                  <ErrorGroup>{errors.billingTown.message}</ErrorGroup>
                ) : null}

                <input
                  type="text"
                  placeholder="Town/City"
                  className="rounded border border-gray-300 p-2"
                  {...register("billingTown", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>

              <InputGroup>
                {errors?.billingState ? (
                  <ErrorGroup>{errors.billingState.message}</ErrorGroup>
                ) : null}

                <input
                  type="text"
                  placeholder="State"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-zA-Z]/g,
                      "",
                    );
                  }}
                  className="rounded border border-gray-300 p-2"
                  {...register("billingState", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>

              <InputGroup>
                {errors?.billingCountry ? (
                  <ErrorGroup>{errors.billingCountry.message}</ErrorGroup>
                ) : null}

                <input
                  type="text"
                  placeholder="Country"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-zA-Z]/g,
                      "",
                    );
                  }}
                  className="rounded border border-gray-300 p-2"
                  {...register("billingCountry", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>
            </div>

            <div className="grid items-end gap-4 lg:grid-cols-2">
              <InputGroup>
                {errors?.billingPhone ? (
                  <ErrorGroup>{errors.billingPhone.message}</ErrorGroup>
                ) : null}

                <input
                  type="tel"
                  placeholder="Phone No"
                  inputMode="numeric"
                  className="rounded border border-gray-300 p-2"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/g,
                      "",
                    );
                  }}
                  {...register("billingPhone", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                  })}
                />
              </InputGroup>

              <InputGroup>
                {errors?.billingEmail ? (
                  <ErrorGroup>{errors.billingEmail.message}</ErrorGroup>
                ) : null}

                <input
                  type="email"
                  placeholder="Email"
                  className="rounded border border-gray-300 p-2"
                  {...register("billingEmail", {
                    required: { value: true, message: "Required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </InputGroup>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                defaultChecked={false}
                {...register("rememberMe")}
              />

              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setProceed(false)}
            className="rounded-md border border-saddleBrown bg-white px-6 py-2 text-sm font-bold uppercase text-black text-saddleBrown transition-colors hover:bg-gray-100"
          >
            Back to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function InputGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-y-1">{children}</div>;
}

export function ErrorGroup({ children }: { children: ReactNode }) {
  return <span className="text-xs text-red-500">{children}</span>;
}
