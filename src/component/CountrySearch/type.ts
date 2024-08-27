type Flags = {
  png: string;
  svg?: string;
  alt: string;
};
type Name = {
  common: string;
  official: string;
};
export type CountryInfo = {
  flags: Flags;
  population: number;
  region: string;
  capital: string[];
  cca3: string;
  name: Name;
};
