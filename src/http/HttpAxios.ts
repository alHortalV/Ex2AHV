import axios from 'axios';
import { CountryRequest } from '../config/res/CountryRequest';
import {Http} from './Http';
import {HttpError} from './HttpError';
import { CountryDetails } from '../config/types/CountryDetails';

export class HttpAxios extends Http {
  async getContinents(route: string): Promise<CountryRequest[] | HttpError> {
    try {
      const {data} = await axios.get<CountryRequest[]>(
        `${this.url_base}region/${route}`,
      );
      return data;
    } catch (error) {
      return new HttpError(`${error}`);
    }
  }

  async getCountryByName(name: string): Promise<CountryDetails[] | HttpError> {
    try {
      const {data} = await axios.get<CountryDetails[]>(
        `${this.url_base}name/${name}`,
      );
      return data;
    } catch (error) {
      return new HttpError(`${error}`);
    }
  }
}
