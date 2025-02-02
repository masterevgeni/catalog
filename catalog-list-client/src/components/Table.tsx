import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Checkbox,
    CircularProgress,
} from '@mui/material';

import { TableViewProps } from '../interfaces/table.d';
import { DeleteCatalogDO } from './../services/catalog.service';
import AddCatalogModal from './Catalog.dialog';

const TableView: React.FC<TableViewProps> = ({ catalogs, loading,setCatalogs, setSuccessMessage, renewCatalog }) => {

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id: number) => {
        try {
            const deleteStatus = await DeleteCatalogDO(id);
            if(deleteStatus.status === 200){
                setCatalogs(catalogs.filter(catalog => catalog._id !== id));
                setSuccessMessage('Catalog deleted successfully!');
            }
        } catch (error) {
            setSuccessMessage('Something goes wron on update');
        }
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Table aria-label="catalog list">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.length === catalogs.length}
                                    onChange={(event) => setSelectedIds(event.target.checked ? catalogs.map((cat) => cat._id) : [])}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Vertical</TableCell>
                            <TableCell>Primary</TableCell>
                            <TableCell>Indexed At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catalogs.map((catalog) => (
                            <TableRow key={catalog._id}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedIds.includes(catalog._id)} onChange={() => handleSelect(catalog._id)} />
                                </TableCell>
                                <TableCell>{catalog.name}</TableCell>
                                <TableCell>{catalog.vertical}</TableCell>
                                <TableCell>{catalog.primary ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{catalog.indexedAt ? new Date(catalog.indexedAt).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    {/* <Button variant="contained" color="primary" onClick={() => handleEditCatalog(catalog)}>
                                        Edit
                                    </Button> */}
                                    <AddCatalogModal catalog={catalog} renewCatalog={renewCatalog}/>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(catalog._id)} style={{ marginLeft: '10px' }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    )
};

export default TableView;