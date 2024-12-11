import { useState, useEffect } from 'react';
import { HttpAxios } from '../http/HttpAxios';
import { CountryRequest } from '../request/CountryRequest';
import { HttpError } from '../http/HttpError';

export const useCountries = (continent: string) => {
  const [countries, setCountries] = useState<CountryRequest[]>([]); // Cambiado a un arreglo
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const httpService = new HttpAxios({ url_base: 'https://restcountries.com/v3.1/' });

      setLoading(true);
      setError(null);

      const response = await httpService.getCountries(continent);

      if (response instanceof HttpError) {
        console.error('Error al cargar países');
        setCountries([]);
      } else if (Array.isArray(response)) {
        setCountries(response);
      } else {
        setCountries([]);
      }

      setLoading(false);
    };

    if (continent) {
      fetchCountries();
    }
  }, [continent]);

  return {
    countries,
    loading,
    error,
  };
};
