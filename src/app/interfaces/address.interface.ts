export interface IAddress {
  street: {
    id: number;
    name: string;
  } | null;
  title: string | null;
  house: string | null;
  subtitle: string | null;
  latitude: number;
  longitude: number;
}
