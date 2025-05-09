// lib/topship.ts
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-topship.com/api' 
  : 'https://topship-staging.africa/api';

export async function fetchTopShip(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  
  // Add params to URL
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'object') {
      url.searchParams.set(key, JSON.stringify(value));
    } else {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${process.env.TOPSHIP_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TopShip API error: ${response.statusText}`);
  }

  return response.json();
}

// Shipping rate calculation
export async function getShippingRates(
  senderCity: string,
  senderCountry: string,
  receiverCity: string,
  receiverCountry: string,
  totalWeight: number
) {
  return fetchTopShip('get-shipment-rate', {
    shipmentDetail: {
      senderDetails: {
        cityName: senderCity,
        countryCode: senderCountry,
      },
      receiverDetails: {
        cityName: receiverCity,
        countryCode: receiverCountry,
      },
      totalWeight,
    },
  });
}

// Address validation helpers
export async function getCountries() {
  return fetchTopShip('get-countries');
}

export async function getStates(countryCode: string) {
  return fetchTopShip('get-states', { countryCode });
}

export async function getCities(countryCode: string) {
  return fetchTopShip('get-cities', { countryCode });
}

// Pickup scheduling
export async function getPickupRates(
  senderDetails: {
    addressLine1: string;
    addressLine2: string;
    country: string;
    countryCode: string;
    state: string;
    city: string;
  },
  pickupDate: string
) {
  return fetchTopShip('get-pickup-rates', {
    input: {
      senderDetail: senderDetails,
      pickupDate,
    },
  });
}