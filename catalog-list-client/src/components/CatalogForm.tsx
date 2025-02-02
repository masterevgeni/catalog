import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

interface CatalogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, vertical: string, primary: boolean) => void;
  initialCatalog?: { name: string; vertical: string; primary: boolean };
}

const CatalogForm: React.FC<CatalogFormProps> = ({ open, onClose, onSubmit, initialCatalog }) => {
  const [name, setName] = useState(initialCatalog?.name || '');
  const [vertical, setVertical] = useState(initialCatalog?.vertical || '');
  const [primary, setPrimary] = useState(initialCatalog?.primary || false);

  const handleSubmit = () => {
    onSubmit(name, vertical, primary);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialCatalog ? 'Edit Catalog' : 'Add New Catalog'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Catalog Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Vertical</InputLabel>
          <Select value={vertical} onChange={(e) => setVertical(e.target.value)}>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="general">General</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={primary} onChange={() => setPrimary(!primary)} />}
          label="Set as Primary"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          {initialCatalog ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatalogForm;
