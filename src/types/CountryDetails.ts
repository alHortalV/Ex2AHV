export interface CountryDetails {
  name: {
    common: string;
  };
  cca3: string;
  region: string;
  subregion: string;
  population: number;
  capital: string;
  languages: { [key: string]: string };
  flag: string;
}
