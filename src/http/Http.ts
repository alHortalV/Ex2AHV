import {CountryRequest} from '../config/res/CountryRequest';
import {CountryDetails} from '../config/types/CountryDetails';
import {HttpError} from './HttpError';

interface Config {
  url_base: string; // Configuración de la URL base para las solicitudes HTTP.
}

export interface ICountry {
  // Interfaz que define los métodos de obtención de datos de países y continentes.
  getContinents(route: string): Promise<CountryRequest[] | HttpError>; // Obtiene continentes a partir de una ruta.
  getCountryByName(route: string): Promise<CountryDetails[] | HttpError>; // Obtiene detalles del país por nombre.
}

export abstract class Http implements ICountry {
  protected url_base: string; // URL base para las solicitudes HTTP.

  constructor({url_base}: Config) {
    this.url_base = url_base; // Inicializa la URL base con la configuración proporcionada.
  }

  // Métodos abstractos que deben ser implementados en las clases que extiendan esta clase.
  abstract getContinents(route: string): Promise<CountryRequest[] | HttpError>;
  abstract getCountryByName(
    route: string,
  ): Promise<CountryDetails[] | HttpError>;
}
