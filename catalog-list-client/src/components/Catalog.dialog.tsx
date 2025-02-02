import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    CircularProgress
} from '@mui/material';
import { CatalogProps } from '../interfaces/catalog.d';
import { AddCatalogDO, UpdateCatalogDO } from './../services/catalog.service';
import SnackBar from './Snackbar';

interface CatalogDialogProps {
    catalog?: CatalogProps | null;
    renewCatalog: () => void;
}

const
    CatalogDialog: React.FC<CatalogDialogProps> = ({ catalog, renewCatalog }) => {
        const [isDialogOpen, setDialogOpen] = useState(false);
        const [editCatalog, setEditCatalog] = useState<CatalogProps | null>(null);
        const [progress, setProgress] = useState<boolean>(false);
        const [validationErrors, setValidationErrors] = useState<{ name?: string; vertical?: string }>({});
        const [error, setError] = useState<string | null>(null);
        const [successMessage, setSuccessMessage] = useState<string | null>(null);

        const handleOpenDialog = () => {
            setEditCatalog(catalog ? { ...catalog } : { name: '', vertical: '', primary: false });
            setDialogOpen(true);
            setValidationErrors({});
        };

        const validateFields = () => {
            const errors: { name?: string; vertical?: string } = {};
            if (!editCatalog?.name) {
                errors.name = 'Catalog name is required.';
            } else if (editCatalog.name.length < 2) {
                errors.name = 'Catalog name must be at least 2 characters.';
            }

            if (!editCatalog?.vertical) {
                errors.vertical = 'Vertical is required.';
            }

            setValidationErrors(errors);
            return Object.keys(errors).length === 0;
        };

        const handleSubmitCatalog = async (): Promise<void> => {
            if (!editCatalog || !validateFields()) return;

            setProgress(true);
            const newCatalog: CatalogProps = { name: editCatalog.name, vertical: editCatalog.vertical, primary: editCatalog.primary };

            try {
                if (catalog) {
                    const updatedCatalogResponse = await UpdateCatalogDO(catalog._id, newCatalog);
                    if (updatedCatalogResponse.status === 200) {
                        renewCatalog();
                        setSuccessMessage('Catalog updated successfully!');
                    } 
                } else {
                    const newCatalogResponse = await AddCatalogDO(newCatalog);
                    if (newCatalogResponse.status === 201) {
                        renewCatalog();
                        setSuccessMessage('New catalog added successfully!');
                    }
                }
            } catch (error) {
                setError('Failed to save catalog. Please try again.');
            } finally {
                setProgress(false);
                setDialogOpen(false);
            }
        };

        return (
            <>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    {catalog ? 'Edit Catalog' : 'Add Catalog'}
                </Button>
                <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>{catalog ? 'Edit Catalog' : 'Add New Catalog'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            size="small"
                            label="Catalog Name"
                            value={editCatalog?.name || ''}
                            onChange={(e) => setEditCatalog(prev => prev ? { ...prev, name: e.target.value } : { name: e.target.value, vertical: '', primary: false })}
                            fullWidth
                            margin="normal"
                            required
                            error={!!validationErrors.name}
                            helperText={validationErrors.name}
                        />
                        <FormControl fullWidth margin="normal" required error={!!validationErrors.vertical}>
                            <InputLabel>Vertical</InputLabel>
                            <Select
                                size="small"
                                value={editCatalog?.vertical || ''}
                                onChange={(e) => setEditCatalog(prev => prev ? { ...prev, vertical: e.target.value } : { vertical: e.target.value, name: '', primary: false })}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="fashion">Fashion</MenuItem>
                                <MenuItem value="home">Home</MenuItem>
                                <MenuItem value="general">General</MenuItem>
                            </Select>
                            {validationErrors.vertical && <p style={{ color: 'red' }}>{validationErrors.vertical}</p>}
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox checked={editCatalog?.primary || false} onChange={() => setEditCatalog(prev => prev ? { ...prev, primary: !prev.primary } : { primary: true })} />}
                            label="Set as Primary"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary">
                            Cancel
                        </Button>
                        {progress ? (
                            <CircularProgress size={18} sx={{ marginRight: 4 }} />
                        ) : (
                            <Button onClick={handleSubmitCatalog} color="secondary">
                                {catalog ? 'Update' : 'Add'}
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
                <SnackBar
                    setError={setError}
                    setSuccessMessage={setSuccessMessage}
                    successMessage={successMessage}
                    error={error}
                />

            </>
        );
    };

export default CatalogDialog;