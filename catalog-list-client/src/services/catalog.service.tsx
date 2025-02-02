import axios, { AxiosResponse } from 'axios';
import { CatalogProps, CatalogErrorProps } from '../interfaces/catalog.d';

const URL: string | undefined = process.env.REACT_APP_API_URL;

export const GetCatalogsDO = async (): Promise<CatalogProps | CatalogErrorProps> => {
    try {
        const response: AxiosResponse<CatalogProps> = await axios.get(`${URL}/api/catalogs`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const DeleteCatalogDO = async (id: number) => {
    try {
        const response = await axios.delete(`${URL}/api/catalogs/${id}`);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export const AddCatalogDO = async (newCatalog: CatalogProps) => {
    try {
        const response: AxiosResponse<CatalogProps> = await axios.post<CatalogProps>(`${URL}/api/catalogs`, newCatalog);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export const UpdateCatalogDO = async (id: string | number | undefined, updatedCatalog: CatalogProps) => {
    try {
        const response: AxiosResponse<CatalogProps> = await axios.patch<CatalogProps>(`${URL}/api/catalogs/${id}`, updatedCatalog);
        return response;
    }
    catch (error) {
        throw error;
    }
}