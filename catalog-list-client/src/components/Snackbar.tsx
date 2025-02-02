import { Snackbar } from '@mui/material';
import {SnackBarProps} from '../interfaces/snackBar.d';

const SnackBar: React.FC<SnackBarProps> = ({setError, setSuccessMessage, successMessage, error}) => {

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccessMessage(null);
      };
return (
    <Snackbar
            open={!!error || !!successMessage}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error || successMessage}
          />
)};

export default SnackBar;