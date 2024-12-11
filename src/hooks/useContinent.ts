// Este es un ejemplo de cómo podrías estructurar tu hook useCountries
import { useState, useEffect } from 'react';
import { CountryDetails } from '../types/CountryDetails';

export const useCountries = (continent: string) => {
  const [countries, setCountries] = useState<CountryDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`);
        const data = await response.json();
        // Asegúrate de que los datos recibidos sean del tipo `CountryDetails`
        const formattedCountries: CountryDetails[] = data.map((item: any) => ({
          name: item.name,
          cca3: item.cca3,
          region: item.region,
          subregion: item.subregion ?? 'N/A', // Usa un valor por defecto si es necesario
          population: item.population,
          capital: item.capital,
          languages: item.languages,
          flag: item.flags[0], // Asegúrate de que la URL esté en la propiedad correcta
        }));

        setCountries(formattedCountries);
      } catch (err) {
        setError('Error al cargar países');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [continent]);

  return { countries, loading, error };
};
