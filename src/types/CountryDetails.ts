import {Currency, Demonyms} from './CountryRequest';

export interface CountryDetails {
  name: {
    common: string;
  };
  cca3: string;
  region: string;
  population: number;
  capital: string;
  languages: {[key: string]: string};
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  area: number;
  subregion: string;
  currencies: {[key: string]: Currency};
  demonyms: Demonyms;
  latlng: number[];
}
