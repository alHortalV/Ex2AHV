import axios from 'axios';
import { CountryRequest } from '../request/CountryRequest';
import { Http } from './Http';
import { HttpError } from './HttpError';


export class HttpAxios extends Http {
    async getCountries(route: string): Promise<CountryRequest[] | HttpError> {
        try {
            const {data} = await axios.get<CountryRequest[]>(`${this.url_base}region/${route}`);
            return data;
        } catch(error) {
            return new HttpError(`${error}`);
        }
    }
}
