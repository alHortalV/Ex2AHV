import { CountryRequest } from '../request/CountryRequest';
import { HttpError } from './HttpError';

interface Config {
    url_base : string;
}

export interface ICountry {
    getCountries(route : string) : Promise<CountryRequest[] | HttpError>;
}

export abstract class Http implements ICountry {
    protected url_base: string;

    constructor({url_base} : Config) {
        this.url_base = url_base;
    }

    abstract getCountries(route: string) : Promise<CountryRequest[] | HttpError> ;
}
