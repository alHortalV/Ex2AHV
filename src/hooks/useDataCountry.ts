import {useState, useEffect} from 'react';
import {HttpAxios} from '../http/HttpAxios';
import {HttpError} from '../http/HttpError';
import {CountryDetails} from '../config/types/CountryDetails';

export const useCountryByName = (countryName: string) => {
  // Estado para almacenar los detalles del país.
  const [country, setCountry] = useState<CountryDetails | null>(null);

  // Estado para manejar el estado de carga.
  const [loading, setLoading] = useState(true);

  // Estado para almacenar los posibles errores.
  const [error, setError] = useState<string | null>(null);

  const url_base = 'https://restcountries.com/v3.1/'; // URL base de la API.

  useEffect(() => {
    // Función asincrónica que obtiene los detalles del país desde la API.
    const fetchCountry = async () => {
      const httpClient = new HttpAxios({url_base}); // Crea una instancia del cliente HTTP.
      try {
        const response = await httpClient.getCountryByName(countryName); // Realiza la solicitud para obtener los datos del país.

        if (response instanceof HttpError) {
          setError('Error fetching country data'); // Si la respuesta es un error, lo maneja.
        } else {
          setCountry(response[0]); // Si la respuesta es exitosa, almacena los detalles del país.
        }
      } catch (err) {
        // Si ocurre un error en la solicitud, lo captura y maneja.
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        // Cambia el estado de carga a falso una vez finalizada la solicitud.
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountry(); // Llama a la función para obtener el país solo si el nombre no está vacío.
    }
  }, [countryName]); // Efecto que se ejecuta cada vez que cambia `countryName`.

  return {country, loading, error}; // Devuelve el estado del país, la carga y el error.
};
