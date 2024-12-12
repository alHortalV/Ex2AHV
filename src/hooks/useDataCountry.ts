import {useState, useEffect} from 'react';
import { HttpAxios } from '../http/HttpAxios';
import { HttpError } from '../http/HttpError';
import {CountryDetails} from '../config/types/CountryDetails';

export const useCountryByName = (countryName: string) => {
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const url_base = 'https://restcountries.com/v3.1/';

  useEffect(() => {
    const fetchCountry = async () => {
      const httpClient = new HttpAxios({url_base});
      try {
        const response = await httpClient.getCountryByName(countryName);
        if (response instanceof HttpError) {
          setError('Error fetching country data');
        } else {
          setCountry(response[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountry();
    }
  }, [countryName]);

  return {country, loading, error};
};
