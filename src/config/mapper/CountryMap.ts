import {CountryRequest} from '../res/CountryRequest';

interface CountryDetails {
  name: {common: string};
  capital: string;
  languages: string;
  cca3: string; // Código del país.
  latlng: number[];
  flag: {
    png: string;
  };
}

/**
 * Mapea la respuesta de la API de CountryRequest a un objeto CountryDetails.
 * @param {CountryRequest} countryRequest - Objeto que contiene los datos del país.
 * @returns {CountryDetails} - Objeto con la estructura esperada por la aplicación.
 */
export const CountryMapper = (
  countryRequest: CountryRequest,
): CountryDetails => {
  return {
    name: countryRequest.name, // Mapea el nombre común del país.
    capital: Array.isArray(countryRequest.capital)
      ? countryRequest.capital.join(', ') // Si la capital es un array, lo convierte a cadena.
      : 'N/A', // Si no hay capital, se asigna 'N/A'.
    languages: countryRequest.languages
      ? Object.values(countryRequest.languages).join(', ') // Convierte las lenguas en una cadena separada por comas.
      : 'N/A', // Si no hay lenguas, se asigna 'N/A'.
    cca3: countryRequest.cca3, // Mapea el código de país.
    latlng: countryRequest.latlng || [0, 0], // Si no hay coordenadas, se asigna [0, 0].
    flag: countryRequest.flags, // Mapea la información de la bandera.
  };
};
