import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { CatalogProps } from '../interfaces/catalog.d';
import { GetCatalogsDO } from './../services/catalog.service';
import TableView from './../components/Table';
import AddCatalogModal from '../components/Catalog.dialog';
import SnackBar from '../components/Snackbar';

const CatalogList: React.FC = () => {
  const [catalogs, setCatalogs] = useState<CatalogProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    getCatalogs();
  }, []);

  const getCatalogs = async () => {
    setLoading(true);
    try {
      const result = await GetCatalogsDO();
      if (Array.isArray(result)) {
        setCatalogs(result);
      }
      else {
        setError(result.message || 'An error occurred while fetching catalogs.');
      }
    } catch (err) {
      setError('Something goes wrong, Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container style={{ marginTop: '20px' }}>
        <Grid container rowSpacing={1} spacing={2} columnSpacing={1}>
          <Grid size={{ xs: 6, md: 6 }}>
            <AddCatalogModal renewCatalog={getCatalogs} />
          </Grid>

          <Grid size={12}>
            <TableView catalogs={catalogs} loading={loading} setCatalogs={setCatalogs} setSuccessMessage={setSuccessMessage} renewCatalog={getCatalogs} />
          </Grid>

        </Grid>
      </Container>

      <SnackBar
        setError={setError}
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
        error={error}
      />
    </>
  );
};

export default CatalogList;