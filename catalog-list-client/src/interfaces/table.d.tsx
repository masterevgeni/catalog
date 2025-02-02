import { CatalogProps } from './catalog.d';

export interface TableViewProps {
    catalogs: CatalogProps[];
    loading: boolean;
    setCatalogs: React.Dispatch<React.SetStateAction<CatalogProps[]>>;
    setSuccessMessage: React.Dispatch<React.SetStateAction<any>>;
    renewCatalog: () => void;
}