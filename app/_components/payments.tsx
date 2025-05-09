"use client";

import { Dispatch, ReactNode, SetStateAction, useEffect, useState, useCallback } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Inputs } from "../cart/page";
import { useShipping } from "@/app/Context/ShippingContext";
import { Clock, Truck, Award } from "lucide-react";

interface OptionItem {
  code?: string;
  slug?: string;
  cityName?: string;
  name?: string;
}

interface ShippingRate {
  mode: string;
  pricingTier: string;
  cost: number;
  duration: string;
  currency: string;
}

export default function Payments({
  setProceed,
  register,
  errors,
  setValue,
  watch,
}: {
  setProceed: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  watch: UseFormWatch<Inputs>;
}) {
  const { countries, states, cities, fetchStates, fetchCities } = useShipping();
  const { shippingRates, selectedRate, setSelectedRate, isLoadingRates } = useShipping();
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [fetchedCountry, setFetchedCountry] = useState<string | null>(null);
  const [fetchedState, setFetchedState] = useState<string | null>(null);
  
  // Sort countries and cities alphabetically
  const sortedCountries = [...countries].sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  
  const sortedCities = [...cities].sort((a, b) => 
    a.cityName.localeCompare(b.cityName)
  );
  
  const watchCountry = watch("billingCountryCode");
  const watchState = watch("billingState");
  
  // Memoize fetch functions to prevent unnecessary recreations
  const fetchStatesMemoized = useCallback(async (countryCode: string) => {
    if (countryCode === fetchedCountry) return;
    
    setLoadingStates(true);
    try {
      await fetchStates(countryCode);
      setFetchedCountry(countryCode);
      setFetchedState(null);
      setValue("billingState", "");
      setValue("billingTown", "");
    } finally {
      setLoadingStates(false);
    }
  }, [fetchStates, setValue, fetchedCountry]);

  const fetchCitiesMemoized = useCallback(async (countryCode: string, state: string) => {
    if (state === fetchedState) return;
    
    setLoadingCities(true);
    try {
      await fetchCities(countryCode);
      setFetchedState(state);
    } finally {
      setLoadingCities(false);
    }
  }, [fetchCities, fetchedState]);
  
  useEffect(() => {
    if (watchCountry && watchCountry !== fetchedCountry) {
      fetchStatesMemoized(watchCountry);
    }
  }, [watchCountry, fetchStatesMemoized, fetchedCountry]);
  
  useEffect(() => {
    if (watchCountry && watchState && watchState !== fetchedState) {
      fetchCitiesMemoized(watchCountry, watchState);
    }
  }, [watchCountry, watchState, fetchCitiesMemoized, fetchedState]);
  
  const getUniqueKey = (item: OptionItem, index: number) => {
    return `${item.code || item.slug || item.cityName || item.name}-${index}`;
  };

  const getShippingIcon = (tier: string) => {
    switch(tier.toLowerCase()) {
      case 'express':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'standard':
        return <Truck className="h-5 w-5 text-green-600" />;
      case 'budget':
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  const handleSelectRate = (rate: ShippingRate) => {
    setSelectedRate(rate);
    setValue("shippingRateId", `${rate.mode}-${rate.pricingTier}`);
  };

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
                {errors?.billingCountryCode ? (
                  <ErrorGroup>{errors.billingCountryCode.message}</ErrorGroup>
                ) : null}

                <select
                  className="rounded border border-gray-300 p-2"
                  {...register("billingCountryCode", {
                    required: {
                      value: true,
                      message: "Required",
                    },
                    onChange: (e) => {
                      const selectedCountry = sortedCountries.find(
                        (country) => country.code === e.target.value
                      );
                      if (selectedCountry) {
                        setValue("billingCountry", selectedCountry.name);
                      }
                    },
                  })}
                >
                  <option value="">Select Country</option>
                  {sortedCountries.map((country, index) => (
                    <option key={getUniqueKey(country, index)} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </InputGroup>

              <InputGroup>
                {errors?.billingState ? (
                  <ErrorGroup>{errors.billingState.message}</ErrorGroup>
                ) : null}

                {loadingStates ? (
                  <p className="rounded border border-gray-300 p-2 text-gray-500">Loading states...</p>
                ) : (
                  <select
                    className="rounded border border-gray-300 p-2"
                    disabled={!watchCountry || loadingStates}
                    {...register("billingState", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={getUniqueKey(state, index)} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                )}
              </InputGroup>

              <InputGroup>
                {errors?.billingTown ? (
                  <ErrorGroup>{errors.billingTown.message}</ErrorGroup>
                ) : null}

                {loadingCities ? (
                  <p className="rounded border border-gray-300 p-2 text-gray-500">Loading cities...</p>
                ) : (
                  <select
                    className="rounded border border-gray-300 p-2"
                    disabled={!watchState || loadingCities}
                    {...register("billingTown", {
                      required: {
                        value: true,
                        message: "Required",
                      },
                    })}
                  >
                    <option value="">Select City</option>
                    {sortedCities.map((city, index) => (
                      <option key={getUniqueKey(city, index)} value={city.cityName}>
                        {city.cityName} {city.suburbName ? `(${city.suburbName})` : ""}
                      </option>
                    ))}
                  </select>
                )}
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

        <div className="mt-6 border border-gray-200 p-4">
          <h2 className="mb-4 font-medium">Shipping Options</h2>
          {isLoadingRates ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              <p className="ml-2">Loading shipping options...</p>
            </div>
          ) : shippingRates.length > 0 ? (
            <div className="space-y-3">
              <input
                type="hidden"
                {...register("shippingRateId")}
              />
              
              {shippingRates.map((rate) => (
                <div 
                  key={`${rate.mode}-${rate.pricingTier}`}
                  className={`flex cursor-pointer items-center justify-between rounded border p-3 transition-colors ${
                    selectedRate?.mode === rate.mode && selectedRate?.pricingTier === rate.pricingTier
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectRate(rate)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getShippingIcon(rate.pricingTier)}
                    </div>
                    <div>
                      <h3 className="font-medium">{rate.mode} - {rate.pricingTier}</h3>
                      <p className="text-sm text-gray-600">{rate.duration}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ₦{rate.cost.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md bg-amber-50 p-4">
              <p className="text-amber-800">No shipping options available for this location. Please check your address details.</p>
            </div>
          )}
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