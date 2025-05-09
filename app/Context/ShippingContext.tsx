// app/Context/ShippingContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type ShippingRate = {
  mode: string;
  cost: number;
  duration: string;
  currency: string;
  pricingTier: string;
};

type ShippingLocation = {
  addressLine1: string;
  addressLine2: string;
  country: string;
  countryCode: string;
  state: string;
  city: string;
};

type ShippingContextType = {
  countries: { code: string; name: string }[];
  cities: { cityName: string; suburbName: string; postcode: string }[];
  states: { slug: string; pk: string; countryCode: string; name: string; code: string }[];
  shippingRates: ShippingRate[];
  selectedRate: ShippingRate | null;
  isLoadingRates: boolean;
  fetchCountries: () => Promise<void>;
  fetchStates: (countryCode: string) => Promise<void>;
  fetchCities: (countryCode: string) => Promise<void>;
  fetchShippingRates: (receiverDetails: {
    cityName: string;
    countryCode: string;
  }, weight: number) => Promise<void>;
  setSelectedRate: (rate: ShippingRate | null) => void;
  warehouseLocation: ShippingLocation;
};

const ShippingContext = createContext<ShippingContextType>({
  countries: [],
  cities: [],
  states: [],
  shippingRates: [],
  selectedRate: null,
  isLoadingRates: false,
  fetchCountries: async () => {},
  fetchStates: async () => {},
  fetchCities: async () => {},
  fetchShippingRates: async () => {},
  setSelectedRate: () => {},
  warehouseLocation: {
    addressLine1: "268, Herbert Macauly way",
    addressLine2: "",
    country: "Nigeria",
    countryCode: "NG",
    state: "Lagos",
    city: "Yaba"
  }
});

export const useShipping = () => useContext(ShippingContext);

export const ShippingProvider = ({ children }: { children: React.ReactNode }) => {
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  const [cities, setCities] = useState<{ cityName: string; suburbName: string; postcode: string }[]>([]);
  const [states, setStates] = useState<{ slug: string; pk: string; countryCode: string; name: string; code: string }[]>([]);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  const warehouseLocation = {
    addressLine1: "268, Herbert Macauly way",
    addressLine2: "",
    country: "Nigeria",
    countryCode: "NG",
    state: "Lagos",
    city: "Yaba"
  };

  // Helper function to convert kobo to naira
  const convertKoboToNaira = (kobo: number): number => {
    return kobo / 100;
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/topship/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryCode: string) => {
    try {
      const response = await fetch(`/api/topship/states?countryCode=${countryCode}`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryCode: string) => {
    try {
      const response = await fetch(`/api/topship/cities?countryCode=${countryCode}`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchShippingRates = async (receiverDetails: { cityName: string; countryCode: string }, weight: number) => {
    setIsLoadingRates(true);
    try {
      const payload = {
        shipmentDetail: {
          senderDetails: {
            cityName: warehouseLocation.city,
            countryCode: warehouseLocation.countryCode
          },
          receiverDetails,
          totalWeight: weight
        }
      };

      const response = await fetch(`/api/topship/shipping-rates?shipmentDetail=${JSON.stringify(payload.shipmentDetail)}`);
      const data = await response.json();
      
      // Convert rates from kobo to naira before setting them
      const convertedRates = data.map((rate: ShippingRate) => ({
        ...rate,
        cost: convertKoboToNaira(rate.cost)
      }));
      
      setShippingRates(convertedRates);
      
      // Auto-select the budget option by default if available
      if (convertedRates.length > 0) {
        const budgetOption = convertedRates.find((rate: ShippingRate) => rate.pricingTier === "Budget") || convertedRates[0];
        setSelectedRate(budgetOption);
      }
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Load countries on initial mount
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <ShippingContext.Provider
      value={{
        countries,
        cities,
        states,
        shippingRates,
        selectedRate,
        isLoadingRates,
        fetchCountries,
        fetchStates,
        fetchCities,
        fetchShippingRates,
        setSelectedRate,
        warehouseLocation
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};