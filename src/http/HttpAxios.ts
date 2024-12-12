import axios from 'axios';
import {CountryRequest} from '../config/res/CountryRequest';
import {Http} from './Http';
import {HttpError} from './HttpError';
import {CountryDetails} from '../config/types/CountryDetails';

export class HttpAxios extends Http {
  // Implementación de la función para obtener continentes desde la API.
  async getContinents(route: string): Promise<CountryRequest[] | HttpError> {
    try {
      // Realiza una solicitud GET utilizando axios para obtener los continentes desde la API.
      const {data} = await axios.get<CountryRequest[]>(
        `${this.url_base}region/${route}`,
      );
      return data; // Retorna los datos de los continentes obtenidos.
    } catch (error) {
      // Si ocurre un error, se retorna un objeto HttpError con el mensaje de error.
      return new HttpError(`${error}`);
    }
  }

  // Implementación de la función para obtener detalles de un país por su nombre.
  async getCountryByName(name: string): Promise<CountryDetails[] | HttpError> {
    try {
      // Realiza una solicitud GET utilizando axios para obtener los detalles del país por nombre.
      const {data} = await axios.get<CountryDetails[]>(
        `${this.url_base}name/${name}`,
      );
      return data; // Retorna los detalles del país obtenidos.
    } catch (error) {
      // Si ocurre un error, se retorna un objeto HttpError con el mensaje de error.
      return new HttpError(`${error}`);
    }
  }
}
