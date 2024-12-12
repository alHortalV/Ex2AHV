import { CountryRequest } from '../config/res/CountryRequest';
import { CountryDetails } from '../config/types/CountryDetails';
import {HttpError} from './HttpError';

interface Config {
  url_base: string;
}

export interface ICountry {
  getContinents(route: string): Promise<CountryRequest[] | HttpError>;
  getCountryByName(route: string): Promise<CountryDetails[] | HttpError>;
}

export abstract class Http implements ICountry {
  protected url_base: string;

  constructor({url_base}: Config) {
    this.url_base = url_base;
  }

  abstract getContinents(route: string): Promise<CountryRequest[] | HttpError>;
  abstract getCountryByName(
    route: string,
  ): Promise<CountryDetails[] | HttpError>;
}
