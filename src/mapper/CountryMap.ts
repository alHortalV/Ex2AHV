import {CountryRequest} from '../types/CountryRequest';

interface CountryDetails {
  name: {common: string};
  capital: string;
  languages: string;
  cca3: string;
  latlng: number[];
  flag: string;
}

export const CountryMapper = (
  countryRequest: CountryRequest,
): CountryDetails => {
  return {
    name: countryRequest.name,
    capital: Array.isArray(countryRequest.capital)
      ? countryRequest.capital.join(', ')
      : 'N/A',
    languages: countryRequest.languages
      ? Object.values(countryRequest.languages).join(', ')
      : 'N/A',
    cca3: countryRequest.cca3,
    latlng: countryRequest.latlng || [0, 0],
    flag: countryRequest.flags.png,
  };
};
