import { CatalogProps } from "./catalog.d";

export interface CatalogDialogProps {
    catalog?: CatalogProps | null;
    renewCatalog?: () => void |undefined;
}