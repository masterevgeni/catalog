export interface CatalogProps {
  _id?: string | number | undefined;
  name: string;
  vertical: string;
  primary: boolean;
  indexedAt?: Date | null;
  message?:string;
}

export interface CatalogErrorProps {
  message?: string,
  error?: string,
  statusCode?: number
}

export interface CatalogCreateResponseProps{
  status?: number; 
  // data?: Catalog;
  // message?: string; 
  // errors?: string[];
}