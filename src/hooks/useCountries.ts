// Este es un ejemplo de cómo podrías estructurar tu hook useCountries
import {useState, useEffect} from 'react';
import {CountryDetails} from '../types/CountryDetails';
import {CountryRequest} from '../types/CountryRequest';

export const useCountries = (continent: string) => {
  const [countries, setCountries] = useState<CountryDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${continent}`,
        );
        const data = await response.json();

        const formattedCountries: CountryDetails[] = data.map(
          (item: CountryRequest) => ({
            name: item.name,
            cca3: item.cca3,
            region: item.region,
            subregion: item.subregion ?? 'N/A',
            population: item.population,
            capital: item.capital,
            languages: item.languages,
            flags: item.flags,
          }),
        );

        setCountries(formattedCountries);
      } catch (err) {
        setError('Error al cargar países');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [continent]);

  return {countries, loading, error};
};
